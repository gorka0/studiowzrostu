import assert from "node:assert/strict";

async function runTests() {
  console.log("▶ Test 1: Weryfikacja endpointów HTTP...");
  const privacyRes = await fetch("http://localhost:3000/polityka-prywatnosci");
  assert.equal(privacyRes.status, 200, "Strona /polityka-prywatnosci powinna zwracać status 200");
  const privacyHtml = await privacyRes.text();

  const cookiesRes = await fetch("http://localhost:3000/polityka-cookies");
  assert.equal(cookiesRes.status, 200, "Strona /polityka-cookies powinna zwracać status 200");
  const cookiesHtml = await cookiesRes.text();

  console.log("✔ Endpointy zwracają kod 200 OK.");

  console.log("▶ Test 2: Weryfikacja skryptu Consent Mode v2 i braku skryptów śledzących...");
  assert.match(
    privacyHtml,
    /gtag\('consent',\s*'default',\s*\{[^}]*ad_storage':\s*'denied'/s,
    "Consent Mode v2 musi domyślnie blokować 'ad_storage'"
  );
  assert.match(
    privacyHtml,
    /gtag\('consent',\s*'default',\s*\{[^}]*analytics_storage':\s*'denied'/s,
    "Consent Mode v2 musi domyślnie blokować 'analytics_storage'"
  );

  // Brak zewnętrznych skryptów analitycznych przed konfiguracją
  assert.equal(
    privacyHtml.includes("googletagmanager.com/gtag/js"),
    false,
    "Skrypt GA4/GTM nie może być ładowany przed skonfigurowaniem NEXT_PUBLIC_GA_ID"
  );
  console.log("✔ Skrypt Consent Mode v2 poprawnie odrzuca zgody domyślnie. Brak wycieku skryptów analitycznych.");

  console.log("▶ Test 3: Weryfikacja zawartości Polityki Prywatności (RODO)...");
  assert.match(privacyHtml, /Tomasz G[oó]rka/, "Polityka musi zawierać nazwisko administratora");
  assert.match(privacyHtml, /kontakt@studiowzrostu\.pl/, "Polityka musi zawierać e-mail administratora");
  assert.match(privacyHtml, /Prezesa Urz[eę]du Ochrony Danych Osobowych/, "Polityka musi zawierać pouczenie o skardze do UODO");
  assert.match(privacyHtml, /wersj[ai].*v?1\.0/i, "Polityka musi zawierać numer wersji v1.0");
  console.log("✔ Polityka Prywatności zawiera wymagane klauzule informacyjne RODO.");

  console.log("▶ Test 4: Weryfikacja tabeli w Polityce Cookies...");
  assert.match(cookiesHtml, /sw_cookie_consent/, "Tabela musi zawierać cookie sw_cookie_consent");
  assert.match(cookiesHtml, /theme/, "Tabela musi zawierać wpis pamięci lokalnej motywu");
  assert.match(cookiesHtml, /localStorage/, "Tabela musi zawierać odwołanie do localStorage");
  assert.match(cookiesHtml, /_ga/, "Tabela musi zawierać deklarację cookies Google Analytics");
  assert.match(cookiesHtml, /365 dni/, "Czas przechowywania sw_cookie_consent to max 365 dni");
  console.log("✔ Tabela cookies zawiera wykaz identyfikatorów, celów i okresów retencji.");

  console.log("▶ Test 5: Weryfikacja linków w stopce do polityk i modala...");
  assert.match(cookiesHtml, /href="\/polityka-prywatnosci"/, "Stopka musi linkować do /polityka-prywatnosci");
  assert.match(cookiesHtml, /href="\/polityka-cookies"/, "Stopka musi linkować do /polityka-cookies");
  assert.match(cookiesHtml, /Ustawienia cookies/, "Stopka musi zawierać przycisk otwierający okno preferencji cookies");
  console.log("✔ Linki w stopce i wyzwalacz ustawień cookies działają poprawnie.");

  console.log("\n==========================================");
  console.log(" WSZYSTKIE TESTY ZGODNOŚCI PRAWNEJ: PASS! ");
  console.log("==========================================");
}

runTests().catch((err) => {
  console.error("❌ Błąd w testach:", err);
  process.exit(1);
});
