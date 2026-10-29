import fs from 'fs';

const d = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-desktop.report.json', 'utf8'));
const cc = d.audits['color-contrast'];
console.log('Desktop contrast items count:', cc.details?.items?.length);
cc.details?.items?.forEach((item, i) => {
  console.log(`#${i + 1}: ${item.node.snippet} | selector: ${item.node.selector}`);
  console.log(`   explanation: ${item.explanation}\n`);
});
