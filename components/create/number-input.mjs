const style = /* html */ `
<style>
  input {
    height: 2rem;
    min-width: 4rem;
    padding: 0.25rem 0.25rem 0.25rem 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d1d1;
    box-shadow: none;
    box-sizing: border-box;
  }

  label {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  abbr {
    text-decoration: none;
  }
</style>
`;

customElements.define(
  'number-input',
  class extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = /* html */ `
        ${style}
        <label for="${this.getAttribute('id')}">
          <abbr title="${this.getAttribute('title')}">${this.getAttribute('id')}</abbr>
        </label>
        <input type="number" id="${this.getAttribute('id')}" min="${this.getAttribute('min')}" max="${this.getAttribute('max')}" />
      `;
    }

    connectedCallback() {
      this.inputRef = this.shadowRoot.querySelector('#' + this.getAttribute('id'));
      this.clear();
    }

    on(event, cb) {
      this.inputRef.addEventListener(event, cb);
      return this;
    }

    getValue() {
      return parseInt(this.inputRef.value, 10) || 0;
    }

    setValue(value) {
      this.inputRef.value = value;
      return this;
    }

    clear() {
      this.inputRef.value = this.getAttribute('default') || null;
    }
  }
);
