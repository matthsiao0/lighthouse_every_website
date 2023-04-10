// This is edited from: https://github.com/GoogleChrome/lighthouse/blob/main/docs/readme.md
// File name and type: shopee_lh.js
// note: lh for lighthouse
import fs from 'fs';
import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';

// Chrome Launcher Setup
const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
const options = {logLevel: 'info', output: 'html', port: chrome.port};
const runnerResult = await lighthouse('https://shopee.tw/', options);

// Generate report to given file
const reportHtml = runnerResult.report;
fs.writeFileSync('./.reports/lh_shopee_basic_report.html', reportHtml);

// Print Message and Score in Terminal
console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100);

// Teardown
await chrome.kill();
