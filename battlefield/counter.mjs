import { get, set, Store } from '../util/idb.mjs';

export class Counter {
  get counter() {
    return this._counter;
  }
  set counter(value) {
    this._counter = value;
    set('counter', value, this.store);
    document.getElementById(this.output).innerHTML = value.toString();
  }

  async startCounter() {
    this.counter = (await get('counter', this.store)) || 0;
    document.getElementById(this.next).onclick = () => {
      this.counter++;
    };
  }

  constructor(output, next, reset) {
    this.store = new Store('dsa5-counter', 'counter');
    this.output = output;
    this.next = next;
    document.getElementById(reset).onclick = () => {
      this.counter = 0;
    };
  }
}
