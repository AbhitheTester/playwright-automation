import {test as base} from '@playwright/test'

export const cutometest=base.extend({
    data:async ({},use)=>{
        await use({
        email:"abhishektest1@yopmail.com",
        pass: "Test@123",
        prdouctname:"iphone 13 pro"
    })
    }
})