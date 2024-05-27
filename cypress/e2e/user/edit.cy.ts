import { MockFindOneUser, MockTable } from "./helpers"

describe('edit user', () => {
    it('should edit the user sending a request', () => {
        MockFindOneUser({ responseIndex: 0, id: 1 })

        let token = ''

        cy.fixture('users.json')
            .then(({ admin }) => {
                token = admin.response.body.token
            })

        cy.visit('/users/edit/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })

        cy.get("#user-form-name-input").as("user-input").clear()
        cy.get("@user-input").type("new name")

        MockTable({ responseIndex: 2 })

        cy.fixture('requests.json')
            .then(({ options }) => {
                cy.intercept('OPTIONS', '**/user/1', options)
                cy.intercept('PUT', '**/user/1', {
                    statusCode: 204
                })
            })

        cy.get('button').contains('Editar').click()

        cy.wait(500)

        cy.get('body').contains('Usuário atualizado')

        cy.get("tbody tr").first().contains("new name")
    })
    it('should not send the request if the form is not changed', () => {
        MockFindOneUser({ responseIndex: 0, id: 1 })

        MockTable({ responseIndex: 0 })

        let token = ''

        cy.fixture('users.json')
            .then(({ admin }) => {
                token = admin.response.body.token
            })

        cy.visit('/users/edit/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })

        cy.get('button').contains('Editar').click()

        cy.get('body').contains('Usuário atualizado')
    })
    it('should redirect to the user table if the user does not exist', () => {
        MockFindOneUser({ responseIndex: 1, id: 1 })

        let token = ''

        cy.fixture('users.json')
            .then(({ admin }) => {
                token = admin.response.body.token
            })

        MockTable({ responseIndex: 0 })

        cy.visit('/users/edit/1', {
            onBeforeLoad(win) {
                win.localStorage.setItem('token', token)
            }
        })

        cy.get('body').contains('Usuário não encontrado')

        cy.location('pathname').should('eq', '/users')
    })
})
