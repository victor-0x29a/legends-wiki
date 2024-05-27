describe('auth form submissions spec', () => {
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
