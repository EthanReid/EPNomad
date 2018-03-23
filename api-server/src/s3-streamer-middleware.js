const multer  = require('multer');
const multerS3 = require('multer-s3-transform');
const sharp = require('sharp');
const { S3 } = require('aws-sdk');

const { rndString } = require('./utils');
const HandledError = require('./handled-error');

let s3 = new S3();

const MAX_FG_IMAGES = 50;
const MAX_BG_IMAGES = 25;

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

// middleware for handling photo uploads via S3
let uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'epnomad',
    shouldTransform: true,
    transforms: [
      {
        id: 'final',
        key: function (req, file, cb) {
          let { userId } = req.cache;
          let fileExtension = fileExt(file.originalname);
          let imageKey = rndString(24);

          if (!req.cache.uploadedFiles)
            req.cache.uploadedFiles = { foreground: [], background: [], all: [] };

          req.cache.uploadedFiles[file.fieldname].push(imageKey);
          req.cache.uploadedFiles.all.push(imageKey);
          let key = `${userId}/${imageKey}.png`;
          cb(null, key);
        },
        transform: function (req, file, cb) {
          cb(null, sharp().resize(MAX_WIDTH, MAX_HEIGHT).max().withoutEnlargement(true).toFormat('png'))
        }
      }
    ]
  })
});

let uploadMiddleware = [
  uploadS3.fields([
    { name: 'foreground', maxCount: MAX_FG_IMAGES },
    { name: 'background', maxCount: MAX_BG_IMAGES }
  ]),
  async function (error, req, res, next) {
    if (error.code && error.code === 'LIMIT_UNEXPECTED_FILE') {
      if (error.field)
        throw new HandledError(`Too many files expected for the ${error.field} field! Maximum limit is ${error.field === 'foreground' ? MAX_FG_IMAGES : MAX_BG_IMAGES} images.`);
      else
        throw new HandledError(`Too many files expected! Maximum limit is ${MAX_FG_IMAGES} foreground images and ${MAX_BG_IMAGES} background images.`);
    } else
      return next(error)
  }
];

module.exports = uploadMiddleware;