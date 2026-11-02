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
 * Autorskie, precyzyjne podglądy techniczne dla 4 usług w standardzie Tesla/Vercel.
 * Zastępują surowe szkice wektorowe czytelnymi, realnymi kartami produktu z parametrami.
 */
function ServicePreview({ slug }: { slug: string }) {
  if (slug === "strony-internetowe") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-xl border border-line text-left font-sans select-none shadow-xs">
        {/* Pasek przeglądarki */}
        <div className="flex items-center justify-between pb-3 border-b border-line text-[12px] text-ink-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-line" />
            <span className="w-2.5 h-2.5 rounded-full bg-line" />
            <span className="w-2.5 h-2.5 rounded-full bg-line" />
          </div>
          <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-surface border border-line">
            studiowzrostu.pl/twoja-firma
          </span>
          <span className="text-[11px] text-accent-text font-medium">SSL aktywny</span>
        </div>

        {/* Hero preview */}
        <div className="py-4 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20 text-accent-text text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Next.js 16 • Server-Side Rendering
          </div>
          <div className="text-[18px] sm:text-[20px] font-bold font-heading text-ink leading-tight">
            Nowoczesna strona stworzona, by zamieniać odwiedzających w klientów
          </div>
          <p className="text-[13px] text-ink-muted leading-relaxed line-clamp-2">
            Architektura bez podatnych wtyczek, dedykowany layout pod Twoją branżę i natychmiastowe ładowanie.
          </p>
          <div>
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-accent text-accent-foreground text-[12px] font-semibold shadow-xs">
              Zapytaj o bezpłatną wycenę
            </span>
          </div>
        </div>

        {/* Parametry techniczne */}
        <div className="pt-3 border-t border-line grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-surface border border-line">
            <div className="text-[10px] text-ink-muted uppercase tracking-wider font-mono">Wydajność</div>
            <div className="text-[13px] font-bold text-accent-text">100 / 100</div>
          </div>
          <div className="p-2 rounded-lg bg-surface border border-line">
            <div className="text-[10px] text-ink-muted uppercase tracking-wider font-mono">Czas LCP</div>
            <div className="text-[13px] font-bold text-ink">0.8 s</div>
          </div>
          <div className="p-2 rounded-lg bg-surface border border-line">
            <div className="text-[10px] text-ink-muted uppercase tracking-wider font-mono">Urządzenia</div>
            <div className="text-[13px] font-bold text-ink">100% Mobile</div>
          </div>
        </div>
      </div>
    );
  }

  if (slug === "landing-page") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-xl border border-line text-left font-sans select-none shadow-xs">
        {/* Nagłówek lejka */}
        <div className="flex items-center justify-between pb-3 border-b border-line text-[12px]">
          <span className="font-heading font-semibold text-ink">Architektura Landing Page</span>
          <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent-text font-semibold">
            Google & Meta Ads
          </span>
        </div>

        {/* Wizualizacja przepływu użytkownika */}
        <div className="py-3 space-y-2">
          <div className="p-2.5 rounded-lg bg-surface border border-line flex items-center justify-between text-[13px]">
            <span className="text-ink-muted">1. Płatny ruch z reklamy</span>
            <span className="font-mono text-[11px] text-ink font-semibold">CTR: 4.8%</span>
          </div>

          <div className="flex justify-center text-accent-text text-[11px] font-mono">↓ direct landing (0.7s)</div>

          <div className="p-3 rounded-lg bg-accent/5 border border-accent/30 space-y-1">
            <div className="flex items-center justify-between text-[13px]">
              <span className="font-semibold text-ink">2. Dedykowana strona docelowa</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-accent text-accent-foreground font-semibold">1 cel CTA</span>
            </div>
            <p className="text-[12px] text-ink-muted">
              Precyzyjna odpowiedź na potrzebę klienta bez rozpraszającego menu.
            </p>
          </div>

          <div className="flex justify-center text-accent-text text-[11px] font-mono">↓ wysłany formularz</div>

          <div className="p-2.5 rounded-lg bg-surface border border-line flex items-center justify-between text-[13px]">
            <span className="text-ink font-semibold">3. Zapytanie ofertowe w CRM</span>
            <span className="font-mono text-[11px] font-bold text-accent-text">+38% konwersji</span>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-ink-muted text-center font-mono">
          Śledzenie zdarzeń: Google Analytics 4 • Meta Pixel • Consent Mode v2
        </div>
      </div>
    );
  }

  if (slug === "seo-techniczne") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-xl border border-line text-left font-sans select-none shadow-xs">
        {/* Nagłówek */}
        <div className="flex items-center justify-between pb-3 border-b border-line text-[12px]">
          <span className="font-heading font-semibold text-ink">Google Lighthouse & SEO Audit</span>
          <span className="font-mono text-[11px] text-accent-text font-semibold">Stan: Zoptymalizowano</span>
        </div>

        {/* 4 Tarcze wskaźników Lighthouse */}
        <div className="grid grid-cols-4 gap-2 py-3">
          {[
            { label: "Wydajność", score: "100" },
            { label: "Dostępność", score: "100" },
            { label: "Dobre praktyki", score: "100" },
            { label: "SEO", score: "100" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-2 rounded-lg bg-surface border border-line text-center">
              <div className="w-9 h-9 rounded-full border-2 border-accent flex items-center justify-center font-bold text-accent-text text-[13px]">
                {item.score}
              </div>
              <span className="mt-1.5 text-[10px] font-medium text-ink/80 leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Podgląd wyników Google Search */}
        <div className="p-3 rounded-lg bg-surface border border-line space-y-1">
          <div className="text-[11px] text-ink-muted font-mono truncate">
            https://twojadomena.pl › uslugi › oferta
          </div>
          <div className="text-[13px] font-semibold text-accent-text hover:underline truncate">
            Twoja Firma – Dedykowane Usługi i Produkty dla Biznesu
          </div>
          <div className="text-[11px] text-ink-muted line-clamp-2 leading-relaxed">
            Precyzyjne metadane, semantyka HTML5, znaczniki Schema.org i automatyczna mapa sitemap.xml.
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-ink-muted font-mono">
          <span>Core Web Vitals: LCP 0.8s</span>
          <span>FID: 12ms</span>
          <span>CLS: 0.00</span>
        </div>
      </div>
    );
  }

  // redesign-i-wydajnosc
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-xl border border-line text-left font-sans select-none shadow-xs">
      {/* Nagłówek */}
      <div className="flex items-center justify-between pb-3 border-b border-line text-[12px]">
        <span className="font-heading font-semibold text-ink">Refaktoryzacja i Przyspieszenie</span>
        <span className="font-mono text-[11px] text-accent-text font-semibold">Transformacja kodu</span>
      </div>

      {/* Porównanie Przed / Po */}
      <div className="grid grid-cols-2 gap-3 py-3">
        {/* Przed */}
        <div className="p-3 rounded-lg bg-surface/60 border border-line space-y-2">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-ink-muted">Przed (Stary CMS)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-destructive/10 text-destructive font-semibold">Wolno</span>
          </div>
          <div className="space-y-1 text-[12px] text-ink-muted">
            <div className="flex justify-between">
              <span>Czas ładowania:</span>
              <span className="font-mono font-semibold text-ink">4.8 s</span>
            </div>
            <div className="flex justify-between">
              <span>Waga strony:</span>
              <span className="font-mono font-semibold text-ink">3.6 MB</span>
            </div>
            <div className="flex justify-between">
              <span>Wskaźnik Google:</span>
              <span className="font-mono font-semibold text-destructive">42 / 100</span>
            </div>
          </div>
        </div>

        {/* Po */}
        <div className="p-3 rounded-lg bg-accent/5 border border-accent/30 space-y-2">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-semibold text-accent-text">Po (Next.js)</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent text-accent-foreground font-semibold">Szybko</span>
          </div>
          <div className="space-y-1 text-[12px] text-ink-muted">
            <div className="flex justify-between">
              <span>Czas ładowania:</span>
              <span className="font-mono font-semibold text-accent-text">0.6 s</span>
            </div>
            <div className="flex justify-between">
              <span>Waga strony:</span>
              <span className="font-mono font-semibold text-accent-text">180 KB</span>
            </div>
            <div className="flex justify-between">
              <span>Wskaźnik Google:</span>
              <span className="font-mono font-semibold text-accent-text">100 / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Belka korzyści */}
      <div className="p-2.5 rounded-lg bg-surface border border-line flex items-center justify-between text-[12px]">
        <span className="text-ink/80 font-medium">Zysk technologiczny:</span>
        <span className="font-mono font-semibold text-accent-text">8× szybsza witryna • -95% transferu</span>
      </div>

      <div className="pt-2 text-[11px] text-ink-muted text-center font-mono">
        Pełne zachowanie historii adresów URL (przekierowania 301) i pozycji w Google
      </div>
    </div>
  );
}

export function ServicesBento() {
  const [hoveredIdx, setHoveredIdx] = React.useState(0);
  const [openMobileIdx, setOpenMobileIdx] = React.useState<number | null>(0);

  const activeService = servicesList[hoveredIdx] || servicesList[0];

  return (
    <Section spacing="none" id="uslugi" className="border-b border-line bg-background py-6 sm:py-10 lg:py-16 text-[15px]">
      <Container>
        <SectionHeader
          title="Jak możemy pomóc Twojej firmie urosnąć"
          description="Tworzymy nowe strony i porządkujemy obecne – z naciskiem na czytelność oferty i pozyskiwanie klientów."
          align="left"
        />

        {/* 1. WIDOK MOBILNY / TABLET (<1024px): Czysty akordeon z konkretnymi elementami wdrożenia bez zniekształconych ilustracji */}
        <div className="lg:hidden border-t border-line divide-y divide-line text-left mt-5 sm:mt-8">
          {servicesList.map((service, idx) => {
            const indexNumber = String(idx + 1).padStart(2, "0");
            const isOpen = openMobileIdx === idx;

            return (
              <div
                key={service.slug}
                className={cn(
                  "transition-colors duration-150 rounded-xl",
                  isOpen && "bg-surface/50"
                )}
              >
                {/* Przycisk nagłówka akordeonu: pole dotyku >= 48px */}
                <button
                  type="button"
                  onClick={() => setOpenMobileIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.slug}`}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 sm:p-5 min-h-[48px] text-left cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-xl",
                    "[@media(hover:hover)]:hover:bg-surface/40 active:scale-[0.98]"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-sans text-[13px] font-bold text-accent-text shrink-0">
                      {indexNumber}
                    </span>
                    <h3 className="text-[20px] font-bold font-heading text-ink leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="shrink-0 p-1 text-ink-muted">
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isOpen && "rotate-180 text-accent-text"
                      )}
                    />
                  </div>
                </button>

                {/* Rozwinięty panel z opisem, konkretnymi punktami wdrożenia i linkiem */}
                <div
                  id={`service-panel-${service.slug}`}
                  className={cn("accordion-grid overflow-hidden", isOpen ? "open" : "invisible h-0")}
                >
                  <div className="accordion-inner min-h-0 overflow-hidden">
                    <div className="px-3 pb-3 sm:px-5 sm:pb-4 pt-1 space-y-3">
                    <p className="text-[15px] text-ink/80 leading-[1.5]">
                      {service.shortDescription}
                    </p>

                    {/* Kluczowe elementy wdrożenia */}
                    <ul className="space-y-1.5 text-[14px] text-ink-muted list-none p-0 m-0 pt-0.5">
                      {service.solution.deliverables.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden="true" />
                          <span className="text-ink/80">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Link ze strefą dotyku >= 44px */}
                    <div className="pt-1">
                      <Link
                        href={`/uslugi/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-text hover:underline transition-colors min-h-[44px] py-2 px-1 cursor-pointer active:scale-[0.98]"
                      >
                        <span>Szczegóły usługi</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. WIDOK DESKTOP (≥1024px): Układ asymetryczny 7:5 ze sticky podglądem technicznym */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          
          {/* LEWA KOLUMNA: 4 wiersze usług */}
          <div className="lg:col-span-7 border-t border-line divide-y divide-line text-left">
            {servicesList.map((service, idx) => {
              const indexNumber = String(idx + 1).padStart(2, "0");
              const isSelected = hoveredIdx === idx;

              return (
                <div
                  key={service.slug}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                  tabIndex={0}
                  className={cn(
                    "p-5 sm:p-6 transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-xl",
                    isSelected ? "bg-surface/80" : "[@media(hover:hover)]:hover:bg-surface/40"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <span className="font-sans text-[13px] font-bold text-accent-text pt-0.5 shrink-0">
                      {indexNumber}
                    </span>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-[20px] font-bold font-heading text-ink leading-tight">
                        {service.title}
                      </h3>

                      <p className="text-[15px] text-ink/80 leading-[1.5]">
                        {service.shortDescription}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/uslugi/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-text hover:underline transition-colors min-h-[44px] py-1"
                        >
                          <span>Szczegóły usługi</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRAWA KOLUMNA (Desktop, sticky): Profesjonalna karta podglądu technicznego */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 w-full">
            <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5 shadow-card min-h-[380px] flex items-center justify-center">
              <div className="w-full h-full max-w-[500px]">
                <ServicePreview slug={activeService.slug} />
              </div>
            </div>
          </div>
        </div>

        {/* Dół sekcji: link do pełnego zestawienia */}
        <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-[13px] text-ink-muted text-left">
          <Link
            href="/uslugi"
            className="text-accent-text hover:underline font-semibold inline-flex items-center gap-1 shrink-0 min-h-[44px] py-1"
          >
            Pełny przegląd oferty i technologii
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
