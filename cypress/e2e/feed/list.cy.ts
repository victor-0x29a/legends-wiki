import { VisitItemFeed, MockItemFeed, MockItemFindOne } from "./helpers"

describe('feed of entity', () => {
    it('should have feed', () => {
        VisitItemFeed(0, "?type=item")

        cy.get("#feed-item").should("exist")
        cy.get("#feed-container #feed-item").should("have.length", 10)

        cy.get('#pagination-bar-container').should('exist')
    })
    it('should redirect to entity page', () => {
        VisitItemFeed(0, "?type=item")

        MockItemFindOne(0, 1)

        cy.get("#feed-item").should("exist")

        cy.get("#feed-container #feed-item").first().click()

        cy.url().should("include", "/entity/item/")
    })
})

describe('feed of entity pagination', () => {
    it('should have feed on perPage change', () => {
        VisitItemFeed(0, "?type=item")

        cy.get("#feed-item").should("exist")

        MockItemFeed({
            page: 1,
            perPage: 25,
            indexResponse: 1,
            optionalQuery: '?type=item'
        })

        cy.get('#pagination-bar-container').should('exist')

        cy.get('#pagination-bar-container #pagination-bar-select-per-page').select('25');

        cy.wait(800)

        cy.get("#feed-container #feed-item").should("have.length", 11)
    })
    it('should have feed on page change', () => {
        VisitItemFeed(0, "?type=item")

        cy.get("#feed-item").should("exist")

        MockItemFeed({
            page: 2,
            perPage: 10,
            indexResponse: 2,
            optionalQuery: '?type=item'
        })

        cy.get("#pagination-bar-action-next").click()

        cy.wait(500)

        cy.get("#feed-container #feed-item").should("have.length", 1)
    })
})
