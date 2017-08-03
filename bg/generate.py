import os
from pymongo import MongoClient
client = MongoClient()
db = client.scrape
datas = db.datas

'''`./a.out <input image> <output dest>`
`python switch.py <input image> <background image> <output dest>`
./lighting.out <background image> <output dest> <alpha> <beta>
'''


'''
directory structure

			/0.jpg
         /0 /1.jpg
         	/2.jpg
			/0.jpg
images   /1 /1.jpg
            /2.jpg
            /0.jpg
         /2 /1.jpg
            /2.jpg
'''

# heres where the algorithm/fun begins

backgrounds = os.listdir("backgrounds")
backgrounds = filter(lambda a: a != ".keep", backgrounds) # ignore the keep file
cursor = datas.find({})
for document in cursor:
	i = 0 # count of how many images generated in a specific array of images
	os.makedirs("./generated/" + str(document["product_id"]))
	for image in document["images"]:
		os.system("./a.out " + image + " " + "./out/dst.png") # execute cpp
		for background in backgrounds: # generate a bunch of images based on how many backgrounds you have
			os.system("python switch.py ./out/dst.png ./backgrounds/" + background + " generated/" + str(document["product_id"]) + "/" + str(i) + ".png")
			j=i
			i+=1
			alpha = [0.25, 0.5, 0.75, 1.25, 2.0]
			beta = [0, 0, 0, 25, 25]
			for n in xrange(len(alpha)):
				os.system("./lighting.out generated/" + str(document["product_id"]) + "/" + str(j) + ".png generated/" + str(document["product_id"]) + "/" + str(i) + " " + str(alpha[n]) + " " + str(beta[n]))
				i+=1
	print "Generated " + str(i) + " images for product " + str(document["product_id"])