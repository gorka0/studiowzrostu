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

const emojiRegex = /\p{Extended_Pictographic}/u;
const files = walk("d:/home/strony/studiowzrostu");

let count = 0;
for (const f of files) {
  if (f.includes("scripts\\find-emojis.mjs") || f.includes("scripts/find-emojis.mjs") || f.includes("scripts\\audit-generator-traces.mjs") || f.includes("scripts/audit-generator-traces.mjs")) continue;
  const content = fs.readFileSync(f, "utf-8");
  const lines = content.split("\n");
  lines.forEach((line, idx) => {
    if (emojiRegex.test(line)) {
      console.log(`${f}:${idx + 1}: ${line.trim()}`);
      count++;
    }
  });
}
console.log(`Total Extended_Pictographic matches: ${count}`);
