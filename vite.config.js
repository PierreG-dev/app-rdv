import { defineConfig } from 'vite';

// La page publique est dans front/ ; le site construit sort dans dist/.
// Les tests (Vitest) restent à la racine du projet.
export default defineConfig({
  root: 'front',
  build: {
    outDir: '../dist',
    emptyOutDir: true
  },
  test: {
    root: '.'
  }
});
