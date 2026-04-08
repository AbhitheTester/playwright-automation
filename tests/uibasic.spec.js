const {test, expect}=require('@playwright/test')

test("abhishke first test",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   console.log(await page.title())

   await page.locator("#username").fill("rahulshett")
await page.locator("[name='password']").fill("Learning@830$3mK2")
await page.locator("[type='submit']").click()
console.log(await page.locator('[style*="block"]').textContent())

await expect(page.locator('[style*="block"]')).toContainText("Incorrect")
 await page.locator("#username").fill("")
  await page.locator("#username").fill("rahulshettyacademy")
await page.locator("[type='submit']").click()
console.log(await page.locator(".card-body a").allTextContents())

})

test("another test",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator(".text-reset").click()
    await page.locator("#firstName").fill("abhishek")
    await page.locator("[formcontrolname='lastName']").fill("koli")
    await page.locator("[type='email']").fill("abhishektest1@yopmail.com")
    await page.locator("#userMobile").fill("9810192668")
await page.locator("[formcontrolname='occupation']").selectOption('2: Student')
  
   await page.locator("[value='Male']").click()
   await page.locator('#userPassword').fill("Test@123")
   await page.locator('#confirmPassword').fill("Test@123")
   await page.locator('[formcontrolname="required"]').click()
   await page.locator("[value='Register']").click()
})

test("wait check",async  ({page})=>{
     await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
     await page.locator("#userEmail").fill("abhishektest1@yopmail.com")
     await page.locator('#userPassword').fill("Test@123")
     await page.locator("#login").click()
     //await  page.waitForLoadState("networkidle")
     await page.waitForSelector('page.locator(".card-body b")')
    console.log(await page.locator(".card-body b").allTextContents())

})
test("Check Assertion ",async ({page})=>{
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   console.log(await page.title())

   await page.locator("#username").fill("rahulshett")
await page.locator("[name='password']").fill("Learning@830$3mK2")
await page.locator("span.radiotextsty").last().click()
await  page.locator("#okayBtn").click()
console.log(await page.locator("span.radiotextsty").last().isChecked())
expect(await page.locator("span.radiotextsty").last().isChecked()).toBeTruthy()
//expect(page.locator("span.radiotextsty").last()).toBeChecked()


})
test("run two steps together",async ({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

const [newPage] = await Promise.all([
  context.waitForEvent('page'),
  page.locator(".blinkingText").first().click()
]);

const text = await newPage.locator("[href^='mailto:']").textContent();
console.log(text);

const domain = text.split('@')[1];


await page.locator("#username").fill(domain);

console.log(await page.locator("#username").inputValue())



})

test("end to end",async ({page})=>{
       await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
     await page.locator("#userEmail").fill("abhishektest1@yopmail.com")
     await page.locator('#userPassword').fill("Test@123")
     await page.locator("#login").click()
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

