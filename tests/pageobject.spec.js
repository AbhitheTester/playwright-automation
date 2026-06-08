//import { test, expect } from '@playwright/test'
import {cutometest} from '../Fixtures/Datashare.js'
import {Login} from '../Pages/Login.js'
import {Dashboard} from '../Pages/Dashboard.js'
import {MyCartCheckout} from '../Pages/MyCartCheckout.js'
import {PlaceOrderandPayment} from '../Pages/PlaceOrderandPayment.js'
import {OrderConfimation} from '../Pages/OrderConfimation.js'
import {AllOrder} from '../Pages/AllOrder.js'
/*
const data = JSON.parse(
    JSON.stringify(
        require("../utils/ecomdata.json")
    )
)
*/


cutometest("end to end", async ({ page ,data}) => {
    const lg = new Login(page)
    await lg.urlm()
  //  const email = "abhishektest1@yopmail.com"
  //  const pass = "Test@123"
    // const prdouctname = "iphone 13 pro"
     await lg.loginportal(data.email, data.pass)

   
    const dash = new Dashboard(page);
    await dash.searchandadd(data.prdouctname)
    await dash.gotoCartpage()


    const check = new MyCartCheckout(page)
    await check.checkout()

    const placeorder=new PlaceOrderandPayment(page)
    await placeorder.Verifyemail()
    await placeorder.Addcountryandclickonplacebutton() 

    const ordercon=new OrderConfimation(page)
    const OrderIdOnly=await ordercon.verifyorderplaceAndOrderid()



   const allord=new AllOrder(page)
   allord.VerifyOrderID(OrderIdOnly)

})