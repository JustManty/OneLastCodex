const Colors = require('colors/safe');
const FS = require('fs');
const Config = require('./../config/GlobalConfig.js')

let stream = FS.createWriteStream(`logs\\onelastcodex-log.${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDay()}.txt`, {flags: 'a'});

const logger = {
  debug: (message) => {
    if (Config.Logging_Debug) {
      let logMessage = new Date().toLocaleString() + '        Debug:    ' + message;
      console.log(Colors.italic.gray(logMessage));
      stream.write(logMessage + '\n');
    }
  },
  info: (message) => {
    let logMessage = new Date().toLocaleString() + '        Info:     ' + message;
    console.log(Colors.white(logMessage));
    stream.write(logMessage + ' \n');
  },
  warning: (message) => {
    let logMessage = new Date().toLocaleString() + '        Warning:  ' + message;
    console.log(Colors.yellow(logMessage));
    stream.write(logMessage + '\n');
  },
  error: (message) => {
    let logMessage = new Date().toLocaleString() + '        Error:    ' + message;
    console.log(Colors.bold.red(logMessage));
    stream.write(logMessage + '\n');
  },
  database: (message) => {
    if(Config.Logging_Database) {
      let logMessage = new Date().toLocaleString() + '        Database: ' + message;
      console.log(Colors.italic.grey(logMessage));
      stream.write(logMessage + '\n');
    }
  },
};

module.exports = logger;
