import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const SEO_ADVANTAGES = [
  {
    number: "01",
    title: "Błyskawiczne renderowanie serwerowe",
    desc: "Roboty wyszukiwarki Google otrzymują gotowy, w pełni zrenderowany kod HTML w pierwszej milisekundzie, bez konieczności oczekiwania na wykonanie JavaScriptu.",
  },
  {
    number: "02",
    title: "Czysty, semantyczny kod",
    desc: "Uporządkowana hierarchia nagłówków, bezbłędne znaczniki Schema.org i atrybuty dostępności sprawiają, że algorytmy dokładnie rozumieją strukturę Twojej oferty.",
  },
  {
    number: "03",
    title: "Optymalizacja metadanych i podglądu",
    desc: "Dedykowane tagi OpenGraph, canonical URLs oraz automatyczne sitemapy gwarantują profesjonalny podgląd linków na LinkedIn, w komunikatorach i wyszukiwarkach.",
  },
  {
    number: "04",
    title: "Trwałość i odporność technologiczna",
    desc: "Czysty kod nie starzeje się tak jak szablony z dziesiątkami wtyczek. Nie musisz obawiać się, że kolejna automatyczna aktualizacja CMS zepsuje widoczność serwisu.",
  },
];

export function SeoAdvantageSection() {
  return (
    <Section spacing="default" className="bg-surface/40 border-b border-line">
      <Container>
        <SectionHeader
          title="Jak techniczne SEO i czysta architektura wpływają na pozycje w Google?"
          description="Nawet najlepsze treści nie przyniosą klientów, jeśli strona nie będzie prawidłowo odczytywana przez wyszukiwarkę. Dbamy o fundament, który ułatwia pozycjonowanie w Bydgoszczy i całej Polsce."
        />

        {/* 4 kolumny redakcyjne z numeracją bez ikon w kwadracikach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SEO_ADVANTAGES.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-3 text-left"
            >
              <div className="font-mono text-xs font-semibold text-accent-text">
                {item.number}
              </div>
              <h3 className="font-heading font-bold text-lg text-ink leading-snug">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
