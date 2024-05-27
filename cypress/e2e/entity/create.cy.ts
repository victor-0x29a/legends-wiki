import { MockRequestsForCreate, MockRequestsForPagination, MockCreateEntityRequest } from './helpers'

describe('create entity spec', () => {
    it('should validate the form', () => {
        MockRequestsForCreate()

        cy.get('button').contains('Criar').click();

        const labelsThatShouldExist = [
            'O título é obrigatório.',
            'A descrição é obrigatória.'
        ]

        labelsThatShouldExist.forEach(label => {
            cy.get('body').contains(label).should('exist');
        })
    })
    it('should fill an image', () => {
        MockRequestsForCreate()

        cy.get('.chakra-switch__thumb').first().click()

        const urlImageInput = cy.get('#entity-image-input-01').first()
        const altImageInput = cy.get('#entity-image-input-02').first()
        const label = cy.get('#entity-image-label-01').first()

        label.should('have.text', 'Link da imagem')

        urlImageInput.type('foo')

        altImageInput.type('bar')

        cy.wait(1000)

        urlImageInput.should('have.value', 'foo')
        altImageInput.should('have.value', 'bar')

        cy.get('.chakra-switch__thumb').last().click()

        cy.wait(500)

        label.should('have.text', 'Nome da imagem interna')
    })
    it('should show the image list modal', () => {
        MockRequestsForCreate()

        const icon = cy.get('#entity-image-info-icon-01').first()

        icon.click()

        cy.get('body').contains('Lista de imagens internas').should('exist')

        cy.wait(2000)

        const firstItem = cy.get('#entity-image-list li').first()

        firstItem.click()

        cy.get('body').contains('Nome do arquivo copiado').should('exist')
    })
    it('should fill the form and create an entity', () => {
        MockRequestsForCreate()

        MockCreateEntityRequest({ entityId: 1 })

        const inputs = [
            cy.get('#entity-form-author-input'),
            cy.get('#entity-form-title-input'),
            cy.get('#entity-form-description-input'),
        ]

        cy.wait(200)

        inputs.forEach(input => {
            input.type('foo')
        })

        cy.wait(800)

        cy.get("#entity-form-properties-name-input").type('foo')

        cy.get("#entity-form-properties-value-input").type('bar')

        cy.get("#entity-form-properties-button-add").click()

        cy.wait(300)

        const [name, value] = [
            cy.get('#entity-form-properties-tr-0 th').eq(0),
            cy.get('#entity-form-properties-tr-0 th').eq(1)
        ]

        cy.wait(300)

        name.contains('foo')

        value.contains('bar')

        cy.get('.chakra-switch__thumb').first().click()

        const urlImageInput = cy.get('#entity-image-input-01').first()

        const altImageInput = cy.get('#entity-image-input-02').first()

        cy.wait(200)

        urlImageInput.type('foo')

        altImageInput.type('bar')

        cy.wait(200)

        cy.get('#entity-sections-input div')
        .eq(1).get('div')
        .eq(0).get('div textarea').type('# foo title')

        cy.wait(200)

        MockRequestsForPagination({
            responseIndex: 4,
        })

        cy.get('button').contains('Criar').click();

        cy.wait(500)

        cy.location('pathname').should('eq', '/entity')

        cy.wait(300)

        cy.get('tbody tr').should('have.length', 1)
    })
})
