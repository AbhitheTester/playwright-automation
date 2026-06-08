import { expect } from "@playwright/test"
export class OrderConfimation{
    constructor(page){
        this.page=page
        this.thankslocator=page.locator(".hero-primary")
        this.orderid=page.locator("label[class='ng-star-inserted']")

    }

    async verifyorderplaceAndOrderid(){
          await expect(this.thankslocator).toHaveText(" Thankyou for the order. ")
            const orderid = await this.orderid.textContent()
            console.log(orderid)
            const OrderIdOnly = orderid.replace(/[^a-zA-Z0-9]/g, "");
            console.log(OrderIdOnly)
            return OrderIdOnly
    }
}