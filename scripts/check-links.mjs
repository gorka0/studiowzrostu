import assert from "node:assert/strict";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

const KNOWN_ROUTES = [
  "/",
  "/uslugi",
  "/uslugi/strony-internetowe",
  "/uslugi/landing-page",
  "/uslugi/seo-techniczne",
  "/uslugi/redesign-i-wydajnosc",
  "/projekty",
  "/o-nas",
  "/blog",
  "/blog/dlaczego-szybkosc-strony-decyduje-o-sprzedazy",
  "/blog/ile-kosztuje-nowoczesna-strona-www",
  "/kontakt",
  "/polityka-prywatnosci",
  "/polityka-cookies",
  "/robots.txt",
  "/llms.txt",
];

async function checkRoute(route) {
  const url = `${BASE_URL}${route}`;
  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error(`Trasa ${route} zwróciła nieoczekiwany kod HTTP ${res.status}`);
  }
  return { route, status: res.status, contentType: res.headers.get("content-type") };
}

async function runLinkCheck() {
  console.log(`▶ Rozpoczynam automatyczną weryfikację ${KNOWN_ROUTES.length} tras w serwisie (${BASE_URL})...\n`);

  const visited = new Set();
  const errors = [];

  for (const route of KNOWN_ROUTES) {
    try {
      const result = await checkRoute(route);
      visited.add(route);
      console.log(`  ✔ [${result.status}] ${route}`);
    } catch (err) {
      errors.push({ route, error: err.message });
      console.error(`  ❌ BŁĄD na trasie ${route}: ${err.message}`);
    }
  }

  // Weryfikacja nagłówka CSP (wymuszający Content-Security-Policy)
  console.log("\n▶ Weryfikacja wymuszonego nagłówka Content-Security-Policy...");
  const homeRes = await fetch(`${BASE_URL}/`);
  const cspHeader = homeRes.headers.get("content-security-policy");
  const reportOnlyHeader = homeRes.headers.get("content-security-policy-report-only");

  assert.ok(cspHeader, "Nagłówek 'Content-Security-Policy' musi być obecny i wymuszający");
  assert.equal(reportOnlyHeader, null, "Nagłówek 'Content-Security-Policy-Report-Only' powinien zostać wycofany na rzecz wymuszającego");
  console.log("  ✔ Nagłówek Content-Security-Policy jest aktywny i egzekwowany.");

  // Weryfikacja zawartości /robots.txt
  console.log("\n▶ Weryfikacja zawartości /robots.txt...");
  const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
  const robotsText = await robotsRes.text();
  assert.match(robotsText, /User-Agent:\s*\*/i, "Robots.txt musi zawierać dyrektywę User-Agent");
  console.log("  ✔ robots.txt odpowiada poprawnie.");

  // Weryfikacja zawartości /llms.txt
  console.log("\n▶ Weryfikacja pliku /llms.txt...");
  const llmsRes = await fetch(`${BASE_URL}/llms.txt`);
  const llmsText = await llmsRes.text();
  assert.match(llmsText, /Studio Wzrostu/, "llms.txt musi zawierać nazwę Studio Wzrostu");
  console.log("  ✔ /llms.txt jest dostępny i poprawny.");

  if (errors.length > 0) {
    console.error(`\n❌ Wykryto ${errors.length} błędów linkowania!`);
    process.exit(1);
  }

  console.log("\n=======================================================");
  console.log(` SUKCES: Wszystkie ${visited.size} tras działa bezbłędnie (0 kodów 404/500).`);
  console.log("=======================================================");
}

runLinkCheck().catch((err) => {
  console.error("Krytyczny błąd podczas sprawdzania tras:", err);
  process.exit(1);
});
