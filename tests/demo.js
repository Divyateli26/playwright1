const { test, expect } = require('@playwright/test');

test('Window Handling Practice - HYR Tutorials', async ({ page, context }) => {
  // 1. नई प्रैक्टिस वेबसाइट पर जाएं
  await page.goto('https://www.amazon.in/aluminium-window-handle/s?k=aluminium+window+handle');

  // 2. नई विंडो (Page) के खुलने का इंतज़ार करने वाला प्रॉमिस (Promise) सेटअप करें
  const pagePromise = context.waitForEvent('page');

  // 3. उस बटन पर क्लिक करें जिससे नया टैब खुलता है
  // 'newTabBtn' इस बटन की ID है
  await page.locator("//img[@alt='Sponsored Ad - UPVC Casement Window Handle Aluminium White Colour']").click();

  // 4. नए टैब (Child Window) का ऑब्जेक्ट प्राप्त करें
  const newPage = await pagePromise;

  // 5. नए टैब के पूरी तरह लोड होने का इंतज़ार करें
  await newPage.waitForLoadState();

  // 6. नए टैब का टाइटल प्रिंट करें और वेरीफाई करें
  const childTitle = await newPage.title();
  console.log('New Tab Title: ' + childTitle);
  
  // 7. काम पूरा होने के बाद नए टैब को बंद करें
  await newPage.close();

  // 8. वापस पैरेंट विंडो पर आएं और उसका टाइटल प्रिंट करें
  const parentTitle = await page.title();
  console.log('Parent Window Title: ' + parentTitle);
});
