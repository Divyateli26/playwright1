import{test,expect}from 'playwright/test';
test('verify title',async({page})=>{

    test.setTimeout(50000);
    // open browser
await page.goto("https://www.flipkart.com/");


//gettitle
let title=await page.title();
console.log(title);



});