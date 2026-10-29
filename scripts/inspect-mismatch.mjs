import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));

const audit = mobile.audits['label-content-name-mismatch'];
console.log('label-content-name-mismatch:', JSON.stringify(audit.details?.items, null, 2));
