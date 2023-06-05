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
