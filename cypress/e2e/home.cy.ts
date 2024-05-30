describe('home page', () => {
    it ('should defined', () => {
        cy.visit('/')
    })
    it('should has redirect btns', () => {
        cy.visit('/')
        cy.get('.social-media-redirect').should('have.length', 5)
    })
})
