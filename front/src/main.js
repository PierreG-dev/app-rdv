import { CRENEAUX } from '../../src/creneaux.js';

// Les créneaux entrent dans la page au build : aucun appel à l'API.
const liste = document.querySelector('#creneaux');
for (const c of CRENEAUX) {
  const li = document.createElement('li');
  li.textContent = `${c.jour} ${c.heure}`;
  liste.append(li);
}

document.querySelector('#version').textContent = `Version ${import.meta.env.VITE_VERSION || 'dev'}`;

// Rappel par SMS : le service SMS demande la clé du cabinet à chaque envoi.
const bouton = document.createElement('button');
bouton.textContent = 'Recevoir un rappel par SMS';
bouton.addEventListener('click', () => {
  fetch('https://sms.example.com/envoyer', {
    method: 'POST',
    headers: { Authorization: `Bearer ${import.meta.env.VITE_CLE_SMS}` }
  });
});
document.querySelector('main').append(bouton);
