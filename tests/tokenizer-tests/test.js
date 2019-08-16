const fs = require('fs');

const tokenizer = require('../../src/tokenizer');

function max(a, b) {
	if (b > a) return b;
	return a;
}

function min(a, b) {
	if (b < a) return b;
	return a;
}

function symmetricDifference(a1, a2) {
	var result = [];
	for (var i = 0; i < a1.length; i++) {
	  if (a2.indexOf(a1[i]) === -1) {
		result.push(a1[i]);
	  }
	}
	for (i = 0; i < a2.length; i++) {
	  if (a1.indexOf(a2[i]) === -1) {
		result.push(a2[i]);
	  }
	}
	return result;
  }

var test1Sample = new Array(JSON.parse(fs.readFileSync("./sample-1.json")))[0];

var test1Output = tokenizer.tokenize(fs.readFileSync("./input-1.lot"));

if (test1Sample !== test1Output) {
	console.log("\x1b[1m"); // text in bold
	console.log("\x1b[33m%s\x1b[0m", "Test 1 failed"); // text in yellow bold
	console.log("\x1b[31m%s\x1b[0m", "ERROR"); // text in red
	//let differences = test1Output.diff(test1Sample);
	let diff = symmetricDifference(test1Output, test1Sample);

	//console.log(differences);

	diff.forEach((item) => console.log(item));

	/*for (const key in diff) {
		if (diff.hasOwnProperty(key)) {
			const difference = diff[key];
			console.log("Output gave \x1b[3m" + key + "\x1b[0m. However, \x1b[3m" + difference + "\x1b[0m was expected.");
		}
	}*/

	return;
}