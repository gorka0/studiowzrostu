import fs from 'fs';

const desktop = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-desktop.report.json', 'utf8'));

console.log('=== DESKTOP AUDIT SCORES ===');
for (const cat of Object.values(desktop.categories)) {
  console.log(`${cat.title}: ${(cat.score * 100).toFixed(0)}`);
}

console.log('\n=== DESKTOP FAILED AUDITS (Score < 1) ===');
for (const [id, audit] of Object.entries(desktop.audits)) {
  if (audit.score !== null && audit.score < 1) {
    console.log(`- [${id}] (Score: ${(audit.score * 100).toFixed(0)}%): ${audit.title} (${audit.displayValue || ''})`);
  }
}
