// Modules require statements
const chalk = require("chalk"); // Lib for coloring the text into console FOR DEBUG.
const fs = require("fs"); // Lib to use a file system, e.g. to read and write files.
const { promisify } = require("util"); // Lib to transform callbacks into Promise object.

// Internal require statements

//const throwHelper = require("./throwhelpers"); // Throw helpers

//const lotusSyntax = require("./lotus"); // Global module to work with lotus' syntax

// Module to transform a stream of characters into a stream of tokens using different algorithms
//const tokenizer = lotusSyntax.tokenizer;

let readFileAsync = promisify(fs.readFile);

// var used to check if a switch needs an additional value or not
let switches =
{
	"file": true,
	"i": true,
	"output": true,
	"o": true,
	"help": false
};

// parses arguments given to the program
function parseArgs() {

	// if no arguments were given
	if (process.argv.length == 2) {
		return { }; // return an empty dictionary
	}

	let output = { "preservedSwitches": [] }; // preserved switches are switches that don't require arguments

	// arguments given, except the `node` and the file name at the start (i.e. ['usr/bin/node', 'src/index.js'])
	let pargs = process.argv.slice(2); 

	let currentSwitchName = ""; // var used to store the name of the current switch, if any. It is cleared

	for (let i = 0; i < pargs.length; i++) {

		// If this arg is a switch (i.e. starts with an '-', like -h or --file)
		if (pargs[i].charAt(0) == "-") {

			// if a switch is currently waiting a value
			if (currentSwitchName != "") {

				// throw an argument exception
				throwHelper.throw("Exception", "Previous switch " + currentSwitchName + "requires a value, but it wasn't found");
			}

			var name = pargs[i].substring(1); // name of the switch

			// If this switch is not a shortcut switch (e.g. -h instead of --help)
			if (pargs[i].charAt(1) == "-") {

				name = pargs[i].substring(2); // cuts the too dash right before (e.g. "--anim" becomes "anim")
			}

			// If this switch requires an argument
            if (switches[name]) {
				// cut the first character to get the switch's name and set it as current awiting switch
            	currentSwitchName = name;
                continue;
			}
			
            // Otherwise assign the switch's name to an index;
            output["preservedSwitches"].push(name);
            continue;
		}

		// Otherwise, if the current arg is part of a non-preserved switch
		if (currentSwitchName != "") {
			output[currentSwitchName] = pargs[i]; // sets the switch's value to pargs[i]
			currentSwitchName = "";
			continue;
		}

		// Otherwise, assign it to an index
		output[Object.keys(output).length - 1] = pargs[i];

	}

	// if a switch is currently waiting a value
	if (currentSwitchName != "") {

		// throw an argument exception
		throwHelper.throw("Exception", "Previous switch " + currentSwitchName + "requires a value, but it wasn't found");
	}

	return output; // return the output dictionary
}

args = parseArgs();

// Debug, can be removed
Object.keys(args).forEach(key => console.log("INFO : Switch '" + key + "' has value '" + args[key] + "'"));

// Verifies that `file` and `i` both have a value
if (args["file"]) {
	args["i"] = args["file"];
} 
else if (args["i"]) {
	args["file"] = args["i"];
} else {
	throwHelper.printHelp(); // if no `file` or `i` switch was used, print help
}

// Reads the file
readFileAsync(args["i"])
	.then(async file => {
		// Debug, can be removed
		console.log("Tokenizing file @ " + args["i"]);

		// Tokenizes the string and stores the result in `tokens`
		let tokens = tokenizer.Tokenize(file.toString());
	})
	.catch (err => {
		throwHelper.throwFatal(err); // throw a fatal unknown error
	});