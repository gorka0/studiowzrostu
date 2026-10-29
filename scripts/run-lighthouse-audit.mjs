import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ROOT_DIR = "d:/home/strony/studiowzrostu";
const reportsDir = path.join(ROOT_DIR, "reports/lighthouse");
fs.mkdirSync(reportsDir, { recursive: true });

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
process.env.CHROME_PATH = chromePath;

const configs = [
  {
    name: "mobile",
    flags: "--form-factor=mobile --screenEmulation.mobile=true --throttling-method=simulate",
  },
  {
    name: "desktop",
    flags: "--preset=desktop",
  },
];

const results = {};

for (const cfg of configs) {
  const jsonPath = path.join(reportsDir, `lighthouse-${cfg.name}.report.json`);
  console.log(`\n=================================================`);
  console.log(` ROZPOCZYNAM AUDYT LIGHTHOUSE [${cfg.name.toUpperCase()}]`);
  console.log(`=================================================`);

  const cmd = `npx lighthouse http://localhost:3000 --output=json,html --output-path="${path.join(reportsDir, `lighthouse-${cfg.name}`)}" --chrome-flags="--headless --disable-gpu --no-sandbox" --categories=performance,accessibility,best-practices,seo ${cfg.flags} --quiet`;
  
  try {
    execSync(cmd, { stdio: "inherit", env: process.env });

    let actualJson = jsonPath;
    if (!fs.existsSync(actualJson) && fs.existsSync(path.join(reportsDir, `lighthouse-${cfg.name}.json`))) {
      actualJson = path.join(reportsDir, `lighthouse-${cfg.name}.json`);
    }

    if (fs.existsSync(actualJson)) {
      const data = JSON.parse(fs.readFileSync(actualJson, "utf-8"));
      const cats = data.categories;
      const audits = data.audits;

      results[cfg.name] = {
        scores: {
          performance: Math.round((cats.performance?.score || 0) * 100),
          accessibility: Math.round((cats.accessibility?.score || 0) * 100),
          bestPractices: Math.round((cats["best-practices"]?.score || 0) * 100),
          seo: Math.round((cats.seo?.score || 0) * 100),
        },
        cwv: {
          fcp: audits["first-contentful-paint"]?.displayValue,
          lcp: audits["largest-contentful-paint"]?.displayValue,
          tbt: audits["total-blocking-time"]?.displayValue,
          cls: audits["cumulative-layout-shift"]?.displayValue,
          si: audits["speed-index"]?.displayValue,
        },
        failedAudits: [],
      };

      for (const [id, audit] of Object.entries(audits)) {
        if (audit.score !== null && audit.score < 1 && audit.scoreDisplayMode !== "notApplicable") {
          results[cfg.name].failedAudits.push({
            id,
            title: audit.title,
            score: audit.score,
            displayValue: audit.displayValue,
            description: audit.description?.slice(0, 150),
            details: audit.details?.items?.slice(0, 3),
          });
        }
      }
    }
  } catch (e) {
    console.error(`Błąd audytu Lighthouse [${cfg.name}]:`, e.message);
  }
}

console.log("\n=================================================");
console.log(" PODSUMOWANIE WYNIKÓW LIGHTHOUSE (Studio Wzrostu)");
console.log("=================================================");
console.log(JSON.stringify(results, null, 2));

fs.writeFileSync(path.join(reportsDir, "summary.json"), JSON.stringify(results, null, 2));
