import { createFighter } from '../../util/fighter.mjs';

const innerHTML = /* html */ `
<div class="new-fighter">
  <meta-input id="meta"></meta-input>
  <eigenschaften-input id="eigenschaften"></eigenschaften-input>
  <basiswerte-input id="basiswerte"></basiswerte-input>
</div>
<button id="create">Erstellen</button>
`;

class CreateFighter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    document.getElementById('create').onclick = () => this.createCallback();
  }

  async createCallback() {
    const fighter = {
      meta: document.getElementById('meta').getValue(),
      eigenschaften: document.getElementById('eigenschaften').getValue(),
      basiswerte: document.getElementById('basiswerte').getValue(),
      waffen: {},
      ruestung: {},
      vorteile: [],
      nachteile: [],
      sonderfertigkeiten: [],
      talente: [],
      zauber: []
    };

    if (fighter.meta.name) {
      try {
        await createFighter(fighter);
        this.clearForm();
        document.getElementById('list').drawList();
      } catch (error) {
        alert('Ein Fehler ist aufgetreten!');
      }
    }
  }

  clearForm() {
    this.querySelectorAll('.new-fighter > *').forEach(input => input.clear());
  }
}

customElements.define('dsa-create-fighter', CreateFighter);
