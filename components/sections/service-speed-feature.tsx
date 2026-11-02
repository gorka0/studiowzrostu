"use client";

import * as React from "react";
import { Zap, Check } from "lucide-react";
import { motion, useInView, useReducedMotion } from "motion/react";

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

const FRAMES_COUNT = [1, 2, 3, 4];

export function ServiceSpeedFeature() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={containerRef} className="mt-16 p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-8 text-left">
      <div className="space-y-2">
        <div className="font-sans text-xs font-semibold text-accent-text">
          Analiza wydajności renderowania
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink">
          Przebieg ładowania serwisu na ekranie smartfona
        </h2>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl">
          Porównanie czasu pojawienia się treści: czysty kod React/Next.js versus ociężały motyw z dziesiątkami skryptów.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Lewa: Taśma filmowa */}
        <div className="lg:col-span-7 rounded-xl border border-line bg-card p-4 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-line/70 pb-3 text-sm text-ink-muted">
            <span className="font-semibold text-ink flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Symulacja klatek renderowania
            </span>
            <span className="text-xs text-ink-muted">Ilustracja</span>
          </div>

          {/* Rząd 1: Szybka strona */}
          <div className="space-y-2">
            <div className="text-sm font-bold font-sans text-accent-text">
              Szybka strona (Next.js)
            </div>
            <div className="grid grid-cols-4 gap-2">
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
          <div className="space-y-2 pt-3 border-t border-line/60">
            <div className="text-sm font-bold font-sans text-ink-muted">
              Wolna strona (szablon z wtyczkami)
            </div>
            <div className="grid grid-cols-4 gap-2">
              <motion.div
                className="aspect-[4/3] rounded-lg border border-line bg-surface/30 p-2 flex items-center justify-center select-none"
                initial={{ opacity: 0, y: 6 }}
                animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
              >
                <div className="h-2 w-12 bg-line/40 rounded" />
              </motion.div>

              <motion.div
                className="aspect-[4/3] rounded-lg border border-line bg-surface/30 p-2 flex flex-col items-center justify-center gap-1.5 select-none"
                initial={{ opacity: 0, y: 6 }}
                animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.25 }}
              >
                <div className="w-3.5 h-3.5 rounded-full border-2 border-t-coral border-line animate-spin" />
              </motion.div>

              <motion.div
                className="aspect-[4/3] rounded-lg border border-line bg-surface/40 p-2 flex flex-col justify-between select-none"
                initial={{ opacity: 0, y: 6 }}
                animate={isInView && !shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 }}
              >
                <div className="h-1.5 w-6 bg-line rounded" />
                <div className="h-2 w-1/2 bg-line rounded" />
                <div className="h-1 w-8 bg-line rounded" />
              </motion.div>

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

        {/* Prawa: 3 punkty */}
        <div className="lg:col-span-5 space-y-3.5">
          {SPEED_POINTS.map((item) => (
            <div key={item.title} className="p-3.5 rounded-xl border border-line bg-surface-subtle flex items-start gap-3">
              <div className="w-6 h-6 rounded-md bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="h-3.5 w-3.5 text-accent" />
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
          ))}
        </div>
      </div>
    </div>
  );
}
