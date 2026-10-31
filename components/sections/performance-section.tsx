"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Zap, AlertTriangle } from "lucide-react";

const METRICS_DATA = [
  {
    badge: "Błyskawiczny start",
    title: "Otwiera się natychmiast",
    desc: "Klient nie czeka ani sekundy. Treść i zdjęcia pojawiają się od razu, nawet przy słabym zasięgu w telefonie.",
  },
  {
    badge: "Wygoda na telefonie",
    title: "Płynne działanie",
    desc: "Menu rozwija się bez zacięć, formularze klikają się precyzyjnie, a przeglądanie oferty jest w 100% naturalne.",
  },
  {
    badge: "Czytelność od razu",
    title: "Stabilny układ",
    desc: "Żadne przyciski ani teksty nie skaczą przed oczami podczas ładowania. Klient bez problemu trafia w numer telefonu.",
  },
];

// 5 klatek symulacji ładowania
const FRAMES = [1, 2, 3, 4, 5];

export function PerformanceSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  const animateFrames = isInView && !shouldReduceMotion;

  return (
    <Section ref={sectionRef} spacing="default" className="border-b border-line bg-surface/35">
      <Container>
        <SectionHeader
          title="Dlaczego szybka strona pomaga zdobyć więcej klientów?"
          description="Większość klientów przegląda Twoją ofertę na telefonie. Jeśli strona ładuje się zbyt wolno albo rozjeżdża na małym ekranie, klient zamyka kartę i dzwoni do konkurencji."
          align="left"
        />

        {/* ILUSTRACJA DWÓCH OSI ŁADOWANIA KLATKA PO KLATCE */}
        <div className="mt-8 rounded-2xl border border-line bg-card p-5 sm:p-8 shadow-card text-left space-y-6">
          <div className="flex items-center justify-between border-b border-line/70 pb-3 text-xs font-mono text-ink-muted">
            <span className="font-semibold text-ink">Porównanie szybkości renderowania w smartfonie</span>
            <span className="text-[10px] uppercase text-accent-text tracking-wider">Ilustracja</span>
          </div>

          <div className="space-y-6 overflow-x-auto no-scrollbar pb-2" aria-hidden="true">
            
            {/* Rząd 1: Szybka strona (Studio Wzrostu - Next.js) */}
            <div className="space-y-2 min-w-[580px]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent-text">
                <Zap className="h-4 w-4 text-accent shrink-0" />
                <span>Szybka strona (Next.js / czysty kod) — treść widoczna od klatki 1</span>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {FRAMES.map((frame, idx) => (
                  <motion.div
                    key={`fast-${frame}`}
                    className="aspect-[4/3] rounded-lg border-2 border-accent/40 bg-surface p-2 flex flex-col justify-between shadow-xs select-none"
                    initial={{ opacity: 0, y: 8 }}
                    animate={animateFrames ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="h-1.5 w-6 bg-accent rounded" />
                      <div className="h-1.5 w-8 bg-line rounded" />
                    </div>
                    {/* Hero */}
                    <div className="space-y-1">
                      <div className="h-2 w-4/5 bg-ink/80 rounded" />
                      <div className="h-1.5 w-full bg-line rounded" />
                      <div className="h-2.5 w-10 bg-accent text-accent-foreground rounded flex items-center justify-center text-[6px] font-bold">
                        CTA
                      </div>
                    </div>
                    {/* Status badge */}
                    <div className="text-[8px] font-mono text-accent-text font-bold text-right">
                      {frame === 1 ? "Start" : "100% gotowa"}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Rząd 2: Wolna strona (tradycyjny szablon) */}
            <div className="space-y-2 min-w-[580px] pt-2 border-t border-line/60">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-ink-muted">
                <AlertTriangle className="h-4 w-4 text-coral shrink-0" />
                <span>Wolna strona (ciężki szablon) — opóźnione renderowanie i biały ekran</span>
              </div>

              <div className="grid grid-cols-5 gap-3">
                {FRAMES.map((frame, idx) => {
                  const isBlank = frame === 1;
                  const isSpinning = frame === 2;
                  const isBroken = frame === 3;
                  const isSettling = frame === 4;

                  return (
                    <motion.div
                      key={`slow-${frame}`}
                      className="aspect-[4/3] rounded-lg border border-line bg-surface/40 p-2 flex flex-col justify-between select-none opacity-80"
                      initial={{ opacity: 0, y: 8 }}
                      animate={animateFrames ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.15 }}
                    >
                      {isBlank && (
                        <div className="h-full flex items-center justify-center text-[8px] font-mono text-ink-muted">
                          (pusty ekran)
                        </div>
                      )}

                      {isSpinning && (
                        <div className="h-full flex flex-col items-center justify-center gap-1">
                          <div className="w-3 h-3 rounded-full border border-t-coral border-line animate-spin" />
                          <span className="text-[7px] font-mono text-ink-muted">ładowanie...</span>
                        </div>
                      )}

                      {isBroken && (
                        <div className="space-y-1">
                          <div className="h-1.5 w-8 bg-line/80 rounded" />
                          <div className="h-3 w-full bg-line/40 rounded border border-dashed border-coral/50" />
                          <div className="text-[7px] font-mono text-ink font-bold" aria-hidden="true">
                            <span className="text-coral">●</span> błąd układu CLS
                          </div>
                        </div>
                      )}

                      {isSettling && (
                        <div className="space-y-1">
                          <div className="h-1.5 w-6 bg-line rounded" />
                          <div className="h-2 w-3/4 bg-ink/40 rounded" />
                          <div className="h-1.5 w-full bg-line rounded" />
                        </div>
                      )}

                      {frame === 5 && (
                        <div className="space-y-1">
                          <div className="h-1.5 w-6 bg-line rounded" />
                          <div className="h-2 w-4/5 bg-ink/60 rounded" />
                          <div className="h-2 w-10 bg-line rounded" />
                          <div className="text-[7px] font-mono text-ink-muted text-right">dopiero teraz</div>
                        </div>
                      )}

                      <div className="text-[8px] font-mono text-ink-muted font-medium text-right">
                        Klatka {frame}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Wspólna oś czasu bez wartości liczbowych */}
            <div className="pt-2 flex items-center justify-between text-xs font-mono text-ink-muted border-t border-line/60">
              <span>0s (kliknięcie w link)</span>
              <span className="flex items-center gap-1">
                <span>Przebieg czasu ładowania strony</span>
                <span>→</span>
              </span>
              <span>Pełna gotowość do kliknięcia</span>
            </div>
          </div>
        </div>

        {/* DOTYCHCZASOWE TRZY TEKSTY JAKO ZWYKŁA LISTA W DOM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 pt-4">
          {METRICS_DATA.map((item) => (
            <div
              key={item.badge}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-3 text-left"
            >
              <div className="space-y-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-accent/10 text-accent-text border border-accent/20">
                  {item.badge}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
