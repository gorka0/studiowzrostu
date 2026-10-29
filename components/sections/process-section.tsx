import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Rozmowa wstępna",
    desc: "Zaczynamy od bezpłatnej, 20-minutowej rozmowy. Ustalamy cele biznesowe, profil Twoich klientów i kluczowe przewagi rynkowe.",
  },
  {
    number: "02",
    title: "Strategia i architektura",
    desc: "Projektujemy logiczną strukturę podstron i ścieżkę użytkownika. Układamy treści tak, aby odpowiadały na pytania klientów.",
  },
  {
    number: "03",
    title: "Projekt wizualny",
    desc: "Przygotowujemy indywidualną szatę graficzną w szwajcarskiej estetyce: czytelna typografia, wysoki kontrast, intuicyjna nawigacja.",
  },
  {
    number: "04",
    title: "Wdrożenie i kod",
    desc: "Piszemy czysty kod w Next.js i React z rygorystycznym TypeScriptem. Dbamy o natychmiastowe ładowanie i zgodność z normami WCAG.",
  },
  {
    number: "05",
    title: "Publikacja i rozwój",
    desc: "Konfigurujemy domenę, certyfikaty SSL i testujemy formularze kontaktowe. Po starcie pomagamy w dalszym rozwoju serwisu.",
  },
];

export function ProcessSection() {
  return (
    <Section spacing="default" className="bg-surface/50 border-b border-line">
      <Container>
        <SectionHeader
          title="Przejrzysty proces współpracy w 5 krokach"
          description="Żadnych niespodzianek, opóźnień ani technicznego żargonu. Na każdym etapie wiesz dokładnie, co robimy i na czym stoimy."
        />

        {/* 5 kroków w poziomym układzie architektonicznym z wyraźną numeracją */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-4 text-left"
            >
              <div className="font-mono text-2xl font-bold text-primary">
                {step.number}
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-bold text-lg text-ink">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
