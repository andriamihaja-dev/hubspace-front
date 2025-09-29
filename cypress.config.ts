import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'e2e/cypress/support/e2e.ts',
    specPattern: 'e2e/cypress/e2e/**/*.cy.ts',
  },
});
