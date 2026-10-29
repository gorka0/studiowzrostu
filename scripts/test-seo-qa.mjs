import assert from "node:assert/strict";

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000";

const PAGES_TO_TEST = [
  { path: "/", expectedH1: "Twoja firma rośnie. Twoja strona też powinna." },
  { path: "/uslugi", expectedH1: "Usługi tworzone z myślą o wzroście firm" },
  { path: "/uslugi/strony-internetowe", expectedH1: "Nowoczesne strony internetowe Next.js" },
  { path: "/uslugi/landing-page", expectedH1: "Skuteczne landing page nastawione na konwersję" },
  { path: "/uslugi/seo-techniczne", expectedH1: "SEO techniczne i audyt Core Web Vitals" },
  { path: "/uslugi/redesign-i-wydajnosc", expectedH1: "Redesign i optymalizacja wydajności stron" },
  { path: "/projekty", expectedH1: "Projekty" },
  { path: "/o-nas", expectedH1: "Budujemy strony, które pracują na sukces Twojego biznesu" },
  { path: "/blog", expectedH1: "Jak technologia przekłada się na wyniki biznesowe" },
  { path: "/blog/dlaczego-szybkosc-strony-decyduje-o-sprzedazy", expectedH1: "Dlaczego szybkość strony decyduje o sprzedaży bardziej niż sam wygląd?" },
  { path: "/kontakt", expectedH1: "Porozmawiajmy o nowej stronie dla Twojej firmy" },
  { path: "/polityka-prywatnosci", expectedH1: "Polityka Prywatności" },
  { path: "/polityka-cookies", expectedH1: "Polityka Plików Cookies" },
];

async function testPage(pageInfo) {
  const url = `${BASE_URL}${pageInfo.path}`;
  const res = await fetch(url);
  assert.equal(res.status, 200, `Trasa ${pageInfo.path} powinna zwracać 200 OK`);
  const html = await res.text();

  // 1. Sprawdź nagłówek title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  assert.ok(titleMatch, `Brak znacznika <title> na stronie ${pageInfo.path}`);
  const title = titleMatch[1];
  assert.ok(
    title.length <= 68,
    `Tytuł na ${pageInfo.path} za długi (${title.length} zn.): "${title}"`
  );

  // 2. Sprawdź meta description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  assert.ok(descMatch, `Brak <meta name="description"> na ${pageInfo.path}`);
  const desc = descMatch[1];
  assert.ok(
    desc.length <= 165,
    `Opis na ${pageInfo.path} za długi (${desc.length} zn.): "${desc}"`
  );

  // 3. Sprawdź Open Graph & Twitter
  assert.ok(html.includes('property="og:title"'), `Brak og:title na ${pageInfo.path}`);
  assert.ok(html.includes('property="og:description"'), `Brak og:description na ${pageInfo.path}`);
  assert.ok(html.includes('name="twitter:card"'), `Brak twitter:card na ${pageInfo.path}`);

  // 4. Sprawdź liczbę <h1> (dokładnie jeden na stronę)
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert.equal(
    h1Matches.length,
    1,
    `Strona ${pageInfo.path} musi mieć dokładnie jeden tag <h1> (znaleziono: ${h1Matches.length})`
  );

  // 5. Sprawdź JSON-LD (brak nieobsłużonych placeholderów)
  const jsonLdScripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert.ok(jsonLdScripts.length >= 1, `Brak skryptów JSON-LD na ${pageInfo.path}`);

  for (const match of jsonLdScripts) {
    const rawJson = match[1];
    assert.doesNotMatch(rawJson, /\[DO UZUPEŁNIENIA\]/, `Wykryto placeholder w JSON-LD na ${pageInfo.path}`);
    const legalAddrRegex = new RegExp("\\[" + "ADR" + "ES " + "DO UZUPEŁNIENIA\\]");
    assert.doesNotMatch(rawJson, legalAddrRegex, `Wykryto placeholder danych w JSON-LD na ${pageInfo.path}`);
    assert.doesNotMatch(rawJson, /\+48 000 000 000/, `Wykryto numer telefonu 000 w JSON-LD na ${pageInfo.path}`);
  }

  // 6. Sprawdź breadcrumbs na podstronach (wszystkie poza home)
  if (pageInfo.path !== "/") {
    assert.ok(
      html.includes("BreadcrumbList") || html.includes('aria-label="Ścieżka nawigacyjna (breadcrumbs)"'),
      `Brak breadcrumbs na ${pageInfo.path}`
    );
  }

  return { path: pageInfo.path, title, titleLength: title.length, descLength: desc.length };
}

async function main() {
  console.log("=================================================");
  console.log(" ROZPOCZYNAM AUDYT SEO, SEMANTYKI I JSON-LD");
  console.log("=================================================\n");

  const results = [];
  for (const p of PAGES_TO_TEST) {
    const r = await testPage(p);
    results.push(r);
    console.log(`✔ [OK] ${r.path.padEnd(35)} | Title (${r.titleLength} zn.): "${r.title.slice(0, 30)}..." | Desc: ${r.descLength} zn.`);
  }

  console.log("\n=================================================");
  console.log(" WSZYSTKIE TESTY SEO I SEMANTYKI: 100% PASS!");
  console.log("=================================================");
}

main().catch((err) => {
  console.error("❌ BŁĄD AUDYTU:", err);
  process.exit(1);
});
