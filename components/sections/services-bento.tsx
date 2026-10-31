"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { servicesList } from "@/content/services";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// 4 Własne ilustracje liniowe SVG (120x80, styl linii 1.5px, brand tokeny)
function ServiceIllustration({ slug }: { slug: string }) {
  if (slug === "strony-internetowe") {
    // 1. Schemat strony firmowej (moduły, siatka, pasek nagłówka)
    return (
      <svg
        viewBox="0 0 120 80"
        className="w-full h-full select-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Okno przeglądarki */}
        <rect x="6" y="6" width="108" height="68" rx="6" className="text-line stroke-current" fill="var(--color-surface)" />
        {/* Pasek adresu i 3 kropki */}
        <line x1="6" y1="18" x2="114" y2="18" className="text-line stroke-current" />
        <circle cx="14" cy="12" r="1.5" className="fill-ink-muted/40 stroke-none" />
        <circle cx="20" cy="12" r="1.5" className="fill-ink-muted/40 stroke-none" />
        <circle cx="26" cy="12" r="1.5" className="fill-ink-muted/40 stroke-none" />
        <rect x="36" y="9.5" width="48" height="5" rx="2" className="text-line/60 stroke-current" />
        {/* Hero: Lewo tekst nagłówka, prawo obrazek/akcent */}
        <line x1="14" y1="28" x2="52" y2="28" stroke="var(--accent)" strokeWidth="2.5" />
        <line x1="14" y1="35" x2="44" y2="35" className="text-ink-muted/60 stroke-current" strokeWidth="1.5" />
        <rect x="14" y="42" width="22" height="7" rx="3.5" fill="var(--accent)" stroke="none" />
        <rect x="64" y="25" width="42" height="26" rx="4" className="text-line stroke-current" fill="color-mix(in oklab, var(--accent) 8%, transparent)" />
        <circle cx="85" cy="38" r="4" className="fill-coral stroke-none" />
        {/* Dolne 3 kolumny */}
        <rect x="14" y="57" width="28" height="11" rx="2" className="text-line/70 stroke-current" />
        <rect x="46" y="57" width="28" height="11" rx="2" className="text-line/70 stroke-current" />
        <rect x="78" y="57" width="28" height="11" rx="2" className="text-line/70 stroke-current" />
      </svg>
    );
  }

  if (slug === "landing-page") {
    // 2. Łuk szybkości i konwersji (prędkościomierz z igłą na maksimum i koralowym akcentem)
    return (
      <svg
        viewBox="0 0 120 80"
        className="w-full h-full select-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Podstawa tarczy */}
        <path
          d="M 22 62 A 42 42 0 1 1 98 62"
          className="text-line stroke-current"
          strokeWidth="2"
        />
        {/* Aktywny łuk wysokiej prędkości (zielony akcent) */}
        <path
          d="M 60 18 A 42 42 0 0 1 98 62"
          stroke="var(--accent)"
          strokeWidth="3.5"
        />
        {/* Znaczniki na tarczy */}
        <line x1="28" y1="56" x2="34" y2="52" className="text-line/80 stroke-current" />
        <line x1="38" y1="36" x2="43" y2="39" className="text-line/80 stroke-current" />
        <line x1="60" y1="20" x2="60" y2="26" className="text-line/80 stroke-current" />
        <line x1="82" y1="36" x2="77" y2="39" stroke="var(--accent)" strokeWidth="2" />
        <line x1="92" y1="56" x2="86" y2="52" stroke="var(--accent)" strokeWidth="2" />
        {/* Wskazówka skierowana na prawo (maksimum wydajności 100) */}
        <line x1="60" y1="58" x2="88" y2="32" stroke="var(--accent)" strokeWidth="2.5" />
        {/* Oś wskazówki z koralową kropką */}
        <circle cx="60" cy="58" r="4.5" className="fill-coral stroke-none" />
        <circle cx="60" cy="58" r="2" fill="white" stroke="none" />
        {/* Etykieta CWV */}
        <rect x="44" y="66" width="32" height="10" rx="3" className="text-line stroke-current" fill="var(--color-surface)" />
        <text x="60" y="73.5" textAnchor="middle" className="text-[7px] font-mono font-bold fill-accent-text" stroke="none">
          LCP 0.8s
        </text>
      </svg>
    );
  }

  if (slug === "audyt-optymalizacja") {
    // 3. Linie wyników wyszukiwania (wyróżniona pierwsza pozycja z zielonym adresem)
    return (
      <svg
        viewBox="0 0 120 80"
        className="w-full h-full select-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Belka wyszukiwarki */}
        <rect x="10" y="6" width="100" height="14" rx="4" className="text-line stroke-current" fill="var(--color-surface)" />
        <circle cx="20" cy="13" r="3" className="text-ink-muted/50 stroke-current" />
        <line x1="22.5" y1="15.5" x2="25" y2="18" className="text-ink-muted/50 stroke-current" />
        <line x1="30" y1="13" x2="65" y2="13" className="text-ink-muted/80 stroke-current" strokeWidth="1.5" />

        {/* Wynik #1 (Wyróżniony, pierwszy) */}
        <rect x="10" y="26" width="100" height="26" rx="4" className="stroke-accent/40" fill="color-mix(in oklab, var(--accent) 6%, transparent)" />
        <line x1="16" y1="33" x2="48" y2="33" stroke="var(--accent)" strokeWidth="1" />
        <line x1="16" y1="39" x2="85" y2="39" stroke="var(--accent-text)" strokeWidth="2" />
        <line x1="16" y1="46" x2="75" y2="46" className="text-ink-muted/60 stroke-current" strokeWidth="1" />
        {/* Znacznik pozycji 1 */}
        <circle cx="102" cy="39" r="4" className="fill-coral stroke-none" />

        {/* Wynik #2 (Standardowy, szary) */}
        <line x1="16" y1="59" x2="40" y2="59" className="text-ink-muted/40 stroke-current" strokeWidth="1" />
        <line x1="16" y1="65" x2="70" y2="65" className="text-ink-muted/70 stroke-current" strokeWidth="1.5" />
        <line x1="16" y1="71" x2="60" y2="71" className="text-ink-muted/40 stroke-current" strokeWidth="1" />
      </svg>
    );
  }

  // 4. Nawiasy kodu i tarcza opieki technicznej (opieka-i-rozwoj)
  return (
    <svg
      viewBox="0 0 120 80"
      className="w-full h-full select-none"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Okno terminala */}
      <rect x="8" y="6" width="104" height="68" rx="6" className="text-line stroke-current" fill="var(--color-surface)" />
      <line x1="8" y1="18" x2="112" y2="18" className="text-line stroke-current" />
      <circle cx="15" cy="12" r="1.5" className="fill-coral stroke-none" />
      <circle cx="21" cy="12" r="1.5" className="fill-ink-muted/40 stroke-none" />
      <circle cx="27" cy="12" r="1.5" className="fill-accent stroke-none" />

      {/* Nawiasy kodu </> */}
      <path d="M 28 32 L 20 40 L 28 48" stroke="var(--accent)" strokeWidth="2" />
      <path d="M 44 32 L 52 40 L 44 48" stroke="var(--accent)" strokeWidth="2" />
      <line x1="38" y1="30" x2="34" y2="50" stroke="var(--accent)" strokeWidth="2" />

      {/* Linie kodu w edytorze */}
      <line x1="62" y1="32" x2="98" y2="32" className="text-ink-muted/60 stroke-current" strokeWidth="1.5" />
      <line x1="62" y1="40" x2="90" y2="40" stroke="var(--accent-text)" strokeWidth="2" />
      <line x1="62" y1="48" x2="84" y2="48" className="text-ink-muted/60 stroke-current" strokeWidth="1.5" />

      {/* Belka statusu z zielonym pulsem (status: active) */}
      <rect x="18" y="58" width="84" height="10" rx="3" className="text-line/60 stroke-current" fill="color-mix(in oklab, var(--accent) 8%, transparent)" />
      <circle cx="26" cy="63" r="2" className="fill-accent stroke-none" />
      <text x="32" y="65.5" className="text-[7px] font-mono fill-accent-text font-bold" stroke="none">
        status: 100% sprawny · kopia 24h
      </text>
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
                  className={cn(
                    "group transition-all duration-200 text-left",
                    isHovered ? "bg-surface/60" : "hover:bg-surface/40"
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
                        <div className="w-full max-w-[200px] mx-auto aspect-[12/8] p-2 bg-surface rounded-xl border border-line/70">
                          <ServiceIllustration slug={service.slug} />
                        </div>
                        <div className="text-xs text-ink-muted font-mono leading-relaxed bg-surface/50 p-3 rounded-lg border border-line/50">
                          {service.tagline}
                        </div>
                        <Link
                          href={`/uslugi/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-text hover:underline"
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

          {/* PRAWA KOLUMNA (Desktop): Panel podglądu z dynamiczną ilustracją SVG */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 shadow-card space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-line/70 pb-3">
                <span className="font-mono text-xs text-accent-text font-bold">
                  PODGLĄD / 0{hoveredIdx + 1}
                </span>
                <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider">
                  Ilustracja SVG
                </span>
              </div>

              {/* Ramka z dedykowaną ilustracją 120x80 */}
              <div className="w-full aspect-[12/8] rounded-xl border border-line/70 bg-background/80 p-4 flex items-center justify-center">
                <ServiceIllustration slug={activeService.slug} />
              </div>

              {/* Informacje o usłudze */}
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-ink">
                  {activeService.title}
                </h3>
                <p className="text-xs text-accent-text font-mono">
                  {activeService.tagline}
                </p>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {activeService.shortDescription}
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href={`/uslugi/${activeService.slug}`}
                  className="inline-flex items-center text-xs font-semibold text-accent-text hover:text-accent-text/80 transition-colors gap-1 group"
                >
                  <span>Szczegóły usługi i zakres wdrożenia</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
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
