const innerHTML = `
<dsa-counter></dsa-counter>
<dsa-fighter-list></dsa-fighter-list>
<button id="add">Hinzufügen / Ändern</button>
`;

class Battlefield extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = innerHTML;
  }

  connectedCallback() {
    document.getElementById('add').onclick = () => {
      location.hash = 'fighters';
    };
  }
}

customElements.define('dsa-battlefield', Battlefield);
