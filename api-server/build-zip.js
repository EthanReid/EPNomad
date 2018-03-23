'use strict';

const fs = require('fs-extra');
const archiver = require('archiver');
const zipLocation = './bundle.zip';

function zip(outputFile) {
  return new Promise((resolve, reject) => {
    let pckgStream = fs.createWriteStream(outputFile);
    pckgStream.on('close', resolve);
    let archive = archiver('zip');
    archive.pipe(pckgStream);

    archive.glob('*.js');
    archive.glob('*.json');
    archive.glob('src/*.js');

    archive.on('error', reject);
    archive.finalize();
  });
}

// command functions

async function clean(outputFile) {
  if (await fs.pathExists(outputFile))
    await fs.remove(outputFile);
}

(async () => {
  try {
    await clean(zipLocation);
    await zip(zipLocation);
  } catch (err) {
    console.error(err);
    await clean(zipLocation);
    process.exit(1)
  }
})();