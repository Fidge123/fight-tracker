import { createFighter, drawListOfFighters } from './fighters.mjs';

drawListOfFighters('fighters');
document.getElementById('create').onclick = () => {
  createFighter({ name: document.getElementById('fname').value, ini: document.getElementById('fini').value });
  drawListOfFighters('fighters');
};
