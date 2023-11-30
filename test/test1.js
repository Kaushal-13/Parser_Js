const { Parser } = require('../Parser');
const parser = new Parser();
const assert = require('assert')


const tests = [require('./statement-tests'),
require('./Block-tests'),
require('./test2'),
require('./mathematical-tests'),
require('./assignment-test'),
require('./variable-test'),
require('./if-test'),
require('./relational-test')
];


function exec() {
  const program = `x = 5 > 10;
  `;
  const ast = parser.parse(program);
  console.log(JSON.stringify(ast, null, 2));
}


exec();
function test(program, expected) {
  const ast = parser.parse(program);
  assert.deepEqual(ast, expected);
}

tests.forEach(testRun => testRun(test));


console.log("All assertions passed");