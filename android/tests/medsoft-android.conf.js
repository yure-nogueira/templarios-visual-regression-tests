require('dotenv').config();

exports.config = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,

  updateJob: false,
  specs: ['./tests/specs/**.js'],
  exclude: [],

  maxInstances: 10,
  commonCapabilities: {
    project: 'Medsoft Android',
    build: 'Medsoft Android',
    name: 'Medsoft Android Version',
    app: process.env.BROWSERSTACK_APP_ID,
    'browserstack.debug': true
  },

  capabilities: [
    {
      device: 'Google Pixel 3',
      os_version: '9.0'
    },
    {
      device: 'Samsung Galaxy S10e',
      os_version: '9.0'
    }
  ],

  logLevel: 'info',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 20000
  }
};

// Code to support common capabilities
exports.config.capabilities.forEach(function (caps) {
  for (var i in exports.config.commonCapabilities)
    caps[i] = caps[i] || exports.config.commonCapabilities[i];
});
