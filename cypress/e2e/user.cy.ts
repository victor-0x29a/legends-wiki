const MockAndVisitTable = ({ responseIndex = 0 }) => {
    let token = '';

    cy.fixture("users.json")
        .then(({ admin }) => {
            token = admin.response.body.token;
        })

    cy.fixture('requests.json')
        .then(({ options, users }) => {
            cy.intercept('OPTIONS', '**/user', options)
            cy.intercept('GET', '**/user', users.tableResponse[responseIndex])

            cy.visit('/users', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', token)
                }
            })
        })
}

describe('user table', () => {
    it('should display the user table', () => {
        MockAndVisitTable({ responseIndex: 0 })

        cy.get("table").should("exist")
        cy.get("tbody tr").should("have.length", 2)
    })
    it('should display the delete modal', () => {
        MockAndVisitTable({ responseIndex: 0 })

        cy.get("tbody tr").first().find("svg").last().click()
        cy.get("body").contains("Deletar usuário")
    })
    it('should redirect to the user form when clicking on the edit button', () => {
        MockAndVisitTable({ responseIndex: 0 })

        cy.get("tbody tr").first().find("svg").first().click()
        cy.location('pathname').should('eq', '/users/1')
    })
    it('should redirect to the user form when clicking on the create button', () => {
        MockAndVisitTable({ responseIndex: 0 })

        cy.get("button").click()
        cy.location('pathname').should('eq', '/users/create')
    })
})
