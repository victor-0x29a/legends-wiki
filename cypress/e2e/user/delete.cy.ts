import { MockAndVisitTable, MockTable, MockDeleteRequests } from "./helpers"

describe('delete user', () => {
    it('should open the modal', () => {
        MockAndVisitTable({ responseIndex: 0 })

        cy.get("tbody tr").first().find("svg").last().click()

        cy.get("button").contains("Deletar").should("exist")

        cy.get("header").contains("Deletar usuário").should("exist")
    })
    it('should delete the user', () => {
        MockAndVisitTable({ responseIndex: 0 })

        MockTable({ responseIndex: 1 })

        MockDeleteRequests({ id: 1 })

        cy.get("tbody tr").first().find("svg").last().click()

        cy.get("button").contains("Deletar").click()

        cy.wait(500)

        cy.get('body').contains('Usuário deletado')

        cy.get("tbody tr").should("have.length", 1)
    })
})
