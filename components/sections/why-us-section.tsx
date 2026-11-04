"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Check, ChevronDown } from "lucide-react";
// Native IntersectionObserver for zero-dependency GPU timeline animation
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    day: "Dzień 1–2",
    title: "Brief i cele",
    desc: "Ustalamy cele biznesowe, profil klientów i zbieramy materiały wyjściowe.",
  },
  {
    day: "Dzień 3–4",
    title: "Układ i teksty",
    desc: "Planujemy logiczny układ podstron i porządkujemy treść oferty dla czytelności.",
  },
  {
    day: "Dzień 5–6",
    title: "Budowa i testy",
    desc: "Kodujemy stronę w Next.js, dopracowujemy responsywność i formularze.",
  },
  {
    day: "Dzień 7",
    title: "Odbiór i start",
    desc: "Weryfikujemy działanie serwisu, podpinamy domenę z certyfikatem SSL i uruchamiamy.",
  },
];

const OFFER_ROWS = [
  { item: "Projekt i makiety", status: "W cenie" },
  { item: "Wdrożenie kodu (Next.js)", status: "W cenie" },
  { item: "SEO podstawowe i schema", status: "W cenie" },
  { item: "Optymalizacja szybkości", status: "W cenie" },
];

export function WhyUsSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [isInView, setIsInView] = React.useState(false);
  const [isSpecOpen, setIsSpecOpen] = React.useState(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section
      ref={sectionRef}
      spacing="none"
      id="proces"
      className="relative border-b border-darkband-line bg-darkband-bg text-darkband-foreground overflow-clip py-8 sm:py-12 lg:py-16 text-[15px]"
    >
      {/* Subtelna kratka SVG w tle ciemnego pasa */}
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
        {/* Wstęp sekcji: 1 zdanie (≤ 20 słów) */}
        <div className="text-left max-w-2xl mb-6 sm:mb-8">
          <div className="text-[13px] font-semibold text-darkband-accent-text mb-1.5">
            Zasady i przebieg współpracy
          </div>
          <h2 className="font-heading font-bold text-[clamp(1.75rem,7vw,2.25rem)] text-darkband-foreground tracking-tight leading-tight">
            Dlaczego Studio Wzrostu
          </h2>
          <p className="mt-2 text-[15px] sm:text-[15px] text-darkband-muted leading-[1.55]">
            Dwie zasady, na których opieramy wdrożenia: precyzyjny czas realizacji i stała cena ustalona z góry.
          </p>
        </div>

        {/* Dwa fakty = duże hasło + 1 zdanie */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* FAKT 1: Czas realizacji 1 tydzień (7 segmentów Dzień 1–7 wypełniają się kolejno) */}
          <div className="lg:col-span-6 p-5 sm:p-7 rounded-2xl border border-darkband-line bg-darkband-bg/90 space-y-4 text-left">
            <div className="text-[13px] text-darkband-accent-text font-semibold uppercase tracking-wider">
              Termin wdrożenia
            </div>

            <div className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-darkband-accent-text tracking-tight leading-none">
              1 tydzień
            </div>

            <p className="text-[15px] text-darkband-muted leading-[1.5]">
              Dokładnie 7 dni – tyle standardowo zajmuje nam przygotowanie gotowej strony od akceptacji założeń i otrzymania materiałów.
            </p>

            {/* B3: 7 segmentów D1–D7 wypełniają się kolejno po wejściu w widok */}
            <div className="pt-2 space-y-1.5">
              <div className="grid grid-cols-7 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <div key={d} className="space-y-1">
                    <div className="h-1.5 bg-darkband-line rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full bg-darkband-accent origin-left transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform",
                          isInView ? "scale-x-100" : "scale-x-0"
                        )}
                        style={{ transitionDelay: `${(d - 1) * 80}ms` }}
                      />
                    </div>
                    <span className="text-[11px] sm:text-[12px] font-sans font-medium text-darkband-muted block text-center">
                      D{d}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAKT 2: Cena z góry */}
          <div className="lg:col-span-6 p-5 sm:p-7 rounded-2xl border border-darkband-line bg-darkband-bg/90 space-y-4 text-left">
            <div className="text-[13px] text-darkband-accent-text font-semibold uppercase tracking-wider">
              Zasady rozliczeń
            </div>

            <div className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl text-darkband-foreground tracking-tight leading-none">
              Cena z góry
            </div>

            <p className="text-[15px] text-darkband-muted leading-[1.5]">
              Dokładny koszt wdrożenia znasz przed startem prac, bez ukrytych opłat i niespodziewanych dopłat.
            </p>

            {/* Karta 'Specyfikacja zlecenia' akordeon z animacją grid-template-rows */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsSpecOpen(!isSpecOpen)}
                className="inline-flex items-center gap-2 text-[15px] font-semibold text-darkband-accent-text hover:underline min-h-[44px] py-1 cursor-pointer active:scale-[0.98]"
                aria-expanded={isSpecOpen}
              >
                <span>Co obejmuje wycena</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isSpecOpen && "rotate-180")} />
              </button>

              <div
                className={cn(
                  "accordion-grid",
                  isSpecOpen && "open"
                )}
              >
                <div className="accordion-inner">
                  <div className="mt-2.5 pt-2 border-t border-darkband-line/60 space-y-2 text-[15px]">
                    {OFFER_ROWS.map((row, idx) => (
                      <div
                        key={row.item}
                        className={cn(
                          "flex items-center justify-between py-1.5 border-b border-darkband-line/40 transition-all duration-200",
                          isSpecOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1.5"
                        )}
                        style={{ transitionDelay: isSpecOpen ? `${idx * 60}ms` : "0ms" }}
                      >
                        <span className="text-darkband-muted flex items-center gap-2">
                          <Check className="h-4 w-4 text-darkband-accent shrink-0" />
                          <span>{row.item}</span>
                        </span>
                        <span className="text-darkband-foreground font-semibold text-[13px]">
                          {row.status}
                        </span>
                      </div>
                    ))}

                    {/* Na końcu podświetla się 'Suma: ustalona z góry' */}
                    <div
                      className={cn(
                        "mt-2 pt-2 flex items-center justify-between border-t border-darkband-accent/50 px-1 py-1.5 transition-all duration-300",
                        isSpecOpen ? "opacity-100 scale-100" : "opacity-0 scale-98"
                      )}
                      style={{ transitionDelay: isSpecOpen ? "280ms" : "0ms" }}
                    >
                      <span className="text-[15px] text-darkband-foreground font-semibold">
                        Suma inwestycji:
                      </span>
                      <span className="text-[15px] font-bold text-darkband-accent-text">
                        Ustalona z góry
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* JEDNA stopka warunków pod sekcją czasu i ceny (jedno zdanie) */}
        <div className="mt-5 text-[13px] text-darkband-muted/80 text-left">
          Warunki: dotyczy standardowej strony lub landing page po dostarczeniu materiałów; zakres potwierdzamy w specyfikacji.
        </div>

        {/* OŚ PROCESU: 4 etapy, tytuł + zdanie ≤ 12 słów, jeden znacznik Dzień N */}
        <div className="mt-8 pt-6 border-t border-darkband-line/80 text-left">
          <div className="mb-6">
            <span className="text-[13px] font-semibold text-darkband-accent-text block mb-1">
              Etapy realizacji
            </span>
            <h3 className="font-heading font-bold text-[20px] sm:text-[20px] text-darkband-foreground">
              Przebieg wdrożenia dzień po dniu
            </h3>
          </div>

          {/* Desktop (≥1024px): Pozioma oś czasu */}
          <div className="hidden lg:block relative my-6">
            <div className="absolute top-[40px] left-[5%] right-[5%] h-[2px] bg-darkband-line z-0">
              <div
                className={cn(
                  "h-full bg-darkband-accent origin-left transition-transform duration-1000 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform",
                  isInView ? "scale-x-100" : "scale-x-0"
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-6 relative z-10">
              {PROCESS_STEPS.map((step, idx) => (
                <div key={step.day} className="flex flex-col space-y-3">
                  <div className="h-6 flex items-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[13px] font-bold bg-darkband-accent/20 text-darkband-accent-text border border-darkband-accent/30">
                      {step.day}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full border-2 border-darkband-accent bg-darkband-bg flex items-center justify-center shrink-0 shadow-sm transition-all duration-300",
                        isInView ? "scale-100 opacity-100" : "scale-75 opacity-60"
                      )}
                      style={{ transitionDelay: `${idx * 200}ms` }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-darkband-accent" />
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <h4 className="font-heading font-bold text-[15px] text-darkband-foreground">
                      {step.title}
                    </h4>
                    <p className="text-[15px] text-darkband-muted leading-[1.5]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile (<1024px): Pionowa oś czasu */}
          <div className="lg:hidden relative space-y-4 my-3 text-left pl-7">
            {/* Pionowa linia wypełniająca się przy przewijaniu */}
            <div className="absolute left-[8px] top-2 bottom-4 w-[2px] bg-darkband-line/80 z-0">
              <div
                className={cn(
                  "w-full bg-darkband-accent origin-top transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-transform",
                  isInView ? "scale-y-100" : "scale-y-0"
                )}
              />
            </div>

            {PROCESS_STEPS.map((step, idx) => (
              <div key={step.day} className="relative space-y-1">
                {/* Węzeł zapalający się przy scrollowaniu */}
                <div
                  className={cn(
                    "absolute -left-[27px] top-1 w-4 h-4 rounded-full border-2 border-darkband-bg bg-darkband-accent z-10 shadow-sm transition-all duration-300",
                    isInView ? "scale-100 opacity-100" : "scale-70 opacity-50"
                  )}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                />
                
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[13px] font-bold bg-darkband-accent/20 text-darkband-accent-text border border-darkband-accent/30">
                  {step.day}
                </span>
                <h4 className="font-heading font-bold text-[15px] text-darkband-foreground pt-0.5">
                  {step.title}
                </h4>
                <p className="text-[15px] text-darkband-muted leading-[1.5]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
