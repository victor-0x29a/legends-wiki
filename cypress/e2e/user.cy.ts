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

const MockCreateRequests = ({ responseIndex = 0 }) => {
    cy.fixture('requests.json')
        .then(({ options, users }) => {
            cy.intercept('OPTIONS', '**/user', options)
            cy.intercept('POST', '**/user', users.createResponse[responseIndex])
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
