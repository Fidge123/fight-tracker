import { keys, get, set, Store } from '../util/idb.mjs';
import { clearList } from '../util/shared.mjs';

const store = new Store('dsa5-fighters', 'fighters');

export async function getFighters() {
  const names = await keys(store);
  const fighters = await Promise.all(names.map(name => get(name, store)));
  return fighters.sort((a, b) => b.ini - a.ini);
}

export async function createFighter({ name, ini }) {
  return set(name, { name, ini }, store);
}

export async function drawListOfFighters(id) {
  clearList(document.getElementById(id));
  const fighters = await getFighters();
  fighters.forEach(fighter => {
    const item = document.createElement('li');
    item.appendChild(document.createTextNode(`${fighter.name} (${fighter.ini})`));
    document.getElementById(id).appendChild(item);
  });
}
