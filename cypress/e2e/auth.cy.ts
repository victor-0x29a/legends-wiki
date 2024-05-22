describe('auth spec', () => {
    it('defined', () => {
      cy.visit('/auth')
    })
    it('has a full form', () => {
      cy.visit('/auth')
      cy.get('form').should('exist')
      cy.get('button').should('exist')
    })
    it('validate an empty form', () => {
      cy.visit('/auth')
      cy.get('button').click()

      cy.get('.chakra-form__helper-text').first().should('have.text', 'Nome de usuário é obrigatório.')
      cy.get('.chakra-form__helper-text').last().should('have.text', 'Senha é obrigatória.')

      cy.get('input[name="username"]').first().type('admin')
      cy.get('input[name="password"]').last().type('passwd')

      cy.get('.chakra-form__helper-text').should('not.exist')
    })
    it('validate a form', () => {
      cy.visit('/auth')
      cy.get('input[name="username"]').type(Array.from({ length: 21 }).map(() => 'a').join(''))
      cy.get('input[name="password"]').type('passwd')
      cy.get('button').click()
      cy.get('.chakra-form__helper-text').first().should('have.text', 'O nome de usuário deve ter no máximo 20 caracteres.')
    })
    it('log-in with success', () => {
      cy.visit('/auth')

      cy.fixture('requests.json')
        .then(({ options }) => {
          cy.intercept('OPTIONS', '**/user/sign-in', options)
        })

      cy.fixture('users.json')
      .then((usersData) => {
        const login = usersData.admin

        cy.intercept('POST', '**/user/sign-in', login.response)

        cy.get('input[name="username"]').type(login.username)
        cy.get('input[name="password"]').type(login.password)

        cy.get('button').click()

        cy.get('body').should('contain', 'Login efetuado')
      })
    })
  it('log-in with error', () => {
    cy.visit('/auth')

    cy.fixture('requests.json')
      .then(({ options }) => {
        cy.intercept('OPTIONS', '**/user/sign-in', options)
      })

    cy.fixture('users.json')
      .then((usersData) => {
        const login = usersData.admin

        cy.intercept('POST', '**/user/sign-in', login.failedResponse)

        cy.get('input[name="username"]').type(login.username)
        cy.get('input[name="password"]').type(`${login.password}.`)

        cy.get('button').click()

        cy.get('body').should('contain', 'Usuário ou senha incorretos')
      })
  })
})
