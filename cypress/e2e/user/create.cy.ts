import { MockAndVisitTable, MockTable, MockCreateRequests } from "./helpers"

describe('create user', () => {
    it('should create the user', () => {
        MockAndVisitTable({ responseIndex: 3 })

        MockCreateRequests({ responseIndex: 0 })

        cy.get('button').contains('Criar usu').click()

        cy.get("#user-form-name-input").as("user-input").type("john")

        cy.get("#user-form-username-input").as("username-input").type("johndoe")

        cy.get("#user-form-password-input").as("password-input").type("123456")

        MockTable({ responseIndex: 4 })

        cy.get('button').contains('Criar').click()

        cy.wait(500)

        cy.get('body').contains('Usuário criado')

        cy.get("tbody tr").should("have.length", 1)
    })
    it('should create an user without name', () => {
        MockAndVisitTable({ responseIndex: 5 })

        MockCreateRequests({ responseIndex: 0 })

        cy.get('button').contains('Criar usu').click()

        cy.get("#user-form-username-input").as("username-input").type("johndoe")

        cy.get("#user-form-password-input").as("password-input").type("123456")

        MockTable({ responseIndex: 6 })

        cy.get('button').contains('Criar').click()

        cy.wait(500)

        cy.get('body').contains('Usuário criado')

        cy.get("tbody tr").should("have.length", 1)

        cy.get("tbody tr").first().contains("Desconhecido")
    })
})
