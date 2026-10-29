import { createRequire } from "module";
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = require("path");
const { chromium } = require("d:/home/strony/studio-wzrostu-concepts/node_modules/playwright");
const sharp = require("d:/home/strony/studio-wzrostu-concepts/node_modules/sharp");

const conceptsDir = "d:/home/strony/studio-wzrostu-concepts";
const publicDir = "d:/home/strony/studiowzrostu/public/concepts";

const tasks = [
  {
    name: "a-desktop",
    file: "a-serwis-maszyn/index.html",
    viewport: { width: 1440, height: 900 },
    targetWidth: 2000,
    maxSizeKb: 300,
  },
  {
    name: "a-mobile",
    file: "a-serwis-maszyn/index.html",
    viewport: { width: 390, height: 844 },
    targetWidth: 780,
    maxSizeKb: 150,
  },
  {
    name: "b-desktop",
    file: "b-aplikacja-grafik/index.html",
    viewport: { width: 1440, height: 900 },
    targetWidth: 2000,
    maxSizeKb: 300,
  },
  {
    name: "b-mobile",
    file: "b-aplikacja-grafik/index.html",
    viewport: { width: 390, height: 844 },
    targetWidth: 780,
    maxSizeKb: 150,
  },
  {
    name: "c-przed",
    file: "c-serwis-auto/przed.html",
    viewport: { width: 1440, height: 900 },
    targetWidth: 2000,
    maxSizeKb: 350,
  },
  {
    name: "c-po",
    file: "c-serwis-auto/po.html",
    viewport: { width: 1440, height: 900 },
    targetWidth: 2000,
    maxSizeKb: 300,
  },
];

async function generateUltraSharpConcepts() {
  console.log("Generating ultra-sharp concept screenshots...");
  const browser = await chromium.launch({ headless: true });

  for (const t of tasks) {
    const context = await browser.newContext({
      viewport: t.viewport,
      deviceScaleFactor: 2, // 2x Retina capture
    });
    const page = await context.newPage();
    const filePath = path.join(conceptsDir, t.file);
    await page.goto(`file:///${filePath.replace(/\\/g, "/")}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });
    await page.waitForTimeout(300);

    const rawPng = await page.screenshot({
      fullPage: false,
      clip: { x: 0, y: 0, width: t.viewport.width, height: t.viewport.height },
    });
    await context.close();

    // Sharp WebP with maximum compression effort (6), smartSubsample for text sharpness, quality 85
    const webpBuffer = await sharp(rawPng)
      .resize({ width: t.targetWidth })
      .webp({
        quality: 85,
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();

    const destPath = path.join(publicDir, `${t.name}.webp`);
    fs.writeFileSync(destPath, webpBuffer);
    console.log(`Saved ${t.name}.webp: ${(webpBuffer.length / 1024).toFixed(1)} KB (targetWidth: ${t.targetWidth})`);
  }

  await browser.close();
  console.log("All concept images re-generated with ultra sharpness!");
}

generateUltraSharpConcepts().catch(console.error);
