const { stat } = require('fs');
const { Tokenizer } = require('./Tokenizer');
const exp = require('constants');


/*
Program :
|Statement Lists

Statement List : 
|Statement
|Statement List Statement

Literal:
NUMBER
|STRING
*/

const DefaultFactory = {
    Program(body) {
        return {
            type: 'Program',
            body: body
        }
    },
    EmptyStatement() {
        return {
            type: 'Empty Statement',
        }
    },

    BlockStatement(body) {
        return {
            type: "Block Statement",
            body: body,
        }
    },

    ExpressionStatement(expression) {
        return {
            type: 'Expression Statement',
            expression: expression,
        }
    },

    StringLiteral(value) {
        return {
            type: 'String Literal',
            value,
        }
    }
    ,
    NumericLiteral(value) {
        return {
            type: "Numeric Literal",
            value,
        }
    }

}

const SexpressionFactory = {
    Program(body) {
        return ['begin', body];
    },
    EmptyStatement() {

    },
    BlockStatement(body) {
        return ['begin', body]
    },
    ExpressionStatement(expression) {
        return expression;
    },
    StringLiteral(value) {
        return `"${value}"`
    },

    NumericLiteral(value) {
        return value;
    }
}

const ASTMode = 'default';

const factory = ASTMode === 'default' ? DefaultFactory : SexpressionFactory

class Parser {

    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        this._lookahead = this._tokenizer.getNextToken();
        // returns an ast bfter accepting a string
        return this.Program();
    }

    Program() {
        return factory.Program(this.StatementList())

    }

    // Statement : Expression | Variable Statement | Block Statement | If statemen;

    StatementList(stopLookAhead = null) {

        const statementList = [this.Statement()];
        while (this._lookahead !== null && this._lookahead.type !== stopLookAhead) {
            statementList.push(this.Statement());
        }
        return statementList
    }

    Statement() {
        switch (this._lookahead.type) {
            case ";": return this.EmptyStatement();
            case "{": return this.BlockStatement();
            case "let": return this.VariableStatement();
            case "if": return this.ifStatement();
            default: return this.ExpressionStatement();
        }
    }
    // if statement -> if ( Expression ) statement; | if (Expression) Statement else Statement; 
    ifStatement() {
        this._eat('if');
        this._eat('(');
        const test = this.Expression();
        this._eat(')');
        const consequent = this.Statement();

        const alternate = this._lookahead !== null && this._lookahead.type === 'else' ? this._eat('else') && this.Statement() : null;

        return {
            type: 'IfStatement',
            test,
            consequent,
            alternate
        }
    }

    EmptyStatement() {
        this._eat(';');

        return {
            type: "Empty Statement",
        }
    }

    /*
    Block Statement -> {Opt Statement List}
    */
    BlockStatement() {
        this._eat('{');
        const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];
        this._eat('}');

        return {
            type: "Block Statement",
            body: body,

        }
    }
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat(';')
        return {
            type: 'Expression Statement',
            expression: expression,
        }
    }

    Expression() {
        return this.AssignmentExpression();
    }
    //Assignment Expression -> Additive Expression | Lhs Op Rhs
    AssignmentExpression() {
        const left = this.RelationalExpression();

        if (!this._isAssignmentOperator(this._lookahead.type)) {
            return left;
        }

        return {
            type: "Assignment Expression",
            operator: this.AssignmentOperator().value,
            left: this._checkValidAssignmentTarget(left),
            right: this.AssignmentExpression()
        }
    }

    _isAssignmentOperator(token_type) {
        return token_type === 'SIMPLE ASSIGN' || token_type === 'COMPLEX ASSIGN';
    }

    AssignmentOperator() {
        if (this._lookahead.type === 'SIMPLE ASSIGN') {
            return this._eat("SIMPLE ASSIGN");
        }
        else if (this._lookahead.type === 'COMPLEX ASSIGN') {
            return this._eat("COMPLEX ASSIGN")
        }
    }

    LeftHandSideExpression() {
        return this.Identifier()
    }

    Identifier() {
        const name = this._eat('IDENTIFIER').value;
        return {
            type: 'IDENTIFIER',
            name
        }
    }

    _checkValidAssignmentTarget(node) {
        if (node.type === 'IDENTIFIER') {
            return node;
        }
        throw new SyntaxError('Left hand side is not a valid expression');

    }

    AdditiveExpression() {
        let left = this.MultiplicativeExpression();
        while (this._lookahead.type === 'Additive Operator') {
            const operator = this._eat('Additive Operator').value;
            const right = this.MultiplicativeExpression();

            left = {
                type: "Binary Expression",
                operator: operator,
                left,
                right
            }
        }
        return left;
    }
    _BinaryExpression(builderName, operatorToken) {
        let left = this[builderName]();

        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value;

            const right = this[builderName]();

            left = {
                type: 'Binary Expression',
                operator,
                left,
                right,
            };
        }

        return left;
    }

    RelationalExpression() {
        return this._BinaryExpression('AdditiveExpression', 'Relational_Operator')
    }

    MultiplicativeExpression() {
        let left = this.PrimaryExpression();
        while (this._lookahead.type === 'Multiplicative Operator') {
            const operator = this._eat('Multiplicative Operator').value;
            const right = this.PrimaryExpression();

            left = {
                type: "Binary Expression",
                operator: operator,
                left,
                right
            }
        }
        return left;
    }
    /*
        Primary Exp -> Parenthised Expression | Literal
        Parenthised expr -> (Expression)
    */
    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal();
        }
        switch (this._lookahead.type) {
            case '(': return this.ParenthesizedExpression();
            default: return this.LeftHandSideExpression();
        }

    }
    ParenthesizedExpression() {
        this._eat('(');
        const expression = this.Expression();
        this._eat(')');

        return expression;
    }

    VariableStatement() {
        this._eat('let');
        const declarations = this.VariableDeclarationList();
        this._eat(';')

        return {
            type: 'Variable Statement',
            declarations,

        }
    }

    VariableDeclarationList() {
        const declarations = [];
        do {
            declarations.push(this.VariableDeclaration())
        } while (this._lookahead.type === ',' && this._eat(','))
        return declarations;
    }

    // Variable Declaration List -> Variable Declaration | Var declare Var declar list

    // Variable Declaration -> Identifier

    VariableDeclaration() {
        const id = this.Identifier();

        const init = this._lookahead.type !== ';' && this._lookahead.type !== ',' ? this.VariableInitializer() : null;

        return {
            type: 'Variable Declaration',
            id,
            init
        }
    }

    VariableInitializer() {
        this._eat('SIMPLE ASSIGN');
        return this.AssignmentExpression();
    }

    /*
        AdditiveExpression -> literal | Additive Expression Addititive_Operator literal
    */

    Literal() {
        //console.log(this._lookahead)
        switch (this._lookahead.type) {
            case 'NUMBER': return this.NumericLiteral();
            case 'STRING': return this.StringLiteral();
        }
    }

    _isLiteral(token_type) {
        return token_type === 'NUMBER' || token_type === 'STRING';
    }
    StringLiteral() {
        const token = this._eat("STRING");

        return {
            type: 'String Literal',
            value: token.value.slice(1, -1),
        }
    }

    NumericLiteral() {
        const token = this._eat("NUMBER")
        return {
            type: "Numeric Literal",
            value: Number(token.value),
        }
    }

    _eat(tokentype) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(`Unxpected end of input expected : "${token_type}"`,);
        }

        if (token.type !== tokentype) {
            throw new SyntaxError(`Unxpcted token "${token.value}",expected : "${tokentype}"`)
        }

        this._lookahead = this._tokenizer.getNextToken();
        return token;
    }
}

module.exports = { Parser, }