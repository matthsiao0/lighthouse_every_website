import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import {startFlow} from 'lighthouse';

// Setup Puppeteer
const browser = await puppeteer.launch();
const page = await browser.newPage();
const flow = await startFlow(page);

// 1. Navigate to Shopee
await flow.navigate('https://shopee.tw/');

// Teardown: Close browser and generate report
await browser.close();
writeFileSync('./.reports/report.html', await flow.generateReport());
