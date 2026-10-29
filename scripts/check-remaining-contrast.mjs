import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));
const cc = mobile.audits['color-contrast'];
console.log('Total remaining contrast failures:', cc.details?.items?.length);
cc.details?.items?.forEach((item, i) => {
  console.log(`#${i + 1}: ${item.node.snippet} | selector: ${item.node.selector}`);
  console.log(`   explanation: ${item.explanation}\n`);
});
