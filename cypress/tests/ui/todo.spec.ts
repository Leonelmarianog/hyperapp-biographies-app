describe('Todo App', () => {
  it('should display a test message', () => {
    cy.visit('/');
    cy.getByDataTestAttribute('test-message').should(
      'have.text',
      'Hello World!'
    );
  });
});
