import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const ROOT_DIR = "d:/home/strony/studiowzrostu";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!fs.existsSync(chromePath)) {
  console.error("Chrome not found at: " + chromePath);
  process.exit(1);
}

const outDir = path.join(ROOT_DIR, "screenshots/hero-verification");
fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "375px", width: 375, height: 800 },
  { name: "768px", width: 768, height: 900 },
  { name: "1024px", width: 1024, height: 850 },
  { name: "1440px", width: 1440, height: 900 },
  { name: "1920px", width: 1920, height: 1000 },
];

const themes = [
  { name: "light", args: [] },
  { name: "dark", args: ["--blink-settings=forceDarkModeEnabled=true"] },
];

console.log("=================================================");
console.log(" REGENERACJA ZRZUTÓW HERO (z virtual-time-budget=2000)");
console.log("=================================================");

for (const vp of viewports) {
  for (const th of themes) {
    const fileName = `hero-${vp.name}-${th.name}.png`;
    const outFile = path.join(outDir, fileName);

    const args = [
      "--headless",
      "--disable-gpu",
      `--window-size=${vp.width},${vp.height}`,
      `--screenshot=${outFile}`,
      "--virtual-time-budget=2000",
      ...th.args,
      "http://localhost:3000",
    ];

    spawnSync(chromePath, args);
    if (fs.existsSync(outFile)) {
      const stats = fs.statSync(outFile);
      console.log(`✓ [HERO] ${vp.name} (${th.name}) -> ${fileName} (${(stats.size / 1024).toFixed(1)} KB)`);
    } else {
      console.error(`✗ Brak pliku: ${outFile}`);
    }
  }
}

// Test z wyłączonym JS
console.log("\n--- TEST: WYŁĄCZONY JAVASCRIPT ---");
const noJsOut = path.join(outDir, "hero-1440px-no-js.png");
spawnSync(chromePath, [
  "--headless",
  "--disable-gpu",
  "--disable-javascript",
  "--window-size=1440,900",
  `--screenshot=${noJsOut}`,
  "http://localhost:3000",
]);
if (fs.existsSync(noJsOut)) {
  const stats = fs.statSync(noJsOut);
  console.log(`✓ [HERO] 1440px (no-js) -> hero-1440px-no-js.png (${(stats.size / 1024).toFixed(1)} KB)`);
}

// Test z prefers-reduced-motion
console.log("\n--- TEST: PREFERS-REDUCED-MOTION ---");
const reducedMotionOut = path.join(outDir, "hero-1440px-reduced-motion.png");
spawnSync(chromePath, [
  "--headless",
  "--disable-gpu",
  "--force-prefers-reduced-motion",
  "--window-size=1440,900",
  `--screenshot=${reducedMotionOut}`,
  "http://localhost:3000",
]);
if (fs.existsSync(reducedMotionOut)) {
  const stats = fs.statSync(reducedMotionOut);
  console.log(`✓ [HERO] 1440px (reduced-motion) -> hero-1440px-reduced-motion.png (${(stats.size / 1024).toFixed(1)} KB)`);
}

console.log("\nZakończono generowanie zrzutów weryfikacyjnych.");
