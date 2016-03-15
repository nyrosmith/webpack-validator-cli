'use strict'

const fs = require('fs');
const path = require('path');
const validateWebpackConfig = require('./webpack-validator')
const program = require('commander');
const chalk = require('chalk');
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
const config = require(path.join(process.cwd(), fileToRead))
//console.log(config);
const result = validateWebpackConfig(config);
const problemCount = result.warnings + result.errors;

if (problemCount) {
  console.log(chalk.red(`${problemCount} problems for "${fileToRead}": (${result.errors} errors, ${result.warnings} warnings)`))
} else {
  console.log(chalk.green(`Validation for ${fileToRead} didnot find any problems :-)`));
}
// try {
//   const config = require(path.join(process.cwd(), fileToRead))
//   //const data = fs.readFileSync(path.join(process.cwd(), fileToRead));
//   validateWebpackConfig(data.toString());
//     console.log(config);

// } catch(e) {
//   if (e.code === 'ENOENT') {
//     console.log('File not found!');
//     console.log(e);
//   }
// }
