Cypress.Commands.add('getByDataTestAttribute', (dataTestAttribute, ...args) =>
  cy.get(`[data-cy=${dataTestAttribute}]`, ...args)
);
