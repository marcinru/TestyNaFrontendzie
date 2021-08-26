const getPriceForCurrency = (currency, prices) => {
    const p = prices.find(price => price.currency === currency);
    return p.price;
}

class AdminPanel {
    addNewProduct(product) {
        cy.findByRole('button', { name: 'Add new product' }).click();
        cy.findByPlaceholderText('Product name in Polish').type(product.name.pl);
        cy.findByPlaceholderText('Product name in English').type(product.name.en);
        cy.findByPlaceholderText('Brand').type(product.brand);
        cy.findByPlaceholderText('Price in cents (USD)').type(getPriceForCurrency('USD', product.price));
        cy.findByPlaceholderText('Price in eurocents (EUR)').type(getPriceForCurrency('EUR', product.price));
        cy.findByPlaceholderText('Price in grosze (PLN)').type(getPriceForCurrency('PLN', product.price));
        cy.findByRole('button', { name: 'Save' }).click();
        return this;
    }

    signIn() {
        cy.visit('/admin');
        cy.findByPlaceholderText('Email').type('admin@admin.com');
        cy.findByPlaceholderText('Password').type('admin');
        cy.findByRole('button', { name: 'Sign in' }).click();
        return this;
    }

    assertSuccessfulSignIn() {
        cy.findByRole('button', { name: 'Add new product' });
        cy.contains('Products');
        return this;
    }

    checkIfProductIsAdded(product) {
        cy.findProduct(product);
    }

    removeProduct(product) {
        cy.getProducts().should('have.length', 7);
        cy.findProduct(product).closest('.product').findByRole('button', { name: 'Remove' }).click();
        cy.getProducts().should('have.length', 6);
    }

    logout() {
        cy.findByRole('button', { name: 'Logout' }).click();
        return this;
    }

    assertSuccessfulLogout() {
        cy.findByPlaceholderText('Password');
    }
}

export default AdminPanel;
