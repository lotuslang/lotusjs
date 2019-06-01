const TypeOfTokens = require("./Tokens");

function isDigit(char) {
	return (char !== undefined && char.charCodeAt(0) >= 0x0030 && char.charCodeAt(0) <= 0x0039);
}
/**
 * Test if a char is a number.
 *@param {Number}
 *@return {Boolean}
 **/

async function Tokenize(input) {

	let tokens = {};
	let tokensArray = [];
	let splitted = input.split('');
	splitted = splitted.filter(chr => chr.charCodeAt(0) !== 0x000D); // Pre-process pour enlever les "\r".
	let place = 1;
	let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "y", "x", "y", "z"]
	for (let i = 0; i < splitted.length; i++) {
		let char = splitted[i];

		if (char === "#" && splitted[i + 1] === "#" && splitted[i + 2] === "#") { // Multi-line comment.
			i += 3;
			let string = "###";
			while (char !== undefined) {
				if (splitted[i] === "#" && splitted[i + 1] === "#" && splitted[i + 2] !== "#") break;
				i++;
				char = splitted[i];
				string += char;
			}
			i += 3;
			char = splitted[i];
			string += "#";
			tokens[place] = {
				"multi-lines-comment-token": string
			}
			tokensArray.push(string);
			place++;
		}

		if (char === "#") { // Single-line comment.
			i++;
			let string = "#" + splitted[i];
			while (char !== undefined && char !== "\n") {
				i++;
				char = splitted[i];
				string += char;
			}
			tokens[place] = {
				"comment-token": string
			}
			tokensArray.push(string);
			place++;
		}
		if (char === '"') { // Strings with "".
			let string = "";
			do {
				string += char;
				i++;
				char = splitted[i];

			} while (char !== '"');
			string += '"';
			tokens[place] = {
				"string-token": string
			}
			tokensArray.push(string);
			place++;
		}

		if (char === "'") { // Strings with ''.
			let string = "";
			do {
				string += char;
				i++;
				char = splitted[i];
			} while (char !== "'");
			string += "'";
			tokens[place] = {
				"string-token": string
			}
			tokensArray.push(string);
			place++;
		}

		if (isDigit(char)) { // Numbers.
			let number = "";
			do {
				number += char;
				i++;
				char = splitted[i];
			} while (isDigit(char));
			tokens[place] = {
				"number-token": number
			}
			tokensArray.push(number.toString());
			place++;
		}

		if (Object.values(TypeOfTokens).includes(char)) { 
			if (Object.keys(TypeOfTokens).find(key => TypeOfTokens[key].includes(char + splitted[i+1]))) { // Tokens with multiple characteres.
				let token = Object.keys(TypeOfTokens).find(key => TypeOfTokens[key].includes(char + splitted[i+1]));
				let result = "";
				for(let j = 0; j < TypeOfTokens[token].length; j++, i++) {
					if(splitted[i] != TypeOfTokens[token][j]) break;
					else {
						result += splitted[i];
					}
				}
				if(result === TypeOfTokens[token]) {
					tokens[place] = {
						[token]: TypeOfTokens[token]
					}
					tokensArray.push(TypeOfTokens[token]);
					place++;
					continue;
				}
			}
			let token = Object.keys(TypeOfTokens).find(key => TypeOfTokens[key] === char); // Tokens with one characteres.
			tokens[place] = {
				[token]: TypeOfTokens[token]
			}
			tokensArray.push(char);
			place++;
		}

		if (alphabet.includes(char.toLowerCase())) { // Words.
			let string = char;
			while (char !== undefined) {
				if (!alphabet.includes(char.toLowerCase())) break;
				i++;
				char = splitted[i];
				if (char !== " ") string += char;
			}
			tokens[place] = {
				"ident-token": string
			}
			tokensArray.push(string);
			place++;
		}
	};
	return await [tokens, tokensArray];
}
module.exports = Tokenize;