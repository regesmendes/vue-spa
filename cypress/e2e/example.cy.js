// https://docs.cypress.io/api/introduction/api.html

describe('The Site\'s Home Page', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'Vue3 SPA')
  })
})
