import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("d:/home/strony/studio-wzrostu-concepts/node_modules/playwright");

async function capture() {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Mobile Sticky CTA screenshot
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
  });
  const mPage = await mobileContext.newPage();
  await mPage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const acceptBtn = mPage.locator("button:has-text('Akceptuj wszystkie')");
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
    await mPage.waitForTimeout(300);
  }
  await mPage.evaluate(() => window.scrollTo(0, 800));
  await mPage.waitForTimeout(500);
  await mPage.screenshot({
    path: "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5/mobile-sticky-cta.png",
  });

  // 2. CopyEmailButton screenshot
  const dContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await dContext.grantPermissions(["clipboard-read", "clipboard-write"]);
  const dPage = await dContext.newPage();
  await dPage.goto("http://localhost:3000/kontakt", { waitUntil: "networkidle" });
  const btn = dPage.locator("button[aria-label*='Skopiuj adres e-mail']").first();
  await btn.click();
  await dPage.waitForTimeout(200);
  await btn.screenshot({
    path: "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5/copy-email-button-copied.png",
  });

  await browser.close();
  console.log("Screenshots saved!");
}

capture().catch(console.error);
