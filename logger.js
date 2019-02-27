const fs = require("fs");
const dateFormat = require('dateformat');
const util = require('util');
const config = require('./conf.json');

const logFile = config.logging.logFile || 'scanner-log.log';
const dateTimeFormat = config.logging.format || 'DD.MM.YYYY HH:mm:ss';


function log(message) {
    let date = new Date();
    var toLog = "[" + dateFormat(date, dateTimeFormat) + "]: " + message;

    fs.appendFile(logFile, util.format(toLog) + '\n', function (err) {
        if (err) {
            console.log(err);
        }
    });
}

module.exports.log = log;