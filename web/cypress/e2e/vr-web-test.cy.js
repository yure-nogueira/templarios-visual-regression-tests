import { components } from '../components';
import '../support/commands';
import 'dotenv/config';

describe('Visual regression tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  components.forEach((component) => {
    it(`Deve ser igual a screenshot prévia do componente ${component.name}`, () => {
      cy.navigateToElement('selector', component);
      cy.percySnapshot(`${component.path.replace('/', '-')}`);
    });
  });
});
