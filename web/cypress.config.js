const { defineConfig } = require('cypress');
// import './node_modules/electron/dist/electron';

module.exports = defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:8100/'
  }
});
