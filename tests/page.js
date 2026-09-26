import { test, expect } from '@playwright/test';

test('Amazon Mobile Scraping with Pagination', async ({ page }) => {
  // 1. अमेज़न इंडिया की वेबसाइट पर जाएँ
  await page.goto('https://amazon.in');

  // 2. सर्च बॉक्स में 'mobile' टाइप करें और Enter दबाएं
  const searchBox = page.locator('#twotabsearchtextbox');
  await searchBox.fill('mobile');
  await searchBox.press('Enter');

  // सर्च रिजल्ट्स पेज के लोड होने का इंतज़ार करें
  await page.waitForLoadState('domcontentloaded');

  // सारे मोबाइलों के नाम जमा करने के लिए एक खाली लिस्ट (Array)
  const allMobileLabels = [];
  let pageCounter = 1;
  let hasNextPage = true;

  // 3. Pagination लूप शुरू करें
  while (hasNextPage) {
    console.log(`प्रगति: पेज नंबर ${pageCounter} से डेटा निकाला जा रहा है...`);

    // स्क्रीनशॉट के अनुसार, हर प्रॉडक्ट के मुख्य नाम/टाईटल का लोकेटर ढूंढें
    // अमेज़न पर प्रॉडक्ट टाइटल्स के लिए आमतौर पर 'h2 a span' का इस्तेमाल होता है
    const mobileTitlesLocator = page.locator('h2 a span');
    await mobileTitlesLocator.first().waitFor();
    
    // इस करंट पेज पर जितने भी मोबाइलों के नाम दिख रहे हैं, उन्हें निकालें
    const currentPageMobiles = await mobileTitlesLocator.allTextContents();

    // निकाले गए नामों को हमारी मुख्य लिस्ट (allMobileLabels) में जोड़ें
    allMobileLabels.push(...currentPageMobiles);

    // 4. पेज के बिल्कुल नीचे मौजूद 'Next' बटन को ढूंढें
    // अमेज़न पर नेक्स्ट बटन की क्लास आमतौर पर '.s-pagination-next' होती है
    const nextButton = page.locator('.s-pagination-next');

    // चेक करें कि क्या 'Next' बटन मौजूद है और उसपर क्लिक किया जा सकता है
    if (await nextButton.isVisible() && await nextButton.isEnabled()) {
      
      // अगले पेज पर जाने के लिए 'Next' पर क्लिक करें
      await nextButton.click();
      
      // नया पेज पूरी तरह लोड होने तक का इंतज़ार करें (ताकि डेटा मिस न हो)
      await page.waitForLoadState('domcontentloaded');
      pageCounter++;

      // टेस्टिंग के लिए ब्रेक: अगर आप सिर्फ पहले 3 पेजों का डेटा देखना चाहते हैं, 
      // तो नीचे की दो लाइनों को अन-कमेंट (uncomment) कर सकते हैं:
      // if (pageCounter > 3) { hasNextPage = false; }

    } else {
      // अगर 'Next' बटन डिसेबल हो गया है या नहीं दिख रहा, तो इसका मतलब आख़िरी पेज आ गया है
      console.log('सारे पेजों का सफर पूरा हुआ! Pagination समाप्त।');
      hasNextPage = false;
    }
  }

  // 5. आख़िरी रिजल्ट कंसोल में प्रिंट करें
  console.log(`\n================ कलेक्ट किया गया डेटा ================`);
  console.log(`कुल मोबाइलों की संख्या: ${allMobileLabels.length}`);
  console.log('सभी मोबाइलों के नाम (Labels):', allMobileLabels);
});
