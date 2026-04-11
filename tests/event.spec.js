import{test,expect} from "@playwright/test"
import Login from "../Pages/Login.js";

test.beforeEach(async({page})=>{
    const lg=new Login(page)
 await    lg.loginportal("abhishektest@yopmail.com","Test@123")
})

test("first",async({page})=>{
    console.log("hello")

})