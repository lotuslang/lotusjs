const chalk = require("chalk"); // Lib for coloring the text into console FOR DEBUG.
const fs = require("fs");
const Tokenize = require("./Tokenizer");
console.log(chalk.yellow("Starting.\n"));

let {
	promisify
} = require("util");
let readFileAsync = promisify(fs.readFile);

readFileAsync("./input.txt")
	.then(async file => {
		console.log(chalk.green(file.toString())+'\n'); // Content of the ".lotus" file.
		
		let Tokenized = await Tokenize(file.toString()); // Tokenize the content of file.
		console.log(Tokenized[1].join(" ").replace(/;/gi, ";\n"));
		//console.log(chalk.greyBright(Tokenized)); // Result of the Tokenize function.
		// Parser will come.

		if (!fs.existsSync("./output")) fs.mkdirSync("./output");
		fs.writeFileSync("./output/index.html", `<!DOCTYPE html>\n<html>\n\t<head>\n\t\n\t</head>\n\t<body>\n\t\n\t</body>\n</html>`);
		fs.writeFileSync("./output/output.txt", file.toString());
		fs.writeFileSync("./output/tokenizer_output.txt", JSON.stringify(Tokenized[0], null, 4));
	})
	.catch(err => {
		throw err;
	});