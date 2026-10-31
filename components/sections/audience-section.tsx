"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

const AUDIENCE_SEGMENTS = [
  {
    id: "msp",
    number: "01",
    tabLabel: "Małe i średnie firmy",
    title: "Małe i średnie firmy",
    desc: "Dla właścicieli, których obecna strona wygląda przestarzale, ładuje się wolno na telefonach i nie generuje nowych kontaktów biznesowych.",
    deliverable: "Nowoczesny wizerunek, przejrzysta oferta i prosty formularz kontaktowy z błyskawicznym powiadomieniem.",
    wireframeType: "smb",
  },
  {
    id: "b2b",
    number: "02",
    tabLabel: "Firmy usługowe i B2B",
    title: "Firmy usługowe i B2B",
    desc: "Dla doradców, kancelarii, inżynierów i specjalistów, których kontrahenci weryfikują witrynę przed podpisaniem umowy lub zleceniem.",
    deliverable: "Wizerunek eksperta w branży, czytelny opis realizacji oraz formularz ułatwiający szybką wycenę.",
    wireframeType: "b2b",
  },
  {
    id: "techniczne",
    number: "03",
    tabLabel: "Produkcja, budownictwo, technika",
    title: "Firmy produkcyjne, budowlane i techniczne",
    desc: "Dla wykonawców, producentów i firm technicznych, które potrzebują konkretnego katalogu usług i maszyn bez marketingowego lania wody.",
    deliverable: "Czytelna specyfikacja oferty, szybki formularz zapytań ofertowych i bezbłędne renderowanie na smartfonach.",
    wireframeType: "industrial",
  },
  {
    id: "start",
    number: "04",
    tabLabel: "Przedsięwzięcia i nowe marki",
    title: "Przedsięwzięcia i nowe marki",
    desc: "Dla założycieli nowych projektów, którzy potrzebują wyrazistego serwisu przygotowanego pod dalszy rozwój bez ograniczeń tanich szablonów.",
    deliverable: "Strona gotowa na rozwój firmy – w każdej chwili łatwo dodasz nowe usługi, cennik czy kolejne podstrony, mając pełnię praw do projektu.",
    wireframeType: "newbrand",
  },
];

export function AudienceSection() {
  const [activeTab, setActiveTab] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      nextIndex = (index + 1) % AUDIENCE_SEGMENTS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      nextIndex = (index - 1 + AUDIENCE_SEGMENTS.length) % AUDIENCE_SEGMENTS.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = AUDIENCE_SEGMENTS.length - 1;
    }

    if (nextIndex !== index) {
      setActiveTab(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const currentSegment = AUDIENCE_SEGMENTS[activeTab];

  return (
    <Section spacing="default" className="bg-surface/50 border-b border-line">
      <Container>
        <SectionHeader
          title="Dla kogo projektujemy strony"
          description="Współpracujemy z firmami, które traktują swoją obecność w sieci jako konkretne narzędzie pozyskiwania klientów i budowy wiarygodności."
          align="left"
        />

        {/* Układ zakładek: lewa lista (kol. 1–5), prawy panel (kol. 6–12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-6 sm:mt-8">
          
          {/* LEWA STRONA: Tablist (Mobile: scroll horyzontalny, Desktop: pionowa lista) */}
          <div
            role="tablist"
            aria-label="Kategorie klientów Studia Wzrostu"
            className="lg:col-span-5 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 no-scrollbar"
          >
            {AUDIENCE_SEGMENTS.map((segment, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={segment.id}
                  id={`tab-${segment.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${segment.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  onClick={() => setActiveTab(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={cn(
                    "flex items-start gap-3.5 p-4 rounded-xl text-left transition-colors duration-150 border cursor-pointer shrink-0 lg:shrink w-[260px] sm:w-[280px] lg:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                    isSelected
                      ? "bg-surface border-accent/40 shadow-xs translate-x-0 lg:translate-x-1"
                      : "bg-surface/30 border-transparent hover:bg-surface/70 text-ink-muted hover:text-ink"
                  )}
                >
                  <span
                    className={cn(
                      "font-mono text-xs font-bold pt-0.5",
                      isSelected ? "text-accent-text" : "text-ink-muted"
                    )}
                  >
                    {segment.number}
                  </span>
                  <div className="space-y-1">
                    <div
                      className={cn(
                        "font-heading font-bold text-sm sm:text-base leading-snug",
                        isSelected ? "text-ink" : "text-ink-muted"
                      )}
                    >
                      {segment.tabLabel}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* PRAWA STRONA: Tabpanel ze szczegółami i unikalną makietą CSS wireframe */}
          <div className="lg:col-span-7 w-full">
            <div
              id={`panel-${currentSegment.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${currentSegment.id}`}
              className="rounded-2xl border border-line bg-card p-6 sm:p-8 shadow-card flex flex-col gap-6"
            >
              {/* Opis i Kluczowy rezultat */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-medium text-accent-text">
                    {currentSegment.number} / Profil klienta
                  </span>
                </div>
                <h3 className="font-heading font-bold text-2xl sm:text-3xl text-ink leading-tight">
                  {currentSegment.title}
                </h3>
                <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                  {currentSegment.desc}
                </p>

                <div className="pt-4 border-t border-line/70">
                  <div className="text-[11px] font-mono text-ink-muted mb-1">
                    Kluczowy rezultat wdrożenia
                  </div>
                  <p className="text-sm text-ink font-semibold leading-relaxed">
                    {currentSegment.deliverable}
                  </p>
                </div>
              </div>

              {/* MAKIETA WIREFRAME W CSS (Unikalna dla każdej zakładki) */}
              <div className="mt-2 pt-4 border-t border-line/60">
                <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-ink-muted">
                  <span>Dedykowana struktura makiety</span>
                  <span className="text-[11px] font-mono text-accent-text font-medium">
                    Wireframe CSS
                  </span>
                </div>

                <div className="rounded-xl border border-line bg-background/80 p-3 sm:p-4 font-mono text-[10px] select-none" aria-hidden="true">
                  {/* Przeglądarka: pasek okna */}
                  <div className="flex items-center justify-between pb-3 border-b border-line/60 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-line" />
                      <span className="w-2 h-2 rounded-full bg-line" />
                      <span className="w-2 h-2 rounded-full bg-line" />
                    </div>
                    <div className="h-4 w-36 sm:w-48 bg-surface rounded text-[9px] text-ink-muted flex items-center justify-center px-2 truncate">
                      twojadomena.pl/{currentSegment.id}
                    </div>
                    <div className="w-4" />
                  </div>

                  {/* Wireframe wg typu */}
                  {currentSegment.wireframeType === "smb" && (
                    <div className="space-y-2.5">
                      {/* Pasek nagłówka */}
                      <div className="flex items-center justify-between px-2 py-1.5 bg-surface rounded border border-line/50">
                        <div className="h-2 w-16 bg-ink/30 rounded" />
                        <div className="flex gap-2">
                          <div className="h-2 w-10 bg-line rounded" />
                          <div className="h-2 w-10 bg-line rounded" />
                          <div className="h-2 w-12 bg-accent/40 rounded" />
                        </div>
                      </div>
                      {/* Hero: Lewo tekst + Prawo szybki formularz zapytań */}
                      <div className="grid grid-cols-12 gap-2 bg-surface/50 p-2.5 rounded border border-line/40 items-center">
                        <div className="col-span-7 space-y-1.5">
                          <div className="h-3 w-3/4 bg-ink/70 rounded" />
                          <div className="h-2 w-full bg-line rounded" />
                          <div className="h-2 w-2/3 bg-line rounded" />
                          <div className="h-4 w-20 bg-accent text-accent-foreground rounded flex items-center justify-center text-[8px] font-bold">
                            Zadzwoń
                          </div>
                        </div>
                        <div className="col-span-5 bg-card p-2 rounded border border-line/70 space-y-1">
                          <div className="h-1.5 w-14 bg-accent-text/60 rounded" />
                          <div className="h-2 w-full bg-line/60 rounded" />
                          <div className="h-2 w-full bg-line/60 rounded" />
                          <div className="h-2.5 w-full bg-accent/70 rounded" />
                        </div>
                      </div>
                      {/* Trzy bloki korzyści */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-surface p-2 rounded border border-line/40 h-8 flex items-center justify-center text-ink-muted">
                          Błyskawiczny kontakt
                        </div>
                        <div className="bg-surface p-2 rounded border border-line/40 h-8 flex items-center justify-center text-ink-muted">
                          Czytelny cennik
                        </div>
                        <div className="bg-surface p-2 rounded border border-line/40 h-8 flex items-center justify-center text-ink-muted">
                          Widok mobilny
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSegment.wireframeType === "b2b" && (
                    <div className="space-y-2.5">
                      {/* Pasek nagłówka z numerem telefonu B2B */}
                      <div className="flex items-center justify-between px-2 py-1.5 bg-surface rounded border border-line/50">
                        <div className="h-2 w-20 bg-ink/30 rounded" />
                        <div className="flex gap-2">
                          <div className="h-2 w-12 bg-line rounded" />
                          <div className="h-2 w-12 bg-line rounded" />
                          <div className="h-2 w-16 bg-accent-text/40 rounded" />
                        </div>
                      </div>
                      {/* Hero B2B: Ekspertyza i autorytet branżowy */}
                      <div className="p-2.5 bg-surface/50 rounded border border-line/40 space-y-1.5">
                        <div className="h-2 w-24 bg-accent-text/60 rounded" />
                        <div className="h-3 w-4/5 bg-ink/70 rounded" />
                        <div className="h-2 w-full bg-line rounded" />
                      </div>
                      {/* Studia przypadków (Case Studies) w rzędzie */}
                      <div className="grid grid-cols-12 gap-2">
                        <div className="col-span-8 bg-surface p-2 rounded border border-line/50 space-y-1">
                          <div className="h-2 w-28 bg-ink/50 rounded" />
                          <div className="h-1.5 w-full bg-line rounded" />
                          <div className="h-1.5 w-3/4 bg-line rounded" />
                        </div>
                        <div className="col-span-4 bg-accent/10 p-2 rounded border border-accent/30 flex flex-col justify-center items-center text-center">
                          <span className="text-accent-text font-bold text-[9px]">Referencje</span>
                          <span className="h-1.5 w-10 bg-accent/40 rounded mt-1" />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSegment.wireframeType === "industrial" && (
                    <div className="space-y-2.5">
                      {/* Header z przełącznikiem specyfikacji */}
                      <div className="flex items-center justify-between px-2 py-1.5 bg-surface rounded border border-line/50">
                        <div className="h-2 w-16 bg-ink/30 rounded" />
                        <div className="flex gap-2">
                          <div className="h-2 w-14 bg-accent-text/40 rounded" />
                          <div className="h-2 w-14 bg-line rounded" />
                        </div>
                      </div>
                      {/* Tabela specyfikacji technicznej */}
                      <div className="bg-surface/60 p-2 rounded border border-line/50 space-y-1.5">
                        <div className="h-2.5 w-36 bg-ink/60 rounded" />
                        <div className="grid grid-cols-4 gap-1 text-[8px] border-b border-line/60 pb-1 text-ink-muted font-semibold">
                          <div>Model/Usługa</div>
                          <div>Wydajność</div>
                          <div>Format</div>
                          <div>Zapytanie</div>
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-[8px] text-ink-muted items-center">
                          <div className="h-2 bg-line/80 rounded" />
                          <div className="h-2 bg-line/60 rounded" />
                          <div className="h-2 bg-line/60 rounded" />
                          <div className="h-2 bg-accent/60 rounded" />
                        </div>
                        <div className="grid grid-cols-4 gap-1 text-[8px] text-ink-muted items-center">
                          <div className="h-2 bg-line/80 rounded" />
                          <div className="h-2 bg-line/60 rounded" />
                          <div className="h-2 bg-line/60 rounded" />
                          <div className="h-2 bg-accent/60 rounded" />
                        </div>
                      </div>
                      {/* Belka zapytań o park maszynowy / realizację */}
                      <div className="flex items-center justify-between px-2 py-1.5 bg-surface rounded border border-line/40 text-[8px] text-ink-muted">
                        <span>Pobierz kartę katalogową (PDF)</span>
                        <span className="h-2 w-16 bg-accent/70 rounded" />
                      </div>
                    </div>
                  )}

                  {currentSegment.wireframeType === "newbrand" && (
                    <div className="space-y-2.5">
                      {/* Header nowoczesnej marki */}
                      <div className="flex items-center justify-between px-2 py-1.5 bg-surface rounded border border-line/50">
                        <div className="h-2 w-12 bg-accent-text/70 rounded" />
                        <div className="flex gap-2">
                          <div className="h-2 w-10 bg-line rounded" />
                          <div className="h-2 w-10 bg-line rounded" />
                          <div className="h-2 w-12 bg-accent rounded" />
                        </div>
                      </div>
                      {/* Hero asymetryczne z mocnym nagłówkiem wartości */}
                      <div className="p-3 bg-surface/50 rounded border border-line/40 space-y-2">
                        <div className="h-3.5 w-2/3 bg-ink/80 rounded" />
                        <div className="h-2 w-full bg-line rounded" />
                        <div className="flex gap-2 pt-1">
                          <div className="h-3 w-16 bg-accent rounded" />
                          <div className="h-3 w-16 bg-line rounded" />
                        </div>
                      </div>
                      {/* Gotowość na rozwój: 3 puste sloty na przyszłe moduły */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-1.5 bg-surface rounded border border-dashed border-accent/40 text-center text-[8px] text-accent-text">
                          + Nowe usługi
                        </div>
                        <div className="p-1.5 bg-surface rounded border border-dashed border-accent/40 text-center text-[8px] text-accent-text">
                          + Cennik
                        </div>
                        <div className="p-1.5 bg-surface rounded border border-dashed border-accent/40 text-center text-[8px] text-accent-text">
                          + Blog/Baza wiedzy
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Treść zapasowa dla robotów i no-JS w DOM */}
            <div className="sr-only">
              {AUDIENCE_SEGMENTS.map((seg) => (
                <div key={`seo-${seg.id}`}>
                  <h3>{seg.title}</h3>
                  <p>{seg.desc}</p>
                  <p>{seg.deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sygnał lokalny + ogólnopolski */}
        <div className="mt-10 p-4 rounded-xl border border-line bg-surface-subtle text-xs text-ink-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-text shrink-0" />
            <span>
              <strong className="text-ink font-semibold">Obszar działania:</strong> Pracujemy z firmami z Bydgoszczy, województwa kujawsko-pomorskiego oraz w 100% zdalnie z klientami z całej Polski.
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
