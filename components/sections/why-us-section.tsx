"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { Check } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

const TIMELINE_SEGMENTS = [
  { day: "Dzień 1", title: "Brief i zakres" },
  { day: "Dzień 2", title: "Układ i teksty" },
  { day: "Dzień 3", title: "Kod i testy" },
  { day: "Dzień 4", title: "Publikacja" },
];

const OFFER_ROWS = [
  { item: "Projekt i makiety", status: "W cenie" },
  { item: "Wdrożenie kodu (Next.js)", status: "W cenie" },
  { item: "SEO podstawowe i schema", status: "W cenie" },
  { item: "Optymalizacja szybkości", status: "W cenie" },
];

export function WhyUsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const animateTimeline = isInView && !shouldReduceMotion;

  return (
    <Section
      ref={sectionRef}
      spacing="default"
      id="dlaczego-my"
      className="relative border-b border-darkband-line bg-darkband-bg text-darkband-foreground overflow-hidden"
    >
      {/* Subtelna kratka SVG w tle ciemnego pasa (niskie krycie ~4%) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none z-0 opacity-40"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="darkband-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 48 48 M 0 48 L 48 48"
              stroke="var(--darkband-line)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#darkband-grid-pattern)" />
      </svg>

      <Container className="relative z-10">
        {/* Nagłówek sekcji wyrównany do lewej */}
        <div className="text-left max-w-2xl mb-10 sm:mb-12">
          <div className="font-mono text-xs font-semibold uppercase tracking-wider text-darkband-accent-text mb-2">
            Zasady współpracy
          </div>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl text-darkband-foreground tracking-tight">
            Dlaczego Studio Wzrostu
          </h2>
          <p className="mt-3 text-sm sm:text-base text-darkband-muted leading-relaxed">
            Dwie zasady, na których opieramy każde wdrożenie: precyzyjny czas realizacji i pełna przejrzystość budżetu.
          </p>
        </div>

        {/* Dwa asymetryczne bloki oparte na mocnej typografii */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* BLOK 1: Czas realizacji 3–4 dni (szerokość 6/12 na desktopie) */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 rounded-2xl border border-darkband-line bg-darkband-bg/80 backdrop-blur-xs flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-darkband-accent-text font-semibold">
                01 / Termin wdrożenia
              </div>

              <div className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl text-darkband-accent-text tracking-tight leading-none">
                3–4 dni
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-darkband-foreground">
                Tyle zwykle zajmuje nam przygotowanie strony
              </h3>

              <p className="text-sm sm:text-base text-darkband-muted leading-relaxed">
                Pracujemy w krótkich, dobrze zaplanowanych etapach. Od momentu ustalenia zakresu skupiamy się wyłącznie na Twoim projekcie, bez ciągnących się tygodniami przestojów.
              </p>
            </div>

            {/* Mini oś czasu z 4 segmentami wypełniającymi się w widoku */}
            <div className="p-4 rounded-xl border border-darkband-line bg-darkband-bg/90 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-darkband-muted">
                <span className="font-semibold text-darkband-foreground">Etapy wdrożenia</span>
                <span className="text-[10px] uppercase text-darkband-accent-text">Oś czasu</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {TIMELINE_SEGMENTS.map((seg, idx) => (
                  <div key={seg.day} className="space-y-1.5">
                    {/* Pasek postępu segmentu */}
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-darkband-accent rounded-full"
                        initial={{ width: "0%" }}
                        animate={animateTimeline ? { width: "100%" } : { width: "100%" }}
                        transition={{
                          duration: 0.6,
                          delay: idx * 0.15,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                    <div className="text-[10px] font-mono font-bold text-darkband-foreground truncate">
                      {seg.day}
                    </div>
                    <div className="text-[9px] text-darkband-muted truncate">
                      {seg.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Adnotacja z warunkami */}
            <div className="pt-4 border-t border-darkband-line text-xs font-mono text-darkband-muted leading-relaxed">
              Warunki: dotyczy standardowej strony firmowej lub landing page, liczone od akceptacji wyceny i dostarczenia kompletu materiałów.
            </div>
          </div>

          {/* BLOK 2: Cena z góry (szerokość 6/12 na desktopie) */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 rounded-2xl border border-darkband-line bg-darkband-bg/80 backdrop-blur-xs flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-darkband-accent-text font-semibold">
                02 / Zasady rozliczeń
              </div>

              <div className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-darkband-foreground tracking-tight leading-none pt-2">
                Cena z góry
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-darkband-foreground">
                Wycenę znasz, zanim cokolwiek zaczniemy
              </h3>

              <p className="text-sm sm:text-base text-darkband-muted leading-relaxed">
                Przed startem prac definiujemy zakres techniczny serwisu. Wiesz dokładnie, co wchodzi w skład wdrożenia i za co płacisz.
              </p>
            </div>

            {/* Mała karta oferty bez kwot (Ilustracja) */}
            <div className="p-4 rounded-xl border border-darkband-line bg-darkband-bg/90 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono border-b border-darkband-line pb-2">
                <span className="font-semibold text-darkband-foreground">Specyfikacja zlecenia</span>
                <span className="text-[10px] uppercase text-darkband-muted tracking-wider">
                  Ilustracja
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {OFFER_ROWS.map((row) => (
                  <div key={row.item} className="flex items-center justify-between py-1 border-b border-darkband-line/40">
                    <span className="text-darkband-muted flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-darkband-accent shrink-0" />
                      <span>{row.item}</span>
                    </span>
                    <span className="text-darkband-foreground font-semibold text-[11px]">
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pasek sumy końcowej */}
              <div className="mt-2 pt-2 flex items-center justify-between bg-darkband-accent/15 border border-darkband-accent/30 rounded-lg px-3 py-2">
                <span className="text-xs font-mono text-darkband-foreground font-semibold">
                  Suma inwestycji:
                </span>
                <span className="text-xs font-mono font-bold text-darkband-accent-text uppercase tracking-wider">
                  Ustalona z góry
                </span>
              </div>
            </div>

            {/* Adnotacja o wycenie */}
            <div className="pt-4 border-t border-darkband-line text-xs font-mono text-darkband-muted leading-relaxed">
              Zakres wyceny: specyfikacja poszczególnych elementów ustalana indywidualnie przed startem prac na podstawie wstępnej analizy.
            </div>
          </div>
        </div>

        {/* CTA pod blokami */}
        <div className="mt-10 sm:mt-12 pt-8 border-t border-darkband-line flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
          <div className="text-sm text-darkband-muted">
            Chcesz poznać wycenę i najbliższy dostępny termin realizacji dla Twojej firmy?
          </div>
          <Link href="/kontakt" className="w-full sm:w-auto shrink-0">
            <InteractiveHoverButton className="w-full sm:w-auto">
              Zapytaj o termin i wycenę
            </InteractiveHoverButton>
          </Link>
        </div>
      </Container>
    </Section>
  );
}
