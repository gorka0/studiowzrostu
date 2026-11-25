"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SEO_POINTS = [
  {
    id: "structure",
    title: "Czytelna struktura dla wyszukiwarki",
    desc: "Logiczny podział nagłówków i semantyka HTML ułatwiają robotom indeksującym dokładne zrozumienie profilu Twoich usług.",
  },
  {
    id: "speed",
    title: "Szybkość premiowana w wynikach",
    desc: "Algorytmy wyszukiwarek promują sprawnie działające serwisy, uwzględniając czas renderowania na urządzeniach mobilnych.",
  },
  {
    id: "urls",
    title: "Bezpieczna architektura adresów",
    desc: "Dbamy o logiczną strukturę URL i precyzyjne przekierowania, co pozwala chronić wypracowane pozycje w wynikach wyszukiwania.",
  },
];

export function ServiceSeoFeature() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  const [isOptimized, setIsOptimized] = React.useState(false);
  const [userSwitched, setUserSwitched] = React.useState(false);
  const [focusedPoint, setFocusedPoint] = React.useState(0);

  React.useEffect(() => {
    if (!isInView || userSwitched) return;
    if (prefersReducedMotion) {
      setIsOptimized(true);
      return;
    }
    const timer = window.setTimeout(() => setIsOptimized(true), 450);
    return () => window.clearTimeout(timer);
  }, [isInView, userSwitched, prefersReducedMotion]);

  const activeMode = prefersReducedMotion ? true : isOptimized;
  const focusedId = SEO_POINTS[focusedPoint]?.id ?? "structure";

  return (
    <div
      ref={containerRef}
      className="mt-16 p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-8 text-left"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="eyebrow-line">Struktura widoczności organicznej</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink pt-1">
            Architektura semantyczna w wynikach wyszukiwania
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
            Poprawne wdrożenie danych strukturalnych i metadanych sprawia, że roboty wyszukiwarek precyzyjnie kategoryzują ofertę.
          </p>
        </div>

        <LayoutGroup id="seo-mode-switch">
          <div
            role="tablist"
            aria-label="Tryb prezentacji wyniku wyszukiwania"
            className="inline-flex items-center p-1 rounded-xl border border-line bg-background shrink-0 self-start"
          >
            {[
              { optimized: false, label: "Przed zmianami" },
              { optimized: true, label: "Po optymalizacji" },
            ].map((tab) => {
              const selected = activeMode === tab.optimized;
              return (
                <button
                  key={tab.label}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setUserSwitched(true);
                    setIsOptimized(tab.optimized);
                  }}
                  className={cn(
                    "relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer",
                    selected ? "text-ink" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="seo-mode-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-0 rounded-lg bg-secondary border border-line z-0"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Lewa: interaktywna lista filarów SEO */}
        <LayoutGroup id="seo-points-list">
          <div className="lg:col-span-5 space-y-2">
            {SEO_POINTS.map((item, idx) => {
              const isSelected = focusedPoint === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFocusedPoint(idx)}
                  onMouseEnter={() => setFocusedPoint(idx)}
                  className={cn(
                    "relative w-full text-left p-4 rounded-xl border transition-colors cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                    isSelected
                      ? "border-transparent"
                      : "border-line/70 bg-background/60 hover:bg-background"
                  )}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="seo-point-active"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 32 }
                      }
                      className="absolute inset-0 rounded-xl border border-accent bg-card shadow-xs z-0 pointer-events-none"
                    />
                  )}
                  <div className="relative z-10 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs font-bold text-accent-text tabular-nums">
                        0{idx + 1}
                      </span>
                      <h3 className="font-heading font-semibold text-sm sm:text-base text-ink">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Prawa: interaktywna makieta SERP reagująca na przełącznik oraz wybrany punkt */}
        <div className="lg:col-span-7 w-full">
          <div className="rounded-xl border border-line bg-card overflow-hidden shadow-xs text-left">
            <div className="p-3.5 border-b border-line bg-surface flex items-center justify-between text-sm text-ink-muted">
              <div className="flex items-center gap-2 font-semibold text-ink text-xs sm:text-sm">
                <Search className="h-4 w-4 text-accent" />
                <span>Wyniki wyszukiwania</span>
              </div>
              <span className="text-xs font-medium text-accent-text">
                {activeMode ? "Pozycja #1" : "Pozycja #3"}
              </span>
            </div>

            <div className="p-4 sm:p-5 bg-background space-y-3.5 relative min-h-[300px]">
              <motion.div
                className={cn(
                  "rounded-xl border p-3.5 sm:p-4 space-y-2 relative z-20 shadow-xs transition-colors",
                  activeMode
                    ? "border-accent/45 bg-accent/[0.04]"
                    : "border-line bg-surface"
                )}
                initial={false}
                animate={{ y: activeMode ? 0 : 148 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 120, damping: 18 }
                }
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-4 h-4 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <div className="flex flex-col leading-tight min-w-0">
                      <span className="text-xs font-bold text-ink">Twoja Firma</span>
                      <span
                        className={cn(
                          "text-[13px] font-sans truncate rounded px-1 -mx-1 transition-colors",
                          focusedId === "urls"
                            ? "bg-accent/15 text-accent-text font-semibold"
                            : "text-accent-text"
                        )}
                      >
                        twojadomena.example › uslugi
                      </span>
                    </div>
                  </div>

                  {focusedId === "speed" && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-accent/15 text-accent-text shrink-0">
                      Core Web Vitals OK
                    </span>
                  )}
                </div>

                <h4
                  className={cn(
                    "text-sm sm:text-base font-heading font-bold text-ink leading-snug rounded px-1 -mx-1 transition-colors",
                    focusedId === "structure" && "bg-accent/10 text-accent-text"
                  )}
                >
                  Twoja Firma · Nowoczesne strony internetowe dla firm
                </h4>

                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Dedykowany serwis internetowy z czytelną strukturą oferty i szybkim czasem ładowania na smartfonach.
                </p>
              </motion.div>

              <motion.div
                className="space-y-1.5 p-3 rounded-lg border border-line/60 bg-surface/30 opacity-70"
                animate={{ y: activeMode ? 0 : -118 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 120, damping: 18 }
                }
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
                className="space-y-1.5 p-3 rounded-lg border border-line/60 bg-surface/30 opacity-60"
                animate={{ y: activeMode ? 0 : -118 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 120, damping: 18 }
                }
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
