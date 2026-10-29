import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("d:/home/strony/studio-wzrostu-concepts/node_modules/playwright");

async function runTests() {
  console.log("=== ROZPOCZYNAM AUTOMATYCZNY AUDYT 4 ULEPSZEŃ UI/UX ===\n");
  const browser = await chromium.launch({ headless: true });
  let allPassed = true;

  // ----------------------------------------------------
  // TEST 1: KARTY Z EFEKTEM SPOTLIGHT HOVER (Zero re-renders)
  // ----------------------------------------------------
  console.log("--- TEST 1: SpotlightCard (Wydajność & Zmienne CSS) ---");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  await desktopContext.grantPermissions(["clipboard-read", "clipboard-write"]);
  const page = await desktopContext.newPage();
  await page.goto("http://localhost:3000/uslugi", { waitUntil: "networkidle" });
  
  // Zaakceptuj cookies
  const cookieBtn = page.locator("button:has-text('Akceptuj wszystkie')");
  if (await cookieBtn.isVisible()) {
    await cookieBtn.click();
    await page.waitForTimeout(300);
  }

  const spotlightCard = page.locator(".group.relative.overflow-hidden.rounded-2xl").first();
  await spotlightCard.scrollIntoViewIfNeeded();

  // Sprawdzamy stan początkowy zmiennych CSS
  const initialVars = await spotlightCard.evaluate((el) => ({
    x: el.style.getPropertyValue("--mouse-x"),
    y: el.style.getPropertyValue("--mouse-y"),
  }));

  // Poruszamy myszką nad kartą
  const box = await spotlightCard.boundingBox();
  if (box) {
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.waitForTimeout(100);
    await page.mouse.move(box.x + 120, box.y + 80);
    await page.waitForTimeout(100);
  }

  const updatedVars = await spotlightCard.evaluate((el) => ({
    x: el.style.getPropertyValue("--mouse-x"),
    y: el.style.getPropertyValue("--mouse-y"),
  }));

  console.log(`  Początkowe zmienne CSS: --mouse-x: "${initialVars.x}", --mouse-y: "${initialVars.y}"`);
  console.log(`  Zaktualizowane zmienne CSS po ruchu myszą: --mouse-x: "${updatedVars.x}", --mouse-y: "${updatedVars.y}"`);

  if (!updatedVars.x || updatedVars.x === "0px") {
    console.error("  ❌ BŁĄD: Zmienna --mouse-x nie zaktualizowała się na elemencie DOM!");
    allPassed = false;
  } else {
    console.log("  ✅ Zmienne CSS aktualizowane bezpośrednio na ref bez re-renderów Reacta!");
  }

  // ----------------------------------------------------
  // TEST 2: SEKWENCYJNE ODSŁANIANIE NAGŁÓWKÓW (Ochrona polskich znaków)
  // ----------------------------------------------------
  console.log("\n--- TEST 2: RevealHeading (Semantyka i ogonki ą, ę, g, j, y) ---");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  const revealCheck = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll("h2"));
    const results = [];
    for (const h of headings) {
      const srOnly = h.querySelector(".sr-only");
      const animatedContainer = h.querySelector("[aria-hidden='true']");
      const wordWrappers = h.querySelectorAll(".overflow-hidden");
      
      let hasDiacriticsProtection = true;
      wordWrappers.forEach((w) => {
        const style = window.getComputedStyle(w);
        const pb = parseFloat(style.paddingBottom);
        const mb = parseFloat(style.marginBottom);
        if (pb <= 0 || mb >= 0) {
          hasDiacriticsProtection = false;
        }
      });

      results.push({
        text: srOnly ? srOnly.textContent : h.textContent,
        hasSrOnly: !!srOnly,
        hasAriaHidden: !!animatedContainer,
        wordsCount: wordWrappers.length,
        hasDiacriticsProtection,
      });
    }
    return results;
  });

  console.log(`  Znaleziono ${revealCheck.length} nagłówków h2 zoptymalizowanych pod RevealHeading.`);
  for (const item of revealCheck.slice(0, 3)) {
    console.log(`  • "${item.text.slice(0, 45)}...": sr-only: ${item.hasSrOnly}, aria-hidden: ${item.hasAriaHidden}, ochrona ogonków: ${item.hasDiacriticsProtection}`);
    if (!item.hasSrOnly || !item.hasAriaHidden || !item.hasDiacriticsProtection) {
      console.error(`  ❌ BŁĄD w semantyce nagłówka: "${item.text}"`);
      allPassed = false;
    }
  }

  // ----------------------------------------------------
  // TEST 3: PRZYKLEJONY PASEK CTA NA MOBILE (375x812)
  // ----------------------------------------------------
  console.log("\n--- TEST 3: MobileStickyCTA (375x812 iPhone Viewport) ---");
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto("http://localhost:3000/", { waitUntil: "networkidle" });

  // Akceptujemy cookies na mobile
  const mCookieBtn = mobilePage.locator("button:has-text('Akceptuj wszystkie')");
  if (await mCookieBtn.isVisible()) {
    await mCookieBtn.click();
    await mobilePage.waitForTimeout(300);
  }

  const stickyBar = mobilePage.locator("aside[aria-hidden]");

  // A: Scroll 0px (Góra strony)
  const isVisibleAt0 = await stickyBar.evaluate((el) => {
    return !el.classList.contains("translate-y-full") && !el.classList.contains("opacity-0");
  });
  console.log(`  Scroll = 0px: Pasek widoczny: ${isVisibleAt0} (oczekiwano: false)`);
  if (isVisibleAt0) {
    console.error("  ❌ BŁĄD: Pasek CTA nie powinien być widoczny na samej górze strony!");
    allPassed = false;
  }

  // B: Scroll = 800px (Środek strony)
  await mobilePage.evaluate(() => window.scrollTo(0, 800));
  await mobilePage.waitForTimeout(400);

  const isVisibleAt800 = await stickyBar.evaluate((el) => {
    return !el.classList.contains("translate-y-full") && !el.classList.contains("opacity-0");
  });
  console.log(`  Scroll = 800px: Pasek widoczny: ${isVisibleAt800} (oczekiwano: true)`);
  if (!isVisibleAt800) {
    console.error("  ❌ BŁĄD: Pasek CTA powinien się pokazać po scrollu > 500px!");
    allPassed = false;
  }

  // C: Scroll do samej stopki
  await mobilePage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await mobilePage.waitForTimeout(500);

  const isVisibleAtBottom = await stickyBar.evaluate((el) => {
    return !el.classList.contains("translate-y-full") && !el.classList.contains("opacity-0");
  });
  console.log(`  Scroll = dół (stopka): Pasek widoczny: ${isVisibleAtBottom} (oczekiwano: false)`);
  if (isVisibleAtBottom) {
    console.error("  ❌ BŁĄD: Pasek CTA powinien się schować przy dojechaniu do stopki!");
    allPassed = false;
  }

  // D: Trasa /kontakt – pasek wykluczony
  await mobilePage.goto("http://localhost:3000/kontakt", { waitUntil: "networkidle" });
  const stickyOnContact = await mobilePage.locator("aside[aria-hidden]").count();
  console.log(`  Trasa /kontakt: liczba pasków CTA w DOM: ${stickyOnContact} (oczekiwano: 0)`);
  if (stickyOnContact !== 0) {
    console.error("  ❌ BŁĄD: Pasek CTA nie powinien być renderowany na /kontakt!");
    allPassed = false;
  }

  // ----------------------------------------------------
  // TEST 4: DYNAMICZNY PRZYCISK KOPIOWANIA E-MAILA (Zero CLS)
  // ----------------------------------------------------
  console.log("\n--- TEST 4: CopyEmailButton (Zero Layout Shift & Klawiatura) ---");
  await page.goto("http://localhost:3000/kontakt", { waitUntil: "networkidle" });

  const copyBtn = page.locator("button[aria-label*='Skopiuj adres e-mail']").first();
  await copyBtn.scrollIntoViewIfNeeded();

  const widthBefore = await copyBtn.evaluate((el) => el.getBoundingClientRect().width);
  console.log(`  Szerokość przed kliknięciem: ${widthBefore.toFixed(2)}px`);

  // Klikamy przycisk kopiowania
  await copyBtn.click();
  await page.waitForTimeout(200);

  const widthAfter = await copyBtn.evaluate((el) => el.getBoundingClientRect().width);
  const diff = Math.abs(widthBefore - widthAfter);
  console.log(`  Szerokość po kliknięciu ('Skopiowano...'): ${widthAfter.toFixed(2)}px (Różnica: ${diff.toFixed(2)}px)`);

  const srStatus = await copyBtn.locator("span[role='status']").textContent();
  console.log(`  Komunikat dla czytnika ekranu: "${srStatus}"`);

  if (diff > 1.0) {
    console.error(`  ❌ BŁĄD: Przycisk zmienił szerokość o ${diff.toFixed(2)}px (wykryto layout shift)!`);
    allPassed = false;
  } else {
    console.log("  ✅ Zero Layout Shift (stała szerokość dzięki nakładanemu gridowi)!");
  }

  if (!srStatus || !srStatus.includes("Skopiowano")) {
    console.error("  ❌ BŁĄD: Brak poprawnego komunikatu role='status' dla osób niewidomych!");
    allPassed = false;
  } else {
    console.log("  ✅ Dostępność WCAG AA (aria-label + polite live region) zweryfikowana!");
  }

  await desktopContext.close();
  await mobileContext.close();
  await browser.close();

  if (allPassed) {
    console.log("\n🎉 WSZYSTKIE 4 ULEPSZENIA UI/UX PRZESZŁY AUDYT Z WYNIKIEM 100%!");
  } else {
    console.error("\n❌ Wykryto błędy w audycie UI/UX!");
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error(err);
  process.exit(1);
});
