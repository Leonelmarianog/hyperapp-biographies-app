describe('Todo App', () => {
  it('should display a list of persons', () => {
    cy.visit('/');
    cy.getByDataTestAttribute('person-list').should('be.visible');
    cy.getByDataTestAttribute('person-list').within(() => {
      cy.get('li').each((person, index, list) => {
        expect(list).to.have.length.above(0);
      });
    });
  });

  it('should highlight a person when checked', () => {
    cy.visit('/');

    cy.getByDataTestAttribute('person-list').within(() => {
      const person = cy.get('li:not(person-active)').first();

      person.within(() => {
        cy.get('[type="checkbox"]').check();
      });

      person.should('have.class', 'person-active');

      person.within(() => {
        cy.get('[type="checkbox"]').uncheck();
      });

      person.should('not.have.class', 'person-active');
    });
  });
});
