import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import {startFlow} from 'lighthouse';

// Setup Puppeteer
const browser = await puppeteer.launch();
const page = await browser.newPage();
const flow = await startFlow(page);

// 1. Go to Lighthouse
await flow.navigate('https://developer.chrome.com/docs/lighthouse/');

// 2. Navigate to Lighthouse/Overview
await flow.startNavigation()
const overview = await page.$('a[class="align-center color-primary-shade decoration-none display-inline-flex lg:gap-right-600 surface"]')
await overview.click()
await flow.endNavigation()

// Teardown: Close browser and generate report
await browser.close();
writeFileSync('./.reports/lighthouse_navigate.html', await flow.generateReport());
