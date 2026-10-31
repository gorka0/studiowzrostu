"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, useInView, useReducedMotion } from "motion/react";

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
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  const animateTimeline = isInView && !shouldReduceMotion;

  return (
    <Section ref={sectionRef} spacing="default" className="bg-background border-b border-line">
      <Container>
        <SectionHeader
          title="Przejrzysty proces współpracy w 4 etapach"
          description="Na każdym etapie wiesz dokładnie, co robimy i na czym stoimy. Bez zbędnego żargonu i bez przedłużających się ustaleń."
          align="left"
        />

        {/* Pasek orientacyjnej osi czasu */}
        <div className="mb-10 sm:mb-14 p-4 rounded-xl border border-line bg-surface/80 flex flex-col sm:flex-row items-baseline justify-between gap-3 text-xs text-left">
          <div className="font-mono text-xs font-medium text-accent-text">
            Orientacyjna oś czasu: 3–4 dni robocze
          </div>
          <div className="text-ink-muted">
            Czas liczony od momentu akceptacji założeń i przekazania materiałów wyjściowych.
          </div>
        </div>

        {/* DESKTOP (≥1024px): Pozioma oś czasu z 4 węzłami i linią postępu */}
        <div className="hidden lg:block relative mt-8 mb-4">
          {/* Pozioma linia bazowa */}
          <div className="absolute top-[52px] left-[6%] right-[6%] h-[2px] bg-line/80 z-0">
            {/* Animowana linia postępu */}
            <motion.div
              className="h-full bg-accent"
              initial={{ width: "0%" }}
              animate={animateTimeline ? { width: "100%" } : { width: "100%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="grid grid-cols-4 gap-8 relative z-10">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="flex flex-col text-left space-y-4">
                {/* Nad węzłem: Etykieta dnia (SZKIC do edycji) */}
                <div className="h-7 flex items-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-accent/10 text-accent-text border border-accent/20">
                    {step.day}
                  </span>
                </div>

                {/* Węzeł na linii poziomej */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-line bg-card shadow-xs flex items-center justify-center font-mono text-xs font-bold text-ink shrink-0 group-hover:border-accent">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                  </div>
                  <span className="font-mono text-xs font-bold text-ink-muted/80">
                    Krok {step.number}
                  </span>
                </div>

                {/* Pod węzłem: Tytuł i opis etapu */}
                <div className="space-y-2 pt-2">
                  <h3 className="font-heading font-bold text-lg text-ink">
                    {step.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE (<1024px): Pionowa oś czasu z węzłami */}
        <div className="lg:hidden relative pl-6 border-l-2 border-line/80 space-y-8 text-left mt-6">
          {PROCESS_STEPS.map((step) => (
            <div key={step.number} className="relative space-y-2">
              {/* Węzeł na pionowej linii */}
              <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 border-surface bg-accent shadow-xs" />

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-accent/10 text-accent-text border border-accent/20">
                  {step.day}
                </span>
                <span className="font-mono text-xs font-bold text-ink-muted">
                  Krok {step.number}
                </span>
              </div>

              <h3 className="font-heading font-bold text-base sm:text-lg text-ink">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
