describe('cart spec', () => {
    it('should validate that cart is empty', () => {
        cy.visit('/');
        cy.get('a[href="/view_cart"]').first().click();
        cy.url().should('include', '/view_cart');
        cy.get('#empty_cart').should('exist');
        cy.get('#empty_cart').should('contain.text', 'Cart is empty!');
    })
})