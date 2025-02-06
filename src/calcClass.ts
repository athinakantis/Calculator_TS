'use strict';

export class Calculator {
  #valueA: number | undefined;
  #valueB: number | undefined;
  #operation: string | null;

  constructor(operation = null, valueA = undefined, valueB = undefined) {
    this.#valueA = valueA;
    this.#valueB = valueB;
    this.#operation = operation;
  }

  get valueA() {
    return this.#valueA;
  }

  get valueB() {
    return this.#valueB;
  }

  get operation() {
    return this.#operation;
  }

  updateValueA(newValue: number) {
    this.#valueA = newValue;
  }

  updateValueB(newValue: number) {
    this.#valueB = newValue;
  }

  updateOperation(newOp: string) {
    this.#operation = newOp;
  }

  calculate() {
    if (!this.#valueA || !this.#valueB) return;

    switch (this.#operation) {
      case '+':
        return this.#valueA + this.#valueB;
      case '-':
        return this.#valueA - this.#valueB;
      case '/':
        return this.#valueA / this.#valueB;
      case '*':
        return this.#valueA * this.#valueB;
    }
  }

  resetCalculator() {
    this.#valueA = undefined;
    this.#valueB = undefined;
    this.#operation = null;
  }
}
