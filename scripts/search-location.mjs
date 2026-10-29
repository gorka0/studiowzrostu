import fs from "fs";
import path from "path";

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === "node_modules" || file === ".next" || file === ".git" || file === "dist") continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (/\.(tsx?|jsx?|json|md)$/.test(file)) {
      results.push(full);
    }
  }
  return results;
}

// Check exactly what the user requested:
// git grep -niE "adres|lokaliz|miast|województw|region|mapa|map\.|maps\.google|siedzib|postal|addressLocality|areaServed|geo\."
const pattern = /adres|lokaliz|miast|województw|region|mapa|map\.|maps\.google|siedzib|postal|addressLocality|areaServed|geo\./i;
const files = walk("d:/home/strony/studiowzrostu");

let count = 0;
for (const f of files) {
  if (f.includes("scripts\\search-location.mjs") || f.includes("scripts/search-location.mjs")) continue;
  const content = fs.readFileSync(f, "utf-8");
  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    if (pattern.test(line)) {
      console.log(`${path.relative("d:/home/strony/studiowzrostu", f)}:${idx + 1}: ${line.trim()}`);
      count++;
    }
  });
}
console.log(`\nTotal matches: ${count}`);
