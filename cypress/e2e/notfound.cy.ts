describe('not found spec', () => {
    it('defined', () => {
      cy.visit('/auth/foo')
    })
    it('with not found content', () => {
      cy.visit('/auth/foo')
      cy.get('h2').last().should('have.text', 'Conteúdo não encontrado.')
      cy.get('p').should('have.text', 'O conteúdo que você está procurando não foi encontrado, foi removido ou está em manutenção.')
      cy.get('button').should('exist')
      cy.get('button').should('have.text', 'Voltar')
    })
    it('with not found content translated to US', () => {
        cy.visit('/auth/foo')
        cy.get('option').eq(1).click({ force: true })
        cy.get('h2').last().should('have.text', 'Content not found.')
        cy.get('p').should('have.text', 'The content you are looking for was not found, has been removed, or is undergoing maintenance.')
        cy.get('button').should('have.text', 'Back')
    })
    it('with not found content translated to ES', () => {
        cy.visit('/auth/foo')
        cy.get('option').eq(2).click({ force: true })
        cy.get('h2').last().should('have.text', 'Contenido no encontrado.')
        cy.get('p').should('have.text', 'El contenido que busca no se encontró, se eliminó o está en mantenimiento.')
        cy.get('button').should('have.text', 'Atrás')
    })
})
