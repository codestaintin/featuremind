import navigationPage from "../pages/navigation";

describe('Navigation tests', () => {
    it('should visit the homepage', () => {
        navigationPage.visitHome();
        cy.url().should('eq', 'https://www.automationexercise.com/');
    });

    it('should validate that cart is empty', () => {
        navigationPage.visitHome();
        navigationPage.goToCart();
        cy.url().should('include', '/view_cart');
        navigationPage.elements.emptyCart().should('exist');
        navigationPage.elements.emptyCart().should('contain.text', 'Cart is empty!');
    })
})
