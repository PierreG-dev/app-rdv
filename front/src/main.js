import { CRENEAUX } from '../../src/creneaux.js';

// Les créneaux entrent dans la page au build : aucun appel à l'API.
const liste = document.querySelector('#creneaux');
for (const c of CRENEAUX) {
  const li = document.createElement('li');
  li.textContent = `${c.jour} ${c.heure}`;
  liste.append(li);
}

document.querySelector('#version').textContent = `Version ${import.meta.env.VITE_VERSION || 'dev'}`;
