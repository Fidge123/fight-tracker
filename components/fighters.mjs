import { createFighter } from '../util/fighter.mjs';

const innerHTML = `
<h1>Neuer Kämpfer</h1>
<div class="new-fighter">
  <label for="fname">Name</label>
  <input id="fname" />
  <label for="fini">Initiative</label>
  <input id="fini" type="number" placeholder="INI" />
  <button id="create">Erstellen</button>
</div>

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
