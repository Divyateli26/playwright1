import { test, expect } from '@playwright/test';
import { fakerEN_IN } from '@faker-js/faker';

test('Fill Data Entry Form using Indian Faker Data', async ({ page }) => {

    // Test timeout
    test.setTimeout(60000);

    // =========================================
    // 1. WEBSITE OPEN
    // =========================================

    await page.goto(
        'https://testautomationpractice.blogspot.com/',
        {
            waitUntil: 'domcontentloaded'
        }
    );


    // =========================================
    // 2. FAKER DATA GENERATE
    // =========================================

    const generatedName =
        fakerEN_IN.person.fullName();

    // Name field में maximum 15 characters हैं
    const fullName =
        generatedName.substring(0, 15);

    const email =
        fakerEN_IN.internet.email();

    const phoneNumber =
        '9876543210';

    const fullAddress =
        fakerEN_IN.location.streetAddress() +
        ', ' +
        fakerEN_IN.location.city();


    // =========================================
    // 3. GENERATED DATA PRINT
    // =========================================

    console.log('--- जनरेट किया गया डेटा ---');

    console.log(
        `Original Name: ${generatedName}`
    );

    console.log(
        `Name used in form: ${fullName}`
    );

    console.log(
        `ईमेल: ${email}`
    );

    console.log(
        `फोन नंबर: ${phoneNumber}`
    );

    console.log(
        `पता: ${fullAddress}`
    );


    // =========================================
    // 4. NAME
    // =========================================

    const nameInput =
        page.locator('#name');

    await nameInput.waitFor({
        state: 'visible',
        timeout: 10000
    });

    await nameInput.fill(fullName);


    // =========================================
    // 5. EMAIL
    // =========================================

    const emailInput =
        page.locator('#email');

    await emailInput.fill(email);


    // =========================================
    // 6. PHONE
    // =========================================

    const phoneInput =
        page.locator('#phone');

    await phoneInput.fill(phoneNumber);


    // =========================================
    // 7. ADDRESS
    // =========================================

    const addressInput =
        page.locator('#textarea');

    await addressInput.fill(fullAddress);


    // =========================================
    // 8. VERIFY DATA
    // =========================================

    await expect(nameInput)
        .toHaveValue(fullName);

    await expect(emailInput)
        .toHaveValue(email);

    await expect(phoneInput)
        .toHaveValue(phoneNumber);

    await expect(addressInput)
        .toHaveValue(fullAddress);


    // =========================================
    // 9. SUCCESS MESSAGE
    // =========================================

    console.log(
        '✅ Name, Email, Phone और Address successfully filled.'
    );


    // Browser में देखने के लिए
    await page.waitForTimeout(3000);

});