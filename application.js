const BeaconScanner = require("node-beacon-scanner");
const configuration = require("./conf.json");
const logger = require('./logger');
const sender = require('./sender');

if (!configuration.listenerAddress) {
	console.log("Property listenerAddress is not set!");
} else if (!configuration.listenerPort) {
	console.log("Property listenerPort is not set!");
} else if (!configuration.listenerPath) {
	console.log("Property listenerPath is not set!");
} else {
	logger.log(">> Starting scanner application <<");

	var beaconScanner = new BeaconScanner();

	beaconScanner.onadvertisement = (advertisement) => {
		if (advertisement["beaconType"] === 'iBeacon') {
			var beacon = advertisement["iBeacon"];
			beacon.records = [{ "rssi":advertisement["rssi"], "txPower": beacon.txPower}];
			delete beacon.txPower;

			var adress = configuration.listenerAddress + ":" + configuration.listenerPort + configuration.listenerPath;
			sender.saveBeaconData(adress, JSON.stringify(beacon));
		}
	};

	beaconScanner.startScan().then(() => {
		logger.log("Scanning for BLE devices...");
	}).catch((error) => {
		logger.error(error);
	});
}