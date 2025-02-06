import './style.css';
import { Calculator } from './calcClass';

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

document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input');
  const calculator = new Calculator();
  const calcBtns = document.querySelectorAll('.btns button');
  const calcP = document.querySelector('#calculation');

  const handleMouseDown = (e) => {
    animateDown(e);
    const { numId } = e.target.dataset;

    if (numId.match(/[*\-+/]/g)) {
      if (input!.value.length < 1) return;
      calculator.updateOperation(numId);
      calculator.updateValueA(+input!.value.split(numId)[0]);
      console.log(calculator.valueA);

      if (input!.value.match(/[*\-+/]/g)) {
        return (input!.value = input!.value.replace(/[*\-+/]/g, numId));
      }
      return (input!.value += numId);
    }

    numId === '=' ? handleCalculate() : (input!.value += numId);
  };

  const handleCalculate = () => {
    const match = input!.value.match(/(?<=[+\-*/])[^+\-*/=]+(?==)/g);
    if (!match) return;

    calculator.updateValueB(+match[0]);
    console.log(calculator.valueA);
    console.log(calculator.valueB);

    calcP!.textContent = `${calculator.valueA} ${calculator.operation} ${calculator.valueB} =`
    input!.value = calculator.calculate()!.toString();
  };


  // Attach event listeners to buttons
  calcBtns.forEach((btn) => {
    btn.addEventListener('mousedown', handleMouseDown);
    btn.addEventListener('mouseup', animateUp);
  });

  // Add event listeners to keyboard events
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      input!.value = input!.value.substring(0, input!.value.length - 1);
      new Audio(`/audio/click2.mp3`).play();
    }

    let button = document.querySelector(`button[data-num-id='${e.key}']`);

    if (e.key === 'Enter') {
      button = document.querySelector(`button[data-num-id='=']`);
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
