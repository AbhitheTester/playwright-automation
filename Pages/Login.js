export class Login {
    constructor(page) {
        this.page = page;
        this.loginemail = "#userEmail";
        this.password = "#userPassword";
        this.signbtn = "#login";
    }
    async urlm() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    }
    async loginportal(email, password) {

        await this.page.fill(this.loginemail, email)
        await this.page.fill(this.password, password)
        await this.page.click(this.signbtn)
        await this.page.locator(".card-body").first().waitFor()

    }

}