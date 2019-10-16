import { createFighter } from '../../util/fighter.mjs';

const innerHTML = /* html */ `
  <div class="new-fighter">
    <div>
      <label for="fname">Name</label>
      <input id="fname" />
      <!-- label for="fspezies">Spezies</label>
      <select name="Spezies" id="fspezies">
        <option value="mensch">Mensch</option>
        <option value="zwerg">Zwerg</option>
        <option value="elf">Elf</option>
      </select>
      <label>Kultur</label>
      <label>Profession (profan, geweiht, magisch)</label -->
    </div>

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
      name: document.getElementById('fname').value,
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

    try {
      await createFighter(fighter);
      this.clearForm();
      document.getElementById('list').drawList();
    } catch (error) {
      alert('Ein Fehler ist aufgetreten!');
    }
  }

  clearForm() {
    document.getElementById('fname').value = null;
    for (const input of document.getElementsByTagName('number-input')) {
      input.clear();
    }
  }
}

customElements.define('dsa-create-fighter', CreateFighter);
