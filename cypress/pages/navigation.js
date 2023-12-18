import { getLink } from "../support/utils";

class Navigation {

    elements = {
        emptyCart: () => cy.get('#empty_cart'),
        cartLink: () => getLink('/view_cart'),
    }
    visitHome() {
        cy.visit("/")
    }

    viewCart() {
        this.elements.emptyCart();
    }
    goToCart() {
        this.elements.cartLink().first().click();
    }
}

export default new Navigation();