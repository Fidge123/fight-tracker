import { removeChildren } from '../util/removeChildren.mjs';
import { getFighters } from '../util/fighter.mjs';

const innerHTML = /* html */ `
<h1>Kämpferliste:</h1>
<ol id="fighters"></ol>
`;

class FighterList extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    this.addEventListener('new-fighter', () => {
      this.drawList();
    });
    this.drawList();
  }

  async drawList() {
    removeChildren(document.getElementById('fighters'));
    const fighters = await getFighters();
    fighters.forEach(fighter => {
      const item = document.createElement('li');
      item.appendChild(document.createTextNode(`${fighter.meta.name} (${fighter.basiswerte.INI})`));
      document.getElementById('fighters').appendChild(item);
    });
  }
}

customElements.define('dsa-fighter-list', FighterList);
