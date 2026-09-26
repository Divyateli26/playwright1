const { test } = require('@playwright/test');
const XLSX = require('xlsx');

test('Amazon Mobile Scraping with Pagination', async ({ page }) => {

    // Test timeout = 120 seconds
    test.setTimeout(120000);

    // =========================================
    // OPEN AMAZON
    // =========================================

    await page.goto('https://www.amazon.in', {
        waitUntil: 'domcontentloaded'
    });

    // Search box
    const searchBox = page.locator('#twotabsearchtextbox');

    await searchBox.fill('mobile');
    await searchBox.press('Enter');


    // =========================================
    // SEARCH RESULTS WAIT
    // =========================================

    const mobileTitlesLocator = page.locator(
        'div[data-component-type="s-search-result"] h2 span'
    );

    await mobileTitlesLocator.first().waitFor();


    console.log('Current URL:', page.url());
    console.log('Page Title:', await page.title());


    // =========================================
    // ALL MOBILE NAMES STORE
    // =========================================

    const allMobileLabels = [];

    let pageCounter = 1;


    // =========================================
    // PAGINATION
    // =========================================

    while (true) {

        console.log(
            `\nप्रगति: पेज नंबर ${pageCounter} से डेटा निकाला जा रहा है...`
        );


        // Current page products
        const mobileTitlesLocator = page.locator(
            'div[data-component-type="s-search-result"] h2 span'
        );


        // Products आने का wait
        await mobileTitlesLocator.first().waitFor();


        // Product count
        const count = await mobileTitlesLocator.count();

        console.log(
            'इस page पर products:',
            count
        );


        // =========================================
        // CURRENT PAGE MOBILE NAMES
        // =========================================

        const currentPageMobiles =
            await mobileTitlesLocator.allTextContents();


        // Main array में add करो
        allMobileLabels.push(
            ...currentPageMobiles
        );


        console.log(
            `इस page से ${currentPageMobiles.length} mobile names मिले`
        );


        // =========================================
        // NEXT BUTTON
        // =========================================

        const nextButton = page.locator(
            'a.s-pagination-next'
        );


        const nextCount =
            await nextButton.count();


        // Next button नहीं मिला
        if (nextCount === 0) {

            console.log(
                'Next button नहीं मिला। Pagination समाप्त।'
            );

            break;
        }


        // =========================================
        // CHECK NEXT BUTTON DISABLED
        // =========================================

        const isDisabled =
            await nextButton.getAttribute(
                'aria-disabled'
            );


        if (isDisabled === 'true') {

            console.log(
                'Next button disabled है। Pagination समाप्त।'
            );

            break;
        }


        // =========================================
        // NEXT PAGE CLICK
        // =========================================

        await nextButton.click();


        // Amazon को नई page load/update करने का थोड़ा time
        await page.waitForTimeout(1500);


        // New page के products आने का wait
        await page.locator(
            'div[data-component-type="s-search-result"] h2 span'
        ).first().waitFor();


        pageCounter++;
    }


    // =========================================
    // TOTAL DATA
    // =========================================

    console.log(
        '\n================ DATA ================='
    );

    console.log(
        'कुल मोबाइलों की संख्या:',
        allMobileLabels.length
    );


    console.log(
        'सभी मोबाइलों के नाम:'
    );

    console.log(
        allMobileLabels
    );


    // =========================================
    // CHECK DATA BEFORE EXCEL
    // =========================================

    console.log(
        '\n========================================'
    );

    console.log(
        'DATA EXCEL MEIN BHEJNE SE PEHLE'
    );

    console.log(
        'Total records:',
        allMobileLabels.length
    );

    console.log(
        '========================================'
    );


    // =========================================
    // CONVERT DATA FOR EXCEL
    // =========================================

    const excelData =
        allMobileLabels.map(
            (mobileName, index) => {

                return {
                    'Sr No': index + 1,
                    'Mobile Name': mobileName
                };

            }
        );


    console.log(
        'Excel Data rows:',
        excelData.length
    );


    // =========================================
    // CREATE WORKSHEET
    // =========================================

    const worksheet =
        XLSX.utils.json_to_sheet(
            excelData
        );


    // =========================================
    // CREATE WORKBOOK
    // =========================================

    const workbook =
        XLSX.utils.book_new();


    // =========================================
    // ADD WORKSHEET TO WORKBOOK
    // =========================================

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        'Mobile Data'
    );


    // =========================================
    // CREATE EXCEL FILE
    // =========================================

    XLSX.writeFile(
        workbook,
        'Amazon_Mobile_Data.xlsx'
    );


    console.log(
        '\nExcel file successfully created!'
    );

    console.log(
        'File: Amazon_Mobile_Data.xlsx'
    );

});