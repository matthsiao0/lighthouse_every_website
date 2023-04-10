import {writeFileSync} from 'fs';
import puppeteer from 'puppeteer';
import {startFlow} from 'lighthouse';

// Setup Puppeteer
const browser = await puppeteer.launch();
const page = await browser.newPage();
const flow = await startFlow(page);

// Delete Cookie
await page.deleteCookie()

// 1. Navigate to SWAG
await flow.navigate('https://swag.live/');


new Promise(r => setTimeout(r, 1000));
// 2. Start Timespan audit for Closing Notification
await flow.startTimespan()
const close_notification_button = await page.$('button[class*="PopupNotificationCenter__ActionButton"]')
await close_notification_button.click()
await flow.endTimespan()


new Promise(r => setTimeout(r, 1000));
// 3. Start Timespan audit for clogin Landing Button
await flow.startTimespan()
const landing_button = await page.$('button[class*="Landing__ConfirmButton"]')
await landing_button.click()
await flow.endTimespan()


new Promise(r => setTimeout(r, 1000));
// 4. Start Timespan audit for Join first stream
await flow.startTimespan()
const livestream_card = await page.$('a[class*="LiveStreamCard"]')
await livestream_card.click()
await flow.endTimespan()

new Promise(r => setTimeout(r, 5000))
// 3. analyze current Livestream state
await flow.snapshot()

// Teardown: Close browser and generate report
await browser.close();
writeFileSync('../.reports/swag_timespan.html', await flow.generateReport());
