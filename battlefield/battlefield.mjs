import { Counter } from './counter.mjs';

const counter = new Counter('counter', 'next-round', 'reset');
counter.startCounter();

const fighters = JSON.parse(window.localStorage.getItem('fighters')) || [];
fighters.sort((a, b) => b.ini - a.ini).forEach(fighter => {
  const item = document.createElement("li");
  item.appendChild(document.createTextNode(`${fighter.name} (${fighter.ini})`));
  document.getElementById('fighters').appendChild(item);
})
