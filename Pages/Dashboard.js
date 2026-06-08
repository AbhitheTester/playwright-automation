class Dashboard {


    constructor(page) {
        this.page = page
        this.products = page.locator(".card-body")
        this.cartpagebtn = page.locator('[routerlink="/dashboard/cart"]')

    }



    async searchandadd(prdouctname) {

        const cot = await this.products.count()
        for (let i = 0; i <= cot; i++) {
            if (await this.products.nth(i).locator('b').textContent() === prdouctname) {
                await this.products.nth(i).locator("text= Add To Cart").click()
                console.log("clicked..")

                break;
            }
        }
    }

    async gotoCartpage() {
        await this.cartpagebtn.click()
        await  this.page.locator('div li').first().waitFor()
    }
}

module.exports = { Dashboard }