let fileExt = filename => filename.split('.').slice(1).join('.');
let flattenArray = array2d => [].concat(...array2d);
let rndString = require('randomstring').generate;

module.exports = { fileExt, flattenArray, rndString };