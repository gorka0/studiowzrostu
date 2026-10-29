import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const AUDIENCE_SEGMENTS = [
  {
    number: "01",
    title: "Małe i średnie firmy",
    desc: "Dla właścicieli, których obecna strona wygląda przestarzale, ładuje się wolno na telefonach i nie generuje nowych kontaktów biznesowych.",
    deliverable: "Nowoczesny wizerunek, przejrzysta oferta i prosty formularz kontaktowy z błyskawicznym powiadomieniem.",
  },
  {
    number: "02",
    title: "Firmy usługowe i B2B",
    desc: "Dla doradców, kancelarii, inżynierów i specjalistów, których kontrahenci weryfikują witrynę przed podpisaniem umowy lub zleceniem.",
    deliverable: "Wizerunek eksperta w branży, czytelny opis realizacji oraz formularz ułatwiający szybką wycenę.",
  },
  {
    number: "03",
    title: "Firmy produkcyjne, budowlane i techniczne",
    desc: "Dla wykonawców, producentów i firm technicznych, które potrzebują konkretnego katalogu usług i maszyn bez marketingowego lania wody.",
    deliverable: "Czytelna specyfikacja oferty, szybki formularz zapytań ofertowych i bezbłędne renderowanie na smartfonach.",
  },
  {
    number: "04",
    title: "Przedsięwzięcia i nowe marki",
    desc: "Dla założycieli nowych projektów, którzy potrzebują wyrazistego serwisu przygotowanego pod dalszy rozwój bez ograniczeń tanich szablonów.",
    deliverable: "Strona gotowa na rozwój firmy – w każdej chwili łatwo dodasz nowe usługi, cennik czy kolejne podstrony, mając pełnię praw do projektu.",
  },
];

export function AudienceSection() {
  return (
    <Section spacing="default" className="bg-surface/50 border-b border-line">
      <Container>
        <SectionHeader
          title="Dla kogo projektujemy strony"
          description="Współpracujemy z firmami, które traktują swoją obecność w sieci jako konkretne narzędzie pozyskiwania klientów i budowy wiarygodności."
        />

        {/* Czysty, typograficzny układ redakcyjny */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AUDIENCE_SEGMENTS.map((segment) => (
            <div
              key={segment.title}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-4 text-left"
            >
              <div className="space-y-2">
                <div className="font-mono text-xs font-semibold text-accent-text">
                  {segment.number}
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-ink leading-snug">
                  {segment.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pt-1">
                  {segment.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-line/60">
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-muted mb-1">
                  Kluczowy rezultat
                </div>
                <p className="text-xs text-ink font-medium leading-relaxed">
                  {segment.deliverable}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Sygnał lokalny + ogólnopolski */}
        <div className="mt-12 p-4 rounded-xl border border-line bg-surface-subtle text-xs text-ink-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-text shrink-0" />
            <span>
              <strong className="text-ink">Obszar działania:</strong> Pracujemy z firmami z Bydgoszczy, województwa kujawsko-pomorskiego oraz w 100% zdalnie z klientami z całej Polski.
            </span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
