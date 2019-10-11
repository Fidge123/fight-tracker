const innerHTML = /* html */ `
<h1>Neuer Kämpfer</h1>
<dsa-create-fighter></dsa-create-fighter>
<dsa-load-fighter></dsa-load-fighter>
<dsa-fighter-list id="list"></dsa-fighter-list>
<button id="back">Zurück</button>
`;

class Fighters extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    document.getElementById('back').onclick = () => {
      window.history.back();
    };
  }
}

customElements.define('dsa-fighters', Fighters);
