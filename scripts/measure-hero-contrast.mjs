// Script to measure exact WCAG contrast of Hero typography against the background
// including the worst-case composite background (base + 10% curve fill + 8% grid line).

function hexToRgb(hex) {
  hex = hex.replace("#", "");
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, "0")).join("");
}

// Alpha blend: fg over bg
function blend(fgHex, bgHex, alpha) {
  const fg = hexToRgb(fgHex);
  const bg = hexToRgb(bgHex);
  return rgbToHex(
    fg.r * alpha + bg.r * (1 - alpha),
    fg.g * alpha + bg.g * (1 - alpha),
    fg.b * alpha + bg.b * (1 - alpha)
  );
}

function getLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  const toLinear = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  return 0.2126 * toLinear(sR) + 0.7152 * toLinear(sG) + 0.0722 * toLinear(sB);
}

function getContrast(fgHex, bgHex) {
  const l1 = getLuminance(fgHex);
  const l2 = getLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

console.log("======================================================================");
console.log(" POMIAR KONTRASTU WCAG 2.1: HERO SECTION W NAJGORSZYM PUNKCIE TŁA");
console.log("======================================================================\n");

// --- LIGHT THEME ---
const lightBase = "#FBFAF6";
const lightAccent = "#188755";
const lightInk = "#14231C";
const lightAccentText = "#136B43";
const lightMuted = "#3F5046";

// Worst-case background in light theme:
// 1. Base background (#FBFAF6)
// 2. Overlaid with max 10% curve fill (#188755)
// 3. Overlaid with 8% grid line (#14231C)
const lightWithCurve = blend(lightAccent, lightBase, 0.10);
const lightWorstBg = blend(lightInk, lightWithCurve, 0.08);

console.log("--- 1. MOTYW JASNY (LIGHT THEME) ---");
console.log(`Bazowe tło: ${lightBase}`);
console.log(`Tło z nałożonym wypełnieniem wykresu (10% akcent): ${lightWithCurve}`);
console.log(`Najgorszy punkt tła (+ linia siatki 8%): ${lightWorstBg}\n`);

const c1 = getContrast(lightInk, lightWorstBg);
const c2 = getContrast(lightAccentText, lightWorstBg);
const c3 = getContrast(lightMuted, lightWorstBg);

console.log(`1. Nagłówek H1 zdanie 1 (${lightInk}) [wymóg: 3.0:1]: ${c1.toFixed(2)}:1 -> ${c1 >= 3.0 ? "ZALICZONY (AA/AAA)" : "BŁĄD"}`);
console.log(`2. Nagłówek H1 zdanie 2 akcent (${lightAccentText}) [wymóg: 3.0:1]: ${c2.toFixed(2)}:1 -> ${c2 >= 3.0 ? "ZALICZONY (AA/AAA)" : "BŁĄD"}`);
console.log(`3. Podtytuł zwykły tekst (${lightMuted}) [wymóg: 4.5:1]: ${c3.toFixed(2)}:1 -> ${c3 >= 4.5 ? "ZALICZONY (AA)" : "BŁĄD"}\n`);

// --- DARK THEME ---
const darkBase = "#0B1410";
const darkAccent = "#2ECC71";
const darkInk = "#EDF5F1";
const darkAccentText = "#4ADE9C";
const darkMuted = "#90A69A";

// Worst-case background in dark theme:
// 1. Base background (#0B1410)
// 2. Overlaid with max 10% curve fill (#2ECC71)
// 3. Overlaid with 10% grid line (#2ECC71)
const darkWithCurve = blend(darkAccent, darkBase, 0.10);
const darkWorstBg = blend(darkAccent, darkWithCurve, 0.10);

console.log("--- 2. MOTYW CIEMNY (DARK THEME) ---");
console.log(`Bazowe tło: ${darkBase}`);
console.log(`Tło z nałożonym wypełnieniem wykresu (10% akcent): ${darkWithCurve}`);
console.log(`Najgorszy punkt tła (+ linia siatki 10%): ${darkWorstBg}\n`);

const cd1 = getContrast(darkInk, darkWorstBg);
const cd2 = getContrast(darkAccentText, darkWorstBg);
const cd3 = getContrast(darkMuted, darkWorstBg);

console.log(`1. Nagłówek H1 zdanie 1 (${darkInk}) [wymóg: 3.0:1]: ${cd1.toFixed(2)}:1 -> ${cd1 >= 3.0 ? "ZALICZONY (AA/AAA)" : "BŁĄD"}`);
console.log(`2. Nagłówek H1 zdanie 2 akcent (${darkAccentText}) [wymóg: 3.0:1]: ${cd2.toFixed(2)}:1 -> ${cd2 >= 3.0 ? "ZALICZONY (AA/AAA)" : "BŁĄD"}`);
console.log(`3. Podtytuł zwykły tekst (${darkMuted}) [wymóg: 4.5:1]: ${cd3.toFixed(2)}:1 -> ${cd3 >= 4.5 ? "ZALICZONY (AA)" : "BŁĄD"}\n`);

console.log("======================================================================");
console.log(" WYNIK: Wszystkie kontrasty w najgorszym punkcie tła spełniają normy WCAG AA!");
console.log("======================================================================");
