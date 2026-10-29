# Studio Wzrostu (studiowzrostu.pl)

Niezależne studio projektowo-programistyczne specjalizujące się w architekturze nowoczesnych serwisów internetowych opartych o Next.js, React i TypeScript.

## Architektura i technologie

- **Framework**: Next.js 16 (App Router, React Server Components, Partial Prerendering)
- **Biblioteka UI**: React 19, Tailwind CSS v4, Motion
- **Język**: TypeScript 5 (strict mode)
- **Typografia**: Bricolage Grotesque (nagłówki) + Instrument Sans (tekst podstawowy) + JetBrains Mono (kod)
- **System tokenów**: Semantyczne zmienne CSS (ciepła biel `#FBFAF6` w trybie jasnym, głęboka leśna czerń `#0B1410` w trybie ciemnym)
- **Analityka i prywatność**: Cookie Consent Banner (RODO/GDPR), integracja Consent Mode v2

## Polecenia CLI

```bash
# Uruchomienie środowiska deweloperskiego
npm run dev

# Weryfikacja statyczna typów TypeScript
npm run typecheck

# Analiza jakości kodu (ESLint)
npm run lint

# Kompilacja produkcyjna
npm run build

# Uruchomienie serwera produkcyjnego
npm run start
```

## Zasady projektowe

- **Zero szablonowego AI-look**: brak blob-gradientów, brak sztucznego glassmorphismu, brak ikon w zaokrąglonych kwadracikach w sekcjach korzyści.
- **Rygor semantyczny**: czysty HTML5, dostępność WCAG AA, optymalizacja Core Web Vitals (LCP < 1.2s, CLS 0, INP < 50ms).
- **Redakcja treści**: wszystkie teksty marketingowe w `/content` stanowią szkic pod autorską redakcję.
