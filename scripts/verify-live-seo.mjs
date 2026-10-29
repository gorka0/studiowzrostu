async function checkRoute(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  const html = await res.text();
  
  // Title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : null;
  
  // H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]+>/g, "").trim().replace(/\s+/g, " "));
  
  // JSON-LD scripts
  const jsonLdScripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let jsonLdOk = true;
  for (const s of jsonLdScripts) {
    try {
      JSON.parse(s[1]);
    } catch {
      jsonLdOk = false;
    }
  }

  return { url, title, h1Matches, h1Count: h1Matches.length, jsonLdCount: jsonLdScripts.length, jsonLdOk };
}

async function run() {
  const routes = [
    "http://localhost:3000/",
    "http://localhost:3000/uslugi",
    "http://localhost:3000/uslugi/strony-internetowe",
    "http://localhost:3000/uslugi/landing-page",
    "http://localhost:3000/uslugi/seo-techniczne",
    "http://localhost:3000/uslugi/redesign-i-wydajnosc",
    "http://localhost:3000/projekty",
    "http://localhost:3000/o-nas",
    "http://localhost:3000/blog",
    "http://localhost:3000/blog/jak-zdobyc-wiecej-klientow-ze-strony-internetowej",
    "http://localhost:3000/blog/strona-internetowa-a-rozwoj-biznesu",
    "http://localhost:3000/blog/strona-dla-lokalnej-firmy-bydgoszcz-seo",
    "http://localhost:3000/kontakt",
  ];

  console.log("=== WERYFIKACJA LIVE NA PORCIE 3000 ===");
  let failed = false;

  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`\nURL: ${res.url}`);
    console.log(`  Title: "${res.title}" (${res.title ? res.title.length : 0} zn.)`);
    console.log(`  H1 count: ${res.h1Count} -> "${res.h1Matches[0] || "BRAK"}"`);
    console.log(`  JSON-LD scripts: ${res.jsonLdCount} (Valid: ${res.jsonLdOk})`);

    if (res.h1Count !== 1) {
      console.error(`  ❌ BŁĄD: Oczekiwano dokładnie 1 nagłówka H1, znaleziono ${res.h1Count}`);
      failed = true;
    }
    if (!res.jsonLdOk || res.jsonLdCount === 0) {
      console.error(`  ❌ BŁĄD: Problem z JSON-LD`);
      failed = true;
    }
  }

  // Check robots.txt
  const robotsRes = await fetch("http://localhost:3000/robots.txt");
  const robotsText = await robotsRes.text();
  console.log("\n--- ROBOTS.TXT ---");
  console.log(robotsText.trim());

  if (failed) {
    console.error("\n❌ Wykryto problemy na serwerze live!");
    process.exit(1);
  } else {
    console.log("\n✅ WSZYSTKIE PODSTRONY LIVE DZIAŁAJĄ PERFEKCYJNIE Z 1 H1 I POPRAWNYM JSON-LD!");
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
