const Colors = require('colors/safe');
const FS = require('fs');
const Config = require('./../config/GlobalConfig.js')

const stream = FS.createWriteStream('onelastcodex-log.txt', {flags: 'a'});

const logger = {

  debug: (debug) => {
    if (Config.Logging_Debug) {
      let logMessage = new Date().toLocaleString() + '        Debug:    ' + debug;
      console.log(Colors.italic.gray(logMessage));
      stream.write(logMessage + '\n');
    }
  },
  info: (info) => {
    let logMessage = new Date().toLocaleString() + '        Info:     ' + info;
    console.log(Colors.white(logMessage));
    stream.write(logMessage + ' \n');
  },
  warning: (warning) => {
    let logMessage = new Date().toLocaleString() + '        Warning:  ' + warning;
    console.log(Colors.yellow(logMessage));
    stream.write(logMessage + '\n');
  },
  error: (error) => {
    let logMessage = new Date().toLocaleString() + '        Error:    ' + error;
    console.log(Colors.bold.red(logMessage));
    stream.write(logMessage + '\n');
  },
};

module.exports = logger;
