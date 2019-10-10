import { get, set } from '../util/idb.mjs';

export class Counter {
  get counter() {
    return this._counter;
  }
  set counter(value) {
    this._counter = value;
    set('counter', value);
    document.getElementById(this.output).innerHTML = value.toString();
  }

  async startCounter() {
    this.counter = (await get('counter')) || 0;
    document.getElementById(this.next).onclick = () => {
      this.counter++;
    };
  }

  constructor(output, next, reset) {
    this.output = output;
    this.next = next;
    document.getElementById(reset).onclick = () => {
      this.counter = 0;
    };
  }
}
