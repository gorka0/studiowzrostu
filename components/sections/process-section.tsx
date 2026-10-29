import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const PROCESS_STEPS = [
  {
    number: "01",
    day: "Dzień 1",
    title: "Rozmowa i brief",
    desc: "Krótka rozmowa wstępna i określenie zakresu. Ustalamy cele biznesowe, profil klientów i zbieramy materiały wyjściowe.",
  },
  {
    number: "02",
    day: "Dzień 2",
    title: "Układ i teksty",
    desc: "Planujemy układ podstron i porządkujemy treści tak, aby Twój klient w kilka sekund zrozumiał ofertę i wiedział, jak się z Tobą skontaktować.",
  },
  {
    number: "03",
    day: "Dzień 3",
    title: "Budowa strony i testy",
    desc: "Zamieniamy projekt w działającą, szybką stronę. Dopracowujemy widok na telefonach, podłączamy formularze kontaktowe i sprawdzamy każdy detal.",
  },
  {
    number: "04",
    day: "Dzień 4",
    title: "Odbiór i publikacja",
    desc: "Weryfikujemy działanie na ekranach mobilnych, podpinamy domenę z certyfikatem SSL i przekazujemy gotowy serwis.",
  },
];

export function ProcessSection() {
  return (
    <Section spacing="default" className="bg-surface/50 border-b border-line">
      <Container>
        <SectionHeader
          title="Przejrzysty proces współpracy w 4 etapach"
          description="Na każdym etapie wiesz dokładnie, co robimy i na czym stoimy. Bez zbędnego żargonu i bez przedłużających się ustaleń."
        />

        {/* Pasek orientacyjnej osi czasu */}
        <div className="mb-10 p-4 rounded-xl border border-line bg-surface flex flex-col sm:flex-row items-baseline justify-between gap-3 text-xs">
          <div className="font-mono text-accent-text font-semibold uppercase tracking-wider">
            Orientacyjna oś czasu: 3–4 dni robocze
          </div>
          <div className="text-ink-muted">
            Czas liczony od momentu akceptacji założeń i przekazania materiałów wyjściowych.
          </div>
        </div>

        {/* 4 kroki w poziomym układzie architektonicznym z wyraźną numeracją */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-4 text-left"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-2xl font-bold text-accent-text">
                  {step.number}
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  {step.day}
                </span>
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
