const BeaconScanner = require("node-beacon-scanner");
const configuration = require("./conf.json");
const logger = require('./logger');
const httpSender = require('./sender');

if (!configuration.listenerAddress) {
	console.log("Property listenerAddress is not set!");
} else if (!configuration.listenerPort) {
	console.log("Property listenerPort is not set!");
} else if (!configuration.listenerPath) {
	console.log("Property listenerPath is not set!");
} else {
	logger.log(">> Starting scanner application <<");

	var beaconScanner = new BeaconScanner();

	beaconScanner.onadvertisement = (bleData) => {
		if (bleData["beaconType"] === 'iBeacon') {
			var beacon = bleData["iBeacon"];
			beacon.records = [{"rssi" : bleData["rssi"], "txPower": beacon.txPower}];
			delete beacon.txPower;

			var address = configuration.listenerAddress + ":" + configuration.listenerPort + configuration.listenerPath;
			httpSender.saveBeaconData(address, JSON.stringify(beacon));
		}
	};

	beaconScanner.startScan().then(() => {
		logger.log("Scanning for iBeacon devices");
	}).catch((error) => {
		logger.error(error);
	});
}