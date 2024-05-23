const MockRequestsForPagination = ({ responseIndex = 0, page = 1, perPage = 10 }: { responseIndex?: number, page?: number, perPage?: number }): void => {
    cy.fixture('requests.json')
        .then((data) => {
            cy.intercept('OPTIONS', `**/entity?page=${page}&perPage=${perPage}`, data.options)

            cy.intercept('GET', `**/entity?page=${page}&perPage=${perPage}`, data.entity.tableResponse[responseIndex])
        })
}

const MockEntityRequest = ({ entityId = 1 }) => {
    cy.fixture('requests.json')
        .then(({ entity, options }) => {
            cy.intercept('OPTIONS', `**/entity/${entityId}`, options)

            cy.intercept('GET', `**/entity/${entityId}`, {
                ...entity.findOne[0],
                id: entityId
            })
        })
}

const MockCreateEntityRequest = ({ entityId }) => {
    cy.fixture('requests.json')
        .then(({ options, entity }) => {
            cy.intercept('OPTIONS', '**/entity', options)

            cy.intercept('POST', '**/entity', entity.create[0])

            cy.intercept('OPTIONS', `**/entity/${entityId}`, options)

            cy.intercept('GET', `**/entity/${entityId}`, entity.findOne[0])
        })
}

const MockRequests = ({ responseIndex = 0 }: { responseIndex?: number }): void => {
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

const MockRequestsForCreate = (): void => {
    cy.fixture('users.json')
        .then(({ admin }) => {
            cy.visit('/entity/create', {
                onBeforeLoad(win) {
                    win.localStorage.setItem('token', admin.response.body.token)
                },
            });
        })
}

describe('entity table spec', () => {
    it('should display entity table', () => {
        MockRequests({ responseIndex: 0 })

        cy.get('table').should('exist');
    });

    it('should display an entity', () => {
        MockRequests({ responseIndex: 0 })

        cy.get('table tbody tr').should('have.length', 4);
    })

    it('should display an empty entity', () => {
        MockRequests({ responseIndex: 1 })

        cy.get('table tbody tr').should('have.length', 0);
        cy.get('body').contains('Não há entidades para exibir');
        cy.get('#pagination-bar-action-previous').should('not.exist')
        cy.get('#pagination-bar-action-next').should('not.exist')
    })

    it('should navigate to create entity page', () => {
        MockRequests({ responseIndex: 0 })

        cy.get('button').contains('Criar entidade').click();

        cy.url().should('include', '/entity/create');
    })

    it('should navigate to edit entity page', () => {
        MockRequests({ responseIndex: 0 })

        MockEntityRequest({ entityId: 1 })

        cy.get('tbody tr th svg').first().click();

        cy.wait(500)

        cy.url().should('include', '/entity/edit/1');
    })

    it('should open the modal to delete an entity', () => {
        MockRequests({ responseIndex: 0 })

        cy.get('th').last().find('svg').last().click();

        cy.get('button').contains('Deletar').should('exist');

        cy.get('header').contains('Deletar entidade').should('exist');
    })
})

describe('entity table pagination spec', () => {
    it('should navigate to the next page', () => {
        MockRequests({ responseIndex: 2 })

        MockRequestsForPagination({ responseIndex: 3, page: 2, perPage: 10 })

        cy.get('#pagination-bar-action-next').click();

        cy.get('tbody tr').should('have.length', 1);
    })

    it('should navigate to the previous page', () => {
        MockRequests({ responseIndex: 2 })

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
})

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

describe('edit entity spec', () => {
    it('should request when change the form and submit', () => {
        MockRequests({ responseIndex: 0 })

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
        MockRequests({ responseIndex: 0 })

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
