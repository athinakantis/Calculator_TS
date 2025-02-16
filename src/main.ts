import './style.css';
import { animateDown, animateUp } from './utils/animations';
import { MouseEventWithTarget } from './types/types';
import { Calc } from './types/types';
import { Calculator } from './calcClass';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<main>
  <div id='calculator'>
  <p id='calculation'></p>
  <input
  readonly
  id='userInput'
  type='text'
  placeholder='Hello!'
/>
<div class="btns">
  <div class="row-1 row">
    <button data-num-type='num' data-num-id='1'>1</button>
    <button data-num-type='num' data-num-id='2'>2</button>
    <button data-num-type='num' data-num-id='3'>3</button>
    <button data-num-type='calc' data-num-id='/'>/</button>
  </div>
  <div class="row-2 row">
    <button data-num-type='num' data-num-id='4'>4</button>
    <button data-num-type='num' data-num-id='5'>5</button>
    <button data-num-type='num' data-num-id='6'>6</button>
    <button data-num-type='calc' data-num-id='-'>-</button>
  </div>
  <div class="row-3 row">
    <button data-num-type='num' data-num-id='7'>7</button>
    <button data-num-type='num' data-num-id='8'>8</button>
    <button data-num-type='num' data-num-id='9'>9</button>
    <button data-num-type='calc' data-num-id='+'>+</button>
  </div>
  <div class="row-4 row">
    <button data-num-type='num' data-num-id='0'>0</button>
    <button data-num-type='comma' data-num-id='.'>,</button>
    <button data-num-type='calculate' data-num-id='='>=</button>
    <button data-num-type='calc' data-num-id='*'>x</button>
  </div>
  </div>
  </div>
  <footer>
  <p id="attribute">
  Coded and drawn by Athina Kantis
  <a target='_blank' href="https://github.com/athinakantis">Github</a>
  </p>
  </footer>
  </main>
`;
document.addEventListener('DOMContentLoaded', init);

function init() {
    const input = document.querySelector('input');
    const numBtns = document.querySelectorAll(`button[data-num-type='num']`);
    const calcBtns = document.querySelectorAll(`button[data-num-type='calc']`);
    const calcP = document.querySelector('#calculation')!;

    const calculator = new Calculator();

    // Add event listeners for all numerical buttons [1-9]
    calcBtns.forEach((btn) => {
        btn.addEventListener('mousedown', (e) => {
            animateDown(e as MouseEventWithTarget);
            if (input!.value.length < 1) return;
            calculator.a = +input!.value.split(calculator.operation!)[0];
            const operation = btn.getAttribute('data-num-id');
            calculator.operation = operation as Calc;

            const match = input!.value.match(/[*\-+/]/g);

            match
                ? (input!.value = input!.value.replace(
                      match as unknown as string,
                      operation as string
                  ))
                : (input!.value += operation);
        });
        btn.addEventListener('mouseup', (e) =>
            animateUp(e as MouseEventWithTarget)
        );
    });

    // Add event listeners for calc buttons [ / * - + ]
    const calculateBtn = document.querySelector(
        `button[data-num-type='calculate']`
    )!;
    calculateBtn.addEventListener('mousedown', async (e) => {
        animateDown(e as MouseEventWithTarget);
        const valueB = input!.value.split(calculator.operation!)[1];
        if (!valueB) return;
        calculator.b = +valueB;
        const result = calculator.calculate();
        calcP.textContent = `${calculator.a} ${calculator.operation} ${calculator.b} =`;
        input!.value = result!.toString();
        calculator.a = result!;
        calculator.b = null;
        calculator.operation = null;
    });
    calculateBtn.addEventListener('mouseup', (e) =>
        animateUp(e as MouseEventWithTarget)
    );

    numBtns.forEach((btn) => {
        btn.addEventListener('mousedown', (e) => {
            animateDown(e as MouseEventWithTarget);
        });

        btn.addEventListener('mouseup', (e) =>
            animateUp(e as MouseEventWithTarget)
        );
    });

    const comma = document.querySelector(`button[data-num-type='comma']`)!;
    comma.addEventListener('mousedown', (e) => {
        animateDown(e as MouseEventWithTarget);
        if (input!.value.length < 1) return;
        if (input!.value[input!.value.length - 1] === '.') return;
        input!.value += '.';
    });
    comma.addEventListener('mouseup', (e) =>
        animateUp(e as MouseEventWithTarget)
    );

    numBtns.forEach((btn) => {
        btn.addEventListener('mousedown', (e) => {
            animateDown(e as MouseEventWithTarget);
            if (calcP.textContent!.length > 0) calcP.textContent = '';
            input!.value += btn.getAttribute('data-num-id');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            new Audio(`/audio/click2.mp3`).play();
            if (input!.value.length < 2) {
                reset();
            }
            input!.value = input!.value.substring(0, input!.value.length - 1);
            calcP.textContent = '';
        }

        if (e.key === 'Enter') {
            calculateBtn.dispatchEvent(new MouseEvent('mousedown'));
        }

        const button = document.querySelector(`button[data-num-id="${e.key}"]`);
        button?.dispatchEvent(new MouseEvent('mousedown'));
    });

    document.addEventListener('keyup', (e) => {
        if (e.key === 'Enter')
            calculateBtn.dispatchEvent(new MouseEvent('mouseup'));
        const button = document.querySelector(`button[data-num-id='${e.key}']`);
        button?.dispatchEvent(new MouseEvent('mouseup'));
    });

    const reset = () => {
        calculator.reset();
        input!.value = '';
        calcP.textContent = '';
    };
}
