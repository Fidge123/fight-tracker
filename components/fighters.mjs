import { createFighter } from '../util/fighter.mjs';

const innerHTML = `
<h1>Neuer Kämpfer</h1>
<div class="new-fighter">
  <div>
    <label for="fname">Name</label>
    <input id="fname" />
  </div>

  <div class="eigenschaften">
    <div>
      <label for="fmu"><abbr title="Mut">MU</abbr></label>
      <input type="number" id="fmu" min="0" max="25" />
    </div>
    <div>
      <label for="fkl"><abbr title="Klugheit">KL</abbr></label>
      <input type="number" id="fkl" min="0" max="25" />
    </div>
    <div>
      <label for="fin"><abbr title="Intuition">IN</abbr></label>
      <input type="number" id="fin" min="0" max="25" />
    </div>
    <div>
      <label for="fch"><abbr title="Charisma">CH</abbr></label>
      <input type="number" id="fch" min="0" max="25" />
    </div>
    <div>
      <label for="fff"><abbr title="Fingerfertigkeit">FF</abbr></label>
      <input type="number" id="fff" min="0" max="25" />
    </div>
    <div>
      <label for="fge"><abbr title="Gewandtheit">GE</abbr></label>
      <input type="number" id="fge" min="0" max="25" />
    </div>
    <div>
      <label for="fko"><abbr title="Konstitution">KO</abbr></label>
      <input type="number" id="fko" min="0" max="25" />
    </div>
    <div>
      <label for="fkk"><abbr title="Körperkraft">KK</abbr></label>
      <input type="number" id="fkk" min="0" max="25" />
    </div>
  </div>

  <div class="abgeleitete-werte">
    <div>
      <label for="flep"><abbr title="Lebenspunkte">LeP</abbr></label>
      <input type="number" id="flep" min="0" max="100" />
    </div>
    <div>
      <label for="fasp"><abbr title="Astralpunkte">AsP</abbr></label>
      <input type="number" id="fasp" min="0" max="100" />
    </div>
    <div>
      <label for="fkap"><abbr title="Karmapunkte">KaP</abbr></label>
      <input type="number" id="fkap" min="0" max="100" />
    </div>
    <div>
      <label for="fsk"><abbr title="Seelenkraft">SK</abbr></label>
      <input type="number" id="fsk" min="0" max="10" />
    </div>
    <div>
      <label for="fzk"><abbr title="Zähigkeit">ZK</abbr></label>
      <input type="number" id="fzk" min="0" max="10" />
    </div>
    <div>
      <label for="faw"><abbr title="Ausweichenwert">AW</abbr></label>
      <input type="number" id="faw" min="0" max="25" />
    </div>
    <div>
      <label for="fini"><abbr title="Initiative">INI</abbr></label>
      <input type="number" id="fini" min="0" max="50" />
    </div>
    <div>
      <label for="fgs"><abbr title="Geschwindigkeit">GS</abbr></label>
      <input type="number" id="fgs" min="0" max="100" />
    </div>
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
