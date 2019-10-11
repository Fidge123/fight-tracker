import { createFighter } from '../util/fighter.mjs';

const innerHTML = /* html */ `
  <div class="new-fighter">
    <div>
      <label for="fname">Name</label>
      <input id="fname" />
    </div>

    <div id="eigenschaften">
      <number-input id="MU" title="Mut" min="0" max="25"></number-input>
      <number-input id="KL" title="Klugheit" min="0" max="25"></number-input>
      <number-input id="IN" title="Intuition" min="0" max="25"></number-input>
      <number-input id="CH" title="Charisma" min="0" max="25"></number-input>

      <number-input id="FF" title="Fingerfertigkeit" min="0" max="25"></number-input>
      <number-input id="GE" title="Gewandtheit" min="0" max="25"></number-input>
      <number-input id="KO" title="Konstitution" min="0" max="25"></number-input>
      <number-input id="KK" title="Körperkraft" min="0" max="25"></number-input>
    </div>

    <div id="abgeleitete-werte">
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
`;

class CreateFighter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    document.getElementById('create').onclick = () => {
      const fighter = {
        name: document.getElementById('fname').value,
        eigenschaften: {},
        abgeleiteteWerte: {},
        waffen: {},
        ruestung: {},
        vorteile: [],
        nachteile: [],
        sonderfertigkeiten: [],
        talente: [],
        zauber: []
      };

      for (const input of document.getElementById('eigenschaften').getElementsByTagName('number-input')) {
        fighter.eigenschaften[input.getAttribute('id')] = input.getValue();
      }

      for (const input of document.getElementById('abgeleitete-werte').getElementsByTagName('number-input')) {
        fighter.abgeleiteteWerte[input.getAttribute('id')] = input.getValue();
      }

      createFighter(fighter);
      document.getElementById('list').drawList();
    };
  }
}

customElements.define('dsa-create-fighter', CreateFighter);
customElements.define(
  'number-input',
  class extends HTMLElement {
    constructor() {
      super();
      const id = 'f' + this.getAttribute('id');
      this.innerHTML = /* html */ `
        <label for="${id}"><abbr title="${this.getAttribute('title')}">${this.getAttribute('id')}</abbr></label>
        <input type="number" id="${id}" min="${this.getAttribute('min')}" max="${this.getAttribute('max')}" />
      `;
    }

    getValue() {
      return document.getElementById('f' + this.getAttribute('id')).value;
    }
  }
);
