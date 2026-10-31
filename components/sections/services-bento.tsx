"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { servicesList } from "@/content/services";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 4 Autorskie schematy techniczne SVG w standardzie inżynieryjnym (viewBox 380x220).
 * Zastępują prymitywne szkice 120x80 precyzyjną architekturą Swiss Grid,
 * cienkimi liniami 1px i semantycznymi tokenami marki.
 */
function ServiceIllustration({ slug }: { slug: string }) {
  if (slug === "strony-internetowe") {
    // 1. Schemat architektury dedykowanej strony firmowej (Next.js 16 SSR + Layout Swiss Grid)
    return (
      <svg
        viewBox="0 0 380 220"
        className="w-full h-full select-none"
        fill="none"
        aria-hidden="true"
      >
        {/* Tło okna przeglądarki */}
        <rect
          x="1"
          y="1"
          width="378"
          height="218"
          rx="8"
          stroke="var(--line)"
          strokeWidth="1"
          fill="var(--color-surface)"
        />

        {/* Belka nagłówka przeglądarki */}
        <line x1="1" y1="32" x2="379" y2="32" stroke="var(--line)" strokeWidth="1" />
        <circle cx="16" cy="16" r="3" fill="var(--line)" />
        <circle cx="26" cy="16" r="3" fill="var(--line)" />
        <circle cx="36" cy="16" r="3" fill="var(--line)" />

        {/* Pasek adresu URL */}
        <rect
          x="54"
          y="7"
          width="230"
          height="18"
          rx="4"
          stroke="var(--line)"
          strokeWidth="1"
          fill="var(--background)"
        />
        {/* Kłódka SSL + URL */}
        <path
          d="M 64 15.5 v -2 a 2.5 2.5 0 0 1 5 0 v 2 m -3.5 0 h 7 a 1 1 0 0 1 1 1 v 3 a 1 1 0 0 1 -1 1 h -7 a 1 1 0 0 1 -1 -1 v -3 a 1 1 0 0 1 1 -1 Z"
          stroke="var(--accent-text)"
          strokeWidth="1"
          fill="none"
        />
        <text
          x="80"
          y="19"
          className="font-mono text-[9px] fill-ink-muted select-none"
        >
          studiowzrostu.pl/<tspan className="fill-ink font-semibold">twoja-firma</tspan>
        </text>

        {/* Badge statusu HTTP 200 */}
        <rect
          x="292"
          y="7"
          width="48"
          height="18"
          rx="4"
          fill="color-mix(in oklab, var(--accent) 12%, transparent)"
          stroke="var(--accent)"
          strokeWidth="1"
        />
        <text
          x="316"
          y="19"
          textAnchor="middle"
          className="font-mono text-[8.5px] font-bold fill-accent-text"
        >
          200 OK
        </text>

        {/* Lewa kolumna: Hero i hierarchia konwersji */}
        <text
          x="20"
          y="54"
          className="font-mono text-[8.5px] font-medium fill-accent-text"
        >
          DEDYKOWANY SERWIS WWW · NEXT.JS
        </text>
        {/* Nagłówek główny w formie typograficznych belek */}
        <rect x="20" y="62" width="160" height="9" rx="2" fill="var(--color-ink)" opacity="0.9" />
        <rect x="20" y="75" width="135" height="9" rx="2" fill="var(--color-ink)" opacity="0.9" />
        <rect x="20" y="88" width="105" height="9" rx="2" fill="var(--accent-text)" />

        {/* Podtytuł */}
        <line x1="20" y1="106" x2="165" y2="106" stroke="var(--ink-muted)" strokeWidth="1.5" strokeOpacity="0.7" />
        <line x1="20" y1="113" x2="140" y2="113" stroke="var(--ink-muted)" strokeWidth="1.5" strokeOpacity="0.7" />

        {/* Przycisk CTA */}
        <rect x="20" y="126" width="94" height="22" rx="11" fill="var(--accent)" />
        <text
          x="67"
          y="140"
          textAnchor="middle"
          className="font-sans text-[8.5px] font-bold fill-surface select-none"
        >
          Zamów wycenę →
        </text>

        {/* Prawa kolumna: Karta interfejsu z zapytaniem ofertowym */}
        <rect
          x="195"
          y="48"
          width="168"
          height="102"
          rx="6"
          stroke="var(--line)"
          strokeWidth="1"
          fill="var(--background)"
        />
        <rect
          x="195"
          y="48"
          width="168"
          height="22"
          rx="6"
          fill="color-mix(in oklab, var(--ink) 4%, transparent)"
        />
        <line x1="195" y1="70" x2="363" y2="70" stroke="var(--line)" strokeWidth="1" />
        <text x="207" y="63" className="font-sans text-[9px] font-bold fill-ink">
          Szybkie zapytanie ofertowe
        </text>
        <circle cx="349" cy="59" r="2.5" fill="var(--accent)" />

        {/* Inputy w formularzu */}
        <rect x="207" y="78" width="144" height="15" rx="3" stroke="var(--line)" strokeWidth="1" fill="var(--color-surface)" />
        <text x="215" y="89" className="font-mono text-[7.5px] fill-ink-muted">Imię i nazwisko</text>

        <rect x="207" y="99" width="144" height="15" rx="3" stroke="var(--line)" strokeWidth="1" fill="var(--color-surface)" />
        <text x="215" y="110" className="font-mono text-[7.5px] fill-ink-muted">Numer telefonu / E-mail</text>

        <rect x="207" y="120" width="144" height="18" rx="3" fill="var(--accent)" />
        <text x="279" y="132" textAnchor="middle" className="font-sans text-[8px] font-bold fill-surface">
          Wyślij bezpośrednio do studia
        </text>

        {/* Dolne moduły korzyści (3 kolumny) */}
        <line x1="1" y1="162" x2="379" y2="162" stroke="var(--line)" strokeWidth="1" />
        
        {/* Kolumna 1 */}
        <rect x="18" y="172" width="104" height="36" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
        <text x="26" y="186" className="font-sans text-[8.5px] font-bold fill-ink">Szybkość ładowania</text>
        <text x="26" y="198" className="font-mono text-[7.5px] font-bold fill-accent-text">Core Web Vitals 100/100</text>

        {/* Kolumna 2 */}
        <rect x="138" y="172" width="104" height="36" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
        <text x="146" y="186" className="font-sans text-[8.5px] font-bold fill-ink">Responsywność RWD</text>
        <text x="146" y="198" className="font-mono text-[7.5px] font-bold fill-accent-text">Mobile First 375–1920px</text>

        {/* Kolumna 3 */}
        <rect x="258" y="172" width="104" height="36" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
        <text x="266" y="186" className="font-sans text-[8.5px] font-bold fill-ink">Własność i kod</text>
        <text x="266" y="198" className="font-mono text-[7.5px] font-bold fill-accent-text">100% kod na własność</text>
      </svg>
    );
  }

  if (slug === "landing-page") {
    // 2. Schemat lejka kampanijnego (Google Ads / Meta Ads ➔ Jednostronicowy Landing Page ➔ Lead)
    return (
      <svg
        viewBox="0 0 380 220"
        className="w-full h-full select-none"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="378"
          height="218"
          rx="8"
          stroke="var(--line)"
          strokeWidth="1"
          fill="var(--color-surface)"
        />

        {/* Górny pasek kontekstu */}
        <line x1="1" y1="28" x2="379" y2="28" stroke="var(--line)" strokeWidth="1" />
        <text x="16" y="18" className="font-mono text-[8.5px] font-medium fill-accent-text">
          LEJEK KAMPANII ADS ➔ LANDING PAGE
        </text>
        <rect x="286" y="6" width="78" height="16" rx="3" fill="color-mix(in oklab, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1" />
        <text x="325" y="17.5" textAnchor="middle" className="font-mono text-[8px] font-bold fill-accent-text">
          QUALITY: 10/10
        </text>

        {/* Lewa strona: Źródło ruchu (Reklama Google Ads) */}
        <g transform="translate(18, 42)">
          <rect width="150" height="96" rx="6" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <rect width="150" height="18" rx="6" fill="color-mix(in oklab, var(--ink) 4%, transparent)" />
          <text x="10" y="13" className="font-mono text-[7.5px] font-bold fill-ink-muted">
            ŹRÓDŁO RUCHU PŁATNEGO
          </text>
          
          <g transform="translate(10, 26)">
            <text x="0" y="10" className="font-mono text-[7.5px] font-bold fill-accent-text">
              Reklama · twojadomena.pl/oferta
            </text>
            <text x="0" y="22" className="font-sans text-[8.5px] font-bold fill-ink">
              Szukasz rzetelnej firmy?
            </text>
            <text x="0" y="32" className="font-sans text-[7.5px] font-semibold fill-ink-muted">
              Wycena projektu w 24h
            </text>
            <line x1="0" y1="39" x2="115" y2="39" stroke="var(--ink-muted)" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="0" y1="45" x2="95" y2="45" stroke="var(--ink-muted)" strokeWidth="1.2" strokeOpacity="0.6" />
            
            <rect x="0" y="52" width="72" height="13" rx="2" fill="color-mix(in oklab, var(--accent) 15%, transparent)" />
            <text x="36" y="61.5" textAnchor="middle" className="font-mono text-[7px] font-bold fill-accent-text">
              Sprawdź cennik
            </text>
          </g>
        </g>

        {/* Środkowa strzałka konwersji */}
        <path
          d="M 174 90 L 194 90"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <polygon points="194,87 200,90 194,93" fill="var(--accent)" />

        {/* Prawa strona: Dedykowany Landing Page */}
        <g transform="translate(206, 42)">
          <rect width="156" height="96" rx="6" stroke="var(--accent)" strokeWidth="1.5" fill="var(--background)" />
          {/* Header bez menu rozpraszającego */}
          <rect width="156" height="18" rx="6" fill="color-mix(in oklab, var(--accent) 8%, transparent)" />
          <text x="10" y="12.5" className="font-mono text-[7.5px] font-bold fill-accent-text">
            BEZ ROZPRASZAJĄCYCH LINKÓW MENU
          </text>

          <g transform="translate(10, 26)">
            <rect width="100" height="7" rx="1.5" fill="var(--color-ink)" opacity="0.9" />
            <rect y="11" width="80" height="7" rx="1.5" fill="var(--color-ink)" opacity="0.9" />
            
            {/* Formularz leadowy */}
            <rect y="24" width="136" height="18" rx="3" stroke="var(--line)" strokeWidth="1" fill="var(--color-surface)" />
            <text x="8" y="35.5" className="font-mono text-[7.5px] fill-ink-muted">
              Wpisz numer telefonu...
            </text>

            <rect y="46" width="136" height="18" rx="3" fill="var(--accent)" />
            <text x="68" y="58" textAnchor="middle" className="font-sans text-[8px] font-bold fill-surface">
              Odbierz natychmiastową ofertę
            </text>
          </g>
        </g>

        {/* Dolna linia telemetryczna */}
        <line x1="1" y1="152" x2="379" y2="152" stroke="var(--line)" strokeWidth="1" />

        <g transform="translate(18, 164)">
          {/* Metryka 1 */}
          <rect width="108" height="42" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <text x="12" y="16" className="font-mono text-[7.5px] fill-ink-muted">Średnia konwersja</text>
          <text x="12" y="32" className="font-mono text-[14px] font-medium fill-accent-text tabular-nums">+34%</text>

          {/* Metryka 2 */}
          <rect x="120" width="112" height="42" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <text x="132" y="16" className="font-mono text-[7.5px] fill-ink-muted">Koszt leada (CPA)</text>
          <text x="132" y="32" className="font-mono text-[14px] font-medium fill-accent-text tabular-nums">-42%</text>

          {/* Metryka 3 */}
          <rect x="244" width="108" height="42" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <text x="256" y="16" className="font-mono text-[7.5px] fill-ink-muted">Czas ładowania</text>
          <text x="256" y="32" className="font-mono text-[14px] font-medium fill-accent-text tabular-nums">0.4s</text>
        </g>
      </svg>
    );
  }

  if (slug === "seo-techniczne") {
    // 3. Schemat SEO technicznego: Wyniki wyszukiwania Google + Walidacja Schema.org
    return (
      <svg
        viewBox="0 0 380 220"
        className="w-full h-full select-none"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="1"
          y="1"
          width="378"
          height="218"
          rx="8"
          stroke="var(--line)"
          strokeWidth="1"
          fill="var(--color-surface)"
        />

        {/* Belka Google Search Console */}
        <line x1="1" y1="28" x2="379" y2="28" stroke="var(--line)" strokeWidth="1" />
        <text x="16" y="18" className="font-mono text-[8.5px] font-medium fill-accent-text">
          GOOGLE SEARCH CONSOLE · AUDYT SEO
        </text>
        <rect x="296" y="6" width="68" height="16" rx="3" fill="color-mix(in oklab, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1" />
        <text x="330" y="17.5" textAnchor="middle" className="font-mono text-[8px] font-bold fill-accent-text">
          ZAINDEKSOWANO
        </text>

        {/* Symulacja wyróżnionego wyniku Google */}
        <g transform="translate(18, 40)">
          <rect width="344" height="88" rx="6" stroke="var(--accent)" strokeWidth="1.2" fill="var(--background)" />
          
          <g transform="translate(14, 14)">
            {/* Adres URL z faviconką */}
            <circle cx="5" cy="5" r="4.5" fill="var(--accent)" />
            <text x="15" y="8" className="font-mono text-[8px] fill-ink-muted">
              https://twojadomena.pl › <tspan className="fill-accent-text font-bold">uslugi-bydgoszcz</tspan>
            </text>

            {/* Tytuł SEO */}
            <text x="0" y="27" className="font-sans text-[11.5px] font-bold fill-ink hover:underline cursor-pointer">
              Nowoczesne Strony Internetowe Bydgoszcz | Studio Wzrostu
            </text>

            {/* Rich Snippets: Gwiazdki i opinie */}
            <text x="0" y="42" className="font-mono text-[7.5px] font-bold fill-accent-text">
              ★★★★★ 5.0 (28 opinii) · Cena ustalona z góry · Czas realizacji: 3–4 dni
            </text>

            {/* Meta opis */}
            <text x="0" y="57" className="font-sans text-[8px] fill-ink-muted leading-tight">
              Dedykowane strony firmowe w czystym Next.js. Błyskawiczny czas ładowania poniżej 1s,
            </text>
            <text x="0" y="68" className="font-sans text-[8px] fill-ink-muted leading-tight">
              pełne techniczne SEO i wysoka konwersja dla firm z całej Polski. Zamów wycenę.
            </text>
          </g>
        </g>

        {/* Dolna tabela audytu technicznego */}
        <line x1="1" y1="140" x2="379" y2="140" stroke="var(--line)" strokeWidth="1" />

        <g transform="translate(18, 150)">
          {/* Punkt 1 */}
          <rect width="166" height="26" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <circle cx="12" cy="13" r="3.5" fill="var(--accent)" />
          <text x="22" y="16" className="font-mono text-[7.5px] font-bold fill-ink">
            Schema.org: LocalBusiness + FAQ
          </text>

          {/* Punkt 2 */}
          <rect x="178" width="166" height="26" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <circle cx="190" cy="13" r="3.5" fill="var(--accent)" />
          <text x="200" y="16" className="font-mono text-[7.5px] font-bold fill-ink">
            Server-Side Rendering (SSR)
          </text>

          {/* Punkt 3 */}
          <rect y="31" width="166" height="26" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <circle cx="12" cy="44" r="3.5" fill="var(--accent)" />
          <text x="22" y="47" className="font-mono text-[7.5px] font-bold fill-ink">
            Canonical URLs + Sitemap.xml
          </text>

          {/* Punkt 4 */}
          <rect x="178" y="31" width="166" height="26" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <circle cx="190" cy="44" r="3.5" fill="var(--accent)" />
          <text x="200" y="47" className="font-mono text-[7.5px] font-bold fill-ink">
            Core Web Vitals: LCP 0.8s / CLS 0.00
          </text>
        </g>
      </svg>
    );
  }

  // 4. redesign-i-wydajnosc ("Przebudowa i przyspieszenie starej strony")
  return (
    <svg
      viewBox="0 0 380 220"
      className="w-full h-full select-none"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="378"
        height="218"
        rx="8"
        stroke="var(--line)"
        strokeWidth="1"
        fill="var(--color-surface)"
      />

      {/* Belka tytułowa */}
      <line x1="1" y1="28" x2="379" y2="28" stroke="var(--line)" strokeWidth="1" />
      <text x="16" y="18" className="font-mono text-[8.5px] font-medium fill-accent-text">
        ARCHITEKTURA PRZED I PO
      </text>
      <rect x="282" y="6" width="82" height="16" rx="3" fill="color-mix(in oklab, var(--accent) 12%, transparent)" stroke="var(--accent)" strokeWidth="1" />
      <text x="323" y="17.5" textAnchor="middle" className="font-mono text-[8px] font-bold fill-accent-text">
        MIGRACJA 301
      </text>

      {/* Podział na dwie połówki (PRZED vs PO) */}
      <g transform="translate(18, 40)">
        {/* LEWA STRONA: STARY SERWIS */}
        <g>
          <rect width="162" height="116" rx="6" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
          <rect width="162" height="20" rx="6" fill="color-mix(in oklab, var(--coral) 10%, transparent)" />
          <text x="10" y="14" className="font-mono text-[8px] font-bold fill-coral">
            PRZED: STARY SZABLON WP
          </text>

          <g transform="translate(10, 28)">
            <rect width="84" height="14" rx="3" fill="color-mix(in oklab, var(--coral) 15%, transparent)" />
            <text x="42" y="10" textAnchor="middle" className="font-mono text-[8px] font-bold fill-coral">
              Ładowanie: 4.8s
            </text>

            <g transform="translate(0, 20)">
              <text x="0" y="12" className="font-mono text-[8px] fill-ink-muted">PageSpeed Mobile:</text>
              <text x="110" y="12" className="font-mono text-[9px] font-bold fill-coral">34/100</text>

              <text x="0" y="27" className="font-mono text-[8px] fill-ink-muted">Aktywne wtyczki:</text>
              <text x="110" y="27" className="font-mono text-[9px] font-bold fill-coral">38 szt.</text>

              <text x="0" y="42" className="font-mono text-[8px] fill-ink-muted">Przesunięcia CLS:</text>
              <text x="110" y="42" className="font-mono text-[9px] font-bold fill-coral">0.42</text>

              <text x="0" y="57" className="font-mono text-[8px] fill-ink-muted">Odrzucenia ofert:</text>
              <text x="110" y="57" className="font-mono text-[9px] font-bold fill-coral">68%</text>
            </g>
          </g>
        </g>

        {/* PRAWA STRONA: NOWE STUDIO WZROSTU */}
        <g transform="translate(182, 0)">
          <rect width="162" height="116" rx="6" stroke="var(--accent)" strokeWidth="1.2" fill="var(--background)" />
          <rect width="162" height="20" rx="6" fill="color-mix(in oklab, var(--accent) 12%, transparent)" />
          <text x="10" y="14" className="font-mono text-[8px] font-bold fill-accent-text">
            PO: CZYSTY KOD NEXT.JS
          </text>

          <g transform="translate(10, 28)">
            <rect width="84" height="14" rx="3" fill="color-mix(in oklab, var(--accent) 20%, transparent)" />
            <text x="42" y="10" textAnchor="middle" className="font-mono text-[8px] font-bold fill-accent-text">
              Ładowanie: 0.6s
            </text>

            <g transform="translate(0, 20)">
              <text x="0" y="12" className="font-mono text-[8px] fill-ink-muted">PageSpeed Mobile:</text>
              <text x="110" y="12" className="font-mono text-[9px] font-bold fill-accent-text">100/100</text>

              <text x="0" y="27" className="font-mono text-[8px] fill-ink-muted">Aktywne wtyczki:</text>
              <text x="110" y="27" className="font-mono text-[9px] font-bold fill-accent-text">0 (kod)</text>

              <text x="0" y="42" className="font-mono text-[8px] fill-ink-muted">Przesunięcia CLS:</text>
              <text x="110" y="42" className="font-mono text-[9px] font-bold fill-accent-text">0.00</text>

              <text x="0" y="57" className="font-mono text-[8px] fill-ink-muted">Wzrost zapytań:</text>
              <text x="110" y="57" className="font-mono text-[9px] font-bold fill-accent-text">+120%</text>
            </g>
          </g>
        </g>
      </g>

      {/* Dolny pasek gwarancji migracji SEO */}
      <line x1="1" y1="168" x2="379" y2="168" stroke="var(--line)" strokeWidth="1" />
      <g transform="translate(18, 178)">
        <rect width="344" height="30" rx="4" stroke="var(--line)" strokeWidth="1" fill="var(--background)" />
        <circle cx="15" cy="15" r="4.5" fill="var(--accent)" />
        <path d="M 13 15 l 1.5 1.5 l 3 -3" stroke="white" strokeWidth="1" fill="none" />
        <text x="26" y="18.5" className="font-mono text-[8px] font-bold fill-ink">
          Gwarancja zachowania pozycji w Google: <tspan className="fill-accent-text font-medium">Pełna mapa przekierowań 301</tspan>
        </text>
      </g>
    </svg>
  );
}

export function ServicesBento() {
  const [hoveredIdx, setHoveredIdx] = React.useState(0);
  const [mobileExpanded, setMobileExpanded] = React.useState<number | null>(0);

  const activeService = servicesList[hoveredIdx] || servicesList[0];

  return (
    <Section spacing="default" id="uslugi" className="border-b border-line bg-background">
      <Container>
        <SectionHeader
          title="Jak możemy pomóc Twojej firmie urosnąć"
          description="Tworzymy nowe strony od zera lub porządkujemy obecne – zawsze z naciskiem na czytelność oferty, szybkość działania i pozyskiwanie klientów."
          align="left"
        />

        {/* UKŁAD ASYMETRYCZNY: Lewo wiersze usług (kol. 1–7), Prawo dynamiczny panel ilustracji (kol. 8–12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 sm:mt-8">
          
          {/* LEWA KOLUMNA: Lista 4 usług */}
          <div className="lg:col-span-7 border-t border-line divide-y divide-line">
            {servicesList.map((service, idx) => {
              const indexNumber = String(idx + 1).padStart(2, "0");
              const isHovered = hoveredIdx === idx;
              const isExpanded = mobileExpanded === idx;

              return (
                <div
                  key={service.slug}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onPointerEnter={() => setHoveredIdx(idx)}
                  onClick={() => setHoveredIdx(idx)}
                  className={cn(
                    "group transition-colors duration-150 text-left cursor-pointer",
                    isHovered ? "bg-surface/80" : "hover:bg-surface/40"
                  )}
                >
                  {/* Wiersz na desktopie (link bezpośredni) / przycisk na mobile (akordeon) */}
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="font-mono text-sm font-bold text-accent-text pt-0.5">
                          {indexNumber}
                        </span>
                        <div className="space-y-1.5">
                          <Link
                            href={`/uslugi/${service.slug}`}
                            onFocus={() => setHoveredIdx(idx)}
                            className="text-lg sm:text-xl font-bold font-heading text-ink group-hover:text-accent-text transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:underline"
                          >
                            <span>{service.title}</span>
                            <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 group-hover:translate-x-0.5 text-accent-text shrink-0 hidden sm:inline" />
                          </Link>
                          <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>

                      {/* Przycisk rozwijania akordeonu na mobile */}
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(isExpanded ? null : idx)}
                        className="lg:hidden p-1.5 rounded-lg border border-line bg-surface text-ink-muted shrink-0"
                        aria-expanded={isExpanded}
                        aria-label={`Rozwiń szczegóły dla: ${service.title}`}
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            isExpanded ? "rotate-180 text-accent-text" : ""
                          )}
                        />
                      </button>
                    </div>

                    {/* Akordeon na mobile z własną ilustracją SVG */}
                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-line/60 lg:hidden space-y-4">
                        <div className="w-full aspect-[16/10] bg-background rounded-xl border border-line p-2 sm:p-3">
                          <ServiceIllustration slug={service.slug} />
                        </div>
                        <div className="text-xs text-ink-muted font-mono leading-relaxed bg-surface/50 p-3 rounded-lg border border-line/50">
                          {service.tagline}
                        </div>
                        <div className="space-y-1.5 pt-1">
                          <div className="text-[11px] font-mono text-ink-muted font-medium">
                            W ramach wdrożenia:
                          </div>
                          {service.solution.deliverables.slice(0, 3).map((item) => (
                            <div key={item} className="flex items-start gap-2 text-xs text-ink/90">
                              <span className="text-accent-text font-bold">✓</span>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Link
                          href={`/uslugi/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:underline pt-2"
                        >
                          <span>Zobacz pełną ofertę i cennik</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRAWA KOLUMNA (Desktop): Panel podglądu z dynamiczną ilustracją SVG (Bez matrioszki) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <div className="rounded-2xl border border-line bg-surface overflow-hidden shadow-card text-left">
              {/* Belka informacyjna konsoli */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-line bg-surface-subtle/50 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-accent-text font-bold">
                    SCHEMAT // 0{hoveredIdx + 1}
                  </span>
                  <span className="text-line">|</span>
                  <span className="text-ink-muted text-[11px] truncate max-w-[190px]">
                    {activeService.title}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-ink-muted shrink-0">
                  ARCHITEKTURA
                </span>
              </div>

              {/* Płótno schematu technicznego (Direct edge-to-edge with 1px border bottom) */}
              <div className="w-full aspect-[16/10] bg-background border-b border-line p-3 sm:p-4 flex items-center justify-center">
                <ServiceIllustration slug={activeService.slug} />
              </div>

              {/* Informacje o usłudze i konkretne deliverable */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-heading font-bold text-lg text-ink leading-snug">
                    {activeService.title}
                  </h3>
                  <p className="text-xs text-accent-text font-mono font-medium">
                    {activeService.tagline}
                  </p>
                  <p className="text-xs text-ink-muted leading-relaxed pt-1">
                    {activeService.shortDescription}
                  </p>
                </div>

                {/* Kluczowe elementy wdrożenia */}
                <div className="pt-2 border-t border-line/60 space-y-2">
                  <div className="text-[11px] font-mono text-ink-muted font-medium">
                    Kluczowe elementy wdrożenia:
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {activeService.solution.deliverables.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-ink/90">
                        <span className="text-accent-text font-bold text-sm leading-none pt-0.5">✓</span>
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/uslugi/${activeService.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-accent-text hover:text-accent-text/80 transition-colors gap-1.5 group"
                  >
                    <span>Szczegóły usługi, cennik i specyfikacja</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dół sekcji: bezpośredni kontakt */}
        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-ink-muted font-mono text-left">
          <div>
            Każdy projekt realizowany jest bezpośrednio przez studio, bez podwykonawców.
          </div>
          <Link
            href="/uslugi"
            className="text-accent-text hover:underline font-semibold inline-flex items-center gap-1"
          >
            Pełny przegląd usług i procesu
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
