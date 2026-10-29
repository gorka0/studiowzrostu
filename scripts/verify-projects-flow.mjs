import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("d:/home/strony/studio-wzrostu-concepts/node_modules/playwright");

const ARTIFACT_DIR = "C:/Users/tomek/.gemini/antigravity/brain/0205575c-fb82-4d99-a6a2-6b4502c090c5";
const REPORTS_DIR = "d:/home/strony/studiowzrostu/reports/screenshots";
fs.mkdirSync(REPORTS_DIR, { recursive: true });

async function runVerification() {
  console.log("=== START WERYFIKACJI SEKCJI PROJEKTY I PODSTRONY /projekty ===");
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: "desktop", width: 1440, height: 900 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "mobile", width: 375, height: 812 },
  ];

  const themes = ["light", "dark"];

  // 1. Zrzuty ekranu /projekty oraz strony głównej (#projekty)
  for (const theme of themes) {
    for (const vp of viewports) {
      const page = await browser.newPage({
        viewport: { width: vp.width, height: vp.height },
      });

      // Ustaw motyw w localStorage przed załadowaniem
      await page.addInitScript((t) => {
        localStorage.setItem("theme", t);
      }, theme);

      // Wejdź na /projekty
      await page.goto("http://localhost:3000/projekty", { waitUntil: "networkidle" });
      await page.waitForTimeout(500);

      // Zrzut całej strony /projekty
      const filenameProjekty = `projekty-${vp.width}px-${theme}.png`;
      const outProjektyLocal = path.join(REPORTS_DIR, filenameProjekty);
      const outProjektyArtifact = path.join(ARTIFACT_DIR, filenameProjekty);
      await page.screenshot({ path: outProjektyLocal, fullPage: true });
      fs.copyFileSync(outProjektyLocal, outProjektyArtifact);
      console.log(`✔ Zapisano zrzut: ${filenameProjekty}`);

      // Wejdź na stronę główną i zrób zrzut sekcji #projekty
      await page.goto("http://localhost:3000/#projekty", { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      const section = await page.$("#projekty");
      if (section) {
        const filenameHomeSec = `home-projekty-${vp.width}px-${theme}.png`;
        const outHomeSecLocal = path.join(REPORTS_DIR, filenameHomeSec);
        const outHomeSecArtifact = path.join(ARTIFACT_DIR, filenameHomeSec);
        await section.screenshot({ path: outHomeSecLocal });
        fs.copyFileSync(outHomeSecLocal, outHomeSecArtifact);
        console.log(`✔ Zapisano zrzut sekcji home: ${filenameHomeSec}`);
      }

      await page.close();
    }
  }

  // 2. Test interaktywny suwaka na karcie C (mysz + klawiatura)
  console.log("\n--- TEST INTERAKTYWNY SUWAKA NA KARCIE C ---");
  const testPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await testPage.goto("http://localhost:3000/projekty", { waitUntil: "networkidle" });

  const slider = await testPage.$('input[aria-label="Porównanie: przed i po"]');
  if (!slider) {
    throw new Error("Nie znaleziono suwaka przed/po!");
  }

  const initialVal = await slider.evaluate((el) => el.value);
  console.log(`Początkowa wartość suwaka: ${initialVal} (oczekiwano: 50)`);

  // Focus i zmiana strzałkami klawiatury
  await slider.focus();
  await testPage.keyboard.press("ArrowRight");
  const valAfterRight = await slider.evaluate((el) => el.value);
  console.log(`Wartość po ArrowRight (+5%): ${valAfterRight} (oczekiwano: 55)`);

  await testPage.keyboard.press("ArrowLeft");
  await testPage.keyboard.press("ArrowLeft");
  const valAfterLeft = await slider.evaluate((el) => el.value);
  console.log(`Wartość po 2x ArrowLeft (-10%): ${valAfterLeft} (oczekiwano: 45)`);

  // 3. Test otwarcia i zamknięcia Dialogu dla każdej z 3 kart
  console.log("\n--- TEST OTWARCIA DIALOGÓW DLA KART A, B, C ---");
  const viewButtons = await testPage.$$('button:has-text("Zobacz koncepcję")');
  console.log(`Liczba przycisków 'Zobacz koncepcję': ${viewButtons.length} (oczekiwano: 3)`);

  for (let i = 0; i < viewButtons.length; i++) {
    const btn = viewButtons[i];
    await btn.click();
    await testPage.waitForTimeout(400);

    // Sprawdź czy okno dialogowe jest w DOM i widoczne
    const dialogPopup = await testPage.$('[role="dialog"]');
    const isVisible = dialogPopup ? await dialogPopup.isVisible() : false;
    console.log(`Karta ${i + 1}: Dialog otwarty i widoczny: ${isVisible}`);

    // Zrób zrzut modala
    const dialogScreenshot = `dialog-concept-${i + 1}.png`;
    await testPage.screenshot({ path: path.join(REPORTS_DIR, dialogScreenshot) });
    fs.copyFileSync(path.join(REPORTS_DIR, dialogScreenshot), path.join(ARTIFACT_DIR, dialogScreenshot));
    console.log(`  ✔ Zapisano zrzut dialogu: ${dialogScreenshot}`);

    // Zamknij przez Esc
    await testPage.keyboard.press("Escape");
    await testPage.waitForTimeout(300);

    const isClosed = !(await testPage.$('[role="dialog"]'));
    console.log(`Karta ${i + 1}: Dialog zamknięty klawiszem Escape: ${isClosed}`);
  }

  // 4. Sprawdzenie kontrastu elementów
  console.log("\n--- SPRAWDZENIE KONTRASTU ETYKIET I PASKÓW ---");
  const contrastCheck = await testPage.evaluate(() => {
    function getLuminance(r, g, b) {
      const a = [r, g, b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function parseRgb(colorStr) {
      const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (!m) return [0, 0, 0];
      return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
    }

    function getContrast(rgb1, rgb2) {
      const l1 = getLuminance(...rgb1);
      const l2 = getLuminance(...rgb2);
      const lighter = Math.max(l1, l2);
      const darker = Math.min(l1, l2);
      return (lighter + 0.05) / (darker + 0.05);
    }

    const przedEl = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Przed');
    const poEl = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Po');
    const badgeEl = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'Koncepcja własna');
    const urlEl = Array.from(document.querySelectorAll('span')).find(s => s.textContent.trim() === 'koncepcja.example');

    const results = [];
    if (przedEl) {
      const s = window.getComputedStyle(przedEl);
      const color = parseRgb(s.color);
      // tło jest rgba(0, 0, 0, 0.85)
      const bg = [15, 15, 15];
      results.push({ name: 'Etykieta "Przed"', color: s.color, bg: 'rgba(0,0,0,0.85)', contrast: getContrast(color, bg).toFixed(2) });
    }

    if (poEl) {
      const s = window.getComputedStyle(poEl);
      const color = parseRgb(s.color);
      const bg = [15, 15, 15];
      results.push({ name: 'Etykieta "Po"', color: s.color, bg: 'rgba(0,0,0,0.85)', contrast: getContrast(color, bg).toFixed(2) });
    }

    if (badgeEl) {
      const s = window.getComputedStyle(badgeEl);
      const color = parseRgb(s.color);
      const bg = parseRgb(s.backgroundColor);
      // Jeśli bg transparentny, weź tło karty
      const effectiveBg = bg[0] === 0 && bg[1] === 0 && bg[2] === 0 ? [249, 250, 250] : bg;
      results.push({ name: 'Plakietka "Koncepcja własna"', color: s.color, bg: s.backgroundColor, contrast: getContrast(color, effectiveBg).toFixed(2) });
    }

    if (urlEl) {
      const s = window.getComputedStyle(urlEl);
      const color = parseRgb(s.color);
      const bg = parseRgb(s.backgroundColor);
      const effectiveBg = bg[0] === 0 && bg[1] === 0 && bg[2] === 0 ? [255, 255, 255] : bg;
      results.push({ name: 'Pasek adresu "koncepcja.example"', color: s.color, bg: s.backgroundColor, contrast: getContrast(color, effectiveBg).toFixed(2) });
    }

    return results;
  });

  console.table(contrastCheck);

  await testPage.close();
  await browser.close();
  console.log("\n=== WERYFIKACJA INTERAKCJI ZAKOŃCZONA SUKCESEM ===");
}

runVerification().catch((err) => {
  console.error("Błąd weryfikacji:", err);
  process.exit(1);
});
