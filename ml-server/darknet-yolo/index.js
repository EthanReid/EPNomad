#!/usr/bin/env node
const aws = require('aws-sdk');
aws.config.loadFromPath('./aws-config.json');
const s3 = new aws.S3();
const fs = require('fs-extra');
const gm = require('graphicksmajick');
const express = require('express');
const aa = require('express-async-await')
const app = aa(express());

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error: " + err.message });
})

app.post('/train', async function(req, res) {
  ;
})

async function train(num_objs) {
  config = config.replace('num_classes', num_objs);
  config = config.replace('num_filters', (num_objs + 5) * 5);
  console.log(config);
  await fs.outputFile('yolo-config.cfg', config);
  //shell.cd('..');
  //shell.rm('-rf', 'darknet');
}

(async function() {
  try {
    await train(2);
  } catch (error) {
    console.log(error);
  }
})();