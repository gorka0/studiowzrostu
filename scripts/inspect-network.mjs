import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));

const networkRequests = mobile.audits['network-requests'];
if (networkRequests && networkRequests.details && networkRequests.details.items) {
  console.log('Total network requests:', networkRequests.details.items.length);
  networkRequests.details.items.forEach(req => {
    console.log(`${req.statusCode} | ${req.resourceType} | ${(req.transferSize / 1024).toFixed(1)} KB | ${req.url}`);
  });
}
