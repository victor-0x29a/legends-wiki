describe('auth form specs', () => {
    it('defined', () => {
      cy.visit('/auth/login')
    })
    it('has a full form', () => {
      cy.visit('/auth/login')
      cy.get('form').should('exist')
      cy.get('button').should('exist')
    })
    it('validate an empty form', () => {
      cy.visit('/auth/login')
      cy.get('button').click()

      cy.get('.chakra-form__helper-text').first().should('have.text', 'Nome de usuário é obrigatório.')
      cy.get('.chakra-form__helper-text').last().should('have.text', 'Senha é obrigatória.')

      cy.get('input[name="username"]').first().type('admin')
      cy.get('input[name="password"]').last().type('passwd')

      cy.get('.chakra-form__helper-text').should('not.exist')
    })
    it('validate a form', () => {
      cy.visit('/auth/login')
      cy.get('input[name="username"]').type(Array.from({ length: 21 }).map(() => 'a').join(''))
      cy.get('input[name="password"]').type('passwd')
      cy.get('button').click()
      cy.get('.chakra-form__helper-text').first().should('have.text', 'O nome de usuário deve ter no máximo 20 caracteres.')
    })
})
