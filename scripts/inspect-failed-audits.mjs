import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));

console.log('=== MOBILE AUDIT SCORES ===');
for (const cat of Object.values(mobile.categories)) {
  console.log(`${cat.title}: ${(cat.score * 100).toFixed(0)}`);
}

console.log('\n=== FAILED AUDITS (Score < 1) ===');
for (const [id, audit] of Object.entries(mobile.audits)) {
  if (audit.score !== null && audit.score < 1) {
    console.log(`- [${id}] (Score: ${(audit.score * 100).toFixed(0)}%): ${audit.title}`);
    if (audit.displayValue) console.log(`  DisplayValue: ${audit.displayValue}`);
    if (audit.explanation) console.log(`  Explanation: ${audit.explanation}`);
    if (audit.details?.items?.length) {
      console.log(`  Items: ${audit.details.items.length}`);
      console.log('  Details sample:', JSON.stringify(audit.details.items.slice(0, 3), null, 2));
    }
  }
}
