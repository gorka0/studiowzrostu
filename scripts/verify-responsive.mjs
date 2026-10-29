import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = path.resolve("./screenshots");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const widths = [375, 768, 1024, 1440, 1920];

console.log("==================================================");
console.log(" WERYFIKACJA RESPONSYWNOŚCI /design W CHROME");
console.log("==================================================");

for (const w of widths) {
  const h = 900;
  const shotPath = path.join(outDir, `design-${w}px.png`).replace(/\\/g, "/");
  const cmd = `& '${chromePath}' --headless=new --disable-gpu --window-size=${w},${h} --screenshot='${shotPath}' http://localhost:3000/design`;
  
  try {
    execSync(`powershell -NoProfile -Command "${cmd}"`, { stdio: "pipe" });
    const stats = fs.statSync(shotPath);
    console.log(`✓ Szerokość ${w}px: zrzut wygenerowany pomyślnie (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error(`✗ Szerokość ${w}px błąd: ${err.message}`);
  }
}

console.log("==================================================");
