import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "scripts",
]);

const PLACEHOLDER_PATTERNS = [
  /\[.*?DO UZUPEŁNIENIA.*?\]/gi,
  /\+48 000 000 000/g,
  /Przykładowy projekt – do uzupełnienia/gi,
  /TODO:/gi,
  /FIXME:/gi,
];

function scanDirectory(currentPath, results = []) {
  const entries = fs.readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(currentPath, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath, results);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if ([".ts", ".tsx", ".js", ".jsx", ".mjs", ".json", ".md"].includes(ext)) {
        checkFile(fullPath, results);
      }
    }
  }

  return results;
}

function checkFile(filePath, results) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, index) => {
    for (const pattern of PLACEHOLDER_PATTERNS) {
      pattern.lastIndex = 0;
      const match = pattern.exec(line);
      if (match) {
        const relativePath = path.relative(rootDir, filePath).replace(/\\/g, "/");
        results.push({
          file: relativePath,
          line: index + 1,
          matched: match[0],
          preview: line.trim(),
        });
        break;
      }
    }
  });
}

const found = scanDirectory(rootDir);

console.log("==================================================");
console.log(" RAPORT PLACEHOLDERÓW W PROJEKCIE (Studio Wzrostu)");
console.log("==================================================");

if (found.length === 0) {
  console.log("✓ Brak aktywnych placeholderów.");
} else {
  console.log(`Znaleziono ${found.length} wystąpień placeholderów:\n`);

  const byFile = new Map();
  for (const item of found) {
    if (!byFile.has(item.file)) {
      byFile.set(item.file, []);
    }
    byFile.get(item.file).push(item);
  }

  for (const [file, items] of byFile.entries()) {
    console.log(`📁 ${file}:`);
    for (const item of items) {
      console.log(`   - Linia ${item.line}: "${item.matched}" -> ${item.preview}`);
    }
    console.log("");
  }
}
console.log("==================================================");
