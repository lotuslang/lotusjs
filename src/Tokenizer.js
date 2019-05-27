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
	let bou
	let Tokens = [];
	let splitted = string.split('');
	for (let i = 0; i < splitted.length; i++) {
		let char = splitted[i];

		if (char === '.') {
			Tokens.push(TypeOfTokens.point);
			continue;
		}
		if (char === '[') {
			Tokens.push(TypeOfTokens.openBracket);
			continue;
		}
		if (char === ']') {
			Tokens.push(TypeOfTokens.closeBracket);
			continue;
		}
		if (char === '(') {
			Tokens.push(TypeOfTokens.openParenthesis);
			continue;
		}
		if (char === ')') {
			Tokens.push(TypeOfTokens.closeParenthesis);
			continue;
		}
		if (char === '{') {
			Tokens.push(TypeOfTokens.openCurlyBrace);
			continue;
		}
		if (char === '}') {
			Tokens.push(TypeOfTokens.openCurlyBrace);
			continue;
		}
		if (
			char == '#' &&
			splitted[i + 1] == '#' &&
			splitted[i + 2] == '#'
		) {
			if (Tokens.filter(
					e => e == TypeOfTokens.openComentary).length >
				Tokens.filter(e => e == TypeOfTokens.closeComentary).length
			) {
				Tokens.push(TypeOfTokens.closeComentary);
			} else {
				Tokens.push(TypeOfTokens.openComentary);
			};
		};
	};
	return await Tokens;
}
module.exports = Tokenize;
