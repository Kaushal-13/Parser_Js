const Spec = [

    //whitespaces
    [/^\s+/, null],

    // comments
    [/^\/\/.*/, null],
    // multiline comments
    [/^\/\*[\s\S]*?\*\//, null],
    // semicolon
    [/^;/, ';'],

    // brackets ,
    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^\,/, ','],
    // let if else
    [/^\blet\b/, 'let'],
    [/^\bif\b/, 'if'],
    [/^\belse\b/, 'else'],

    // relational Operator
    [/^[\>\<]=/, 'Relational_Operator'],
    [/^[\>\<]/, 'Relational_Operator'],
    // Additive operator
    [/^[\*\/\+\-]=/, 'COMPLEX ASSIGN'],
    [/^[+\-]/, 'Additive Operator'],
    // Multiplicative Operator
    [/^[*\/]/, "Multiplicative Operator"],
    // numbers
    [/^\d+/, "NUMBER"],
    // Identifiers
    [/^\w+/, 'IDENTIFIER'],
    // Assignment
    [/^=/, 'SIMPLE ASSIGN'],



    // STRINGS
    [/"[^"]*"/, "STRING"],
    [/'[^']*'/, "STRING"]

]
class Tokenizer {

    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);
        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);
            if (tokenValue === null) {
                continue;
            }

            if (tokenType === null) {
                return this.getNextToken();
            }

            return {
                type: tokenType,
                value: tokenValue,
            }
        }

        throw new SyntaxError(`Unxpected Token "${string[0]}"`);

    }

    _match(regexp, string) {
        const matched = regexp.exec(string)
        if (matched !== null) {
            this._cursor += matched[0].length;
            return matched[0];
        }
        else {
            return null;
        }

    }

    isEOF() {
        return this._cursor === this._string.length;
    }

}

module.exports = {
    Tokenizer,
}