import { removeChildren } from './removeChildren.mjs';

const contentRoot = document.getElementById('content');

export function load(id) {
  removeChildren(contentRoot);
  const CustomElement = customElements.get(`dsa-${id}`);
  const el = new CustomElement();
  contentRoot.appendChild(el);
}
