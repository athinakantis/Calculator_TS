import './style.css';
import { add, subtract, divide, multiply } from './calcClass';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<main>
  <div id='calculator'>
  <p id='calculation'></p>
  <input
  readonly
  type='text'
  placeholder='Hello!'
/>
<div class="btns">
  <div class="row-1 row">

    <button data-num-id='1'>1</button>
    <button data-num-id='2'>2</button>
    <button data-num-id='3'>3</button>
    <button data-num-id='/'>/</button>
  </div>
  <div class="row-2 row">
    <button data-num-id='4'>4</button>
    <button data-num-id='5'>5</button>
    <button data-num-id='6'>6</button>
    <button data-num-id='-'>-</button>
  </div>
  <div class="row-3 row">
    <button data-num-id='7'>7</button>
    <button data-num-id='8'>8</button>
    <button data-num-id='9'>9</button>
    <button data-num-id='+'>+</button>
  </div>
  <div class="row-4 row">
    <button data-num-id='0'>0</button>
    <button data-num-id='.'>,</button>
    <button data-num-id='='>=</button>
    <button data-num-id='*'>x</button>
  </div>
  </div>
  </div>
  </main>
`;

type Calc = '+' | '-' | '*' | '/';
let a: number, b: number, operation: Calc;

document.addEventListener('DOMContentLoaded', () => {
    const input: HTMLInputElement = document.querySelector('input')!; // Exclamation mark at the end means 'This will definitely not be null'
    const calcP: HTMLParagraphElement = document.querySelector('#calculation')!;
    const calcBtns: NodeListOf<HTMLButtonElement> =
        document.querySelectorAll('.btns button');

    const handleMouseDown = (e) => {
        animateDown(e);
        const { numId } = e.target.dataset;

        if (numId.match(/[*\-+/]/g)) {
            if (input!.value.length < 1) return;
            operation = numId;
            a = +input!.value.split(numId)[0];

            if (input!.value.match(/[*\-+/]/g)) {
                return (input!.value = input!.value.replace(/[*\-+/]/g, numId));
            }
            return (input!.value += numId);
        }

        numId === '=' ? handleCalculate() : (input!.value += numId);
    };

    const handleCalculate = () => {
        console.log('calculating');

        b = +input!.value.split(operation)[1];

        calcP!.textContent = `${a} ${operation} ${b} =`;
        input!.value = calc(operation).toString();
        console.log(calc(operation));
    };

    const calc = (operation: string): number => {
        switch (operation) {
            case '+':
                return add(a, b);
            case '-':
                return subtract(a, b);
            case '/':
                return divide(a, b);
            case '*':
                return multiply(a, b);
            default:
                return 0;
        }
    };

    // Attach event listeners to buttons
    calcBtns.forEach((btn) => {
        btn.addEventListener('mousedown', handleMouseDown);
        btn.addEventListener('mouseup', animateUp);
    });

    // Add event listeners to keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
            calcP!.textContent = '';
            input!.value = input!.value.substring(0, input!.value.length - 1);
            new Audio(`/audio/click2.mp3`).play();
        }

        let button = document.querySelector(`button[data-num-id='${e.key}']`);

        if (e.key === 'Enter') {
            document
                .querySelector(`button[data-num-id='=']`)
                ?.dispatchEvent(new MouseEvent('mousedown'));
        }

        if (e.key === '.' || e.key === ',') {
            if (input!.value.length - 1 === '.') return;
        }

        if (button) {
            const mousedownEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            button.dispatchEvent(mousedownEvent);
        }
    });

    document.addEventListener('keyup', (e) => {
        let button = document.querySelector(`button[data-num-id='${e.key}']`);

        if (e.key === 'Enter') {
            button = document.querySelector(`button[data-num-id='=']`);
        }

        if (button) {
            const mouseupEvent = new MouseEvent('mouseup', {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            button.dispatchEvent(mouseupEvent);
        }
    });
});

// Animations + Audio cues
interface MouseEventWithTarget extends MouseEvent {
    target: HTMLButtonElement;
}

const animateDown = (e: MouseEventWithTarget): void => {
    e.target.style.backgroundImage = 'url(/button_pressed.png)';
    e.target.style.transform = 'translate(0px, 7px)';
    new Audio(`/audio/click1.mp3`).play();
};

const animateUp = (e: MouseEventWithTarget) => {
    e.target.style.backgroundImage = 'url(/button.png)';
    e.target.style.transform = 'translate(0px, 0px)';
};
