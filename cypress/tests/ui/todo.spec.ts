import users from '../../fixtures/users';

const RESPONSE_DELAY_IN_MS = 1000;

describe('Todo App', () => {
  beforeEach(() => {
    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users', {
      body: users,
      delay: RESPONSE_DELAY_IN_MS,
    }).as('getNames');
  });

  it('should display a loading message before fetching initial data', () => {
    cy.visit('/');

    cy.getByDataTestAttribute('loading-names-helper').should('be.visible');
    cy.wait('@getNames');
    cy.getByDataTestAttribute('loading-names-helper').should('not.exist');
  });

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

  it('should display a loading message before fetching biography data', () => {
    cy.visit('/');

    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/1', {
      body: users[0],
      delay: RESPONSE_DELAY_IN_MS,
    }).as('getLeanneGrahamBio');

    cy.getByDataTestAttribute('leanne-graham').click();
    cy.getByDataTestAttribute('loading-bio-helper').should('be.visible');
    cy.wait('@getLeanneGrahamBio');
    cy.getByDataTestAttribute('bio').should(
      'have.text',
      'harness real-time e-markets'
    );
    cy.getByDataTestAttribute('loading-bio-helper').should('not.exist');
  });

  it('should display the biography of a person on click', () => {
    cy.visit('/');

    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/1', {
      body: users[0],
      delay: RESPONSE_DELAY_IN_MS,
    }).as('getLeanneGrahamBio');

    cy.getByDataTestAttribute('leanne-graham').click();
    cy.wait('@getLeanneGrahamBio');
    cy.getByDataTestAttribute('bio').should(
      'have.text',
      'harness real-time e-markets'
    );

    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/2', {
      body: users[1],
      delay: RESPONSE_DELAY_IN_MS,
    }).as('getErvinHowellBio');

    cy.getByDataTestAttribute('ervin-howell').click();
    cy.wait('@getErvinHowellBio');
    cy.getByDataTestAttribute('bio').should(
      'have.text',
      'synergize scalable supply-chains'
    );
  });

  it('should allow users to select persons by pressing up and down arrow keys', () => {
    cy.visit('/');

    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/1', {
      body: users[0],
      delay: RESPONSE_DELAY_IN_MS,
    }).as('getLeanneGrahamBio');
    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/2', {
      body: users[1],
      delay: RESPONSE_DELAY_IN_MS,
    }).as('getErvinHowellBio');
    cy.intercept('get', 'https://jsonplaceholder.typicode.com/users/3', {
      body: users[2],
      delay: RESPONSE_DELAY_IN_MS,
    }).as('getClementineBauchBio');

    cy.getByDataTestAttribute('leanne-graham').click();
    cy.wait('@getLeanneGrahamBio');
    cy.getByDataTestAttribute('leanne-graham').should(
      'have.class',
      'person-selected'
    );

    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.wait('@getErvinHowellBio');
    cy.getByDataTestAttribute('leanne-graham').should(
      'not.have.class',
      'person-selected'
    );
    cy.getByDataTestAttribute('ervin-howell').should(
      'have.class',
      'person-selected'
    );

    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.wait('@getClementineBauchBio');
    cy.getByDataTestAttribute('ervin-howell').should(
      'not.have.class',
      'person-selected'
    );
    cy.getByDataTestAttribute('clementine-bauch').should(
      'have.class',
      'person-selected'
    );

    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.wait('@getErvinHowellBio');
    cy.getByDataTestAttribute('clementine-bauch').should(
      'not.have.class',
      'person-selected'
    );
    cy.getByDataTestAttribute('ervin-howell').should(
      'have.class',
      'person-selected'
    );

    cy.get('body').trigger('keydown', { key: 'ArrowUp' });
    cy.wait('@getLeanneGrahamBio');
    cy.getByDataTestAttribute('ervin-howell').should(
      'not.have.class',
      'person-selected'
    );
    cy.getByDataTestAttribute('leanne-graham').should(
      'have.class',
      'person-selected'
    );
  });

  it('should not select any person on keydown if there was no person selected', () => {
    cy.visit('/');

    cy.get('body').trigger('keydown', { key: 'ArrowDown' });
    cy.get('body').trigger('keydown', { key: 'ArrowUp' });

    cy.getByDataTestAttribute('person-list').within(() => {
      cy.get('li').each((person) => {
        expect(person).to.not.have.class('person-selected');
      });
    });
  });
});
