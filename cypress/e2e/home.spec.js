describe('Home Page spec', () => {
  it('should assert that home page url is correct', () => {
    cy.visit('/');
    cy.url().should('eq', 'https://www.automationexercise.com/');
  })
})