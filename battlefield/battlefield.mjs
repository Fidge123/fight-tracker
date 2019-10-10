import { Counter } from './counter.mjs';
import { drawListOfFighters } from '../fighters/fighters.mjs';

const counter = new Counter('counter', 'next-round', 'reset');
counter.startCounter();

drawListOfFighters('fighters');
