import { expect } from "@playwright/test"
export class PlaceOrderandPayment{
    constructor(page) {
        this.page = page
        this.emailfield = page.locator(".details__user input[type='text']")
        this.countryfield = page.locator('[placeholder="Select Country"]')
        this.countryfirstsuggestion = page.locator('section .ta-results')
    }

    async Verifyemail() {
        const echeck = await this.emailfield.inputValue()
        await expect(echeck).toEqual("abhishektest1@yopmail.com")
    }

    async Addcountryandclickonplacebutton() {
        await this.countryfield.pressSequentially("ind");

        await this.countryfirstsuggestion.first().waitFor();
        const dropdownoption = await this.countryfirstsuggestion.locator('button')
        const dropdown = await dropdownoption.count()
        for (let j = 0; j < dropdown; j++) {
            const tt = await dropdownoption.nth(j).textContent()
            if (tt === " India") {
                await dropdownoption.nth(j).click()
                break;
            }
        }
        await this.page.locator('.action__submit').click()
    }
}