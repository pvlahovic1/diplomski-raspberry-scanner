const BeaconScanner = require("node-beacon-scanner");

var beaconScanner = new BeaconScanner();

beaconScanner.onadvertisement = (advertisement) => {
	if (advertisement["beaconType"] === 'iBeacon') {
		var beacon = advertisement["iBeacon"];
		beacon.rssi = advertisement["rssi"];
		console.log(JSON.stringify(beacon, null, " "));
	}
};

beaconScanner.startScan().then(() => {
    console.log("Scanning for BLE devices...")  ;
}).catch((error) => {
    console.error(error);
});