import users from '../../fixtures/users';

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

  it('should highlight a person on check', () => {
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

  it('should select a person on click', () => {
    cy.visit('/');

    cy.getByDataTestAttribute('person-list').within(() => {
      cy.get('li').eq(1).click();
      cy.get('li').eq(1).should('have.class', 'person-selected');

      cy.get('li').eq(2).click();
      cy.get('li').eq(2).should('have.class', 'person-selected');
      cy.get('li').eq(1).should('not.have.class', 'person-selected');
    });
  });

  it('should not select a person on check', () => {
    cy.visit('/');

    cy.getByDataTestAttribute('person-list').within(() => {
      const person = cy.get('li').first();

      person.within(() => {
        cy.get('[type="checkbox"]').check();
      });

      person.should('not.have.class', 'person-selected');
    });
  });

  it.only('should display the biography of a person on click', () => {
    cy.visit('/');

    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/1', {
      body: users[0],
    }).as('getLeanneGrahamBio');

    cy.getByDataTestAttribute('leanne-graham').click();
    cy.wait('@getLeanneGrahamBio');
    cy.getByDataTestAttribute('bio').should(
      'have.text',
      'harness real-time e-markets'
    );

    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/2', {
      body: users[1],
    }).as('getErvinHowellBio');

    cy.getByDataTestAttribute('ervin-howell').click();
    cy.wait('@getErvinHowellBio');
    cy.getByDataTestAttribute('bio').should(
      'have.text',
      'synergize scalable supply-chains'
    );
  });
});
