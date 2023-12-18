import productPage from "../pages/productPage";

describe('Product functionality tests', () => {
    it('choose random tshirts and add them to cart ', () => {
        cy.visit('/');
        productPage.elements.productLink().first().click();
        cy.url().should('include', '/products');
        productPage.elements.menLink().click();
        productPage.elements.tShirts().first().click();
        cy.url().should('include', '/category_products/3');

        productPage.elements.itemListSelector().then((items) => {
            const itemCount = items.length;
            const randomOrder = Array.from({ length: itemCount - 3 },
                (_, index) => index)
                .map((val) => ({ val, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map((item) => item.val);

            randomOrder.forEach((index) => {
                productPage.elements.itemListSelector().eq(index).realHover('mouse');
                productPage.elements.productInfo()
                    .eq(index).should('exist');
                productPage.elements.productInfo()
                    .filter(`:eq(${index})`)
                    .invoke('click')
                productPage.elements.cartModal().should('exist');
                productPage.elements.cartModal()
                    .should('contain.text', 'Your product has been added to cart.')
                productPage.elements.cartModalLink().click();
                cy.url().should('include', '/view_cart');
                cy.visit('/category_products/3');
            });
        });
        productPage.elements.viewCartLink().click();
        cy.url().should('include', '/view_cart');
        productPage.elements.priceTag().should('exist');
        cy.contains('p.cart_total_price', /Rs\.\s\d+$/);
    });
});