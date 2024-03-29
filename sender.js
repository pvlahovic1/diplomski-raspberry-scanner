const request = require('request');
const logger = require('./logger');

function saveBeaconData(address, data) {
    logger.log("Sending post request to: " + address + " data: " + data);

    request({
        method: "POST",
        url: address,
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }, (error, response, body) => {
        if (error) {
            logger.log(error);
        }
    });
}

module.exports.saveBeaconData = saveBeaconData;