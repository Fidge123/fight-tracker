const innerHTML = `
<h1>DSA5 Battle Tracker</h1>
<button id="start">Start!</button>
`;

class Welcome extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    document.getElementById('start').onclick = () => {
      location.hash = 'battlefield';
    };
  }
}

customElements.define('dsa-welcome', Welcome);
