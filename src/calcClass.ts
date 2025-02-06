import { Calc } from './types/types';

/*
A simple calculator with some error handling

*/
export class Calculator {
  #a;
  #b;
  #operation;

  constructor(
    a: number | null = null,
    b: number | null = null,
    operation: Calc | null = null
  ) {
    this.#a = a;
    this.#b = b;
    this.#operation = operation;
  }

  get a() {
    if (this.#a === null) {
      throw new Error('Missing input');
    }
    return this.#a;
  }

  get b() {
    if (this.#b === null) {
      throw new Error('Missing input');
    }
    return this.#b;
  }

  get operation() {
    return this.#operation as Calc;
  }

  set a(value: number | null) {
    this.#a = value;
  }

  set b(value: number | null) {
    this.#b = value;
  }

  set operation(s: Calc | null) {
    this.#operation = s;
  }

  calculate() {
    if (this.#a === null || this.#b === null) return;

    switch (this.#operation) {
      case '+':
        return this.#a + this.#b;
      case '-':
        return this.#a - this.#b;
      case '/':
        if (this.#b === 0) {
          throw new Error('Cannot divide by zero')
        }
        return this.#a / this.#b;
      case '*':
        return this.#a * this.#b;
    }
  }

  reset() {
    this.#a = null
    this.#b = null
    this.#operation = null
  }
}
