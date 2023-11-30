  */
 "hello";
 // COmment
  42;`;
    const ast = parser.parse(program);
    console.log(JSON.stringify(ast, null, 2));
}
exec();

function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}

tests.forEach(testRun => testRun(test));
statementTests.forEach(testRun => testRun(test));