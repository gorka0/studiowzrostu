import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));

const requests = mobile.audits['network-requests']?.details?.items || [];
console.log('Network requests with timing:');
requests.forEach(r => {
  console.log(`${r.statusCode} | ${r.resourceType} | ${(r.transferSize / 1024).toFixed(1)} KB | ${r.networkRequestTime.toFixed(0)} - ${r.networkEndTime.toFixed(0)} ms | ${r.url.split('/').pop()}`);
});
