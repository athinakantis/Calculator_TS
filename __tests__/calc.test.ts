import { Calculator } from '../src/calcClass';

describe('Calculator constructor is functional', () => {
  test('constructor with no parameters', () => {
    const calculator = new Calculator();
    expect(calculator).toBeInstanceOf(Calculator);
  });

  test('constructor works with parameters', () => {
    const calculator = new Calculator(10, 5, '+');
    expect(calculator).toBeInstanceOf(Calculator);
  });
});

describe('Test getters and setters', () => {
  test('Testing getters', () => {
    const calculator = new Calculator(10, 5);

    expect(calculator.a).toBe(10);
    expect(calculator.b).toBe(5);
  });

  test('Testing setters', () => {
    const calculator = new Calculator();

    calculator.a = 5;
    calculator.b = 10;
    expect(calculator.a).toBe(5);
    expect(calculator.b).toBe(10);
  });

  test('Getters with no values should throw exception `Missing input`', () => {
    const calculator = new Calculator();
    expect(() => calculator.a).toThrow('Missing input');
    expect(() => calculator.b).toThrow('Missing input');
  });
});

describe('Testing Calculations: Addition', () => {
  const testCases = [
    [5, 3, 8],
    [10, -2, 8],
    [0, 5, 5],
    [7, 0, 7],
    [-3, -7, -10],
  ];

  test.each(testCases)('%s + %s = %s', (a, b, result) => {
    const calculator = new Calculator(a, b, '+');
    expect(calculator.calculate()).toEqual(result);
  });
});

describe('Testing calculations: Subtraction', () => {
  const testCases = [
    [10, 3, 7],
    [5, 10, -5],
    [0, 8, -8],
    [9, 0, 9],
    [-5, -3, -2],
  ];

  test.each(testCases)('%s - %s = %s', (a, b, result) => {
    const calculator = new Calculator(a, b, '-');
    expect(calculator.calculate()).toEqual(result);
  });
});

describe('Testing calculations: Division', () => {
  const testCases = [
    [20, 4, 5],
    [9, 2, 4.5],
    [10, -2, -5],
    [-10, 2, -5],
    [0, 5, 0],
  ];

  test.each(testCases)('%s / %s = %s', (a, b, result) => {
    const calculator = new Calculator(a, b, '/');
    expect(calculator.calculate()).toEqual(result);
  });

  test('Dividing by zero throws error `Cannot divide by zero`', () => {
    const calculator = new Calculator(5, 0, '/')
    expect(() => calculator.calculate()).toThrow(`Cannot divide by zero`)
  })
});

describe('Testing calculations: Multiplication', () => {
  const testCases = [
    [3, 4, 12],
    [5, -3, -15],
    [-4, -2, 8],
    [0, 9, 0],
    [7, 0, 0],
  ];

  test.each(testCases)('%s, %s, %s', (a, b, result) => {
    const calculator = new Calculator(a, b, '*');
    expect(calculator.calculate()).toEqual(result);
  });
});
