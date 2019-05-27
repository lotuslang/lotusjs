const chalk = require("chalk"); // Lib for coloring the text into console FOR DEBUG.
const fs = require("fs");
const Tokenize = require("./Tokenizer");
console.log(chalk.yellow("Starting.\n"));

let {
	promisify
} = require("util");
let readFileAsync = promisify(fs.readFile);

readFileAsync("./index.lotus")
	.then(async file => {
		console.log(file.toString()); // Content of the ".lotus" file.
		
		let Tokenized = await Tokenize(file.toString()); // Tokenize the content of file.

		console.log(Tokenized); // Result of the Tokenize function.
		// Parser will come.

		if (!fs.existsSync("./output")) fs.mkdirSync("./output");
		fs.writeFileSync("./output/index.html", `<!DOCTYPE html>\n<html>\n\t<head>\n\t\n\t</head>\n\t<body>\n\t\n\t</body>\n</html>`);
		fs.writeFileSync("./output/output.txt", file.toString());
		fs.writeFileSync("./output/tokenizer_output.txt", JSON.stringify(Tokenized, null, 4));
	})
	.catch(err => {
		throw err;
	});