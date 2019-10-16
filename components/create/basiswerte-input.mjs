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
      const spezies = {
        LeP: 5,
        SK: -5,
        ZK: -5,
        GS: 8
      };
      document.getElementById('eigenschaften').on('change', 'all', ({ MU, KL, IN, GE, KO, KK }) => {
        document.getElementById('LeP').setValue(2 * KO + spezies.LeP);
        document.getElementById('AsP').setValue(0);
        document.getElementById('KaP').setValue(0);
        document.getElementById('INI').setValue(Math.round((MU + GE) / 2));
        document.getElementById('SK').setValue(Math.round((MU + KL + IN) / 6) + spezies.SK);
        document.getElementById('ZK').setValue(Math.round((2 * KO + KK) / 6) + spezies.ZK);
        document.getElementById('AW').setValue(Math.round(GE / 2));
        document.getElementById('GS').setValue(spezies.GS);
      });
    }

    getValue() {
      const basiswerte = {};
      for (const input of this.querySelectorAll('number-input')) {
        basiswerte[input.getAttribute('id')] = input.getValue();
      }
      return basiswerte;
    }

    clear() {
      for (const input of this.querySelectorAll('number-input')) {
        input.value = null;
      }
    }
  }
);
