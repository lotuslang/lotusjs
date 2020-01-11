// Modules require statements
const fs = require("fs"); // Lib to use a file system, e.g. to read and write files.
const { promisify } = require("util"); // Lib to transform callbacks into Promise object.

const { Precedence } = require("./precedence");

// Internal require statements

const throwHelper = require("./throwhelpers"); // Throw helpers
const lotus = require("./lotus"); // Global module to work with lotus' syntax

// Module to transform a stream of characters into a stream of tokens using different algorithms
const Tokenizer = lotus.tokenizer;


let readFileAsync = promisify(fs.readFile);

// checks if the file supplied exist. If not, print a message
if (!fs.existsSync(process.argv[2])) {

	console.log("File " + process.argv[2] + " not found.\n")

	// prints help and exits with code 1
	console.log("Usage :");
	console.log("\tnpm start [filename]");
	console.log("\tnode src/app.js [filename]");
	console.log("Example : npm start tests/general/input-1.lot")
	console.log("For now, Lotus only supports supplying a file.");
	console.log("(I mean, what did you except ? We don't really have time for arguments parsing rn)");
	process.exit(1);
}

// Reads the file
readFileAsync(process.argv[2])
	.then(async file => {
		// Debug, can be removed
		console.log("Tokenizing file @ " + process.argv[2]);

		// Tokenizes the string and stores the result in `tokens`
		let tokenizer = new Tokenizer(file.toString());

		console.log("consuming #1 : " + JSON.stringify(tokenizer.consume()));

		console.log("next 3 tokens : " + JSON.stringify(tokenizer.peek(3)));

		console.log("consuming #2 : " + JSON.stringify(tokenizer.consume()));
		console.log("consuming #3 : " + JSON.stringify(tokenizer.consume()));
		console.log("consuming #4 : " + JSON.stringify(tokenizer.consume()));
	})
	.catch (err => {
		console.log(err);
		return;
		//throw err; // throw a fatal unknown error
	});