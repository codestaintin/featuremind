import "cypress-real-events/support";
import { getLink } from '../support/utils';

class ProductPage {
    elements = {
        itemListSelector: () => cy.get('.product-image-wrapper'),
        productLink: () => getLink('/products'),
        menLink: () => getLink('#Men'),
        tShirts: () => cy.get('#Men a'),
        productInfo: () => cy.get('.productinfo a'),
        cartModal: () => cy.get('div.modal-content'),
        cartModalLink: () => cy.get('p a[href="/view_cart"]'),
        viewCartLink: () => cy.get('li a[href="/view_cart"]'),
        priceTag: () => cy.get('p.cart_total_price')
    }

}

export default new ProductPage();