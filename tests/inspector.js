import { test } from '@playwright/test';

test('Google Search with Inspector', async ({ page }) => {
  // 1. गूगल वेबसाइट पर जाएं
  await page.goto('https://google.com');

  // 2. सर्च बॉक्स में टाइप करें
  const searchInput = page.locator('textarea[name="q"]');
  await searchInput.fill('redmi');

  // 🎯 यहाँ टेस्ट रुक जाएगा और Playwright Inspector की विंडो खुल जाएगी!
  //await page.pause();

  // 3. इसके आगे का कोड तब तक नहीं चलेगा जब तक आप Inspector में 'Resume' (▶️) नहीं दबाते
  const suggestions = page.locator('[role="optio"]');
  await suggestions.filter({ hasText: 'redmi note 17' }).first().click();
});
