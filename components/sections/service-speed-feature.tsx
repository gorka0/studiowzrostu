"use client";

import * as React from "react";
import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { Zap, Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const SPEED_POINTS = [
  {
    title: "Błyskawiczny start",
    desc: "Treść oferty pojawia się od razu, co ogranicza ryzyko opuszczenia witryny przez użytkownika na wolniejszym łączu komórkowym.",
    highlightLabel: "Pierwsza klatka: 0,1 s",
  },
  {
    title: "Płynna responsywność",
    desc: "Interfejs reaguje bez opóźnień, a formularze i przyciski działają precyzyjnie na każdym ekranie smartfona.",
    highlightLabel: "Gotowe CTA: 0,6 s",
  },
  {
    title: "Stabilny układ wizualny",
    desc: "Brak gwałtownych przesunięć treści podczas wczytywania – odwiedzający bez problemu trafia w numer telefonu lub formularz.",
    highlightLabel: "Przesunięcie układu: 0",
  },
];

const FAST_STAGES = [
  { time: "0,1 s", label: "HTML + układ" },
  { time: "0,3 s", label: "Nagłówek i oferta" },
  { time: "0,6 s", label: "Pełna gotowość" },
];

const SLOW_STAGES = [
  { time: "1,2 s", label: "Skrypty motywu" },
  { time: "2,4 s", label: "Fonty i wtyczki" },
  { time: "3,6 s", label: "Stabilizacja strony" },
];

export function ServiceSpeedFeature() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const [selectedPoint, setSelectedPoint] = React.useState(0);
  const [runKey, setRunKey] = React.useState(0);
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    if (!isInView && runKey === 0) return;
    if (prefersReducedMotion) {
      setStage(3);
      return;
    }

    setStage(0);
    const t1 = window.setTimeout(() => setStage(1), 220);
    const t2 = window.setTimeout(() => setStage(2), 600);
    const t3 = window.setTimeout(() => setStage(3), 1350);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [isInView, runKey, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="mt-16 p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-8 text-left"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="eyebrow-line">Analiza wydajności renderowania</div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink pt-1">
            Przebieg ładowania serwisu na ekranie smartfona
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
            Porównanie czasu pojawienia się treści: czysty kod React/Next.js versus ociężały motyw z dziesiątkami skryptów.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRunKey((k) => k + 1)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-line bg-background text-xs font-semibold text-ink hover:border-accent/50 hover:text-accent-text transition-colors shrink-0 cursor-pointer active:scale-[0.98]"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Odtwórz symulację</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Lewa: Interaktywne porównanie postępu ładowania */}
        <div className="lg:col-span-7 rounded-xl border border-line bg-card p-5 sm:p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-line/70 pb-3 text-xs sm:text-sm text-ink-muted">
            <span className="font-semibold text-ink flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              <span>Kolejność pojawiania się treści</span>
            </span>
            <span className="tabular-nums font-medium text-accent-text">
              {SPEED_POINTS[selectedPoint]?.highlightLabel}
            </span>
          </div>

          {/* Tor 1: Next.js */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold font-sans text-accent-text">
                Szybka strona (Next.js)
              </span>
              <span className="text-xs font-semibold text-accent-text tabular-nums">
                {stage >= 1 ? "0,6 s do gotowości" : "Ładowanie..."}
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden">
              <motion.div
                key={`fast-bar-${runKey}`}
                initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0.08 }}
                animate={{ scaleX: stage >= 1 ? 1 : 0.15 }}
                transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                className="h-full w-full bg-accent origin-left"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {FAST_STAGES.map((item, idx) => {
                const done = stage >= 1;
                return (
                  <motion.div
                    key={item.time}
                    initial={prefersReducedMotion ? false : { opacity: 0.4, y: 4 }}
                    animate={{ opacity: done ? 1 : 0.45, y: done ? 0 : 4 }}
                    transition={{ duration: 0.25, delay: idx * 0.06 }}
                    className={cn(
                      "rounded-lg border p-2.5 transition-colors",
                      done
                        ? "border-accent/40 bg-accent/[0.04]"
                        : "border-line bg-surface/50"
                    )}
                  >
                    <div className="font-heading font-bold text-sm text-accent-text tabular-nums">
                      {item.time}
                    </div>
                    <div className="text-[11.5px] text-ink leading-snug mt-0.5">
                      {item.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tor 2: Szablon z wtyczkami */}
          <div className="space-y-2.5 pt-4 border-t border-line/60">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold font-sans text-ink-muted">
                Typowy szablon z wtyczkami
              </span>
              <span className="text-xs text-ink-muted tabular-nums">
                {stage >= 3 ? "3,6 s do stabilizacji" : "Oczekiwanie na skrypty..."}
              </span>
            </div>

            <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden">
              <motion.div
                key={`slow-bar-${runKey}`}
                initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0.05 }}
                animate={{
                  scaleX: stage === 0 ? 0.1 : stage === 1 ? 0.35 : stage === 2 ? 0.65 : 1,
                }}
                transition={{ duration: 0.65, ease: [0.2, 0.7, 0.2, 1] }}
                className="h-full w-full bg-ink-muted/45 origin-left"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              {SLOW_STAGES.map((item, idx) => {
                const activeStage = stage >= idx + 1;
                return (
                  <div
                    key={item.time}
                    className={cn(
                      "rounded-lg border p-2.5 transition-opacity duration-300",
                      activeStage
                        ? "border-line bg-surface/70 opacity-85"
                        : "border-line/60 bg-surface/30 opacity-45"
                    )}
                  >
                    <div className="font-heading font-semibold text-sm text-ink-muted tabular-nums">
                      {item.time}
                    </div>
                    <div className="text-[11.5px] text-ink-muted leading-snug mt-0.5">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Prawa: 3 interaktywne filary szybkości */}
        <LayoutGroup id="speed-points-group">
          <div className="lg:col-span-5 space-y-2.5">
            {SPEED_POINTS.map((item, idx) => {
              const isSelected = selectedPoint === idx;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setSelectedPoint(idx)}
                  onMouseEnter={() => setSelectedPoint(idx)}
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
                      layoutId="speed-point-active"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 360, damping: 32 }
                      }
                      className="absolute inset-0 rounded-xl border border-accent bg-card shadow-xs z-0 pointer-events-none"
                    />
                  )}
                  <div className="relative z-10 flex items-start gap-3">
                    <div
                      className={cn(
                        "w-6 h-6 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                        isSelected
                          ? "bg-accent-text text-white border-accent-text dark:bg-accent dark:text-accent-foreground dark:border-accent"
                          : "bg-accent/10 border-accent/20 text-accent-text"
                      )}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold text-sm sm:text-base text-ink">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
