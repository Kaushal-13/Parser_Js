/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

module.exports = test => {
  test(
    `

    if (x) {
      x = 1;
    } else {
      x = 2;
    }


    `,
    {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'IDENTIFIER',
            name: 'x',
          },
          consequent: {
            type: 'Block Statement',
            body: [
              {
                type: 'Expression Statement',
                expression: {
                  type: 'Assignment Expression',
                  operator: '=',
                  left: {
                    type: 'IDENTIFIER',
                    name: 'x',
                  },
                  right: {
                    type: 'Numeric Literal',
                    value: 1,
                  },
                },
              },
            ],
          },
          alternate: {
            type: 'Block Statement',
            body: [
              {
                type: 'Expression Statement',
                expression: {
                  type: 'Assignment Expression',
                  operator: '=',
                  left: {
                    type: 'IDENTIFIER',
                    name: 'x',
                  },
                  right: {
                    type: 'Numeric Literal',
                    value: 2,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  );

  // No else part:
  test(
    `

    if (x) {
      x = 1;
    }


    `,
    {
      type: 'Program',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'IDENTIFIER',
            name: 'x',
          },
          consequent: {
            type: 'Block Statement',
            body: [
              {
                type: 'Expression Statement',
                expression: {
                  type: 'Assignment Expression',
                  operator: '=',
                  left: {
                    type: 'IDENTIFIER',
                    name: 'x',
                  },
                  right: {
                    type: 'Numeric Literal',
                    value: 1,
                  },
                },
              },
            ],
          },
          alternate: null,
        },
      ],
    },
  );
};
