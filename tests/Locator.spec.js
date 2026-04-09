import {test,expect} from '@playwright/test'

test("mostly locator",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click()
    await page.getByLabel("Employed").click()
    await page.getByLabel("Gender").selectOption("Male")
    await page.getByPlaceholder("Password").fill("test123")
    await page.getByRole("button",{name :'Submit'}).click()
   const val= await page.getByText("Success! The Form has been submitted successfully!.").isVisible()
   console.log(val)
   await page.getByRole("link",{name : "Shop"}).click()
   await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole('button',{name:"Add "}).click()
   console.log("good")


}) 