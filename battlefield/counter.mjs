export class Counter {
  get counter() {
    return this._counter;
  }
  set counter(value) {
    this._counter = value;
    window.localStorage.setItem('counter', value);
    document.getElementById(this.output).innerHTML = value.toString();
  }

  startCounter() {
    this.counter = window.localStorage.getItem('counter') || 0;
    document.getElementById(this.next).onclick = () => {
      this.counter++;
    }
  }

  constructor(output, next, reset) {
    this.output = output;
    this.next = next;
    document.getElementById(reset).onclick = () => {
      this.counter = 0;
    }
  }
}
