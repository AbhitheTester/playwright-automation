import{test,expect} from "@playwright/test"
import Login from "../Pages/Login.js";

test.beforeEach(async({page})=>{
    const lg=new Login(page)
 await    lg.loginportal("abhishektest@yopmail.com","Test@123")

})


   test("Login success validation", async ({ page }) => {
    await expect(
        page.locator('span:has-text("Browse Events")')
    ).toBeVisible();
    await      page.locator('span:has-text("Browse Events")').click()

   await page.getByRole("button",{name:'Add New Event'}).click()
  await  expect(page.locator('h2.mb-2')).toBeVisible()
  await page.locator('#event-title-input').fill(`Test Event ${Date.now()}`)
  const eventidcreated= await page.locator('#event-title-input').inputValue()
  await page.locator('textarea').fill("please book your seat for hanuman evenet at balaji")
  await page.locator("#category").selectOption("Festival")
  await page.getByLabel("city").fill("Delhi")
  await page.getByLabel("venue").fill("Khatu sham mandir Near ringus railway station ")
  await page.locator("input[type='datetime-local']").fill('2026-05-30T10:30')
  console.log(await page.locator("input[type='datetime-local']").inputValue())
    await page.getByPlaceholder("0.00").fill("100")
    await page.locator("#total-seats").fill("50")
    await page.locator("#add-event-btn").click()
  await expect(await page.locator('p',{hasText:'Event created!'})).toBeVisible()
  await page.locator("#nav-events").click()
  await expect(await page.locator("#event-card").nth(1)).toBeVisible()
  await expect(await page.locator("#event-card").locator("h3").filter({hasText:eventidcreated})).toBeVisible()
  const seattext=await page.locator("#event-card").filter({hasText:eventidcreated}).locator('span:has-Text("seats")').innerText()
  const seatsBeforeBooking=parseInt(seattext.match(/\d+/)[0])
  console.log(seatsBeforeBooking)
  await page.locator("#event-card").filter({hasText:eventidcreated}).locator("#book-now-btn").click()
  await page.locator("h2:has-text('Book Tickets')").isVisible()
  await expect(parseInt(await page.locator("#ticket-count").textContent())).toEqual(1)
  await page.locator("#customerName").fill("abhishek")
  await page.locator("#customer-email").fill("abhishektes1@yopmail.com")
  await page.locator("#phone").fill("8736382665")
    await page.locator("[type='submit']").click()
    await page.waitForSelector(".booking-ref")
    await expect((await page.locator(".booking-ref"))).toBeVisible()
    const bookingRef=await page.locator(".booking-ref").innerText()
    console.log(bookingRef)
    await page.locator("[data-testid='nav-bookings']").click()
    const BASE_URL="https://eventhub.rahulshettyacademy.com/bookings"
    await expect(await page.url()).toEqual(BASE_URL)
    await page.locator("#booking-card").first()
    await expect(await page.locator("#booking-card").first()).toBeVisible()
   // await page.locator("#booking-card").locator("span.booking-ref").filter({hasText:bookingRef}).toBeVisible()
   const bookreffrombookinpage= await page.locator("#booking-card").locator("span.booking-ref").filter({hasText:bookingRef}).textContent()
   await expect(bookingRef).toEqual(bookreffrombookinpage)
   await expect(await page.locator("#booking-card h3").filter({hasText:eventidcreated}).textContent()).toEqual(eventidcreated)
   await page.locator("#nav-events").click()
   await expect(await page.locator("#event-card").first()).toBeVisible()
 expect(await page.locator('[id="event-card"] h3').filter({hasText:eventidcreated})).toBeVisible()
 const seatsAfte=await page.locator("#event-card").filter({hasText:eventidcreated}).locator('span:has-Text("seats")').innerText()
 const seatsAfterBooking=parseInt(seatsAfte.match(/\d+/)[0])
 expect(seatsBeforeBooking-1).toEqual(seatsAfterBooking)

  await page.pause()
})