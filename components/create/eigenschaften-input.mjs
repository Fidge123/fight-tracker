const innerHTML = /* html */ `
<number-input id="MU" title="Mut" min="0" max="25"></number-input>
<number-input id="KL" title="Klugheit" min="0" max="25"></number-input>
<number-input id="IN" title="Intuition" min="0" max="25"></number-input>
<number-input id="CH" title="Charisma" min="0" max="25"></number-input>

<number-input id="FF" title="Fingerfertigkeit" min="0" max="25"></number-input>
<number-input id="GE" title="Gewandtheit" min="0" max="25"></number-input>
<number-input id="KO" title="Konstitution" min="0" max="25"></number-input>
<number-input id="KK" title="Körperkraft" min="0" max="25"></number-input>
`;

customElements.define(
  'eigenschaften-input',
  class extends HTMLElement {
    constructor() {
      super();
      this.innerHTML = innerHTML;
    }

    on(event, id, cb) {
      if (id === 'all') {
        for (const input of this.querySelectorAll('number-input')) {
          input.on(event, () => {
            cb(this.getValue());
          });
        }
      } else {
        this.querySelector(`#${id}`).on(event, cb);
      }
    }

    getValue() {
      const eigenschaften = {};
      for (const input of this.querySelectorAll('number-input')) {
        eigenschaften[input.getAttribute('id')] = input.getValue();
      }
      return eigenschaften;
    }

    clear() {
      this.querySelectorAll('number-input').forEach(input => input.clear());
    }
  }
);
