import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));
const cc = mobile.audits['color-contrast'];
if (cc && cc.details && cc.details.items) {
  console.log('Total color contrast failures:', cc.details.items.length);
  cc.details.items.forEach((item, idx) => {
    console.log(`#${idx + 1}: ${item.node.snippet}`);
    console.log(`   selector: ${item.node.selector}`);
    console.log(`   explanation: ${item.explanation}\n`);
  });
}
