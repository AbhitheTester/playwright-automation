import { test, expect, request } from "@playwright/test"
import console from "node:console";
const {ApiUtils}=require('./utils/ApiUtils')
const payloaddata = { userEmail: "abhishektest1@yopmail.com", userPassword: "Test@123" }
const orderplayload = {
    orders: [
        {
            country: "Bermuda",
            productOrderedId: "6960eac0c941646b7a8b3e68"
        }
    ]
}
let tokent;
let userId;
let orderid;

test.beforeAll(async () => {
    const apicontext = await request.newContext()
    const apiutils =new ApiUtils(apicontext, payloaddata)
    orderid = await apiutils.createorder(orderplayload)
   const  [val1,val2]=await apiutils.token();
   tokent=val1
   userId=val2

})


test.only("api test", async ({ request }) => {
 //   console.log("the value of token",tokent)
 

 const orderpageres = await request.get(`https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/${userId}`, {
        headers: {
            'authorization': tokent,
        }
    })
    const orderdata = await orderpageres.json()
    const orderarray = await orderdata.data

    console.log(orderdata)
    for (const ord of orderarray) {
        const historderid = ord._id
        if (orderid === historderid) {
            console.log("product matched" + "  " + ord.productName)
            break
        }
    }

    /*
    
    test("end to end",async ({page})=>{
        page.addInitScript(value=>{
            window.localStorage.setItem('token',value)
        },tokent)
           await page.goto("https://rahulshettyacademy.com/client")
         //await  page.waitForLoadState("networkidle")
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
    console.log(OrderIdOnly)
    await page.locator("label[routerlink='/dashboard/myorders']").click()
    await page.locator('.table-bordered').waitFor()
    const tablerow=await page.locator('tbody tr')
    const rowcount= await tablerow.count()
    for(let k=0;k<rowcount;k++){
     const row=await tablerow.nth(k)
     const odid=await row.locator('th').textContent()
     if(OrderIdOnly === odid.trim()){
      await row.getByRole('button',{name:'View'}).click()
      break;
     }
    }
    const orderconfirm=await page.locator('.col-text').textContent()
    await expect(orderconfirm.includes(OrderIdOnly)).toBeTruthy();
    
    })
    */

})