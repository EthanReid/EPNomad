const { Router } = require('express');
const jsonParser = require('body-parser').json();
const { DynamoDB, S3 } = require('aws-sdk');

//AWS.config.loadFromPath('./config.json');
process.env.AWS_ACCESS_KEY_ID = '';
process.env.AWS_SECRET_ACCESS_KEY = '';
process.env.AWS_DEFAULT_REGION = 'us-east-1';
process.env.AWS_DEFAULT_OUTPUT = 'json';
process.env.SQS_DEFAULT_QUEUE = 'https://sqs.us-east-1.amazonaws.com/505123304107/TrainQueue.fifo';

// create a new express router
let router = Router();

// load custom classes
const HandledError = require('./handled-error');
const { User, Project, Product } = require('./database-models');
const { fileExt, flattenArray, rndString } = require('./utils');
const S3Manager = require('./s3-manager');
const uploadMiddleware = require('./s3-streamer-middleware');
const SQSProducer = require('./sqs-producer');

let s3Manager = new S3Manager();
let sqsManager = new SQSProducer();
// this is a test
//AWS.config.loadFromPath('./config.json');
let docClient = new DynamoDB.DocumentClient();
let s3 = new S3();

let fileKeyMapper = file => `epnomad/${userId}/${projectId}/${file}.png`;

// if the given value is falsey, throw a handled error, else, return it
function truthyFilter(value, errorMsg, errorCode) {
  if (!value)
    throw new HandledError(errorMsg, errorCode);
  else
    return value;
}

// since router.param doesn't do async error handling nicely (as of 3/17/2018),
// we use a wrapper function to do it for us
function processParamFn(fn) {
  return async function(req, res, next, param) {
    try {
      return await fn(req, res, next, param);
    } catch (error) {
      return next(error);
    }
  }
}

// used for verifying the user ID and caching the user info and projects
// despite the monkey patching, this function (router.param) still relies on next(error)
router.use(async function (req, res, next) {
  req.cache = {};

  // verify the user id
  let userId = truthyFilter(req.header('x-api-key-id'), "The 'x-api-key-id' header is not specified or invalid.");
  let userInfo = truthyFilter(await User.get({ id: userId }), "Unable to find the specified user!", 404);

  // the user id is good, cache the user info
  req.cache.user = userInfo;

  // retrieve the projects and cache it
  let projectIds = userInfo.projects || [];
  if (projectIds.length > 0) {
    let projectKeys = projectIds.map(id => ({ id }));
    let projects = await Project.batchGet(projectKeys);
    req.cache.projectList = projects;
  } else
    req.cache.projectList = [];

  return next();
});

// retrieves the list of projects
router.get('/projects', jsonParser, async function(req, res) {
  return res.status(200).json(req.cache.projectList.map(({id, name}) => ({id, name})));
});

// creates a new project
router.post('/projects', jsonParser, async function(req, res) {
  // we'll need the user's id and project list to update the User table
  let userId = req.cache.user.id;
  let projects = req.cache.projectList;
  let projectIds = projects.map(project => project.id);
  let projectNames = projects.map(project => project.name);

  // validation stage
  let projectName = truthyFilter(req.body.name, "You must specify a project name.");

  // we don't want 2+ projects with the same name
  if (projectNames.includes(projectName))
    throw new HandledError("Another project with the same name is already created.");

  // modification stage
  let projectId = rndString(16);
  projectIds.push(projectId);

  // first insert the project id into the user info
  await User.update({
    id: userId,
    projects: projectIds
  });

  // then add the project to the Project table
  await Project.create({
    id: projectId,
    name: projectName,
    products: []
  }, { allowEmptyArray: true });

  // send the final results
  return res.status(201).json({ id: projectId });
});

// used for verifying the project id and caching the project info and products list
// despite the monkey patching, this function (router.param) still relies on next(error)
router.param('projectId', processParamFn(
  async function processProjectId(req, res, next, projectId) {
    let projectIds = req.cache.projectList.map(project => project.id);

    // verify the project id
    let projectInfo = truthyFilter(await Project.get({ id: projectId }), "Unable to find the specified project!", 404);

    // check that the project is actually part of the user
    if (!projectIds.includes(projectId))
      throw new HandledError("The requested project is not associated with the current user.");

    // the project id is good, cache the project info
    req.cache.project = projectInfo;

    // retrieve the products and cache it
    let productIds = projectInfo.products || [];
    if (productIds.length > 0) {
      let productKeys = productIds.map(id => ({ id }));
      let products = await Product.batchGet(productKeys);
      req.cache.productList = products;
    } else
      req.cache.productList = [];

    return next();
  }
));

// retrieves info of a specific project
router.get('/projects/:projectId', jsonParser, async function(req, res) {
  return res.status(200).json(req.cache.project);
});

// renames a project
router.patch('/projects/:projectId/rename', jsonParser, async function(req, res) {
  let { projectId } = req.params;
  let projectNames = req.cache.projectList.map(project => project.name);
  let { project } = req.cache;

  // validation stage

  // the 'name' parameter is required
  let newProjectName = truthyFilter(req.body.name, "A new, valid project name has to be specified.");

  // just return a 204, as if it there was a change
  if (project.name === newProjectName)
    return res.status(204).send();

  // we don't want 2+ projects with the same name
  if (projectNames.includes(newProjectName))
    throw new HandledError("The new name is already used by one of your projects.");

  // modification stage
  await Project.update({
    id: projectId,
    name: newProjectName
  });

  // send the final results
  return res.status(204).send();
});

// deletes an existing project and it's attached resourses
router.delete('/projects/:projectId', jsonParser, async function(req, res) {
  let { projectId } = req.params;
  let projectIds = req.cache.projectList.map(project => project.id);
  let userId = req.cache.user.id;
  let { productList } = req.cache;

  // modification stage
  projectIds = projectIds.filter(id => id != projectId);

  // first delete the project from the user info
  await User.update({
    id: userId,
    projects: projectIds
  });

  // then delete the project from the Project table (we cached the products list already)
  await Project.delete({ id: projectId });

  // only try to delete product data if there's any
  if (productList.length > 0) {
    // delete all the products associated with the product
    let productIdObjects = productList.map(({ id }) => ({ id }));
    await Products.batchDelete(productIdObjects);

    // delete the files associated with each product
    let files2d = productList.map(({ foreground, background }) => [...foreground, ...background])
    let files = flattenArray(files2d);

    // only try to delete them if they exist
    if (files.length > 0) {
      let fileKeyArray = files.map(fileKeyMapper);
      await s3Manager.deleteFiles(fileKeyArray);
    }
  }

  // send the final results
  return res.status(204).send();
});

// product-based routes
router.get('/projects/:projectId/products', jsonParser, async function(req, res) {
  return res.status(200).json(req.cache.productList.map(({id, name}) => ({id, name})));
});

router.post('/projects/:projectId/products', jsonParser, async function(req, res) {
  let { projectId } = req.params;

  let products = req.cache.productList;
  let productIds = products.map(({ id }) => id);
  let productNames = products.map(({ name }) => name);

  // validation stage
  let productName = truthyFilter(req.body.name, "You must specify a product name.");

  // we don't want 2+ products with the same name
  if (productNames.includes(productName))
    throw new HandledError("Another product with the same name is already created.");

  // modification stage
  let productId = rndString(16);
  productIds.push(productId);

  // first, update the project with the new product ID
  await Project.update({ id: projectId, products: productIds });

  await Product.create({
    id: productId,
    name: productName,
    foreground: [],
    background: []
  }, { allowEmptyArray: true });

  return res.status(201).json({ id: productId });
});

router.param('productId', processParamFn(
  async function processProductId(req, res, next, productId) {
    let productIds = req.cache.productList.map(product => product.id);

    // verify the project id
    let productInfo = truthyFilter(await Product.get({ id: productId }), "Unable to find the specified product!", 404);
    productInfo.foreground = productInfo.foreground || [];
    productInfo.background = productInfo.background || [];

    // check that the product is actually part of the user
    if (!productIds.includes(productId))
      throw new HandledError("The requested product is not associated with the current user.");

    // the product id is good, cache the product info
    req.cache.product = productInfo;

    return next();
  }
));

router.get('/projects/:projectId/products/:productId', jsonParser, async function(req, res) {
  return res.status(200).json(req.cache.product);
});

router.patch('/projects/:projectId/products/:productId/rename', jsonParser, async function(req, res) {
  let { productId } = req.params;
  let { product } = req.cache;
  let productNames = req.cache.productList.map(({ name }) => name);

  // validation stage

  // the 'name' parameter is required
  let newProductName = truthyFilter(req.body.name, "A new, valid product name has to be specified.");

  // just return a 204, as if it there was a change
  if (product.name === newProductName)
    return res.status(204).send();

  // we don't want 2+ products with the same name
  if (productNames.includes(newProductName))
    throw new HandledError("The new name is already used by one of your projects.");

  // modification stage
  await Product.update({
    id: productId,
    name: newProductName
  });

  // send the final results
  return res.status(204).send();
});

router.delete('/projects/:projectId/products/:productId', jsonParser, async function(req, res) {
  let { productId } = req.params;
  let productIds = req.cache.projectList.map(({ id }) => id);
  let { product } = req.cache;
  let userId = req.cache.user.id;

  // modification stage
  productIds = productIds.filter(id => id != productId);

  // first delete the product from the user info
  await Project.update({
    id: userId,
    products: productIds
  });

  // then delete the product from the Product table (we cached the product's file names already)
  await Product.delete({ id: productId });

  // delete the files associated with each product
  let files = [...product.foreground, ...product.background];

  // only try to delete them if they exist
  if (files.length > 0) {
    let fileKeyArray = files.map(fileKeyMapper);
    await s3Manager.deleteFiles(fileKeyArray);
  }

  // send the final results
  return res.status(204).send();
});

router.post('/projects/:projectId/products/:productId/files', uploadMiddleware, async function(req, res) {
  // first, delete the existing files first, if they exist
  let { product } = req.cache;
  let userId = req.cache.user.id;
  let { projectId } = req.params;

  // retrieval stage
  let files = [...product.foreground, ...product.background];

  // only try to delete them if they exist
  if (files.length > 0) {
    let fileKeyArray = files.map(fileKeyMapper);
    await s3Manager.deleteFiles(fileKeyArray);
  }

  // then add the new ones
  let { foreground, background } = req.cache.uploadedFiles;
  let { productId } = req.params;

  // modification stage
  await Product.update({
    id: productId,
    foreground,
    background
  });

  return res.status(204).send();
});

router.delete('/projects/:projectId/products/:productId/files', jsonParser, async function(req, res) {
  let { product } = req.cache;
  let userId = req.cache.user.id;

  // retrieval stage
  let files = [...product.foreground, ...product.background];

  if (files.length > 0) {
    let fileKeyArray = files.map(fileKeyMapper);
    await s3Manager.deleteFiles(fileKeyArray);
  }

  // modification stage
  await Product.update({
    id: productId,
    foreground: [],
    background: []
  });

  return res.status(204).send();
});

// ML stuff
router.post('/projects/:projectId/train', jsonParser, async function(req, res) {
  await sqsManager.sendMsg(projectId.req.params);
});

router.post('/projects/:projectId/train/status', jsonParser, async function(req, res) {
  ;
});

router.post('/projects/:projectId/infer', jsonParser, async function(req, res) {
  // TODO: implement inferencing
});

module.exports = router;