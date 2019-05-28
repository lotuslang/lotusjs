async function Tokenize(string) {
	let TypeOfTokens = {
		functionToken: "functionToken",
		openBracket: "openBracket",
		closeBracket: "closeBracket",
		openParenthesis: "openParenthesis",
		closeParenthesis: "closeParenthesis",
		openCurlyBrace: "openCurlyBrace",
		closeCurlyBrace: "closeCurlyBrace",
		openComentary: "openComentary",
		closeComentary: "closeComentary",
		string : "string",
		number : "number",
		point : "point"
	};
	let tokens = [];
	let splitted = string.split('');
	for (let i = 0; i < splitted.length; i++) {
		let char = splitted[i];

		if (char === '.') {
			tokens.push(TypeOfTokens.point);
			continue;
		}
		if (char === '[') {
			tokens.push(TypeOfTokens.openBracket);
			continue;
		}
		if (char === ']') {
			tokens.push(TypeOfTokens.closeBracket);
			continue;
		}
		if (char === '(') {
			tokens.push(TypeOfTokens.openParenthesis);
			continue;
		}
		if (char === ')') {
			tokens.push(TypeOfTokens.closeParenthesis);
			continue;
		}
		if (char === '{') {
			tokens.push(TypeOfTokens.openCurlyBrace);
			continue;
		}
		if (char === '}') {
			tokens.push(TypeOfTokens.openCurlyBrace);
			continue;
		}
		if (
			char == '#' &&
			splitted[i + 1] == '#' &&
			splitted[i + 2] == '#'
		) {
			if (tokens.filter(
					e => e == TypeOfTokens.openComentary).length >
				tokens.filter(e => e == TypeOfTokens.closeComentary).length
			) {
				tokens.push(TypeOfTokens.closeComentary);
			} else {
				tokens.push(TypeOfTokens.openComentary);
			};
		};
	};
	return await tokens;
}
module.exports = Tokenize;
