'use strict'

const fs = require('fs');
const path = require('path');
const validateWebpackConfig = require('webpack-validator')
const program = require('commander');
let configFile;

program
  .version('0.0.1')
  .arguments('[configFileName]')
  .action(function (configFileName) {
    configFile = configFileName
  });

program.parse(process.argv);

if (configFile) {
  const fileExtension = path.extname(configFile)
  if (! fileExtension) {
    configFile = configFile + '.js'
  }
}

const fileToRead = configFile || 'webpack.config.js'
console.log('Reading: ' + fileToRead)

try {
  const data = fs.readFileSync(path.join(process.cwd(), fileToRead));
  validateWebpackConfig(data.toString());
} catch(e) {
  if (e.code === 'ENOENT') {
    console.log('File not found!');
  }
}
