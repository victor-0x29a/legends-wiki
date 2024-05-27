export const MockFindOneUser = ({ responseIndex = 0, id = 1 }) => {
    cy.fixture('requests.json')
        .then(({ options, users }) => {
            cy.intercept('OPTIONS', `**/user/${id}`, options)

            // eslint-disable-next-line prefer-const
            let data = users.findOneResponse[responseIndex]

            data.body.id = id

            cy.intercept('GET', `**/user/${id}`, data)
        })
}

export const MockTable = ({ responseIndex = 0 }) => {
    cy.fixture('requests.json')
        .then(({ options, users }) => {
            cy.intercept('OPTIONS', '**/user', options)
            cy.intercept('GET', '**/user', users.tableResponse[responseIndex])
        })
}

export const MockAndVisitTable = ({ responseIndex = 0 }) => {
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

export const MockDeleteRequests = ({ id }: { id: number }) => {
    cy.fixture('requests.json')
        .then(({ options }) => {
            cy.intercept('OPTIONS', `**/user/${id}`, options)
            cy.intercept('DELETE', `**/user/${id}`, {
                statusCode: 204
            })
        })
}

export const MockCreateRequests = ({ responseIndex = 0 }) => {
    cy.fixture('requests.json')
        .then(({ options, users }) => {
            cy.intercept('OPTIONS', '**/user', options)
            cy.intercept('POST', '**/user', users.createResponse[responseIndex])
        })
}
