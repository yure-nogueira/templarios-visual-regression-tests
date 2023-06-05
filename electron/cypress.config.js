const { defineConfig } = require('cypress');
// import { defineConfig } from 'cypress';

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents: (on, config) =>
      require('./cypress/plugins/index.js')(on, config),
    baseUrl: 'http://localhost:8100/',
    supportFile: false,
    screenshotsFolder: 'screenshots'
  }
});
