const BASE_URL = "http://localhost:3000";

const ROUTES = [
  "/",
  "/uslugi",
  "/uslugi/strony-internetowe",
  "/uslugi/landing-page",
  "/uslugi/seo-techniczne",
  "/uslugi/redesign-i-wydajnosc",
  "/realizacje",
  "/realizacje/serwis-b2b-uslugi",
  "/realizacje/kancelaria-doradcza",
  "/realizacje/firma-techniczna",
  "/blog",
  "/blog/dlaczego-szybkosc-strony-decyduje-o-sprzedazy",
  "/blog/ile-kosztuje-nowoczesna-strona-www",
  "/o-nas",
  "/kontakt",
  "/polityka-prywatnosci",
  "/polityka-cookies",
];

async function runAudit() {
  const issues = [];
  const warnings = [];
  const passes = [];
  const titles = new Map();
  const descriptions = new Map();

  console.log("=================================================");
  console.log(" ROZPOCZYNAM GŁĘBOKI AUDYT TECHNICZNY SEO");
  console.log("=================================================\n");

  // 1. Sprawdź robots.txt
  try {
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`);
    if (robotsRes.status !== 200) {
      issues.push(`robots.txt zwraca status ${robotsRes.status}`);
    } else {
      const robotsText = await robotsRes.text();
      if (!/user-agent/i.test(robotsText)) {
        issues.push("robots.txt: brak dyrektywy User-agent");
      }
      if (!/sitemap/i.test(robotsText)) {
        issues.push("robots.txt: brak odwołania do sitemap");
      }
      passes.push("robots.txt: poprawny i dostępny");
    }
  } catch (e) {
    issues.push(`robots.txt błąd połączenia: ${e.message}`);
  }

  // 2. Sprawdź sitemap.xml
  try {
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`);
    if (sitemapRes.status !== 200) {
      issues.push(`sitemap.xml zwraca status ${sitemapRes.status}`);
    } else {
      const sitemapText = await sitemapRes.text();
      if (!sitemapText.includes("<urlset") || !sitemapText.includes("https://studiowzrostu.pl")) {
        issues.push("sitemap.xml: nieprawidłowa struktura XML lub brak domen kanonicznych");
      }
      if (sitemapText.includes("/design")) {
        issues.push("sitemap.xml: zawiera prywatną trasę deweloperską /design!");
      }
      passes.push("sitemap.xml: poprawna struktura i domeny");
    }
  } catch (e) {
    issues.push(`sitemap.xml błąd połączenia: ${e.message}`);
  }

  // 3. Sprawdź każdą stronę
  for (const route of ROUTES) {
    try {
      const res = await fetch(`${BASE_URL}${route}`);
      if (res.status !== 200) {
        issues.push(`[${route}] Zwraca status HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();

      // a) Title
      const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
      if (!titleMatch || !titleMatch[1].trim()) {
        issues.push(`[${route}] Brak znacznika <title>`);
      } else {
        const title = titleMatch[1].trim();
        if (title.length < 25) {
          warnings.push(`[${route}] Title jest bardzo krótki (${title.length} zn.): "${title}"`);
        } else if (title.length > 65) {
          warnings.push(`[${route}] Title może być ucięty w Google (${title.length} zn.): "${title}"`);
        }
        if (titles.has(title)) {
          issues.push(`[${route}] ZDUPLIKOWANY Title z trasą ${titles.get(title)}: "${title}"`);
        } else {
          titles.set(title, route);
        }
      }

      // b) Meta Description
      const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
      if (!descMatch || !descMatch[1].trim()) {
        issues.push(`[${route}] Brak znacznika <meta name="description">`);
      } else {
        const desc = descMatch[1].trim();
        if (desc.length < 80) {
          warnings.push(`[${route}] Description zbyt krótkie (${desc.length} zn.): "${desc}"`);
        } else if (desc.length > 165) {
          warnings.push(`[${route}] Description zbyt długie (${desc.length} zn.): "${desc}"`);
        }
        if (descriptions.has(desc)) {
          issues.push(`[${route}] ZDUPLIKOWANE Description z trasą ${descriptions.get(desc)}`);
        } else {
          descriptions.set(desc, route);
        }
      }

      // c) Canonical
      const canonicalMatch = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);
      if (!canonicalMatch || !canonicalMatch[1].trim()) {
        issues.push(`[${route}] Brak znacznika <link rel="canonical">`);
      } else {
        const canonical = canonicalMatch[1].trim();
        const expected = `https://studiowzrostu.pl${route === "/" ? "" : route}`;
        if (canonical !== expected) {
          issues.push(`[${route}] Niezgodny kanoniczny URL: jest "${canonical}", oczekiwano "${expected}"`);
        }
      }

      // d) Nagłówek H1
      const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
      if (h1Matches.length === 0) {
        issues.push(`[${route}] Brak nagłówka <h1>`);
      } else if (h1Matches.length > 1) {
        issues.push(`[${route}] Wiele nagłówków <h1> (znaleziono: ${h1Matches.length})`);
      } else {
        const h1Text = h1Matches[0][1].replace(/<[^>]+>/g, "").trim();
        if (!h1Text) {
          issues.push(`[${route}] Pusty nagłówek <h1>`);
        }
      }

      // e) Hierarchia nagłówków (sprawdź przeskoki np. H1 -> H3)
      const headingMatches = [...html.matchAll(/<(h[1-6])[^>]*>/gi)].map(m => parseInt(m[1][1], 10));
      for (let i = 0; i < headingMatches.length - 1; i++) {
        const current = headingMatches[i];
        const next = headingMatches[i + 1];
        if (next > current + 1) {
          warnings.push(`[${route}] Przeskok hierarchii nagłówków: <h${current}> przechodzi bezpośrednio w <h${next}>`);
          break;
        }
      }

      // f) OpenGraph & Twitter
      const ogTitle = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i);
      const ogDesc = html.match(/<meta\s+property="og:description"\s+content="([^"]*)"/i);
      const ogUrl = html.match(/<meta\s+property="og:url"\s+content="([^"]*)"/i);
      const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/i);
      const twitterCard = html.match(/<meta\s+name="twitter:card"\s+content="([^"]*)"/i);

      if (!ogTitle) issues.push(`[${route}] Brak og:title`);
      if (!ogDesc) issues.push(`[${route}] Brak og:description`);
      if (!ogUrl) warnings.push(`[${route}] Brak og:url`);
      if (!ogImage) warnings.push(`[${route}] Brak og:image`);
      if (!twitterCard) issues.push(`[${route}] Brak twitter:card`);

      // g) JSON-LD Structured Data
      const jsonLdScripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
      if (jsonLdScripts.length === 0) {
        issues.push(`[${route}] Brak danych strukturalnych JSON-LD`);
      } else {
        for (const s of jsonLdScripts) {
          try {
            const parsed = JSON.parse(s[1]);
            if (!parsed["@context"]) {
              issues.push(`[${route}] JSON-LD brak @context`);
            }
          } catch (e) {
            issues.push(`[${route}] Błąd parsowania JSON-LD: ${e.message}`);
          }
        }

        // Sprawdź specyficzne schematy
        if (route.startsWith("/blog/") && !html.includes("BlogPosting") && !html.includes("Article")) {
          warnings.push(`[${route}] Artykuł blogowy nie posiada schematu BlogPosting / Article JSON-LD!`);
        }
        if (route.startsWith("/realizacje/") && !html.includes("CreativeWork") && !html.includes("Article") && !html.includes("WebPage")) {
          warnings.push(`[${route}] Realizacja portfolio nie posiada dedykowanego schematu CreativeWork / Project JSON-LD!`);
        }
      }

      // h) Dostępność i semantyka
      if (!html.includes('lang="pl"')) {
        issues.push(`[${route}] Brak atrybutu lang="pl" w <html>`);
      }
      if (!html.includes("<main")) {
        issues.push(`[${route}] Brak znacznika semantycznego <main>`);
      }

    } catch (e) {
      issues.push(`[${route}] Błąd pobierania: ${e.message}`);
    }
  }

  console.log(`\n=================================================`);
  console.log(` WYNIK AUDYTU: ${issues.length} BŁĘDÓW KRYTYCZNYCH, ${warnings.length} OSTRZEŻEŃ`);
  console.log(`=================================================\n`);

  if (issues.length > 0) {
    console.log("❌ KRYTYCZNE BŁĘDY SEO (DO NATYCHMIASTOWEJ NAPRAWY):");
    issues.forEach((iss, i) => console.log(`  ${i + 1}. ${iss}`));
    console.log("");
  } else {
    console.log("✔ BRAK BŁĘDÓW KRYTYCZNYCH!");
  }

  if (warnings.length > 0) {
    console.log("⚠ OSTRZEŻENIA I ELEMENTY DO OPTYMALIZACJI:");
    warnings.forEach((warn, i) => console.log(`  ${i + 1}. ${warn}`));
    console.log("");
  }
}

runAudit();
