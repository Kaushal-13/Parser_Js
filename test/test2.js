module.exports = test => {
    test(`42;`, {
        type: 'Program',
        body: [{
            type: "Expression Statement",
            expression: {
                type: "Numeric Literal",
                value: 42
            }
        }]
    }),
        test(`'hello';`, {
            type: 'Program',
            body: [{
                type: "Expression Statement",
                expression: {
                    type: "String Literal",
                    value: "hello"
                }
            }]
        }
        ),
        test(`"hello";`,
            {
                type: 'Program',
                body: [{
                    type: "Expression Statement",
                    expression: {
                        type: "String Literal",
                        value: "hello"
                    }
                }]
            }
        )

}