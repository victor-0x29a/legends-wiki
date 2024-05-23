const MockRequestsForPagination = ({ responseIndex = 0, page = 1, perPage = 10 }: { responseIndex?: number, page?: number, perPage?: number }): void => {
    cy.fixture('requests.json')
        .then((data) => {
            cy.intercept('OPTIONS', `**/entity?page=${page}&perPage=${perPage}`, data.options)

            cy.intercept('GET', `**/entity?page=${page}&perPage=${perPage}`, data.entity.tableResponse[responseIndex])
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

        cy.get('tbody tr th svg').first().click();

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
})
