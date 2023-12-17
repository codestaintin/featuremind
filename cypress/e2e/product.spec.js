import "cypress-real-events/support"

describe('product spec', () => {
    it('should be able to product functionalities', () => {
        const itemListSelector = 'div.col-sm-9.padding-right > div > div.col-sm-4';

        cy.visit('/');
        cy.get('a[href="/products"]').first().click();
        cy.url().should('include', '/products');
        cy.get('#accordian > div:nth-child(2) > div.panel-heading > h4 > a > span').click();
        cy.get('#Men > div > ul > li:nth-child(1) > a').click();
        cy.url().should('include', '/category_products/3');

        cy.get(itemListSelector).then((items) => {
            const itemCount = items.length;
            const randomOrder = Array.from({ length: itemCount - 3 },
                (_, index) => index)
                .map((val) => ({ val, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map((item) => item.val);

            randomOrder.forEach((index) => {
                cy.get(itemListSelector).eq(index).realHover('mouse');
                cy.get('div > div.single-products > div.product-overlay > div > a')
                    .eq(index).should('exist');
                cy.get('div > div.single-products > div.product-overlay > div > a')
                    .filter(`:eq(${index})`)
                    .invoke('click')
                cy.get('#cartModal > div > div').should('exist');
                cy.get('#cartModal > div > div')
                    .should('contain.text', 'Your product has been added to cart.')
                cy.get('#cartModal > div > div > div.modal-body > p:nth-child(2) > a').click();
                cy.url().should('include', '/view_cart');
                cy.visit('/category_products/3')
            });
        });
        cy.get('#header > div > div > div > div.col-sm-8 > div > ul > li:nth-child(3) > a').click();
        cy.url().should('include', '/view_cart');
        cy.get('p.cart_total_price').should('exist');
        cy.contains('p.cart_total_price', /Rs\.\s\d+$/);
    });
});