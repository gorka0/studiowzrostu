import fs from 'fs';

const mobile = JSON.parse(fs.readFileSync('d:/home/strony/studiowzrostu/reports/lighthouse/lighthouse-mobile.report.json', 'utf8'));

const a11yCat = mobile.categories['accessibility'];
console.log('Accessibility score:', a11yCat.score);
for (const auditRef of a11yCat.auditRefs) {
  const audit = mobile.audits[auditRef.id];
  if (audit && audit.score !== null && audit.score < 1) {
    console.log(`Failed a11y audit: [${auditRef.id}] score: ${audit.score}, weight: ${auditRef.weight}, title: ${audit.title}`);
  }
}
