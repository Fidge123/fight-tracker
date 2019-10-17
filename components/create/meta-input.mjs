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
    <option value="geweiht-KL">Geweiht (Praios, Hesinde, Travia, Nandus)</option>
    <option value="geweiht-MU">Geweiht (Rondra, Boron, Firun, Kor, Swafnir, Namenloser)</option>
    <option value="geweiht-IN">Geweiht (Phex, Peraine, Ingerimm, Aves)</option>
    <option value="geweiht-CH">Geweiht (Efferd, Tsa, Rahja, Ifirn)</option>
    <option value="magisch-1-KL">Gildenmagier, Druiden</option>
    <option value="magisch-2-KL">Zauberalchimisten</option>
    <option value="magisch-1-CH">Hexen, Scharlatane, Geoden</option>
    <option value="magisch-2-CH">Zauberbarden, Zaubertänzer</option>
    <option value="magisch-1-IN">Elfen, Schelme, Zibilijas</option>
    <option value="magisch-2-IN">Animisten</option>
    <option value="magisch-1">Magiedilettanten</option>
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
