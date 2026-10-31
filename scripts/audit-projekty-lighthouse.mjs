import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT_DIR = "d:/home/strony/studiowzrostu";
const reportsDir = path.join(ROOT_DIR, "reports/lighthouse-projekty");
fs.mkdirSync(reportsDir, { recursive: true });

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
process.env.CHROME_PATH = chromePath;

console.log("=================================================");
console.log(" ROZPOCZYNAM AUDYT LIGHTHOUSE DLA /projekty [MOBILE]");
console.log("=================================================");

const jsonPath = path.join(reportsDir, "lighthouse-mobile.report.json");
const cmd = `npx lighthouse http://localhost:3000/projekty --output=json,html --output-path="${path.join(reportsDir, "lighthouse-mobile")}" --chrome-flags="--headless --disable-gpu --no-sandbox" --categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate --quiet`;

try {
  execSync(cmd, { stdio: "inherit", env: process.env });

  let actualJson = jsonPath;
  if (!fs.existsSync(actualJson) && fs.existsSync(path.join(reportsDir, "lighthouse-mobile.json"))) {
    actualJson = path.join(reportsDir, "lighthouse-mobile.json");
  }

  if (fs.existsSync(actualJson)) {
    const data = JSON.parse(fs.readFileSync(actualJson, "utf-8"));
    const cats = data.categories;
    const scores = {
      performance: Math.round((cats.performance?.score || 0) * 100),
      accessibility: Math.round((cats.accessibility?.score || 0) * 100),
      bestPractices: Math.round((cats["best-practices"]?.score || 0) * 100),
      seo: Math.round((cats.seo?.score || 0) * 100),
    };

    console.log("\n=================================================");
    console.log(" WYNIKI LIGHTHOUSE MOBILE DLA /projekty:");
    console.log("=================================================");
    console.log(`  ⚡ Performance:    ${scores.performance}/100`);
    console.log(`  ♿ Accessibility:  ${scores.accessibility}/100`);
    console.log(`  🛡  Best Practices: ${scores.bestPractices}/100`);
    console.log(`  🔍 SEO:            ${scores.seo}/100`);
    console.log("=================================================");

    if (scores.accessibility < 95 || scores.seo < 95) {
      console.log("\nSzczegóły niespełnionych audytów:");
      for (const audit of Object.values(data.audits)) {
        if (audit.score !== null && audit.score < 1 && audit.details) {
          console.log(`- [${audit.score}] ${audit.title}: ${audit.description}`);
        }
      }
    }
  }
} catch (err) {
  console.error("Błąd podczas uruchamiania Lighthouse:", err);
  process.exit(1);
}
