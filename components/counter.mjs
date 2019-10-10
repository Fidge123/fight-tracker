import { get, set, Store } from '../util/idb.mjs';

const innerHTML = `
<div>
  Runde <span id="counter"></span>
  <button id="next-round">Nächste Runde</button>
  <button id="reset">Reset</button>
</div>
`;

class Counter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    this.store = new Store('dsa5-counter', 'counter');
    this.startCounter();
    document.getElementById('reset').onclick = () => {
      this.counter = 0;
    };
  }

  get counter() {
    return this._counter;
  }

  set counter(value) {
    this._counter = value;
    set('counter', value, this.store);
    document.getElementById('counter').innerHTML = value.toString();
  }

  async startCounter() {
    this.counter = (await get('counter', this.store)) || 0;
    document.getElementById('next-round').onclick = () => {
      this.counter++;
    };
  }
}

customElements.define('dsa-counter', Counter);
