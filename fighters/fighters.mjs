import { get, set } from '../util/idb.mjs';

export async function getFighters() {
  const fighters = (await get('fighters')) || [];
  return fighters.sort((a, b) => b.ini - a.ini);
}
