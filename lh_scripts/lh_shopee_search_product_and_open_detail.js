import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import {startFlow} from 'lighthouse';

// Setup Puppeteer
const browser = await puppeteer.launch();
const page = await browser.newPage();
const flow = await startFlow(page);

// 1. Navigate to Shopee
await flow.navigate('https://shopee.tw/');

// 2. Start Timespan audit for Closing advertisement overlay & Searching for Product
await flow.startTimespan()

  // 2.1. Close ad
const close_ad_button = await page.$('')
await close_ad_button.click()

  // 2.2. Search for product
const search_field = await page.$('input[class="stardust-input__element search-bar__input search-bar__input--orange"]')

    // 2.2.1. Delay 100 is for simulating user type in
await search_field.type('Lovense', {delay:100})

  // 2.3. Press Enter and wait for result page opened
await Promise.all([
    search_field.press('Enter'),
    page.waitForNavigation(),
  ])
await flow.endTimespan()

// 3. analyze current state
await flow.snapshot()

// Teardown: Close browser and generate report
await browser.close();
writeFileSync('../.report/lh_shopee_search_product_and_open_detail.html', await flow.generateReport());
