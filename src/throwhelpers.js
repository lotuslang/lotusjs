function throwWarn(type, message) {
    console.log("WARN : " + type + " : " + message);
}

function throwFatal(type, message) {
    throw "ERROR : " + type + " : " + message;
}

function printHelp() {
    console.log("help please.");
}

exports.throwWarn = throwWarn;
exports.throwFatal = throwFatal;
exports.printHelp = printHelp;