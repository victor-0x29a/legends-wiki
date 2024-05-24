const MockFindOneUser = ({ responseIndex = 0, id = 1 }) => {
    cy.fixture('requests.json')
        .then(({ options, users }) => {
            cy.intercept('OPTIONS', `**/user/${id}`, options)

            // eslint-disable-next-line prefer-const
            let data = users.findOneResponse[responseIndex]

            data.body.id = id

            cy.intercept('GET', `**/user/${id}`, data)
        })
}

const MockTable = ({ responseIndex = 0 }) => {
    cy.fixture('requests.json')
        .then(({ options, users }) => {
            cy.intercept('OPTIONS', '**/user', options)
            cy.intercept('GET', '**/user', users.tableResponse[responseIndex])
        })
}

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

const MockDeleteRequests = ({ id }: { id: number }) => {
    cy.fixture('requests.json')
        .then(({ options }) => {
            cy.intercept('OPTIONS', `**/user/${id}`, options)
            cy.intercept('DELETE', `**/user/${id}`, {
                statusCode: 204
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

        MockFindOneUser({ responseIndex: 0, id: 1 })

        cy.get("tbody tr").first().find("svg").first().click()
        cy.location('pathname').should('eq', '/users/edit/1')
    })
    it('should redirect to the user form when clicking on the create button', () => {
        MockAndVisitTable({ responseIndex: 0 })

        cy.get("button").click()
        cy.location('pathname').should('eq', '/users/create')
    })
})

describe('delete user', () => {
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
