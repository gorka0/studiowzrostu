import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";

export function WhyUsSection() {
  return (
    <Section spacing="default" id="dlaczego-my" className="border-b border-line">
      <Container>
        <SectionHeader
          title="Dlaczego Studio Wzrostu"
          description="Dwie zasady, na których opieramy każde wdrożenie: precyzyjny czas realizacji i pełna przejrzystość budżetu."
          align="left"
        />

        {/* Dwa asymetryczne bloki oparte wyłącznie na wyrazistej typografii szwajcarskiej */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
          {/* Blok 1: Czas realizacji 3–4 dni (szerokość 6/12 na desktopie) */}
          <SpotlightCard className="lg:col-span-6 p-8 sm:p-10 rounded-2xl border border-line bg-surface flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
                01 / Termin wdrożenia
              </div>

              <div className="font-heading font-extrabold text-5xl sm:text-6xl md:text-7xl text-accent-text tracking-tight leading-none">
                3–4 dni
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                Tyle zwykle zajmuje nam przygotowanie strony
              </h3>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Pracujemy w krótkich, dobrze zaplanowanych etapach. Od momentu ustalenia zakresu skupiamy się wyłącznie na Twoim projekcie, bez ciągnących się tygodniami przestojów.
              </p>
            </div>

            {/* Adnotacja z warunkami */}
            <div className="pt-4 border-t border-line text-xs font-mono text-ink-muted leading-relaxed">
              Warunki: dotyczy standardowej strony firmowej lub landing page, liczone od akceptacji wyceny i dostarczenia kompletu materiałów.
            </div>
          </SpotlightCard>

          {/* Blok 2: Cena z góry (szerokość 6/12 na desktopie) */}
          <SpotlightCard className="lg:col-span-6 p-8 sm:p-10 rounded-2xl border border-line bg-surface flex flex-col justify-between">
            <div className="space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
                02 / Zasady rozliczeń
              </div>

              <div className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink tracking-tight leading-none pt-2 sm:pt-3">
                Cena z góry
              </div>

              <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink">
                Wycenę znasz, zanim cokolwiek zaczniemy
              </h3>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Przed startem prac definiujemy zakres techniczny serwisu. Wiesz dokładnie, co wchodzi w skład wdrożenia i za co płacisz.
              </p>
            </div>

            {/* Adnotacja o wycenie */}
            <div className="pt-4 border-t border-line text-xs font-mono text-ink-muted leading-relaxed">
              Zakres wyceny: specyfikacja poszczególnych elementów ustalana indywidualnie przed startem prac na podstawie wstępnej analizy.
            </div>
          </SpotlightCard>
        </div>

        {/* CTA pod blokami */}
        <div className="mt-12 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-ink-muted text-center sm:text-left">
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
