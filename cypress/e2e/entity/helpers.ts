export const MockRequestsForTable = ({ responseIndex = 0 }: { responseIndex?: number }): void => {
    let token = 'value'

    cy.fixture('users.json')
        .then(({ admin }) => {
            token = admin.response.body.token
        })

    cy.fixture('requests.json')
        .then((data) => {
            cy.intercept('OPTIONS', '**/entity?page=1&perPage=10', data.options)

            cy.intercept('GET', '**/entity?page=1&perPage=10', data.entity.tableResponse[responseIndex])

            cy.visit('/entity', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', token)
                },
            });
        })
}

export const MockRequestsForPagination = ({ responseIndex = 0, page = 1, perPage = 10 }: { responseIndex?: number, page?: number, perPage?: number }): void => {
    cy.fixture('requests.json')
        .then((data) => {
            cy.intercept('OPTIONS', `**/entity?page=${page}&perPage=${perPage}`, data.options)

            cy.intercept('GET', `**/entity?page=${page}&perPage=${perPage}`, data.entity.tableResponse[responseIndex])
        })
}

export const MockEntityRequest = ({ entityId = 1 }) => {
    cy.fixture('requests.json')
        .then(({ entity, options }) => {
            cy.intercept('OPTIONS', `**/entity/${entityId}`, options)

            cy.intercept('GET', `**/entity/${entityId}`, {
                ...entity.findOne[0],
                id: entityId
            })
        })
}

export const MockCreateEntityRequest = ({ entityId }) => {
    cy.fixture('requests.json')
        .then(({ options, entity }) => {
            cy.intercept('OPTIONS', '**/entity', options)

            cy.intercept('POST', '**/entity', entity.create[0])

            cy.intercept('OPTIONS', `**/entity/${entityId}`, options)

            cy.intercept('GET', `**/entity/${entityId}`, entity.findOne[0])
        })
}

export const MockRequestsForCreate = (): void => {
    cy.fixture('users.json')
        .then(({ admin }) => {
            cy.visit('/entity/create', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', admin.response.body.token)
                },
            });
        })
}

export const MockRequestsForDelete = ({
    entityId = 0
}): void => {
    cy.fixture('requests.json')
        .then(({ options }) => {
            cy.intercept('OPTIONS', `**/entity/${entityId}`, options)
            cy.intercept('DELETE', `**/entity/${entityId}`, { statusCode: 204 })
        })
}
