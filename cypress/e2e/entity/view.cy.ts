describe('Entity View', () => {
    it('should display generic error component when entity type is invalid', () => {
        // localhost:5173/entity/invalid/1
        // Too many re-renders. React limits the number of renders to prevent an infinite loop.
        cy.visit('/entity/invalid/1')
        cy.get('body').contains('Tipo de entidade desconhecida')
    })
})
