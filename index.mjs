import { load } from './util/load.mjs';
import './components/index.mjs';

navigate();
window.onhashchange = navigate;

function navigate() {
  switch (location.hash) {
    case '#battlefield':
      load('battlefield');
      break;
    case '#fighters':
      load('fighters');
      break;
    case '#welcome':
    default:
      load('welcome');
      break;
  }
}
