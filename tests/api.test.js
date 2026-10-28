import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { creerApp } from '../src/app.js';

let app;
beforeEach(() => {
  app = creerApp({ journal: () => {} }); // une API neuve, sans journal, pour chaque test
});

describe('GET /sante', () => {
  it('répond ok avec la version', async () => {
    const res = await request(app).get('/sante');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ statut: 'ok', version: 'dev' });
  });
});

describe('GET /creneaux', () => {
  it('liste les 6 créneaux de la semaine, tous libres', async () => {
    const res = await request(app).get('/creneaux');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(6);
    expect(res.body.every((c) => c.libre)).toBe(true);
  });
});

describe('POST /rendez-vous', () => {
  it('réserve un créneau libre', async () => {
    const res = await request(app).post('/rendez-vous').send({ creneau: 'lun-09h', patient: 'Léa Martin' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 1, creneau: 'lun-09h', patient: 'Léa Martin' });
  });

  it('refuse une demande sans patient', async () => {
    const res = await request(app).post('/rendez-vous').send({ creneau: 'lun-09h' });
    expect(res.status).toBe(400);
    expect(res.body.erreur).toBe('Champ manquant : patient');
  });

  it('refuse un créneau déjà pris', async () => {
    await request(app).post('/rendez-vous').send({ creneau: 'mar-10h', patient: 'Léa Martin' });
    const res = await request(app).post('/rendez-vous').send({ creneau: 'mar-10h', patient: 'Paul Roche' });
    expect(res.status).toBe(409);
  });

  it('marque le créneau réservé comme pris', async () => {
    await request(app).post('/rendez-vous').send({ creneau: 'jeu-16h', patient: 'Léa Martin' });
    const res = await request(app).get('/creneaux');
    expect(res.body.find((c) => c.id === 'jeu-16h').libre).toBe(false);
  });
});
