module.exports = test => {
    test(`2 + 2;`,
        {
            type: "Program",
            body: [
                {
                    type: "Expression Statement",
                    expression: {
                        type: "Binary Expression",
                        operator: "+",
                        left: {
                            type: "Numeric Literal",
                            value: 2
                        },
                        right: {
                            type: "Numeric Literal",
                            value: 2,

                        }
                    }
                }
            ]

        }
    ),
        test(`3 - 2 - 2;`, {
            type: "Program",
            body: [{
                type: "Expression Statement",
                expression: {
                    type: "Binary Expression",
                    operator: '-',
                    left: {
                        type: "Binary Expression",
                        operator: "-",
                        left: {
                            type: "Numeric Literal",
                            value: 3
                        },
                        right: {
                            type: "Numeric Literal",
                            value: 2,
                        }
                    },

                    right: {
                        type: "Numeric Literal",
                        value: 2
                    }

                }
            }

            ]
        }),
        test(`2 * 2;`,
            {
                type: "Program",
                body: [
                    {
                        type: "Expression Statement",
                        expression: {
                            type: "Binary Expression",
                            operator: "*",
                            left: {
                                type: "Numeric Literal",
                                value: 2
                            },
                            right: {
                                type: "Numeric Literal",
                                value: 2,

                            }
                        }
                    }
                ]

            }
        ),
        test(`(2 + 2) * 2;`,
            {
                type: "Program",
                body: [
                    {
                        type: "Expression Statement",
                        expression: {
                            type: "Binary Expression",
                            operator: "*",
                            left: {
                                type: "Binary Expression",
                                operator: "+",
                                left: {
                                    type: "Numeric Literal",
                                    value: 2
                                },
                                right: {
                                    type: "Numeric Literal",
                                    value: 2
                                }
                            },
                            right: {
                                type: "Numeric Literal",
                                value: 2,

                            }
                        }
                    }
                ]

            }
        )
}