
import {test,expect,request} from "@playwright/test"
import { url } from "node:inspector";
import path from "node:path"
import { json } from "node:stream/consumers";
let webcontext;
const payld={data:[],message:"No Orders"};
test.beforeAll(async ({browser})=>{

   const context=await browser.newContext()
    const page=await context.newPage()
      await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
     await page.locator("#userEmail").fill("abhishektest1@yopmail.com")
     await page.locator('#userPassword').fill("Test@123")
     await page.locator("#login").click()
     await  page.waitForLoadState("networkidle")
     await context.storageState({path:'state.json'})
     webcontext=await browser.newContext({storageState:'state.json'})


})


test("end to end",async ({})=>{
    const page=await webcontext.newPage()
    page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash")
     
     await page.locator(".card-body").first().waitFor()
     const products=page.locator(".card-body")
     const cot=await products.count()
     const prdouctname="iphone 13 pro"
     for(let i=0;i<=cot;i++){
      if(await products.nth(i).locator('b').textContent() === prdouctname){
       await products.nth(i).locator("text= Add To Cart").click()
        console.log("clicked..")
      
        break;
      }


     }
     await page.locator('[routerlink="/dashboard/cart"]').click()
    await  page.locator('div li').first().waitFor()
const bool=await page.locator("h3:has-text('iphone 13 pro')").isVisible()
expect(bool).toBeTruthy()
await page.locator("text=Checkout").click()
const echeck=await page.locator(".details__user input[type='text']").inputValue()
await expect(echeck).toEqual("abhishektest1@yopmail.com")
await page.locator('[placeholder="Select Country"]').pressSequentially("ind");

await page.locator('section .ta-results').first().waitFor();
const dropdownoption=await page.locator('section .ta-results').locator('button')
const dropdown=await dropdownoption.count()
for(let j=0;j<dropdown;j++){
 const tt=await dropdownoption.nth(j).textContent()
 if(tt === " India"){
  await dropdownoption.nth(j).click()
  break;
 }
}
await page.locator('.action__submit').click()
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
const orderid=await page.locator("label[class='ng-star-inserted']").textContent()
console.log(orderid)
const OrderIdOnly = orderid.replace(/[^a-zA-Z0-9]/g, "");
console.log(OrderIdOnly);

await page.locator("label[routerlink='/dashboard/myorders']").click()
await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")


await page.locator('.table-bordered').waitFor()
const tablerow=await page.locator('tbody tr')
const rowcount= await tablerow.count()
for(let k=0;k<rowcount;k++){
 const row=await tablerow.nth(k)
 const odid=await row.locator('th').textContent()
 await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",route=> route.continue({url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=123456789874561232147852'})
 )
 if(OrderIdOnly === odid.trim()){
  await row.getByRole('button',{name:'View'}).click()
  break;
 }
}
await page.pause()
const orderconfirm=await page.locator('.col-text').textContent()
await expect(orderconfirm.includes(OrderIdOnly)).toBeTruthy();

})