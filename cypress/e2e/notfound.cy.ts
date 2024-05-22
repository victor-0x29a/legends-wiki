describe('auth spec', () => {
    it('defined', () => {
      cy.visit('/auth/foo')
    })
    it('with notfound content', () => {
      cy.visit('/auth/foo')
      cy.get('h2').last().should('have.text', 'Conteúdo não encontrado.')
      cy.get('p').should('have.text', 'O conteúdo que você está procurando não foi encontrado, foi removido ou está em manutenção.')
      cy.get('button').should('exist')
      cy.get('button').should('have.text', 'Voltar')
    })
})
