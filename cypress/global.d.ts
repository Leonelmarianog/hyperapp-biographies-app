declare namespace Cypress {
  interface Chainable {
    getByDataTestAttribute(
      dataTestAttribute: string,
      args?: any
    ): Chainable<JQuery<HTMLElement>>;
  }
}
