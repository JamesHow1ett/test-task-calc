const Calculator = require('../lib/Calculator');

test('add 2 + 2 to equal 4', () => {
  expect(new Calculator(2, 2).addition()).toBe(4);
});

test('add -5 + 2 to equal -3', () => {
  expect(new Calculator(-5, 2).addition()).toBe(-3);
})

test('subtract -5 - 2 to equal -7', () => {
  expect(new Calculator(-5, 2).subtract()).toBe(-7);
})

test('subtract 10 - 2 to equal 8', () => {
  expect(new Calculator(10, 2).subtract()).toBe(8);
})

test('multiplication 5 * 2 to equal 10', () => {
  expect(new Calculator(5, 2).multiplication()).toBe(10);
})

test('division 8 / 4 to equal 2', () => {
  expect(new Calculator(8, 4).division()).toBe(2);
})

test('division 2 / 0 to equal Error', () => {
  expect(new Calculator(2, 0).division()).toMatch(/Error/);
})

test('percent 20 % 10 to equal 2', () => {
  expect(new Calculator(20, 10).percent()).toBe(2);
})
