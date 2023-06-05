import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

// addMatchImageSnapshotCommand({
//   failureThreshold: 0.0,
//   failureThresholdType: 'percent',
//   customDiffConfig: { threshold: 0.0 },
//   capture: 'fullPage',
//   customSnapshotsDir: '../screenshots'
// });

addMatchImageSnapshotCommand({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
  customDiffConfig: { threshold: 0.1 },
  capture: 'fullPage',
  customSnapshotsDir: `${process.cwd()}/screenshots`
});

Cypress.Commands.add('setResolution', (size) => {
  if (Cypress._.isArray(size)) {
    cy.viewport(size[0], size[1]);
  } else {
    cy.viewport(size);
  }
});

Cypress.Commands.add('navigateToElement', (selector, component, child) => {
  cy.get(`[cy-visual="${selector}"]`).click();
  cy.get('ion-popover').within(() => {
    cy.contains(
      '.select-interface-option',
      child ? child : component.name
    ).click();
  });
  cy.get(`[cy-visual="${component.name}"]`).should('be.visible');
});
