/**
 * Building a Parser from scratch
 *
 * Course info: http://dmitrysoshnikov.com/courses/parser-from-scratch/
 *
 * (C) 2020-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

module.exports = test => {
  test('x > 0;', {
    type: 'Program',
    body: [
      {
        type: 'Expression Statement',
        expression: {
          type: 'Binary Expression',
          operator: '>',
          left: {
            type: 'IDENTIFIER',
            name: 'x',
          },
          right: {
            type: 'Numeric Literal',
            value: 0,
          },
        },
      },
    ],
  });
};
