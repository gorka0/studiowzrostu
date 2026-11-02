"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

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

export function ServiceSeoFeature() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
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
    <div ref={containerRef} className="mt-16 p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-8 text-left">
      <div className="space-y-2">
        <div className="font-sans text-xs font-semibold text-accent-text">
          Struktura widoczności organicznej
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
          Architektura semantyczna w wynikach wyszukiwania
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
          Poprawne wdrożenie danych strukturalnych i metadanych sprawia, że roboty wyszukiwarek precyzyjnie kategoryzują ofertę.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Lewa: 3 punkty */}
        <div className="lg:col-span-5 space-y-4">
          <div className="divide-y divide-line/60 border-t border-b border-line/60">
            {SEO_POINTS.map((item) => (
              <div key={item.title} className="py-3.5 space-y-1">
                <h3 className="font-heading font-semibold text-sm sm:text-base text-ink">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Prawa: Makieta SERP z FLIP */}
        <div className="lg:col-span-7 w-full">
          <div className="rounded-xl border border-line bg-card overflow-hidden shadow-xs text-left">
            <div className="p-3.5 border-b border-line bg-surface flex items-center justify-between text-sm text-ink-muted">
              <div className="flex items-center gap-2 font-semibold text-ink text-xs sm:text-sm">
                <Search className="h-4 w-4 text-accent" />
                <span>Wyniki wyszukiwania</span>
              </div>
              <span className="text-xs text-ink-muted">Ilustracja</span>
            </div>

            <div className="p-4 sm:p-5 bg-background space-y-3.5 relative min-h-[300px]">
              <motion.div
                className="rounded-xl border border-accent/40 bg-accent/[0.04] p-3.5 sm:p-4 space-y-2 relative z-20 shadow-xs"
                initial={false}
                animate={{ y: isFlipActive ? 0 : 130 }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-bold text-ink">Twoja Firma</span>
                    <span className="text-[13px] font-sans text-accent-text truncate">
                      twojadomena.example › uslugi
                    </span>
                  </div>
                </div>

                <h4 className="text-sm sm:text-base font-heading font-bold text-ink leading-snug">
                  Twoja Firma · Nowoczesne strony internetowe dla firm
                </h4>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Dedykowany serwis internetowy z czytelną strukturą oferty i szybkim czasem ładowania na smartfonach.
                </p>
              </motion.div>

              <motion.div
                className="space-y-1.5 p-3 rounded-lg border border-line/60 bg-surface/30 opacity-70"
                animate={{ y: isFlipActive ? 0 : -70 }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-line/60 shrink-0" />
                  <div className="h-2 w-28 bg-line/70 rounded" />
                </div>
                <div className="h-3 w-3/4 bg-ink/20 rounded" />
                <div className="space-y-1 pt-0.5">
                  <div className="h-2 w-full bg-line/50 rounded" />
                  <div className="h-2 w-4/5 bg-line/50 rounded" />
                </div>
              </motion.div>

              <motion.div
                className="space-y-1.5 p-3 rounded-lg border border-line/60 bg-surface/30 opacity-70"
                animate={{ y: isFlipActive ? 0 : -70 }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-line/60 shrink-0" />
                  <div className="h-2 w-24 bg-line/70 rounded" />
                </div>
                <div className="h-3 w-2/3 bg-ink/20 rounded" />
                <div className="h-2 w-3/4 bg-line/50 rounded" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
