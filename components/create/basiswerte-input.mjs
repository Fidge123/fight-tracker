import { speziesListe } from '../../util/spezies.mjs';

const innerHTML = /* html */ `
<number-input id="LeP" title="Lebenspunkte" min="0" max="500"></number-input>
<number-input id="AsP" title="Astralpunkte" min="0" max="100"></number-input>
<number-input id="KaP" title="Karmapunkte" min="0" max="100"></number-input>
<number-input id="INI" title="Initiative" min="0" max="50"></number-input>

<number-input id="SK" title="Seelenkraft" min="0" max="10"></number-input>
<number-input id="ZK" title="Zähigkeit" min="0" max="10"></number-input>
<number-input id="AW" title="Ausweichenwert" min="0" max="25"></number-input>
<number-input id="GS" title="Geschwindigkeit" min="0" max="100" default="8"></number-input>
`;

customElements.define(
  'basiswerte-input',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = innerHTML;
    }

    connectedCallback() {
      let speziesWerte = speziesListe.mensch;

      document.getElementById('meta').on('change', 'all', ({ spezies }) => {
        speziesWerte = speziesListe[spezies];
        this.updateMagieWerte();
      });

      document.getElementById('eigenschaften').on('change', 'all', ({ MU, KL, IN, GE, KO, KK }) => {
        document.getElementById('LeP').setValue(2 * KO + speziesWerte.LeP);
        document.getElementById('INI').setValue(Math.round((MU + GE) / 2));
        document.getElementById('SK').setValue(Math.round((MU + KL + IN) / 6) + speziesWerte.SK);
        document.getElementById('ZK').setValue(Math.round((2 * KO + KK) / 6) + speziesWerte.ZK);
        document.getElementById('AW').setValue(Math.round(GE / 2));
        document.getElementById('GS').setValue(speziesWerte.GS);

        this.updateMagieWerte();
      });
    }

    updateMagieWerte() {
      const [professionsTyp, modifikator, leitEigenschaft] = document
        .getElementById('meta')
        .getValue()
        .profession.split('-');
      const eigenschaften = document.getElementById('eigenschaften').getValue();

      const asp = professionsTyp === 'magisch' ? 20 + (eigenschaften[leitEigenschaft] || 0) / modifikator : 0;
      document.getElementById('AsP').setValue(asp);
      const kap = professionsTyp === 'geweiht' ? 20 + (eigenschaften[leitEigenschaft] || 0) : 0;
      document.getElementById('KaP').setValue(kap);
    }

    getValue() {
      const basiswerte = {};
      for (const input of this.querySelectorAll('number-input')) {
        basiswerte[input.getAttribute('id')] = input.getValue();
      }
      return basiswerte;
    }

    clear() {
      this.querySelectorAll('number-input').forEach(input => input.clear());
    }
  }
);
