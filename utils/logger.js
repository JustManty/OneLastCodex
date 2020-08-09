const colors = require('colors/safe');
const dotenv = require('dotenv');
const fs = require('fs');

var stream = fs.createWriteStream('onelastcodex-log.txt', { flags: 'a' });

var logger = {

  debug: (debug) => {
    if (process.env.DEBUG === 'True') {
      logMessage = new Date().toLocaleString() + '        Debug:    ' + debug;
      console.log(colors.italic.gray(logMessage));
      stream.write(logMessage + '\n');
    }
  },
  info: (info) => {
    logMessage = new Date().toLocaleString() + '        Info:     ' + info;
    console.log(colors.gray(logMessage));
    stream.write(logMessage + ' \n');
  },
  warning: (warning) => {
    logMessage = new Date().toLocaleString() + '        Warning:  ' + warning;
    console.log(colors.yellow(logMessage));
    stream.write(logMessage + '\n');
  },
  error: (error) => {
    logMessage = new Date().toLocaleString() + '        Error:    ' + error;
    console.log(colors.bold.red(logMessage));
    stream.write(logMessage + '\n');
  },
};

module.exports = logger;
