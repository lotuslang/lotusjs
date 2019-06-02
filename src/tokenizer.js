function isDigit(char) { return char !== undefined && char.charCodeAt(0) >= 0x0030 && char.charCodeAt(0) <= 0x0039; } // U+0030 is '0' and U+0039 is '9'

// U+0061 is 'a' and U+007A is 'z'
function isLetter(char) { return char !== undefined && char.toLowerCase().charCodeAt(0) >= 0x0061 && char.toLowerCase().charCodeAt(0) <= 0x007A; }

function isLetterOrDigit(char) { return isDigit(char) || isLetter(char); }

function isStartOfIdent(char) { return char !== undefined && (isLetter(char) || char === '_'); }

function isValidIdentChar(char) { return char !== undefined && (isLetterOrDigit(char) || char === '_'); }

// U+0061 is 'a' and U+007A is 'z'
function isHexDigit(char) { return char !== undefined && (isDigit(char) || (char.toLowerCase().charCodeAt(0) >= 0x0061 && char.toLowerCase().charCodeAt(0) <= 0x0066)); }

// See https://en.wikipedia.org/wiki/Whitespace_character#Unicode for reference
function isWhitespace(char) {
    let codepoint = char.charCodeAt(0);

    return char !== undefined &&
        (
            codepoint === 0x0009 || // character tabulation
            codepoint === 0x000A || // line feed
            codepoint === 0x000B || // line tabulation
            codepoint === 0x000C || // form feed
            codepoint === 0x000D || // carriage return
            codepoint === 0x0020 || // space
            codepoint === 0x0085 || // next line
            codepoint === 0x00A0 || // no-break space
            codepoint === 0x2028 || // line separator
            codepoint === 0x2029    // paragraph separator
        );
}

function tokenizeNumber() {

    let numStr = ""; // string représentant la valeur du token

    if (input[i] === '+' || input[i] === '-') { // Si c'est un '+' ou un '-'
        numStr += input[i]; // on l'ajoute à numStr
    }

    while (isDigit(input[i])) { // pendant que le char actuel est un chiffre
        numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index
    }

    if (input[i] === '.' && isDigit(input[i + 1])) { // si le char actuel est un '.' suivi d'un chiffre
        numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index
    }

    while (isDigit(input[i])) { // pendant que le char actuel est un chiffre
        numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index
    }

    if (input[i] === 'e' || input[i] === 'E') { // si le char actuel est un 'e' ou un 'E'
        numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index

        if (input[i] === '+' || input[i] === '-') { // si le char actuel est un '+' ou un '-'
            numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index
        }

        while (isDigit(input[i])) { // pendant que le char actuel est un chiffre
            numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index
        }

        if (input[i] === '.' && isDigit(input[i + 1])) { // si le char actuel est un '.' suivi d'un chiffre
            numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index
        }

        while (isDigit(input[i])) { // pendant que le char actuel est un chiffre
            numStr += input[i++]; // on l'ajoute à numStr et on incrémente l'index
        }
    }

    if (input[i] === '.' ||
        input[i] === '+' ||
        input[i] === '-' ||
        input[i] === 'e' ||
        input[i] === 'E') throw `Invalid symbol at index ${i} (context : '${input.slice(i - 4, i + 4).join('')}')`;

    i--;

    return numStr;
}

function tokenizeIdent() {

    let identStr = ""; // string représentant la valeur du token

    if (!isStartOfIdent(input[i])) { // si le char actuel n'est pas valide
        throw `Character at ${i} (${input[i]}) is not a letter, a - or a _`;
    }

    for (; i < input.length; i++) {
        if (isWhitespace(input[i])) break; // si le char actuel est un whitespace, arrêter

        if (!isValidIdentChar(input[i])) break; // si le char actuel n'est pas valid à l'intérieur d'un ident, arrêter

        identStr += input[i]; // ajoute le char actuel à str
    }

    i--;

    return identStr;
}

function tokenizeEscape() {
    if (input[i] !== '\\') throw `Character at ${i} (${input[i]}) is not U+005C REVERSE SOLIDUS (\\)`; // si le char actuel n'est pas '\'

    i++;

    let escapeSequences = {
        'n': '\n',
        'r': '\r',
        't': '\t',
        'b': '\b',
        'f': '\f',
        '\'': '\'',
        '\"': '\"',
        '\\': '\\'
    }

    if (escapeSequences[input[i]] !== undefined) {
        return escapeSequences[input[i]];
    }

    if (input[i] === 'u' || input[i] === 'U') {
        i++;
    }

    i += 4;

    return String.fromCharCode(parseInt("0x" + ("0000" + input.slice(i, i + 4).join('')).slice(-4)));
}

function tokenizeString(endingChar) {

    let str = ""; // string représentant la valeur du token

    if (endingChar === undefined) endingChar = input[i];

    i++;

    for (; i < input.length; i++) {
        if (input[i] === endingChar) break;

        if (input[i] === '\\') {
            let escape = tokenizeEscape();
            str += escape;
            continue;
        }

        str += input[i];
    }

    return str;
}

function tokenize(inputText) {

    input = inputText.split('');

    let output = [];

    for (; i < input.length; i++) {

        // WHITESPACE
        if (isWhitespace(input[i])) continue; // si le char actuel est un whitespace, skip le char

        // STRING
        if (input[i] === '"') { // si le char actuel est un '"'
            let str = tokenizeString(input[i]); // tokenizer le string
            output.push({ "string": str }); // ajouter un <string-token> à l'output avec le résultat comme valeur
            continue;
        }

        // STRING
        if (input[i] === "'") { // si le char actuel est un '''
            let str = tokenizeString(input[i]); // tokenizer le string
            output.push({ "string": str }); // ajouter un <string-token> à l'output avec le résultat comme valeur
            continue;
        }

        // NUMBER
        if (isDigit(input[i])) { // si le char actuel est un chiffre
            let num = tokenizeNumber(); // tokenizer le nombre entier
            output.push({ "number": num }); // ajouter un <number-token> à l'output avec le résultat comme valeur
            continue;
        }

        // FLOATING POINT NUMBER
        if (input[i] === '.' && isDigit(input[i + 1])) { // si le char actuel est un '.' suivi d'un chiffre
            let num = tokenizeNumber(); // tokenizer le nombre entier
            output.push({ "number": num }); // ajouter un <number-token> à l'output avec le résultat comme valeur
            continue;
        }

        // POSITIVE NUMBER
        if (input[i] === '+' && isDigit(input[i + 1])) { // si le char actuel est un '+' suivi d'un chiffre
            let num = tokenizeNumber(); // tokenizer le nombre entier
            output.push({ "number": num }); // ajouter un <number-token> à l'output avec le résultat comme valeur
            continue;
        }

        // NEGATIVE NUMBER
        if (input[i] === '-' && isDigit(input[i + 1])) { // si le char actuel est un '-' suivi d'un chiffre
            let num = tokenizeNumber(); // tokenizer le nombre entier
            output.push({ "number": num }); // ajouter un <number-token> à l'output avec le résultat comme valeur
            continue;
        }

        // IDENTIFIER
        if (isStartOfIdent(input[i])) { // si le char actuel est un caractère qui peut débuter un <ident-token>
            let ident = tokenizeIdent(); // tokenizer l'ident entier
            output.push({ "ident": ident }); // ajouter un <ident-token> à l'output avec le résultat comme valeur
            continue;
        }

        // MULTI LINE COMMENT
        if (input.slice(i, i + 3).join('') === '###') { // si les 3 prochains chars sont '###'
            i += 3; // augmenter l'index de 3

            while (input.slice(i, i + 3).join('') !== '###') { // pendant que les 3 prochains carhs ne sont pas '###'
                i++; // incrémenter l'index
            }

            i += 3;

            continue;
        }

        // SINGLE LINE COMMENT
        if (input[i] === '#') { // si le char actuel est un '#'
            while (input[i] !== undefined && input[i].charCodeAt(0) !== 0x000A) { // pendant que le char actuel n'est pas un U+000A LINE FEED (\n)
                i++; // incrémenter l'index
            }

            continue;
        }

        // EMBEDDED DOCUMENTATION
        if (input.slice(i, i+6).join('') === '=begin' && input[i-1].charCodeAt(0) === 0x000A) { // si les 6 prochains chars sont '=begin' et que celui avant un U+000A LINE FEED (\n)

             // pendant que 4 prochains chars ne sont pas '=end'
            while (input[i] !== undefined &&
                 !(input.slice(i, i+4).join('') === '=end')) {
                i++; // incrémenter l'index
            }

            i += 3;

            continue;
        }

        // COLON
        if (input[i] === ':') { // si le char actuel est un ':'
            output.push({ "colon": ":" }); //ajouter un <semicolon-token> à l'output avec ':' comme valeur
            continue;
        }

        // DELIMITER
        output.push({ "delim": input[i] });
    }

    return output;
}

let i = 0;
let input = [];

exports.tokenizer = tokenize;
exports.tokenizeEscape = tokenizeEscape;
exports.tokenizeIdent = tokenizeIdent;
exports.tokenizeNumber = tokenizeNumber;
exports.tokenizeString = tokenizeString;