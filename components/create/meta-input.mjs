import { removeChildren } from '../../util/removeChildren.mjs';

const innerHTML = /* html */ `
<div>
  <label for="name">Name</label>
  <input id="name" />
</div>
<div>
  <label for="spezies">Spezies</label>
  <select name="Spezies" id="spezies">
    <option value="mensch">Mensch</option>
    <option value="halbelf">Halbelf</option>
    <option value="zwerg">Zwerg</option>
    <option value="elf">Elf</option>
  </select>
</div>
<div>
  <label>Kultur</label>
  <select name="Kultur" id="kultur">
  </select>
</div>
<div>
  <label>Profession</label>
  <select name="Profession" id="profession">
    <option value="profan">Profan</option>
    <option value="geweiht">Geweiht</option>
    <option value="magisch">Magisch</option>
  </select>
</div>
`;

const kulturenListe = {
  mensch: [
    'Andergaster',
    'Aranier',
    'Bornländer',
    'Fjarninger',
    'Horasier',
    'Koboldweltler',
    'Maraskaner',
    'Mhanadistani',
    'Mittelreicher',
    'Mohas',
    'Nivesen',
    'Norbarden',
    'Nordaventurier',
    'Nostrier',
    'Novadis',
    'Svellttaler',
    'Südaventurier',
    'Thorwaler',
    'Trollzacker',
    'Zahori',
    'Zyklopäer'
  ],
  zwerg: ['Ambosszwerge', 'Brilliantzwerge', 'Erzzwerge', 'Hügelzwerge', 'Wildzwerge'],
  elf: ['Auelfen', 'Firnelfen', 'Steppenelfen', 'Waldelfen']
};

customElements.define(
  'meta-input',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = innerHTML;
    }

    connectedCallback() {
      this.setKulturOptions();

      this.querySelector('#spezies').addEventListener('change', () => {
        this.setKulturOptions();
      });
    }

    setKulturOptions() {
      const speziesSelect = this.querySelector('#spezies');
      const kulturSelect = this.querySelector('#kultur');
      const spezies = speziesSelect.options[speziesSelect.selectedIndex].value;
      const kulturen = spezies === 'halbelf' ? [...kulturenListe.mensch, ...kulturenListe.elf] : kulturenListe[spezies];

      removeChildren(kulturSelect);

      kulturen.map(kultur => new Option(kultur, kultur.toLowerCase())).forEach(opt => kulturSelect.appendChild(opt));
    }

    on(event, id, cb) {}

    getValue() {}

    clear() {}
  }
);
