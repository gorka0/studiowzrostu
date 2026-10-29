import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const AUDIENCE_SEGMENTS = [
  {
    number: "01",
    title: "Małe i średnie firmy",
    subtitle: "Gdy obecna witryna przestała wystarczać",
    desc: "Dla właścicieli, których obecna strona wygląda przestarzale, ładuje się wolno na telefonach i nie generuje nowych kontaktów biznesowych.",
    deliverable: "Nowoczesny wizerunek, przejrzysta oferta i prosty formularz kontaktowy z błyskawicznym powiadomieniem.",
  },
  {
    number: "02",
    title: "Firmy usługowe i B2B",
    subtitle: "Gdy decyzja klienta opiera się na zaufaniu",
    desc: "Dla doradców, kancelarii, inżynierów i specjalistów, których kontrahenci weryfikują witrynę przed podpisaniem umowy lub zleceniem.",
    deliverable: "Architektura budująca pozycję eksperta, merytoryczne studia przypadków oraz pełna niezależność od zewnętrznych platform.",
  },
  {
    number: "03",
    title: "Firmy inżynieryjne i techniczne",
    subtitle: "Gdy precyzja oferty decyduje o zleceniu",
    desc: "Dla wykonawców, producentów i zespołów technicznych, które potrzebują przejrzystego katalogu rozwiązań bez zbędnych ozdobników.",
    deliverable: "Czytelna specyfikacja oferty, szybki formularz zapytań ofertowych i bezbłędne renderowanie na smartfonach.",
  },
  {
    number: "04",
    title: "Przedsięwzięcia i nowe marki",
    subtitle: "Gdy potrzebujesz profesjonalnego startu od dnia 1",
    desc: "Dla założycieli nowych projektów, którzy potrzebują wyrazistego serwisu przygotowanego pod dalszy rozwój bez ograniczeń tanich szablonów.",
    deliverable: "Kod w Next.js gotowy na rozbudowę o aplikację webową, maksymalne noty wydajności i pełna własność praw autorskich.",
  },
];

export function AudienceSection() {
  return (
    <Section spacing="default" className="bg-surface/50 border-b border-line">
      <Container>
        <SectionHeader
          title="Dla kogo projektujemy serwisy"
          description="Współpracujemy z firmami, które traktują swoją obecność w sieci jako konkretne narzędzie pozyskiwania klientów i budowy wiarygodności."
        />

        {/* Czysty, typograficzny układ redakcyjny bez ikon w zaokrąglonych kwadracikach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {AUDIENCE_SEGMENTS.map((segment) => (
            <div
              key={segment.title}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-4 text-left"
            >
              <div className="space-y-2">
                <div className="font-mono text-xs font-semibold text-primary">
                  {segment.number}
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-ink leading-snug">
                  {segment.title}
                </h3>
                <div className="text-xs font-medium text-primary">
                  {segment.subtitle}
                </div>
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
      </Container>
    </Section>
  );
}
