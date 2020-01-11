const tokenizer = require("./tokenizer").Tokenizer;
/*const parser = require("./parser");
const analyzers = require("./analyzers");
const translate = require("./translate");*/

/**
 * Evaluate a string of Lotus source code.
 * @param {string} inputText The text to evaluate.
 */
function eval(inputText) {
	let tokens = tokenizer.tokenize(inputText);
	/*let ast = parser(tokens);
	analyzers.forEach(analyzer => {
		analyzer.apply(ast);
	});
	return translate(ast);*/
}

exports.tokenizer = tokenizer;
/*exports.parser = parser;
exports.analyzers = analyzers;
exports.translate = translate;*/
exports.eval = eval;