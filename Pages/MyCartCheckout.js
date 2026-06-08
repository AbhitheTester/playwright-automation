import { expect } from "@playwright/test";
export class MyCartCheckout {

    constructor(page) {
        this.page = page
        this.boughtproduct = page.locator("h3:has-text('iphone 13 pro')")
        this.checkoutbtn = page.locator("text=Checkout")

    }

    async checkout() {
        const bool = await this.boughtproduct.isVisible()
       await  expect(bool).toBeTruthy()
        await this.checkoutbtn.click()
    }
}
