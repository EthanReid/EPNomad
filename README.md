# Reviving EPNomad
#### By Tejas Shah

This guide should help you in getting started with working with the backend of EPNomad, more specifically with picking up after I left off.

### Notice
I must say this beforehand, that I apologize if the current state of the backend doesn't feel finished. That's because it isn't finished! If you have any questions, feel free to  refer to the [contact info](#contact-info) below.

### What you should know
* Postman, a tool for API testing
* Node.js, which is used for the backend
  * async programming (promises, async/await, promisifying callback-based functions)
  * ES6 (destructuring, classes, let/const, template literals)
* YOLO (You Only Look Once), a pretty accurate and ridiculously fast object detection library
* GraphicsMagick, a image manipulation tool for the data augmentation part

### Required stuff
* AWS Credentials (key id and secret)
* PEM file for accessing both EC2 instances

## Services
Most services used will be from AWS, since you'll be having a ton of credits. Here are the following services that I used or planned to use:
* EC2 - virtual servers
* DynamoDB - NoSQL database
* S3 - file/blob storage
* API Gateway - API key management and rate limiting
* Simple Queue Service (SQS) - basically queues as a service for the training part

## Architecture

#### How is EPNomad supposed to work

There are 2 servers via EC2 instances, one for handling the majority of API calls such as CRUD operations (called the **API server**) and another server doing the actual image processing (called the **ML server**).

The **API server** handles CRUD operations on a user's projects and products. It does process the training and inferencing requests but that's mainly handled by the **ML server**.

**Consumer's view**: A user goes into the web portal and makes a *project*. Each user can have multiple *projects*. He/She can add different *products*, like shoes or shirts to a *project*. For each *product*, the user can add as many or as few pictures of it. After doing this for some time, the user can request EPNomad to train an ML model of a particular *project*. After a few hours, the user can start giving EPNomad some pictures to do inferencing and EPNomad will tell him/her what *product* it is, along with some (optional) metadata.

**Behind the scenes**: When the user adds the *projects* and *products*, it's calling the **API server**, which in turn is saving the data to DynamoDB. When he/she asks for an ML model to be trained, a job will be added to a queue for further processing. This job will be consumed by the **ML server** once it's free to do so. The job status should be maintained in DynamoDB, where it can be polled every once in a while until it's ready for inferencing.

**Training part**: When the training part happens, the product images will be taken from S3, along with an optional set of extra background images (EPNomad will have a set of background images to start with). First, the data augmentation will drastically increase the amount of images usable for training, by doing a series of transformations on the background and product images, before **and** after merging the two. Then, all the converted images will be processed by YOLO (you only look once) for the training part.

#### Data Models

This is represented by DynamoDB and S3. A *User* can have many projects, and each project can have many products, with each product having multiple files in S3. The files are represented in both DynamoDB (as randomly generated keys of length 24) and in S3 (as the key {{userId}}/{{fileKey}}.png in the "epnomad" bucket.)

```json
User {
  id: String,
    name: String,
    usagePlan: String,
    projects: Array[String] //array of project IDs
}

Project {
  id: String,
    name: String,
    products: Array[String] //array of product IDs
}

Product {
  id: String,
    name: String,
    foreground: Array[String],
    background: Array[String]
}
```

#### How to use the 'revived' branch

When you clone the repo and switch to the 'revived' branch or just download it from GitHub,  you should see 3 folders: `postman`, `api-server`, and `ml-server`. The `postman` folder contains the files to import to Postman, which is a great tool for API testing. Simply open Postman, go to File > Import, then find the 2 JSON files and you should be good to go.

The `api-server` folder has the main files for, well the **API server** (duh). The core of it is an express.js server that'll handle any incoming API requests. It has 'out-of-the-box' CRUD support for projects and products. The train/infer routes have **not** been implemented.

FYI: There are some pretty useful commands for deploying your **API server** to the EC2 instance:
* `npm start` - start the server locally
* `build` - creates a zip file of the code to send to the EC2 instance
* `send-bundle` - sends the zip to the EC2 instance
* `ssh-prepare` - clears the existing server files and unzips the sent zip
* `quick-deploy` - does the above 3 commands in one (note that you still need to install the node modules (npm install) each time you call this command)
* `ssh` - SSH into the instance

The `ml-server` folder isn't as nice, but it's not a complete mess (I hope). There should be 2 folders: `conversion` and `darknet-yolo`. The `conversion` one has the data augmentation part, where it uses GraphicsMagick to do various image transformations. It's mostly finished but it doesn't record the bounding box information for YOLO to process it (like x/y coords, width/height). It also has to convert back to JPEG? (Not sure but most examples on the AlexeyAB/darknet repo show it using JPEG images). It should have a set of product and background images to play with. The `darknet-yolo` folder is, unfortunately the most messiest and unfinished one. Basically it was supposed to handle the training and inferencing part via the aforementioned queue system.

The training part might be the hardest part of this project, mainly since automated training isn't really a thing. You basically have to automate that part, which is semi-ugly. Referring to [this](https://github.com/AlexeyAB/darknet#how-to-train-to-detect-your-custom-objects) link, you'll have to do the following:
1. Dynamically generate the cfg file, based on the number of products to be trained on.
2. Generate a text file for each converted image with a single line referring to where the product is and it's size.
3. When you start the actual training, it will by default run for 45,000 iterations, which is much longer that you or me will live for, so you'll probably need to pipe the console output to a node stream (read [this](https://medium.freecodecamp.org/node-js-streams-everything-you-need-to-know-c9141306be93) article for more about that stuff). A good metric for when to stop training is when the **average loss** stops decreasing. Read [here](https://github.com/AlexeyAB/darknet#when-should-i-stop-training) for more information about this topic. Also, depending on where you set the `backup` folder, you can grab from the previous weights and use that.
4. Once you have the weights, you should let the user know it's ready and save the weights file in S3 as part of associated project.

For the inferencing part, you just have to download the weights file and use darknet as normal (BTW, the `child_process` module is great for calling external programs from node.js).

#### About API Gateway
There's one more thing before you can really start, and it's talking about account management. EPNomad uses AWS Cognito for authentication, and the important you need to worry about is some sort of UUID unique to each user. API Gateway allows you to use API keys to restrict API access. It also lets you associate those keys to usage plans for customizable rate limiting and such. When you have the ID, you should tell API gateway to automatically generate an API key and save the pair to DynamoDB (encrypted if you must). That way, you can use it for resetting compromised keys and such.

FYI: When the API key is used, the API key's ID is used as the "user ID" for accessing the database resources and such. This is different from the UUID obtained from AWS Cognito that you saved with the API key to DynamoDB.

## TODO
* Implement route handling of training and inferencing
  * Calling the `/train` route should add it to a TrainQueue (part of AWS SQS), which the ML-server can read from and process. It should also send the needed data such as file names and such.
  * Calling the `/infer` route can either add to another queue or directly call the ML-server.
* For the data augmentation part, record the metadata of the product coordinates and size for YOLO to process it
* Actually implement the training/inferencing processing
* Link the account management (AWS Cognito) to API Gateway's API key management

## Contact Info
* email: tejashah88@gmail.com
* facebook/github: Tejas Shah (tejashah88)