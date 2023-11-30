module.exports = test => {
    test(`{
        42;
        "hello";
    }`,
        {
            type: "Program",
            body: [
                {
                    type: "Block Statement",
                    body: [
                        {
                            type: "Expression Statement",
                            expression: {
                                type: "Numeric Literal",
                                value: 42
                            }
                        },
                        {
                            type: "Expression Statement",
                            expression: {
                                type: "String Literal",
                                value: "hello"
                            }
                        }
                    ]
                }
            ]
        }),
        test(
            `{

        }`,
            {
                type: "Program",
                body: [
                    {
                        type: "Block Statement",
                        body: []
                    }
                ]
            }
        ),
        test(`
        {
            42;
            {
                "hello";
            }
        }
        `,
            {
                type: "Program",
                body: [
                    {
                        type: "Block Statement",
                        body: [
                            {
                                type: "Expression Statement",
                                expression: {
                                    type: "Numeric Literal",
                                    value: 42
                                }
                            }
                            ,
                            {
                                type: "Block Statement",
                                body: [
                                    {
                                        type: "Expression Statement",
                                        expression: {
                                            type: "String Literal",
                                            value: "hello"
                                        }
                                    }
                                ]
                            }
                        ]

                    }
                ]
            }
        )
}