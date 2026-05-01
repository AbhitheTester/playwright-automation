import {test,expect} from "@playwright/test"

test("hidden element check",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
    expect(page.locator("#displayed-text")).toBeVisible()
    await page.locator("#hide-textbox").click()
     expect(page.locator("#displayed-text")).toBeHidden()



})