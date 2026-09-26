import{test,expect}from 'playwright/test';
test('verify title',async({page})=>{

    test.setTimeout(70000);
    // open browser
await page.goto("https://testautomationpractice.blogspot.com/");


//gettitle
let title=await page.title();
console.log(title);

//get url
let url=await page.url();
console.log(url);

//getText
let text=await page.locator("//h1[@class='title']").textContent();
console.log(text);

//click on element

await page.locator("//*[text()='Online Trainings']").click();
console.log("Online Trainings लिंक पर सफलतापूर्वक क्लिक हो गया है!");




//go backword page
await page.goBack();


//enter text

await page.locator("//*[@id='name']").fill("divya");
await page.locator("//*[@id='email']").fill("abc@gmail.com")

//await page.waitForTimeout(7000);

await page.locator("//*[@id='female']").click();
await page.locator("//*[text()='Sunday']/preceding-sibling::input").click();


let dropdown=await page.locator("//*[@id='country']");
await dropdown.selectOption({index:1});
await dropdown.selectOption({value:'uk'});
await dropdown.selectOption({label:'Australia'});

//scroll till ele

let scroll=await page.locator("//*[text()='Upload Single File']");
await scroll.scrollIntoViewIfNeeded();
console.log("scroll success");

//upload file
 let file="C://Users//DELL//Desktop//test.txt";
let upload_file=await page.locator("//*[@id='singleFileInput']");
await upload_file.setInputFiles(file);
await upload_file.setInputFiles([]);

//upload multiple file
let file1=["C://Users//DELL//Desktop//test.txt","C://Users//DELL//Desktop//test1.txt"];
let mul_f_upload =await page.locator("//*[@id='multipleFilesInput']");
await mul_f_upload.setInputFiles(file1);

//drag and drop

let src=await page.locator("//*[@id='draggable']");
let dest=await page.locator("//*[@id='droppable']");
await src.dragTo(dest);

//mouse hover

let mouse_over= await page.locator("//*[@class='dropbtn']");
await mouse_over.hover();
console.log("mouse hover");

//double click
let db_click=await page.locator("//*[text()='Copy Text']");
await db_click.dblclick();

});

test('handal iframe',async ({page})=>{
    await page.goto("https://bonigarcia.dev/selenium-webdriver-java/iframes.html");
    let frame= page.frameLocator("//*[@id='my-iframe']");
    let string=await frame.locator("//*[contains(text(), 'sociosqu maecenas mus etiam consequat ornare leo')]").textContent();
    console.log(string);


});