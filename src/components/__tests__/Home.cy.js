import SiteHeader from '../SiteHeader.vue'

describe('HelloWorld', () => {
  it('playground', () => {
    cy.mount(SiteHeader, { props: { appName: 'testingApp' } })
  })

  it('renders properly', () => {
    cy.mount(SiteHeader, { props: { appName: 'testingApp' } })
    cy.get('h1').should('contain', 'testingApp')
  })
})
