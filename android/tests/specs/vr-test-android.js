const percyScreenshot = require('@percy/appium-app');
const { expect } = require('chai');

describe('Medsoft Android Tests', () => {
  it('can take screenshots', async () => {
    await percyScreenshot('Test Screenshot');
  });
});

// describe('Medsoft Android Tests', () => {
//   it('can take screenshots', async () => {
//     const header = await $('//ion-header[@class="tests-header"]');
//     const shadowRoot = await browser.execute(function (element) {
//       return element.shadowRoot;
//     }, header);
//     const selector = await shadowRoot.shadow$('//*[@visual-test="selector"]');

//     const isElementExisting = await selector.isExisting();
//     expect(isElementExisting).to.be.true;

//     await selector.click();
//     browser.pause(5000);
//     await percyScreenshot('Test Screenshot');
//   });
// });
