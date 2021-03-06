const Calculator = require('../lib/Calculator');

test('add 2 + 2 to equal 4', () => {
  expect(new Calculator(2, 2).addition()).toBe(4);
});

test('add -5 + 2 to equal -3', () => {
  expect(new Calculator(-5, 2).addition()).toBe(-3);
});

test('add 0.2 + 0.22 to equal 0.42', () => {
  expect(new Calculator(0.2, 0.22).addition()).toBeCloseTo(0.42);
});

test('subtract -5 - 2 to equal -7', () => {
  expect(new Calculator(-5, 2).subtract()).toBe(-7);
});

test('subtract 10 - 2 to equal 8', () => {
  expect(new Calculator(10, 2).subtract()).toBe(8);
});

test('multiplication 5 * 2 to equal 10', () => {
  expect(new Calculator(5, 2).multiplication()).toBe(10);
});

test('division 8 / 4 to equal 2', () => {
  expect(new Calculator(8, 4).division()).toBe(2);
});

test('division 2 / 0 to equal Error', () => {
  expect(() => (new Calculator(2, 0).division())).toThrowError(Error);
});

test('percent 20 % 10 to equal 2', () => {
  expect(new Calculator(20, 10).percent()).toBe(2);
});

test('if one or more args isNaN', () => {
  expect(() => (new Calculator('1', 'hek').addition())).toThrowError(Error);
});
