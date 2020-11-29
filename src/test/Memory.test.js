const Calculator = require('../lib/Calculator');

test('add 2 + 2 to equal 4', () => {
  expect(new Calculator(2, 2).addition()).toBe(4)
});
