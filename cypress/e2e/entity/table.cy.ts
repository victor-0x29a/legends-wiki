import { MockRequestsForTable, MockEntityRequest, MockRequestsForPagination } from './helpers'

describe('entity table spec', () => {
    it('should display entity table', () => {
        MockRequestsForTable({ responseIndex: 0 })

        cy.get('table').should('exist');
    });

    it('should display an entity', () => {
        MockRequestsForTable({ responseIndex: 0 })

        cy.get('table tbody tr').should('have.length', 4);
    })

    it('should display an empty entity', () => {
        MockRequestsForTable({ responseIndex: 1 })

        cy.get('table tbody tr').should('have.length', 0);
        cy.get('body').contains('Não há entidades para exibir');
        cy.get('#pagination-bar-action-previous').should('not.exist')
        cy.get('#pagination-bar-action-next').should('not.exist')
    })

    it('should navigate to create entity page', () => {
        MockRequestsForTable({ responseIndex: 0 })

        cy.get('button').contains('Criar entidade').click();

        cy.url().should('include', '/entity/create');
    })

    it('should navigate to edit entity page', () => {
        MockRequestsForTable({ responseIndex: 0 })

        MockEntityRequest({ entityId: 1 })

        cy.get('tbody tr th svg').first().click();

        cy.wait(500)

        cy.url().should('include', '/entity/edit/1');
    })
})

describe('entity table pagination spec', () => {
    it('should navigate to the next page', () => {
        MockRequestsForTable({ responseIndex: 2 })

        MockRequestsForPagination({ responseIndex: 3, page: 2, perPage: 10 })

        cy.get('#pagination-bar-action-next').click();

        cy.get('tbody tr').should('have.length', 1);
    })

    it('should navigate to the previous page', () => {
        MockRequestsForTable({ responseIndex: 2 })

        MockRequestsForPagination({ responseIndex: 3, page: 2, perPage: 10 })

        cy.get('tbody tr').should('have.length', 10);

        cy.get('#pagination-bar-action-next').click();

        MockRequestsForPagination({ responseIndex: 2 })

        cy.get('#pagination-bar-action-next').should('be.disabled')

        cy.get('tbody tr').should('have.length', 1);

        cy.get('#pagination-bar-action-previous').click();

        cy.get('tbody tr').should('have.length', 10);

        cy.get('#pagination-bar-action-previous').should('be.disabled')
    })

    it('should change the perPage', () => {
        MockRequestsForTable({ responseIndex: 2 })

        MockRequestsForPagination({ responseIndex: 7, page: 1, perPage: 25 })

        cy.get('tbody tr').should('have.length', 10);

        cy.get('#pagination-bar-container #pagination-bar-select-per-page').select('25');

        cy.wait(500)

        cy.get('tbody tr').should('have.length', 11);
    })
})
