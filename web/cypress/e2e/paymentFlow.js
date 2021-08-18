describe('Payment flow', () => {
  it('successfully completes payment with USD', () => {
    cy.visit('/');
    cy.contains("Sports shoes - Adidas").parent().find("img").click();
    cy.findByTestId('cartSize').click();
    cy.contains("Cart");
    cy.contains("Address").click();

    cy.findByPlaceholderText("First name").type("John");
    cy.findByPlaceholderText("Last name").type("Snow");
    cy.findByPlaceholderText("Street").type("Caste Black");
    cy.findByPlaceholderText("Postal code").type("00-000");
    cy.findByPlaceholderText("City").type("The North");
    cy.contains("Payment").click();

    cy.fillElementsInput('cardNumber', '4242424242424242');
    cy.fillElementsInput('cardExpiry', '1025');
    cy.fillElementsInput('cardCvc', '123');
    cy.fillElementsInput('postalCode', '90210');

    cy.findByTestId("totalToPay").contains('73.57 $');
    cy.contains("Pay with a card").click();
    cy.contains("Payment successfully completed", { timeout: 10000 });
  });
});
