export const VisitItemFeed = (index: number, additionalQuery) => {
    cy.fixture('requests.json')
        .then(({ entity: { feed }, options }) => {
            cy.intercept('OPTIONS', '**/entity?page=1&perPage=10' + (additionalQuery || ''), options)
            cy.intercept('GET', '**/entity?page=1&perPage=10' + (additionalQuery || ''), feed[index])
        })
    cy.visit('/item')
}

export const MockItemFeed = ({
    page = 1,
    perPage = 10,
    indexResponse,
    optionalQuery = ''
}) => {
    cy.fixture('requests.json')
    .then(({ entity: { feed }, options }) => {
        cy.intercept('OPTIONS', `**/entity?page=${page}&perPage=${perPage}${optionalQuery}`, options)
        cy.intercept('GET', `**/entity?page=${page}&perPage=${perPage}${optionalQuery}`, feed[indexResponse])
    })
}

export const MockItemFindOne = (index: number, entityId: number) => {
    cy.fixture('requests.json')
        .then(({ entity: { findOne }, options }) => {
            cy.intercept('OPTIONS', `**/entity/${entityId}`, options)
            cy.intercept('GET', `**/entity/${entityId}`, findOne[index])
        })
}
