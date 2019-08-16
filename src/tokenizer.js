const { Consumer } = require("./consumer");
const { Precedence } = require("./precedence");

// See the spec section 2.1 for reference

function isDigit(char) { return char !== undefined && (typeof char) === "string" && char.charCodeAt(0) >= 0x0030 && char.charCodeAt(0) <= 0x0039; } // U+0030 is '0' and U+0039 is '9'

function isLetter(char) { return char !== undefined && (typeof char) === "string" && char.toLowerCase().charCodeAt(0) >= 0x0061 && char.toLowerCase().charCodeAt(0) <= 0x007A; }

function isLetterOrDigit(char) { return isDigit(char) || isLetter(char); }

function isStartOfIdent(char) { return isLetter(char) || char === '_'; }

function isValidIdentChar(char) { return char !== undefined && (typeof char) === "string" && (isLetterOrDigit(char) || char === '_'); }

function isHexDigit(char) { return char !== undefined && (typeof char) === "string" && (isDigit(char) || (char.toLowerCase().charCodeAt(0) >= 0x0061 && char.toLowerCase().charCodeAt(0) <= 0x0066)); }

function isWhitespace(char) {
	if (char === undefined || (typeof char) !== "string") return 0;

	let codepoint = char.charCodeAt(0);

	return  codepoint === 0x0009 || // character tabulation
			codepoint === 0x000A || // line feed/newline
			codepoint === 0x0020    // space
}


/**
 * A token represents zero or more characters and their associated token kind.
 *
 * @typedef {Object} Token
 *
 * @property {string} kind - The type of the token (see the spec, section 2.2 Token Types, for more info).
 * @property {string} repr - The representation of this token, i.e. a sequence of zero or more characters.
 */

// TODO: Write a better typedef for Consumer
/**
  * A consumer consumes character from an input text. It allows reconsuming, peeking, consuming.
  *
  * @typedef {Object} Consumer
  *
  * @property {String} consume - Consumes a character from the input text.
  */

// TODO: Write better jsdocs the Tokenizer class
/**
 * A class to consume tokens from a consumer or a string.
 *
 * @property {Object} location   - An object holding the line, column, and file of the last token consumed.
 * @property {Token} current     - The latest token consumed.
 * @property {Consumer} consumer - The internal StringConsumer of this tokenizer
 */
class Tokenizer {

	get location () { return this.consumer.location };

	constructor(input, ignoreTrivia=true) {
		console.log(typeof input);
		if ((typeof input) === "consumer") {
			this.consumer = input;
		} else {
			this.consumer = new Consumer(input);
		}

		this.ignoreTrivia = ignoreTrivia;

		this.current = { };
		this.reconsumeLast = false;
	}

	reconsume() {
		this.reconsumeLast = true;
	}

	/**
	 * Return the `n` next tokens to be consumed.
	 *
	 * @param {number} [n] - The number of token to peek. Default is 1
	 *
	 * @returns {(Token|Array)} An array of tokens containing the `n` next tokens to be consumed,
	 * or a single Token if `n` was not specified or 1.
	 */
	peek(n=1) {

		let arr = this.consumer.stream.join('').split('').reverse().join(''); // to lose any reference to the original array

		// The "parse(stringify)" hack is to do a deep copy of this tokenizer,
		// so that we don't actually consume any character from the original consumer
		let tokenizer = new Tokenizer(new Consumer(arr));

		// the output array
		let tokens = [];

		// consume `n` tokens and push them to `tokens`
		for (let i = 1; i <= n; i++) {
			tokens.push(tokenizer.consume());
		}

		return n == 1 ? tokens[0] : tokens;
	}

	/**
	 * Consume a token from this tokenizer.
	 *
	 * @returns {Token} Returns the token consumed, or `undefined` if it was not possible.
	 */
	consume() {

		if (this.reconsumeLast) {
			this.reconsumeLast = false;

			return this.current;
		}

		let currChar = this.consumer.consume();

		if (!this.ignoreTrivia) {
			if (currChar === ";") {
				let i = 0;

				while (currChar === ';') {
					currChar = this.consumer.consume();
					i++;
				}

				this.current = { kind: "trivia", repr: ";", number: i };

				return this.current;
			}

			if (isWhitespace(currChar)) {
				let i = 0;

				while (isWhitespace(this.consumer.consume())) i++;

				this.current = { kind: "trivia", repr: currChar, number: i };

				return this.current;
			}
		}

		while (isWhitespace(currChar)) {
			currChar = this.consumer.consume();
		}

		if (currChar === '"' || currChar === "'" || currChar === "`") {
			this.current = this.consumeString(currChar);

			return this.current;
		}

		if (isDigit(currChar)) {
			this.consumer.reconsume();

			this.current = this.consumeNumber();

			return this.current;
		}

		if (currChar === ".") {
			if (isDigit(this.consumer.peek())) {
				this.consumer.reconsume();

				this.current = this.consumeNumber();

				return this.current;
			}
		}

		if (currChar === '-') {
			if (this.consumer.peek() === '-') {

				this.consumer.consume();

				this.current = { kind: "decrement", repr: "--", location: this.location };

				return this.current;
			}
		}

		if (currChar === '+') {
			if (this.consumer.peek() === '+') {

				this.consumer.consume();

				this.current = { kind: "decrement", repr: "+", location: this.location };

				return this.current;
			}
		}

		if (currChar === '_') {

			this.consumer.reconsume();

			this.current = this.consumeIdentLike();

			return this.current;
		}

		if (isLetter(currChar)) {

			this.consumer.reconsume();

			this.current = this.consumeIdentLike();

			return this.current;
		}

		if (currChar === '#') {
			if (this.consumer.peek(2) === "##") {

				let lastThree = this.consumer.peek(3);

				while (lastThree !== "###" || lastThree.length !== 3) {
					if (!this.consumer.consume()) break;
					lastThree = this.consumer.peek(3);
				}

				if (!this.consumer.consume()) {
					throw `(${this.location}) : `
						+ "Unexpected EOF in multi-line comment";
				}

				for (let i = 1; i < 3; i++) this.consumer.consume();

				return this.consume();
			}

			while (this.consumer.consume() != '\n') { }

			return this.consume();
		}

		if (currChar === '|') {
			if (this.consumer.peek() === '|') {
				this.consumer.consume();

				this.current = { kind: "logical-or", repr: "||", location: this.location };

				return this.current;
			}
		}

		if (currChar === '&') {
			if (this.consumer.peek() === '&') {
				this.consumer.consume();

				this.current = { kind: "logical-and", repr: "&&", location: this.location };

				return this.current;
			}
		}

		if (currChar === '^') {
			if (this.consumer.peek() === '^') {
				this.consumer.consume();

				this.current = { kind: "logical-xor", repr: "^^", location: this.location };

				return this.current;
			}
		}

		this.current = { kind: "delim", repr: currChar };
		return this.current;
	}

	consumeString(delimiter=this.consumer.current) {

		let output = { kind: "string", repr: "", delim: delimiter };

		while (this.consumer.consume() !== undefined && this.consumer.current !== delimiter) {
			if (this.consumer.current === '\n') {
				throw `SyntaxError at ${this.location} : Newlines in string literal is not supported in lotus. Use the escape sequence '\\n' to insert newlines`;
			}

			if (this.consumer.current === '{') {

				let oldIgnoreTrivia = this.ignoreTrivia;

				this.ignoreTrivia = false;

				output.kind = "special-string";
				output.sections = [ ];

				while (this.current.repr !== '}') {
					if (this.current.repr === '\n' || this.current.repr === ';') {
						throw `SyntaxError at ${this.location} : Unexpected token '${this.current.repr}. Did you forget '}' ?`
					}

					output.sections.push(this.current);
				}

				this.ignoreTrivia = oldIgnoreTrivia;
			}

			output.repr += this.consumer.current;
		}

		output.location = this.location;

		return output;
	}

	consumeIdentLike() {
		var name = this.consumeName();

		if (name == "let") {
			return { kind: "operator", precedence: Precedence.Declaration, associativity: "right", repr: name, location: this.location };
		}

		if (name == "def") {
			return { kind: "operator", precedence: Precedence.Declaration, associativity: "right", repr: name, location: this.location };
		}

		if (name == "new") {
			return { kind: "operator", precedence: Precedence.FunctionCall, associativity: "right", repr: name, location: this.location };
		}

		if (name == "if" || name == "else") {
			return { kind: "operator", precedence: Precedence.IfElse, associativity: "right", repr: name, location: this.location };
		}

		if (name == "for" || name == "foreach") {
			return { kind: "operator", precedence: Precedence.Loop, associativity: "right", repr: name, location: this.location };
		}

		if (name == "in") {
			return { kind: "operator", precedence: Precedence.Enumeration, associativity: "right", repr: name, location: this.location };
		}

		if (name == "do") {
			return { kind: "operator", precedence: Precedence.Loop, associativity: "right", repr: name, location: this.location };
		}

		if (name == "while") {
			return { kind: "operator", precedence: Precedence.Loop, associativity: "right",repr: name, location: this.location };
		}

		if (name == "true" || name == "false") {
			return { kind: "bool", repr: name, location: this.location };
		}

		return { kind: "ident", repr: name, location: this.location };
	}

	consumeName() {

		if (!isStartOfIdent(this.consumer.consume())) {
			throw `SyntaxError at ${this.location} : Unexpected character ${this.consumer.current} at the start of a name`;
		}

		let repr = this.consumer.current;

		while (isValidIdentChar(this.consumer.peek())) repr += this.consumer.consume();

		return repr;
	}

	consumeNumber() {

		if (!isDigit(this.consumer.peek()) || this.consumer.peek() != "+" || this.consumer.peek() != "-" || this.consumer.peek() != ".") {
			throw `SyntaxError at ${this.location} : Unexpected character ${this.consumer.current} at the start of a number`;
		}

		let repr = "";

		if (this.consumer.peek() === "+" || this.consumer.peek() === "-") {
			repr += this.consumer.consume();
		}

		while (isDigit(this.consumer.peek())) {
			repr += this.consumer.consume();
		}

		if (this.consumer.peek() === ".") {
			repr += this.consumer.consume();
		}

		if (!isDigit(this.consumer.peek())) {
			throw `SyntaxError at ${this.location} : Unexpected character ${this.consumer.consume()} after '.' in a number. Expected a digit`;
		}

		while (isDigit(this.consumer.peek())) {
			repr += this.consumer.consume();
		}

		if (this.consumer.peek() === "e" || this.consumer.peek() === "E") {
			repr += this.consumer.consume();

			while (isDigit(this.consumer.peek())) {
				repr += this.consumer.consume();
			}
		}

		return { kind: "number", repr: repr, location: this.location };
	}
}

exports.Tokenizer = Tokenizer;