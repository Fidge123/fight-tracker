import { keys, get, set, del, clear, Store } from '../util/idb.mjs';

const store = new Store('dsa5-fighters', 'fighters');

export async function getFighters() {
  const names = await keys(store);
  const fighters = await Promise.all(names.map(name => get(name, store)));
  return fighters.sort((a, b) => b.basiswerte.INI - a.basiswerte.INI);
}

export async function createFighter({ meta, eigenschaften, basiswerte }) {
  return set(meta.name, { meta, eigenschaften, basiswerte }, store);
}

export async function deleteFighter(name) {
  return del(name, store);
}

export async function removeAll() {
  return clear(store);
}
