describe('comments', () => {
  it('user should has ability to add new comment under the product', () => {
    const userName = 'Piotr';
    const commentContent = 'Te buty są świetne!';

    cy.visit('/');
    cy.findByText('Sweatpants - Adidas').click();
    cy.findByRole('button', { name: 'Add a new comment' }).click();
    cy.findByLabelText('Your name:').type(userName);
    cy.findByLabelText('Comment:').type(commentContent);
    cy.findByRole('button', { name: 'Add a new one' }).click();

    cy.findByTestId('comment-owner-name').should('have.text', userName);
    cy.findByTestId('comment-content').should('have.text', commentContent);
  });
});
