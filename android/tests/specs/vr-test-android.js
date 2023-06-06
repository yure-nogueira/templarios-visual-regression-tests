const percyScreenshot = require('@percy/appium-app');

describe('Medsoft Android Tests', () => {
  it('can take screenshots', async () => {
    var searchSelector = await $(`~Button`);
    await percyScreenshot('Test Screenshot', {
      fullPage: true,
      screenLengths: 5
    });
  });
});
