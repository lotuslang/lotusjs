function throwWarn(type, message) {
	console.log("WARN : " + type + " : " + message);
}

function throwFatal(type, message) {
	throw "ERROR : " + type + " : " + message;
}

function printHelp() {
	console.log("help please. (coming soon)"); // TODO: Write an actual help message
}

// TODO: Write the rest of the error functions

exports.throwWarn = throwWarn;
exports.throwFatal = throwFatal;
exports.printHelp = printHelp;