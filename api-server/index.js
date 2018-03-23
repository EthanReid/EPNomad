// The Auth/DB server handles the backend operations of EPNomad, which consist of creating/deleting users, CRUDing with projects
// and products, and uploading/deleting files for training the models. Note that the actual training isn't performed on this server.
// Rather, a separate server configured with YOLO (CUDA-enabled) handles that actual processing.

// configure env variables
process.env.AWS_ACCESS_KEY_ID = '';
process.env.AWS_SECRET_ACCESS_KEY = '';
process.env.AWS_DEFAULT_REGION = 'us-east-1';
process.env.AWS_DEFAULT_OUTPUT = 'json';

const express = require('express');

// this module allows error handling with async functions to work as expected, by simply throwing the error
require('express-async-errors');

// load express routers
//const authRouter = require('./src/auth-router');
const apiRouter = require('./src/api-router');

// load custom error classes, useful for handling expected error situations
const HandledError = require('./src/handled-error');

// the EC2 instance should have all requests heading port 80 forwarded to port 8000
const PORT = parseInt(process.argv[2]) || 8000;

// express does a few optimizations when this environmental variable is set, plus it's good practice to do so
// if any production-specific optimizations are applicable
if (process.env.NODE_ENV !== 'production')
  console.warn('Warning: NODE_ENV should be set to "production"!');

let app = express();

// logs all requests with a timestamp
app.use(function (req, res, next) {
  let timestamp = new Date().toISOString().replace(/[TZ]/, ' ');
  console.log(`${timestamp}: ${req.method} ${req.url}`);
  return next();
});

// load API functions
app.use('/api', apiRouter);

// process all errors
app.use(function (error, req, res, next) {
  if (error instanceof HandledError) {
    // this error was intentionally thrown
    res.status(error.status).json({ error: error.message });
  } else {
    // an internal unhandled error has occurred
    console.log(error);
    res.status(500).send('An internal server error has occurred! Please try again later.');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`));