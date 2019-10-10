import { Counter } from './counter.mjs';
import { getFighters } from '../fighters/fighters.mjs';

const counter = new Counter('counter', 'next-round', 'reset');
counter.startCounter();

getFighters().then(fighters => {
  fighters.forEach(fighter => {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(`${fighter.name} (${fighter.ini})`));
    document.getElementById('fighters').appendChild(item);
  });
});
