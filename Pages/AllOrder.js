import { expect } from "@playwright/test"
export class AllOrder{
    constructor(page){
this.page=page
this.orderpagebtn= page.locator("label[routerlink='/dashboard/myorders']")
this.ordertable=page.locator('.table-bordered')
    }

    async VerifyOrderID(OrderIdOnly){
         await this.orderpagebtn.click()
            await this.ordertable.waitFor()
            const tablerow = await this.page.locator('tbody tr')
            const rowcount = await tablerow.count()
            for (let k = 0; k < rowcount; k++) {
                const row = await tablerow.nth(k)
                const odid = await row.locator('th').textContent()
                if (OrderIdOnly === odid.trim()) {
                    await row.getByRole('button', { name: 'View' }).click()
                    break;
                }
            }
            const orderconfirm = await this.page.locator('.col-text').textContent()
            await expect(orderconfirm.includes(OrderIdOnly)).toBeTruthy();
        
    }
}