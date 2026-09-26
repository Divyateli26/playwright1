const { test, expect } = require('@playwright/test');

test.describe.configure({ retries: 2, mode: 'serial' });

test.use({
  screenshot: 'on',
  video: 'on',
  trace: 'on',
});

const amazonUrl = 'https://amazon.in';

// 🎯 यहाँ एक कॉमन 'page' और 'browserContext' वेरिएबल बनाएं
let context;
let page;

test.describe('Amazon Shared Browser Suite', () => {
  
  // 🎯 टेस्ट सूट शुरू होने से पहले सिर्फ एक बार ब्राउज़र खुलेगा
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    
    // पहली बार अमेज़न वेबसाइट पर जाएँ
    await page.goto(amazonUrl, { waitUntil: 'domcontentloaded' });
  });

  // 🎯 सारे टेस्ट खत्म होने के बाद ही ब्राउज़र बंद होगा
  test.afterAll(async () => {
    await page.close();
    await context.close();
  });

  // टेस्ट 1: ध्यान दें यहाँ { page } फिक्सचर को हटाकर सीधे ऊपर वाले page को यूज़ कर रहे हैं
  test('Amazon URL verify', { tag: '@url' }, async () => {
    await expect(page).toHaveURL(/https:\/\/www\.amazon\.in\/?/);
  });

  // टेस्ट 2
  test('Amazon title verify', { tag: '@title' }, async () => {
    await expect(page).toHaveTitle(/Amazon\.in/);
  });

  // टेस्ट 3
  test('Amazon label verify', { tag: '@label' }, async () => {
    await expect(page.locator('a[aria-label="Amazon.in"]')).toBeVisible();
  });

  // टेस्ट 4
  test('Amazon keyboard actions', { tag: '@keyboard' }, async () => {
    const searchBox = page.getByPlaceholder('Search Amazon.in');
    await searchBox.click();
    await searchBox.type('wireless headphones');
    //await page.pause();
    await searchBox.press('Control+A');
    await searchBox.press('ArrowLeft');
    await searchBox.press('ArrowRight');
    await searchBox.press('Home');
    await searchBox.press('End');
    await searchBox.press('Backspace');

    await expect(page).toHaveURL(/amazon\.in/);
  });
});
