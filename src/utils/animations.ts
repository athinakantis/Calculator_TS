import { MouseEventWithTarget } from '../types/types';

// Animations + Audio cues
export const animateDown = (e: MouseEventWithTarget): void => {
  e.target.style.backgroundImage = 'url(/button_pressed.png)';
  e.target.style.transform = 'translate(0px, 7px)';
  new Audio(`/audio/click1.mp3`).play();
};

export const animateUp = (e: MouseEventWithTarget) => {
  e.target.style.backgroundImage = 'url(/button.png)';
  e.target.style.transform = 'translate(0px, 0px)';
};
