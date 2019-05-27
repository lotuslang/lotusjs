const chalk = require("chalk"); // Lib for coloring the text into console FOR DEBUG.
const fs = require("fs");
console.log(chalk.yellow("Starting.\n"));

let {promisify} = require("util");
let readFileAsync = promisify(fs.readFile);
readFileAsync("./index.lotus") // The Lotus file.
	.then(file => {
		console.log(file.toString()); // Content of the ".lotus" file.
		// Tokenizer + Parser will come.
	})
	.catch(err => {
		throw err;
	});
