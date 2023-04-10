import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import {startFlow} from 'lighthouse';

// Setup Puppeteer
const browser = await puppeteer.launch();
const page = await browser.newPage();
const flow = await startFlow(page);

// Delete Cookies and Disable Cache
await page.deleteCookie()
await page.setCacheEnabled(false)

// 1. Navigate to Shopee
await flow.navigate('https://shopee.tw/');

new Promise(r => setTimeout(r, 1000));
// 2. Close ad
await page.mouse.click(180, 0)

// 3. Start Timespan audit for Searching Product
await flow.startTimespan()
  
  // 3.1. Search for product
const search_field = await page.$('input[class="stardust-input__element search-bar__input search-bar__input--orange"]')

    // 3.1.1. Delay 100 is for simulating user type in
await search_field.type('iphone15', {delay:100})

  // 3.2. Press Enter and wait for result page opened
await Promise.all([
    search_field.press('Enter'),
    page.waitForNavigation(),
  ])
await flow.endTimespan()

// 4. Start Navigation audit
await flow.startTimespan()
const first_product = await page.$('img')
await first_product.click()
await flow.endTimespan()


// 5. Analyze Product detail page state
await flow.snapshot()

// Teardown: Close browser and generate report
await browser.close();
writeFileSync('./.reports/lh_shopee_search_product_and_open_detail.html', await flow.generateReport());
