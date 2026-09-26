import { test, expect } from '@playwright/test';

test('Flipkart Search and Add to Cart Test', async ({ page, context }) => {
  // 1. Flipkart website par jana aur page load hone ka wait karna
  await page.goto('https://flipkart.com', { waitUntil: 'domcontentloaded' });

  // 2. Search bar me "Sofa Covers" type karke Enter press karna
  const searchBar = page.getByPlaceholder('Search for Products, Brands and More');
  await searchBar.fill('Sofa Covers');
  await searchBar.press('Enter');

  // 3. Pehle product card ka selector locator banana
  // Flipkart par products aam taur par titles ya specific test IDs se click hote hain
  // Yahan hum pehle available product link ko select kar rahe hainx
  const firstProduct = page.locator('a[class*="_1SDMkc"], a[class*="Vja24P"], a').title; 
  
  // Alternative fallback: Agar specific class na mile toh pehle image/product par click karne ke liye:
  const productCard = page.locator('div[data-id] a').first();  
  

  // 4. Race condition se bachne ke liye Promise.all ka use karke naya tab handle karna
  const [productPage] = await Promise.all([
    context.waitForEvent('page'), // Naye tab (popup) ka wait karega
    productCard.click(),          // Product par click karega jo naya tab kholega
  ]);

  // 5. Naye tab ke load hone ka wait karna
  await productPage.waitForLoadState('domcontentloaded');

  // 6. Naye tab me "Add to cart" button par click karna
  // Flipkart par 'Add to cart' text badal bhi sakta hai, isliye exact/lowercase handle kiya hai
  const addToCartButton = productPage.getByRole('button', { name: /add to cart/i });
  await addToCartButton.waitFor({ state: 'visible', timeout: 10000 });
  await addToCartButton.click();

  // 7. Verify karna ki hum cart page par pahunch gaye hain
  await expect(productPage).toHaveURL(/.*viewcart.*/);
});
