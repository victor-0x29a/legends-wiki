import { MockRequestsForTable, MockEntityRequest, MockRequestsForPagination } from './helpers'

describe('edit entity spec', () => {
    it('should request when change the form and submit', () => {
        MockRequestsForTable({ responseIndex: 0 })

        MockEntityRequest({ entityId: 1 })

        cy.get('tbody tr th svg').first().click();

        cy.wait(500)

        cy.url().should('include', '/entity/edit/1');

        cy.intercept('OPTIONS', '**/entity/1')

        cy.intercept('PUT', '**/entity/1', {
            statusCode: 204
        }).as('PUT')

        cy.get('#entity-form-title-input').clear()

        cy.wait(200)

        cy.get('#entity-form-title-input').type('foo')

        MockRequestsForPagination({ responseIndex: 5, page: 1, perPage: 10 })

        cy.get('button').contains('Editar').click();

        cy.get('body').contains('Entidade foi atualizada').should('exist')

        cy.location('pathname').should('eq', '/entity')

        cy.wait(300)

        cy.get('tbody tr').should('have.length', 4)

        cy.wait(500)

        cy.get('table').contains('foo')
    })
    it('should not request when doesnt change the form and submit', () => {
        MockRequestsForTable({ responseIndex: 0 })

        MockEntityRequest({ entityId: 1 })

        cy.get('tbody tr th svg').first().click();

        cy.wait(500)

        cy.url().should('include', '/entity/edit/1');

        cy.intercept('OPTIONS', '**/entity/1').should('not.exist')

        cy.intercept('PATCH', '**/entity/1').should('not.exist')

        cy.get('button').contains('Editar').click();

        cy.wait(500)

        cy.get('body').contains('Entidade foi atualizada').should('exist')

        cy.location('pathname').should('eq', '/entity')

        cy.get('tbody tr').should('have.length', 4)
    })
})
