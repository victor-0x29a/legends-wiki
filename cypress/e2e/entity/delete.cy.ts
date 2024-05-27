import { MockRequestsForTable, MockRequestsForDelete, MockRequestsForPagination } from './helpers'

describe('delete entity spec', () => {
    it('should open the modal to delete an entity', () => {
        MockRequestsForTable({ responseIndex: 0 })

        cy.get('th').last().find('svg').last().click();

        cy.get('button').contains('Deletar').should('exist');

        cy.get('header').contains('Deletar entidade').should('exist');
    })
    it('should delete an entity', () => {
        MockRequestsForTable({ responseIndex: 0 })

        MockRequestsForDelete({ entityId: 4 })

        cy.get('th').last().find('svg').last().click();

        MockRequestsForPagination({ responseIndex: 6 })

        cy.get('button').contains('Deletar').click();

        cy.get('body').contains('Entidade deletada').should('exist')

        cy.get('tbody tr').should('have.length', 3)
    })
    it('should cancel the deletion', () => {
        MockRequestsForTable({ responseIndex: 0 })

        cy.wait(500)

        cy.get('th').last().find('svg').last().click();

        cy.wait(200)

        cy.get('#close-btn-delete-entity-modal').click();

        cy.wait(200)

        cy.get('body').contains('Entidade deletada').should('not.exist')

        cy.get('tbody tr').should('have.length', 4)
    })
})
