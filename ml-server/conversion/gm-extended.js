const gm = require('gm');

// extending gm with the functionality required for the conversion piece
gm.prototype.removeBackground = function(color, fuzzyPercent) {
  return this.fuzz(fuzzyPercent, true).transparent(color);
}

gm.prototype.toPNG = function() {
  return this.setFormat('png');
}

// This reduces the max width or height to 1024 pixels if either of those properties are bigger than 1024.
// It will respect aspect ratio if the resizing operation does occur.
// More documentation: http://www.graphicsmagick.org/GraphicsMagick.html#details-geometry
gm.prototype.maxDimensions = function(width, height) {
  return this.geometry(`${width}x${height}>`);
}

gm.prototype.translate = function(x, y) {
  return this.geometry(`+${x}+${y}`);
}

gm.prototype.overlay = gm.prototype.composite;

gm.prototype.writeAsync = function(filename) {
  let self = this;
  return new Promise((resolve, reject) => {
    self.write(filename, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    })
  })
}

module.exports = gm;