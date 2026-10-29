import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));
const lcpAudit = mobile.audits['largest-contentful-paint-element'];
console.log(JSON.stringify(lcpAudit, null, 2));
