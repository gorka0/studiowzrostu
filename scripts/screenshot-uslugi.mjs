import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("d:/home/strony/studio-wzrostu-concepts/node_modules/playwright");

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  await page.goto("http://localhost:3000/uslugi", { waitUntil: "networkidle" });
  
  // Zaakceptuj cookies żeby nie zasłaniały widoku
  const acceptBtn = page.locator("button:has-text('Akceptuj wszystkie')");
  if (await acceptBtn.isVisible()) {
    await acceptBtn.click();
    await page.waitForTimeout(500);
  }
  
  // Znajdź pierwszą kartę usługi
  const card = page.locator("main .grid > div").first();
  await card.scrollIntoViewIfNeeded();
  
  const footer = card.locator(".border-t");
  await footer.screenshot({ path: "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5/fixed-footer-crop.png" });
  await card.screenshot({ path: "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5/fixed-card-full.png" });

  // Blog card
  await page.goto("http://localhost:3000/blog", { waitUntil: "networkidle" });
  const blogCard = page.locator("main .grid > div").first();
  await blogCard.scrollIntoViewIfNeeded();
  await blogCard.screenshot({ path: "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5/fixed-blog-card.png" });

  console.log("Screenshots captured!");
  await browser.close();
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
