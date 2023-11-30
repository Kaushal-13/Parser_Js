module.exports = test => {
    test(`
   "hello";
   // COmment
    42;`, {
        type: "Program",
        body: [
            {
                type: "Expression Statement",
                expression: {
                    type: "String Literal",
                    value: "hello"
                }
            },
            {
                type: "Expression Statement",
                expression: {
                    type: "Numeric Literal",
                    value: 42
                }
            }
        ]
    }
    )

}