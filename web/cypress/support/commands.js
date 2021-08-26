Cypress.Commands.add('findProduct', (product) => {
    cy.contains(`${product.name.en} - ${product.brand}`)
})

Cypress.Commands.add('getProducts', () => {
    cy.get('.products-list').find('.product')
})
