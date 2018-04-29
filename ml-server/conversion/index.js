'use strict';

/*
 * This is the main file for all the image manipulations and conversions via GraphicsMagick. The products images first go through a
 * preliminary data augmentation pass by applying basic transformations and stripping of the background. Then
 */

const util = require('util');
const fs = require('fs-extra');
const _ = require('lodash');
const colors = require('color-name');
const gm = require('./gm-extended');

let bgRawImagesPath = './images/background/raw/';
let bgConvertedImagesPath = './images/background/converted/';

let prodRawImagesPath = './images/product/raw/';
let prodConvertedImagesPath = './images/product/converted/';

let finalPath = './images/results/';

function defErrorHandler(error, successFunc) {
  if (error) {
    console.log(error);
    process.exit();
  } else {
    if (successFunc)
      successFunc();
  }
}

// helper functions for working with file extensions in strings
let changeExt = (filename, newExt) => filename.split('.')[0] + '.' + newExt;
let fileExt = filename => filename.split('.').slice(1).join('.');

let FLIP_STATE = { NONE: 0, FLIP: 1, FLOP: 2 };

let preProductDefaultOpts = {
  rotation: true,
  size: true,
  flip: false,
  bgColor: 'white'
};

let postOverlayDefaultOpts = {
  brightness: false,
  saturation: false,
  noise: false,
  flip: false
}

let randomBool = () => Math.random() >= 0.5;

async function generateProductImgOptions(rawProductImgs, allowedOps/* = preProductDefOpts*/) {
  allowedOps = _.merge(allowedOps, preProductDefaultOpts);
  let imgFiles = await fs.readdir(rawProductImgs);
  let optsArray = [];

  mainLoop: while (true) {
    for (let img of imgFiles) {
      let options = { productImg: img, bgColor: allowedOps.bgColor };

      // assigns a random rotation between -45 and 45 degrees that's divisible by 5
      if (allowedOps.rotation && randomBool()) {
        options.rotation = _.random(-9, 9) * 5;
      }

      // assigns a resize factor between 0.1 and 1
      if (allowedOps.size && randomBool()) {
        options.size = _.random(10, 100) / 100;
      }

      if (allowedOps.flip) {
        if (randomBool()) options.flip = true;
        if (randomBool()) options.flop = true;
      }

      optsArray.push(options);

      if (optsArray.length >= 100) {
        // first remove any duplicates
        optsArray = _.uniqWith(optsArray, _.isEqual);

        // if no duplicates exist, then the options are ready to be exported
        if (optsArray.length >= 100)
          break mainLoop;
      }
    }
  }

  return _.sortBy(optsArray, ['productImg']);
}

async function generateBackgroundImgOptions(rawBgImgs) {
  let imgFiles = await fs.readdir(rawBgImgs);
  let optsArray = [];

  for (let state = 0; state <= 3; state++) {
    for (let img of imgFiles) {
      let options = { bgImg: img };
      switch (state) {
        case FLIP_STATE.NONE:
          break;

        case FLIP_STATE.FLIP:
          options.flip = true;
          break;

        case FLIP_STATE.FLOP:
          options.flop = true;
          break;

        case FLIP_STATE.FLIP | FLIP_STATE.FLOP:
          options.flip = true;
          options.flop = true;
          break;
      }

      optsArray.push(options);
    }
  }

  return _.sortBy(optsArray, ['bgImg']);
}

function parseColor(color) {
  if (_.isString(color) && !_.isUndefined(colors[color])) {
    return colors[color];
  } else if (_.isArray(color) && color.length === 3) {
    return color;
  } else {
    throw new Error('Invalid color specified!');
  }
}

let parseColorGM = color => `rgb(${parseColor(color).join(',')})`;

/*
 * This function preps the product images before overlay process. All images will undergo a basic background removal based on a
 * optionally specified
 */
async function prepProductImages(allowedOps = preProductDefOpts) {
  let configs = await generateProductImgOptions(prodRawImagesPath, allowedOps)
  for (let cfg of configs) {
    let gmTask = gm(prodRawImagesPath + cfg.productImg)
      .removeBackground(parseColorGM(cfg.bgColor), 20) // 20% fuzzy distance from specified color for removing background
      .toPNG();
    try {
      await gmTask.writeAsync(prodConvertedImagesPath + changeExt(cfg.productImg, 'png'));
      console.log(`Product image ${changeExt(img, 'png')} is ready!`);
    } catch (error) {
      console.log(error)
    }
  }
}

/*
 * This function preps the background images before the overlay process. All images will have an upper bound of 1024 by 1024 to speed up
 * reduce CPU-based image processing operations. Currently, this function doesn't accept any options for more fine-tuned image manipulation
 * due to the post overlay covering the same effects anyways. Instead, a flip/flop lol
 *
 *
 */
async function prepBackgroundImages() {
  let bgRawImages = await fs.readdir(bgRawImagesPath);
  for (let img of bgRawImages) {
    let gmTaskOriginal = gm(bgRawImagesPath + img)
      .maxDimensions(1024, 1024)
      .toPNG();
    try {
      await gmTaskOriginal.writeAsync(bgConvertedImagesPath + changeExt(img, 'png'));
      console.log(`Background image ${changeExt(img, 'png')} is ready!`);
    } catch (error) {
      console.log(error)
    }
  }
}

async function overlayImages(options = postOverlayDefOpts) {
  // start overlaying process
  let bgConvImages = await fs.readdir(bgConvertedImagesPath);
  let prodConvImages = await fs.readdir(prodConvertedImagesPath);
  //bgConvImages = [bgConvImages[0]]
  for (let bgImg of bgConvImages) {
    for (let prodImg of prodConvImages) {
      let outFilePath = finalPath + `${parseInt(process.uptime()*1000)}.png`;
      gm(bgConvertedImagesPath + bgImg)
        .composite(prodConvertedImagesPath + prodImg)

        .write(
          outFilePath,
          error => defErrorHandler(error, () => console.log(/*`Final image ${i++}.png is ready!`*/outFilePath))
        )
    }
  }
}

/*
 * all possible operations: rotation, size, noise, brightness, saturation, flip/flop
 *
 * product:
 *   rotation: max from (0-359)
 *   size: min size to size of background (respecting aspect ratio)
 *   flip/flop: true or false
 *   bgColor: number[3]
 * overlay:
 *   brightness: max %
 *   saturation: max %
 *   noise: [uniform, gaussian, multiplicative, impulse, laplacian, poisson] or radius (number)
 *   flip/flop: true or false
 */


async function convert() {
  /*let options = {
    pre_products: {
      rotation: boolean,
      size: boolean,
      flip: boolean
    },
    post_overlay: {
      brightness: boolean,
      saturation: boolean,
      noise: boolean,
      flip: boolean
    }
  };

  let options = {
    rotation: boolean,
    size: boolean,
    noise: boolean,
    brightness: boolean,
    saturation: boolean,
    flip: boolean
  }*/
  //await prepBackgroundImages();
  //await prepProductImages();
  //await overlayImages();
}

(async function() {
  try {
    /*console.log(
      await generateProductImgOptions(
        prodRawImagesPath,
        {
          rotation: true,
          size: true,
          flip: true,
        }
      )
    )*/

    console.log(
      (await generateBackgroundImgOptions(
        bgRawImagesPath
      )).length
    )
    //await generateBackgroundImgOptions(bgRawImagesPath);
    //await generateProductImgOptions(prodRawImagesPath);

    //await prepProductImages(preProductDefaultOpts);
    //await prepBackgroundImages();
    await overlayImages(postOverlayDefaultOpts);
  } catch (error) {
    console.log("fudge");
    console.log(error);
  }
})();
