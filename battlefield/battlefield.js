const storage = window.localStorage;

let counter = storage.getItem('counter') || 0;
document.getElementById('counter').innerHTML = storage.getItem('counter').toString();

document.getElementById('next-round').onclick = () => {
  storage.setItem('counter', ++counter);
  document.getElementById('counter').innerHTML = storage.getItem('counter').toString();
}

const fighters = JSON.parse(storage.getItem('fighters')) || [];
fighters.sort((a, b) => b.ini - a.ini).forEach(fighter => {
  const item = document.createElement("li");
  item.appendChild(document.createTextNode(`${fighter.name} (${fighter.ini})`));
  document.getElementById('fighters').appendChild(item);
})
