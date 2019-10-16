import { removeChildren } from '../../util/removeChildren.mjs';
import { kulturenListe } from '../../util/kultur.mjs';

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
    <option value="geweiht-KL">Geweiht (Praios, Hesinde)</option>
    <option value="geweiht-MU">Geweiht (Rondra, Boron)</option>
    <option value="geweiht-IN">Geweiht (Phex, Peraine)</option>
    <option value="magisch-KL">Gildenmagier</option>
    <option value="magisch-CH">Hexen</option>
    <option value="magisch-IN">Elfen</option>
  </select>
</div>
`;

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

      this.on('change', 'spezies', () => {
        if (this.getSelectedValue('#spezies') === 'elf') {
          const options = [...this.querySelector('#profession').options];
          this.querySelector('#profession').selectedIndex = options.findIndex(option => option.value === 'magisch-IN');
          this.querySelector('#profession').disabled = true;
        } else {
          this.querySelector('#profession').disabled = false;
        }
      });
    }

    setKulturOptions() {
      const kulturSelect = this.querySelector('#kultur');
      const spezies = this.getSelectedValue('#spezies');
      const kulturen = spezies === 'halbelf' ? [...kulturenListe.mensch, ...kulturenListe.elf] : kulturenListe[spezies];

      removeChildren(kulturSelect);

      kulturen.map(kultur => new Option(kultur, kultur.toLowerCase())).forEach(opt => kulturSelect.appendChild(opt));
    }

    on(event, id, cb) {
      if (id === 'all') {
        for (const input of this.querySelectorAll('input, select')) {
          input.addEventListener(event, () => {
            cb(this.getValue());
          });
        }
      } else {
        this.querySelector(`#${id}`).addEventListener(event, cb);
      }
    }

    getValue() {
      return {
        name: this.querySelector('#name').value,
        spezies: this.getSelectedValue('#spezies'),
        kultur: this.getSelectedValue('#kultur'),
        profession: this.getSelectedValue('#profession')
      };
    }

    clear() {
      this.querySelector('#name').value = null;
      this.querySelector('#spezies').selectedIndex = 0;
      this.querySelector('#kultur').selectedIndex = 0;
      this.querySelector('#profession').selectedIndex = 0;
    }

    getSelectedValue(id) {
      const select = this.querySelector(id);
      return select.options[select.selectedIndex].value;
    }
  }
);
