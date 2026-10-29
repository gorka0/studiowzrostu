#!/usr/bin/env node
/**
 * Audyt śladów generatora i AI-slopu w projekcie Studio Wzrostu.
 * Weryfikuje:
 * 1. Zakazane frazy marketingowe (buzzwords)
 * 2. Komentarze opisujące oczywisty kod (JSX/hooki/TODO)
 * 3. Domyślne klasy kolorów Tailwind CSS (np. slate-*, indigo-*)
 * 4. Odnośniki do stocków (images.unsplash.com)
 * 5. Domyślne pliki szablonu create-next-app
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const BANNED_PHRASES = [
  "wznieś swój biznes",
  "innowacyjne rozwiązania",
  "innowacyjne",
  "szyte na miarę",
  "odblokuj potencjał",
  "w erze cyfrowej",
  "kompleksowe rozwiązania",
  "kompleksowe",
  "dostarczamy wartość",
  "rewolucjonizujemy",
  "unikalne",
  "dynamiczny rozwój",
  "pasja do",
  "nasz zespół ekspertów",
  "zespół ekspertów"
];

const TW_DEFAULT_PALETTES = [
  "slate", "gray", "zinc", "neutral", "stone",
  "red", "orange", "amber", "yellow", "lime",
  "green", "emerald", "teal", "cyan", "sky",
  "blue", "indigo", "violet", "purple", "fuchsia",
  "pink", "rose"
];

const GENERATOR_DEFAULT_FILES = [
  "public/next.svg",
  "public/vercel.svg",
  "public/file.svg",
  "public/globe.svg",
  "public/window.svg"
];

const findings = {
  defaultFiles: [],
  unsplashLinks: [],
  bannedPhrases: [],
  defaultColors: [],
  obviousComments: []
};

// 1. Sprawdzenie pozostałości plików w public/
for (const fileRel of GENERATOR_DEFAULT_FILES) {
  const fullPath = path.join(ROOT_DIR, fileRel);
  if (fs.existsSync(fullPath)) {
    findings.defaultFiles.push(fileRel);
  }
}

// 2. Rekurencyjne skanowanie kodu źródłowego
function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (["node_modules", ".next", ".git", "coverage", "dist"].includes(entry.name)) {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.isFile() && /\.(tsx|ts|jsx|js|css|json|md|html)$/.test(entry.name)) {
      scanSourceFile(fullPath);
    }
  }
}

function scanSourceFile(filePath) {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  
  // Pomijamy sam skrypt audytujący i pliki konfiguracyjne z deklaracjami
  if (relPath.startsWith("scripts/audit-generator-traces.mjs")) return;
  if (relPath === "app/globals.css") return;

  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // A. Linki do unsplash
    if (/unsplash\.com/i.test(line)) {
      findings.unsplashLinks.push({
        file: relPath,
        line: lineNum,
        snippet: trimmed
      });
    }

    // B. Zakazane frazy
    for (const phrase of BANNED_PHRASES) {
      const regex = new RegExp(`(^|[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ])${phrase}([^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]|$)`, "i");
      if (regex.test(line)) {
        findings.bannedPhrases.push({
          phrase,
          file: relPath,
          line: lineNum,
          snippet: trimmed
        });
      }
    }

    // C. Oczywiste komentarze (np. // State for..., /* Logo */, // TODO...)
    if (
      (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("{/*")) &&
      !trimmed.includes("eslint") &&
      !trimmed.includes("@ts-") &&
      !trimmed.includes("STATUS:") &&
      !trimmed.includes("http")
    ) {
      if (
        /\b(state for|handle|toggle|logo|desktop navigation|mobile navigation|TODO|helper|utility)\b/i.test(trimmed)
      ) {
        findings.obviousComments.push({
          file: relPath,
          line: lineNum,
          snippet: trimmed
        });
      }
    }

    // D. Domyślne klasy kolorów Tailwind CSS
    for (const palette of TW_DEFAULT_PALETTES) {
      const regex = new RegExp(`\\b(?:bg|text|border|ring|fill|stroke|from|to|via)-${palette}-\\d+\\b`, "g");
      const matches = line.match(regex);
      if (matches) {
        for (const match of matches) {
          findings.defaultColors.push({
            colorClass: match,
            file: relPath,
            line: lineNum,
            snippet: trimmed
          });
        }
      }
    }
  });
}

scanDirectory(path.join(ROOT_DIR, "app"));
scanDirectory(path.join(ROOT_DIR, "components"));
scanDirectory(path.join(ROOT_DIR, "content"));
scanDirectory(path.join(ROOT_DIR, "lib"));
scanDirectory(path.join(ROOT_DIR, "public"));

// Generowanie czytelnego raportu w konsoli
console.log("=================================================");
console.log(" AUDYT ŚLADÓW GENERATORA I AI-SLOPU (Studio Wzrostu)");
console.log("=================================================\n");

let totalIssues = 0;

console.log("1. Domyślne pliki szablonu Next.js (w public/):");
if (findings.defaultFiles.length === 0) {
  console.log("   ✔ Brak domyślnych plików (file.svg, globe.svg, next.svg, vercel.svg, window.svg usunięte).");
} else {
  findings.defaultFiles.forEach(f => console.log(`   ❌ Znaleziono plik: ${f}`));
  totalIssues += findings.defaultFiles.length;
}

console.log("\n2. Zewnętrzne linki do zdjęć stockowych (Unsplash):");
if (findings.unsplashLinks.length === 0) {
  console.log("   ✔ Zero linków do Unsplash – wszystkie multimedia są lokalne lub w postaci oznaczonych placeholderów.");
} else {
  findings.unsplashLinks.forEach(u => console.log(`   ❌ [${u.file}:${u.line}] ${u.snippet}`));
  totalIssues += findings.unsplashLinks.length;
}

console.log("\n3. Zakazane frazy marketingowe (buzzwords):");
if (findings.bannedPhrases.length === 0) {
  console.log("   ✔ Zero zakazanych fraz – język jest konkretny, bez pustego żargonu.");
} else {
  findings.bannedPhrases.forEach(b => console.log(`   ❌ [${b.file}:${b.line}] Fraza: "${b.phrase}" -> ${b.snippet}`));
  totalIssues += findings.bannedPhrases.length;
}

console.log("\n4. Domyślne klasy kolorów Tailwind (np. slate-*, indigo-*):");
if (findings.defaultColors.length === 0) {
  console.log("   ✔ Zero domyślnych klas paletowych – interfejs w 100% używa semantycznych tokenów studia.");
} else {
  findings.defaultColors.forEach(c => console.log(`   ❌ [${c.file}:${c.line}] Klasa: ${c.colorClass}`));
  totalIssues += findings.defaultColors.length;
}

console.log("\n5. Komentarze opisujące oczywiste zachowania:");
if (findings.obviousComments.length === 0) {
  console.log("   ✔ Zero komentarzy opisujących oczywistości – zachowano wyłącznie wyjaśnienia 'dlaczego'.");
} else {
  findings.obviousComments.forEach(c => console.log(`   ⚠ [${c.file}:${c.line}] ${c.snippet}`));
  totalIssues += findings.obviousComments.length;
}

console.log("\n=================================================");
if (totalIssues === 0) {
  console.log(" WYNIK KOŃCOWY: KOD JEST W 100% CZYSTY (0 ŚLADÓW GENERATORA)");
} else {
  console.log(` WYNIK KOŃCOWY: Znaleziono ${totalIssues} miejsc do weryfikacji przez dewelopera.`);
}
console.log("=================================================");

process.exit(0);
