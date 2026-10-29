import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const SEO_ADVANTAGES = [
  {
    number: "01",
    title: "Czytelna struktura dla wyszukiwarki",
    desc: "Układamy nagłówki i treści w logiczny sposób, dzięki czemu roboty Google precyzyjnie indeksują każdą Twoją usługę.",
  },
  {
    number: "02",
    title: "Szybkość premiowana przez algorytmy",
    desc: "Google oficjalnie promuje szybkie strony. Im szybciej Twoja witryna działa na telefonach, tym chętniej wyszukiwarka wyświetla ją wyżej.",
  },
  {
    number: "03",
    title: "Wizytówka i obecność lokalna",
    desc: "Optymalizujemy stronę pod zapytania lokalne, aby klienci z Twojego miasta i regionu trafiali wprost do Ciebie.",
  },
  {
    number: "04",
    title: "Gotowość na treści i bloga",
    desc: "Gdy zechcesz rozbudować stronę o artykuły poradnikowe lub opisy kolejnych realizacji, masz do tego gotowy, szybki fundament.",
  },
];

export function SeoAdvantageSection() {
  return (
    <Section spacing="default" className="bg-surface/40 border-b border-line">
      <Container>
        <SectionHeader
          title="Dlaczego nasze strony łatwiej zdobywają wysokie pozycje w Google?"
          description="Dobra oferta nie zadziała, jeśli klienci nie mogą na nią trafić. Budujemy strony tak, aby wyszukiwarka Google od razu rozumiała, czym się zajmujesz i komu pomagasz."
        />

        {/* 4 kolumny redakcyjne z numeracją */}
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
