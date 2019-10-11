import { createFighter } from '../util/fighter.mjs';

const innerHTML = `
<h1>Neuer Kämpfer</h1>
<div class="new-fighter">
  <div>
    <label for="fname">Name</label>
    <input id="fname" />
  </div>

  <div class="eigenschaften">
    <number-input id="MU" title="Mut" min="0" max="25"></number-input>
    <number-input id="KL" title="Klugheit" min="0" max="25"></number-input>
    <number-input id="IN" title="Intuition" min="0" max="25"></number-input>
    <number-input id="CH" title="Charisma" min="0" max="25"></number-input>

    <number-input id="FF" title="Fingerfertigkeit" min="0" max="25"></number-input>
    <number-input id="GE" title="Gewandtheit" min="0" max="25"></number-input>
    <number-input id="KO" title="Konstitution" min="0" max="25"></number-input>
    <number-input id="KK" title="Körperkraft" min="0" max="25"></number-input>
  </div>

  <div class="abgeleitete-werte">
    <number-input id="LeP" title="Lebenspunkte" min="0" max="500"></number-input>
    <number-input id="AsP" title="Astralpunkte" min="0" max="100"></number-input>
    <number-input id="KaP" title="Karmapunkte" min="0" max="100"></number-input>
    <number-input id="SK" title="Seelenkraft" min="0" max="10"></number-input>

    <number-input id="ZK" title="Zähigkeit" min="0" max="10"></number-input>
    <number-input id="AW" title="Ausweichenwert" min="0" max="25"></number-input>
    <number-input id="INI" title="Initiative" min="0" max="50"></number-input>
    <number-input id="GS" title="Geschwindigkeit" min="0" max="100"></number-input>
  </div>
</div>
<button id="create">Erstellen</button>

<dsa-fighter-list id="list"></dsa-fighter-list>
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
customElements.define(
  'number-input',
  class extends HTMLElement {
    constructor() {
      super();
      const id = 'f' + this.getAttribute('id');
      this.innerHTML = `
        <label for="${id}"><abbr title="${this.getAttribute('title')}">${this.getAttribute('id')}</abbr></label>
        <input type="number" id="${id}" min="${this.getAttribute('min')}" max="${this.getAttribute('max')}" />
      `;
    }
  }
);
