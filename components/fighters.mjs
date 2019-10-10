import { createFighter } from '../util/fighter.mjs';

const innerHTML = `
<h1>New Fighter</h1>
<input id="fname" placeholder="name" />
<input id="fini" type="number" placeholder="ini" />
<button id="create">Create</button>

<dsa-fighter-list id='list'></dsa-fighter-list>
<button id="back">Zurück</button>
`;

class Fighters extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    document.getElementById('create').onclick = () => {
      createFighter({ name: document.getElementById('fname').value, ini: document.getElementById('fini').value });
      document.getElementById('list').drawList();
    };

    document.getElementById('back').onclick = () => {
      window.history.back();
    };
  }
}

customElements.define('dsa-fighters', Fighters);
