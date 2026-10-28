import { creerApp } from './app.js';

const port = process.env.PORT || 3000;
creerApp().listen(port, () => {
  console.log(`API app-rdv sur le port ${port}`);
});
