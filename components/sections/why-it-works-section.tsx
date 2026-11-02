"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Zap, Search, Check } from "lucide-react";

const SPEED_POINTS = [
  {
    title: "Błyskawiczny start",
    desc: "Treść oferty pojawia się od razu, co ogranicza ryzyko opuszczenia witryny przez użytkownika na wolniejszym łączu komórkowym.",
  },
  {
    title: "Płynna responsywność",
    desc: "Interfejs reaguje bez opóźnień, a formularze i przyciski działają precyzyjnie na każdym ekranie smartfona.",
  },
  {
    title: "Stabilny układ wizualny",
    desc: "Brak gwałtownych przesunięć treści podczas wczytywania – odwiedzający bez problemu trafia w numer telefonu lub formularz.",
  },
];

const SEO_POINTS = [
  {
    title: "Czytelna struktura dla wyszukiwarki",
    desc: "Logiczny podział nagłówków i semantyka HTML ułatwiają robotom indeksującym dokładne zrozumienie profilu Twoich usług.",
  },
  {
    title: "Szybkość premiowana w wynikach",
    desc: "Algorytmy wyszukiwarek promują sprawnie działające serwisy, uwzględniając czas renderowania na urządzeniach mobilnych.",
  },
  {
    title: "Bezpieczna architektura adresów",
    desc: "Dbamy o logiczną strukturę URL i precyzyjne przekierowania, co pozwala chronić wypracowane pozycje w wynikach wyszukiwania.",
  },
];

const FRAMES_COUNT = [1, 2, 3, 4];

export function WhyItWorksSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  const [hasAnimatedFlip, setHasAnimatedFlip] = React.useState(false);

  React.useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      const timer = setTimeout(() => {
        setHasAnimatedFlip(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isInView, shouldReduceMotion]);

  const isFlipActive = shouldReduceMotion || hasAnimatedFlip;

  return (
    <Section ref={sectionRef} spacing="default" id="dlaczego-to-dziala" className="border-b border-line bg-surface/35">
      <Container>
        <SectionHeader
          title="Dlaczego to działa: szybkość i techniczne SEO"
          description="Połączenie czystego kodu z przemyślaną architekturą informacji. Strona ładuje się bez opóźnień i jest czytelna zarówno dla klientów, jak i wyszukiwarki."
          align="left"
        />

        <div className="space-y-16 lg:space-y-24 mt-10">
          
          {/* BLOK 1: SZYBKOŚĆ (Lewo: Taśma filmowa 4 klatki, Prawo: 3 punkty) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Lewa kolumna: Taśma filmowa */}
            <div className="lg:col-span-7 rounded-2xl border border-line bg-card p-5 sm:p-7 shadow-card text-left space-y-6">
              <div className="flex items-center justify-between border-b border-line/70 pb-3 text-sm text-ink-muted">
                <span className="font-semibold text-ink flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  Przebieg ładowania na ekranie telefonu
                </span>
                <span className="text-xs text-ink-muted">Ilustracja</span>
              </div>

              {/* Rząd 1: Szybka strona */}
              <div className="space-y-2.5">
                <div className="text-sm font-bold font-sans text-accent-text flex items-center gap-2">
                  <span>Szybka</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {FRAMES_COUNT.map((frame, idx) => (
                    <motion.div
                      key={`fast-${frame}`}
                      className="aspect-[4/3] rounded-lg border-2 border-accent/40 bg-surface p-2 flex flex-col justify-between shadow-xs select-none"
                      initial={{ opacity: 0, y: 6 }}
                      animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: idx * 0.08 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="h-1.5 w-6 bg-accent rounded" />
                        <div className="h-1.5 w-8 bg-line rounded" />
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 w-4/5 bg-ink/80 rounded" />
                        <div className="h-1.5 w-full bg-line rounded" />
                        <div className="h-2 w-10 bg-accent rounded" />
                      </div>
                      <div className="h-1 w-full bg-accent/20 rounded-full" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Rząd 2: Wolna strona */}
              <div className="space-y-2.5 pt-3 border-t border-line/60">
                <div className="text-sm font-bold font-sans text-ink-muted flex items-center gap-2">
                  <span>Wolna</span>
                </div>

                <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                  {/* Klatka 1: pusty ekran */}
                  <motion.div
                    className="aspect-[4/3] rounded-lg border border-line bg-surface/30 p-2 flex items-center justify-center select-none"
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.15 }}
                  >
                    <div className="h-2 w-12 bg-line/40 rounded" />
                  </motion.div>

                  {/* Klatka 2: spinner */}
                  <motion.div
                    className="aspect-[4/3] rounded-lg border border-line bg-surface/30 p-2 flex flex-col items-center justify-center gap-1.5 select-none"
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.25 }}
                  >
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-t-coral border-line animate-spin" />
                  </motion.div>

                  {/* Klatka 3: przesunięcie układu CLS */}
                  <motion.div
                    className="aspect-[4/3] rounded-lg border border-line bg-surface/30 p-2 flex flex-col justify-between select-none"
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.35 }}
                  >
                    <div className="h-1.5 w-6 bg-line rounded" />
                    <div className="h-3 w-full border border-dashed border-coral/60 rounded" />
                    <div className="h-1 w-8 bg-line rounded" />
                  </motion.div>

                  {/* Klatka 4: spóźnione pojawienie się treści */}
                  <motion.div
                    className="aspect-[4/3] rounded-lg border border-line bg-surface/50 p-2 flex flex-col justify-between select-none"
                    initial={{ opacity: 0, y: 6 }}
                    animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.45 }}
                  >
                    <div className="h-1.5 w-8 bg-line rounded" />
                    <div className="space-y-1">
                      <div className="h-2 w-3/4 bg-ink/40 rounded" />
                      <div className="h-1.5 w-full bg-line rounded" />
                    </div>
                    <div className="h-1 w-full bg-line rounded" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Prawa kolumna: 3 zachowawcze punkty */}
            <div className="lg:col-span-5 space-y-5 text-left">
              {SPEED_POINTS.map((item) => (
                <div key={item.title} className="p-4 rounded-xl border border-line bg-card/60 flex items-start gap-3.5 shadow-xs">
                  <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-bold text-base text-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BLOK 2: SEO TECHNICZNE (Lewo: 3 punkty, Prawo: Makieta SERP FLIP) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-8 border-t border-line/60">
            
            {/* Lewa kolumna: 3 punkty SEO w zwartej liście */}
            <div className="lg:col-span-5 text-left order-2 lg:order-1">
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-ink mb-4">
                Techniczne SEO
              </h3>
              <div className="divide-y divide-line/60 border-t border-b border-line/60">
                {SEO_POINTS.map((item) => (
                  <div key={item.title} className="py-3.5 space-y-1">
                    <h4 className="font-heading font-semibold text-base text-ink">
                      {item.title}
                    </h4>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Prawa kolumna: Makieta wyników wyszukiwania */}
            <div className="lg:col-span-7 order-1 lg:order-2 w-full">
              <div className="rounded-2xl border border-line bg-card overflow-hidden shadow-card text-left">
                
                {/* Belka nagłówka makiety */}
                <div className="p-4 border-b border-line bg-surface flex items-center justify-between text-sm text-ink-muted">
                  <div className="flex items-center gap-2 font-semibold text-ink">
                    <Search className="h-4 w-4 text-accent" />
                    <span>Wyniki wyszukiwania</span>
                  </div>
                  <span className="text-xs text-ink-muted">Ilustracja</span>
                </div>

                {/* Lista wyników z animacją FLIP */}
                <div className="p-4 sm:p-6 bg-background space-y-4 relative min-h-[340px]">
                  
                  {/* Wynik wyróżniony: Twoja Firma */}
                  <motion.div
                    className="rounded-xl border border-accent/40 bg-accent/[0.04] p-4 sm:p-5 space-y-2.5 relative z-20 shadow-xs"
                    initial={false}
                    animate={{
                      y: isFlipActive ? 0 : 150,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 15,
                    }}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-ink">Twoja Firma</span>
                        <span className="text-[13px] font-sans text-accent-text truncate">
                          twojadomena.example › uslugi
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base sm:text-lg font-heading font-bold text-ink leading-snug">
                      Twoja Firma · Nowoczesne strony internetowe dla firm
                    </h4>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      Dedykowany serwis internetowy z czytelną strukturą oferty i szybkim czasem ładowania na smartfonach.
                    </p>

                    <div className="pt-2 border-t border-accent/20 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-surface border border-line/60">
                        <div className="font-semibold text-accent-text">
                          Cennik i zakres prac
                        </div>
                        <div className="text-[13px] text-ink-muted mt-0.5">
                          Ustalona wycena przed startem
                        </div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-surface border border-line/60">
                        <div className="font-semibold text-accent-text">
                          Bezpłatna wycena
                        </div>
                        <div className="text-[13px] text-ink-muted mt-0.5">
                          Odpowiedź na zapytanie ofertowe
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Zaślepka wyniku 2 */}
                  <motion.div
                    className="space-y-1.5 p-3 rounded-lg border border-line/60 bg-surface/30 opacity-70"
                    animate={{ y: isFlipActive ? 0 : -80 }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-line/60 shrink-0" />
                      <div className="h-2.5 w-32 bg-line/70 rounded" />
                    </div>
                    <div className="h-3.5 w-3/4 bg-ink/20 rounded" />
                    <div className="space-y-1 pt-0.5">
                      <div className="h-2 w-full bg-line/50 rounded" />
                      <div className="h-2 w-4/5 bg-line/50 rounded" />
                    </div>
                  </motion.div>

                  {/* Zaślepka wyniku 3 */}
                  <motion.div
                    className="space-y-1.5 p-3 rounded-lg border border-line/60 bg-surface/30 opacity-50"
                    animate={{ y: isFlipActive ? 0 : -80 }}
                    transition={{ type: "spring", stiffness: 80, damping: 15 }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-line/60 shrink-0" />
                      <div className="h-2.5 w-40 bg-line/70 rounded" />
                    </div>
                    <div className="h-3.5 w-2/3 bg-ink/20 rounded" />
                    <div className="space-y-1 pt-0.5">
                      <div className="h-2 w-5/6 bg-line/50 rounded" />
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
