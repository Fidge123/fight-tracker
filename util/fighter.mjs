import { keys, get, set, Store } from '../util/idb.mjs';

const store = new Store('dsa5-fighters', 'fighters');

export async function getFighters() {
  const names = await keys(store);
  const fighters = await Promise.all(names.map(name => get(name, store)));
  return fighters.sort((a, b) => b.ini - a.ini);
}

export async function createFighter({ name, ini }) {
  return set(name, { name, ini }, store);
}