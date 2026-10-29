import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("d:/home/strony/studio-wzrostu-concepts/node_modules/playwright");

async function checkCookieBanner() {
  const browser = await chromium.launch({ headless: true });
  
  // Light mode
  const lightContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'light',
  });
  const page = await lightContext.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  const banner = page.locator("aside[aria-label='Powiadomienie o plikach cookies']");
  if (await banner.isVisible()) {
    await banner.screenshot({
      path: "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5/cookie-banner-light.png"
    });
    console.log("Captured light mode banner");
  } else {
    console.log("Banner not visible in light mode");
  }

  // Dark mode
  const darkContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    colorScheme: 'dark',
  });
  const dPage = await darkContext.newPage();
  await dPage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await dPage.evaluate(() => {
    localStorage.clear();
    document.documentElement.classList.add("dark");
  });
  await dPage.waitForTimeout(500);

  const dBanner = dPage.locator("aside[aria-label='Powiadomienie o plikach cookies']");
  if (await dBanner.isVisible()) {
    await dBanner.screenshot({
      path: "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5/cookie-banner-dark.png"
    });
    console.log("Captured dark mode banner");
  }

  await browser.close();
}

checkCookieBanner().catch(console.error);
