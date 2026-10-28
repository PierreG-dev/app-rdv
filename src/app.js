import express from 'express';
import { CRENEAUX, trouverCreneau } from './creneaux.js';

// journal : fonction qui reçoit chaque ligne (console.log par défaut).
export function creerApp({ journal = console.log } = {}) {
  const app = express();
  const rendezVous = []; // stockage en mémoire

  // Une ligne par requête : <date ISO> <méthode> <chemin> <statut> <durée>ms
  app.use((req, res, next) => {
    const debut = Date.now();
    res.on('finish', () => {
      journal(`${new Date().toISOString()} ${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - debut}ms`);
    });
    next();
  });

  app.use(express.json());

  app.get('/sante', (req, res) => {
    res.json({ statut: 'ok', version: process.env.VERSION || 'dev' });
  });

  app.get('/creneaux', (req, res) => {
    res.json(CRENEAUX.map((c) => ({ ...c, libre: !rendezVous.some((r) => r.creneau === c.id) })));
  });

  app.post('/rendez-vous', (req, res) => {
    const { creneau, patient } = req.body ?? {};
    for (const [nom, valeur] of Object.entries({ creneau, patient })) {
      if (!valeur) return res.status(400).json({ erreur: `Champ manquant : ${nom}` });
    }
    if (!trouverCreneau(creneau)) return res.status(400).json({ erreur: `Créneau inconnu : ${creneau}` });
    if (rendezVous.some((r) => r.creneau === creneau)) {
      return res.status(400).json({ erreur: `Créneau déjà pris : ${creneau}` });
    }
    const rdv = { id: rendezVous.length + 1, creneau, patient };
    rendezVous.push(rdv);
    res.status(201).json(rdv);
  });

  // Erreurs : une ligne ERREUR <message> dans le journal
  app.use((err, req, res, next) => {
    journal(`ERREUR ${err.message}`);
    res.status(err.status || 500).json({ erreur: 'Requête impossible' });
  });

  return app;
}
