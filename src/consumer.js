/**
 * A class to consume, peek, and reconsume characters from an input string.
 *
 * @property {Object} location - An object holding the current line, column, and file consumed.
 * @property {string} current  - The latest character consumed by this consumer.
 */
class Consumer {

	/**
	 * @param {string} text - The string to consume from.
	 * @param {string} [fileName] - The name of the file this string comes from ("stdin" by default).
	 */
	constructor(text, fileName="stdin") {

		if ((typeof text) === "consumer") {
			console.log("text is consumer");
			this.location = text.location;
			this.stream = text.stream;
			this.current = text.current;
			this.reconsumeLast = text.reconsumeLast;
		} else {
			this.location = { line: 1, column: 0, file: fileName };

			if (!text.split) {
				console.log(text);
				this.stream = [ "" ];
			} else {
				this.stream = text.split('').reverse();
			}

			this.current = '';

			// sets the `reconsumeLast` flag to true
			this.reconsumeLast = false;
		}
	}



	/**
	 * Reconsumes the last character so that next time this consumer is
	 * asked to consume a character, it returns the latest one instead.
	 */
	reconsume() {

		// sets the `reconsumeLast` flag to true
		this.reconsumeLast = true;
	}

	/**
	 * Returns the `n` next characters to be consumed.
	 *
	 * @param {number} [n] - the number of character to peek.
	 *
	 * @returns {string} A string containing the `n` characters to be consumed.
	 */
	peek(n) {

		// if n is undefined, return just one character
		if (!n) {
			return this.stream[this.stream.length - 1];
		}

		// return a slice from (length - n) to the end and create a string from the array
		return this.stream.slice(this.stream.length - n).join('');
	}

	/**
	 * Consumes a character from the input text of this consumer.
	 *
	 * @return {string} Returns the character consumed, or `undefined` if it was not possible.
	 *
	 * @example
	 *
	 *      new Consumer("hello").consume() // returns 'h'
	 *      new Consumer("").consume() // returns undefined
	 */
	consume() {

		// if the `reconsumeLast` flag is set, set it to false and return the current char
		if (this.reconsumeLast) {
			this.reconsumeLast = false;

			return this.current;
		}

		// pop a char from `stream` and sets the current char to it
		this.current = this.stream.pop();

		// increment the column number
		this.location["column"]++;

		// if the current char is a newline
		if (this.current == '\n') {

			// increment the line number
			this.location["line"]++;

			// reset the column number
			this.location["column"] = 0;
		}

		// return the current char
		return this.current;
	}
}

exports.Consumer = Consumer;