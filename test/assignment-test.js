/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

module.exports = test => {
  // Simple assignment:
  test(`x = 42;`, {
    type: 'Program',
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
            value: 42,
          },
        },
      },
    ],
  });

  // Chained assignment:
  test(`x = y = 42;`, {
    type: 'Program',
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
            type: 'Assignment Expression',
            operator: '=',
            left: {
              type: 'IDENTIFIER',
              name: 'y',
            },
            right: {
              type: 'Numeric Literal',
              value: 42,
            },
          },
        },
      },
    ],
  });
};
