// Les créneaux de la semaine du cabinet Kiné Rivage.
// Utilisé par l'API (src/app.js) et par la page publique (front/src/main.js).
export const CRENEAUX = [
  { id: 'lun-09h', jour: 'Lundi', heure: '09:00' },
  { id: 'lun-14h', jour: 'Lundi', heure: '14:00' },
  { id: 'mar-10h', jour: 'Mardi', heure: '10:00' },
  { id: 'mer-09h', jour: 'Mercredi', heure: '09:00' },
  { id: 'jeu-16h', jour: 'Jeudi', heure: '16:00' }
];

export function trouverCreneau(id) {
  return CRENEAUX.find((c) => c.id === id);
}
