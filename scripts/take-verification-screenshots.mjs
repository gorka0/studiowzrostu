import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";

const ROOT_DIR = "d:/home/strony/studiowzrostu";
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

if (!fs.existsSync(chromePath)) {
  console.error("Chrome not found at: " + chromePath);
  process.exit(1);
}

const outDir = path.join(ROOT_DIR, "screenshots/verification");
fs.mkdirSync(outDir, { recursive: true });

const targets = [
  { url: "http://localhost:3000", page: "home" },
  { url: "http://localhost:3000/kontakt", page: "kontakt" },
];

const viewports = [
  { name: "375px", width: 375, height: 900 },
  { name: "1440px", width: 1440, height: 1000 },
];

const themes = [
  { name: "light", extraArgs: [] },
  { name: "dark", extraArgs: ["--force-dark-mode", "--blink-settings=forceDarkModeEnabled=true"] },
];

console.log("=================================================");
console.log(" GENEROWANIE ZRZUTÓW WERYFIKACYJNYCH (8 wariantów)");
console.log("=================================================");

for (const t of targets) {
  for (const vp of viewports) {
    for (const th of themes) {
      const fileName = `${t.page}-${vp.name}-${th.name}.png`;
      const outFile = path.join(outDir, fileName);
      const args = [
        "--headless",
        "--disable-gpu",
        `--window-size=${vp.width},${vp.height}`,
        `--screenshot=${outFile}`,
        ...th.extraArgs,
        t.url,
      ];

      const res = spawnSync(chromePath, args);
      if (fs.existsSync(outFile)) {
        const stats = fs.statSync(outFile);
        console.log(`✔ [${t.page}] ${vp.name} (${th.name}) -> ${fileName} (${(stats.size / 1024).toFixed(1)} KB)`);
      } else {
        console.error(`❌ Brak pliku: ${outFile}, stderr: ${res.stderr?.toString()}`);
      }
    }
  }
}
console.log("\nZakończono generowanie zrzutów.");
