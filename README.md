# app-rdv

API de prise de rendez-vous du cabinet Kiné Rivage, et sa page publique.

- `npm ci` : installe les dépendances.
- `npm start` : lance l'API (port `PORT`, 3000 par défaut).
- `npm test` : lance les tests (Vitest + Supertest).
- `npm run build` : construit la page publique (`front/`) dans `dist/`.

Routes : `GET /sante`, `GET /creneaux`, `POST /rendez-vous` (`{ "creneau": "lun-09h", "patient": "Léa Martin" }`).
