class Login{
constructor(page){
this.page=page;
this.loginemail="#email";
this.password="#password";
this.signbtn="#login-btn";
}

async loginportal(email,password){
    await this.page.goto("https://eventhub.rahulshettyacademy.com/login")
    await this.page.fill(this.loginemail,email)
    await this.page.fill(this.password,password)
    await this.page.click(this.signbtn)
}

}export default Login;