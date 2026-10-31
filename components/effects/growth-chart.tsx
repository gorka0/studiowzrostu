"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "motion/react";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

// Znormalizowane punkty danych monotonicznej krzywej wzrostu
const NORMALIZED_POINTS = [
  { x: 0.0, y: 0.08 },
  { x: 0.14, y: 0.10 },
  { x: 0.26, y: 0.12 },
  { x: 0.38, y: 0.18 },
  { x: 0.52, y: 0.30 },
  { x: 0.65, y: 0.44 },
  { x: 0.78, y: 0.62 },
  { x: 0.90, y: 0.78 },
  { x: 1.0, y: 0.92 },
];

export const MILESTONES = [
  {
    step: "01",
    shortLabel: "Szybka strona",
    title: "Szybka, nowoczesna strona",
    desc: "Błyskawiczne ładowanie i bezbłędne działanie na telefonach budują zaufanie odwiedzających od pierwszej sekundy.",
    xPct: 0.14,
    yPct: 0.10,
  },
  {
    step: "02",
    shortLabel: "Widoczność",
    title: "Widoczność w Google",
    desc: "Czysty kod i zoptymalizowana struktura semantyczna ułatwiają robotom wyszukiwarki indeksowanie oferty.",
    xPct: 0.38,
    yPct: 0.18,
  },
  {
    step: "03",
    shortLabel: "Więcej zapytań",
    title: "Więcej zapytań",
    desc: "Przejrzysta hierarchia treści prowadzi klientów prosto do formularza wyceny lub telefonu.",
    xPct: 0.65,
    yPct: 0.44,
  },
  {
    step: "04",
    shortLabel: "Nowi klienci",
    title: "Więcej klientów",
    desc: "Systematyczny napływ zapytań od klientów szukających Twojej specjalizacji wspiera stabilny wzrost.",
    xPct: 0.90,
    yPct: 0.78,
  },
];

const VIEWBOX = { width: 800, height: 440 };
const BOUNDS = {
  xMin: 70,
  xMax: 740,
  yBaseline: 380,
  yTop: 50,
};

// Generowanie współrzędnych SVG
function scalePoint(p: { x: number; y: number }) {
  return {
    x: BOUNDS.xMin + p.x * (BOUNDS.xMax - BOUNDS.xMin),
    y: BOUNDS.yBaseline - p.y * (BOUNDS.yBaseline - BOUNDS.yTop),
  };
}

const SCALED_POINTS = NORMALIZED_POINTS.map(scalePoint);

// Ścieżka monotonicznej krzywej wzrostu
const CURVE_PATH_D = SCALED_POINTS.reduce((acc, p, i, arr) => {
  if (i === 0) return `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  const prev = arr[i - 1];
  const cx1 = prev.x + (p.x - prev.x) * 0.5;
  const cy1 = prev.y;
  const cx2 = prev.x + (p.x - prev.x) * 0.5;
  const cy2 = p.y;
  return `${acc} C ${cx1.toFixed(1)} ${cy1.toFixed(1)}, ${cx2.toFixed(1)} ${cy2.toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
}, "");

const AREA_PATH_D = `${CURVE_PATH_D} L ${BOUNDS.xMax} ${BOUNDS.yBaseline} L ${BOUNDS.xMin} ${BOUNDS.yBaseline} Z`;

const REFERENCE_PATH_D = `M ${BOUNDS.xMin} ${BOUNDS.yBaseline - 20} L ${BOUNDS.xMax} ${BOUNDS.yBaseline - 45}`;

export function GrowthChart() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState<number>(3);

  // Bez JS lub z reduced-motion krzywa jest natychmiast w 100% widoczna
  const animateProgress = isInView && !shouldReduceMotion;

  return (
    <section
      ref={containerRef}
      aria-label="Wykres ilustrujący wzrost biznesu dzięki nowoczesnej stronie"
      className="relative w-full py-14 sm:py-20 lg:py-24 border-b border-line bg-surface/35 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Nagłówek sekcji wyrównany do lewej */}
        <SectionHeader
          title="Architektura serwisu a tempo rozwoju firmy"
          description="Od czystego fundamentu technologicznego i szybkiego ładowania na smartfonach do stałego pozyskiwania wartościowych zapytań ofertowych."
          align="left"
        />

        {/* Układ asymetryczny: Lewo Wykres SVG (kol. 1–7), Prawo Lista etapów 01–04 (kol. 8–12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8">
          
          {/* LEWA KOLUMNA: Wykres SVG w karcie */}
          <div className="lg:col-span-7 rounded-2xl border border-line bg-card p-4 sm:p-6 lg:p-8 shadow-card flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-2 text-xs font-mono text-ink-muted select-none">
              <span className="font-semibold text-accent-text">Krzywa wzrostu konwersji</span>
              <span className="text-[11px] font-mono text-ink-muted">Ilustracja</span>
            </div>

            <div className="relative w-full aspect-[16/10] select-none">
              <svg
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                className="w-full h-full overflow-visible select-none"
                role="img"
                aria-label="Wykres etapów wzrostu biznesu"
              >
                <defs>
                  <linearGradient id="growth-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.06" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                  </linearGradient>

                  <linearGradient id="growth-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="1.0" />
                  </linearGradient>
                </defs>

                {/* Przerywane poziome linie siatki */}
                {[110, 190, 270].map((y, idx) => (
                  <line
                    key={idx}
                    x1={BOUNDS.xMin}
                    y1={y}
                    x2={BOUNDS.xMax}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.08"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}

                {/* Oś X */}
                <line
                  x1={BOUNDS.xMin}
                  y1={BOUNDS.yBaseline}
                  x2={BOUNDS.xMax}
                  y2={BOUNDS.yBaseline}
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />

                {/* Podpisy osi */}
                <text
                  x={BOUNDS.xMax}
                  y={BOUNDS.yBaseline + 22}
                  textAnchor="end"
                  className="text-[11px] font-mono font-medium fill-ink-muted select-none"
                >
                  Czas →
                </text>
                <text
                  x={BOUNDS.xMin - 12}
                  y={BOUNDS.yTop + 10}
                  transform={`rotate(-90 ${BOUNDS.xMin - 12} ${BOUNDS.yTop + 10})`}
                  textAnchor="end"
                  className="text-[11px] font-mono font-medium fill-ink-muted select-none hidden sm:inline"
                >
                  Rozwój biznesu ↑
                </text>

                {/* Linia odniesienia ("Strona bez optymalizacji") */}
                <path
                  d={REFERENCE_PATH_D}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.3"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={BOUNDS.xMax}
                  y={BOUNDS.yBaseline - 50}
                  textAnchor="end"
                  className="text-[10px] font-mono fill-ink-muted/80 select-none"
                >
                  Strona bez optymalizacji
                </text>

                {/* Wypełnienie pod krzywą */}
                <motion.path
                  d={AREA_PATH_D}
                  fill="url(#growth-area-gradient)"
                  initial={{ opacity: 0 }}
                  animate={animateProgress ? { opacity: 1 } : { opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />

                {/* Główna krzywa wzrostu (rysuje się raz po wejściu w widok) */}
                <motion.path
                  d={CURVE_PATH_D}
                  fill="none"
                  stroke="url(#growth-stroke-gradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={animateProgress ? { pathLength: 1 } : { pathLength: 1 }}
                  transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Kamienie milowe na krzywej */}
                {MILESTONES.map((m, idx) => {
                  const pt = scalePoint({ x: m.xPct, y: m.yPct });
                  const isSelected = activeStep === idx;

                  return (
                    <g
                      key={m.step}
                      role="button"
                      tabIndex={0}
                      onClick={() => setActiveStep(idx)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveStep(idx);
                        }
                      }}
                      className="cursor-pointer group focus-visible:outline-none"
                      aria-label={`${m.step}. ${m.title}`}
                    >
                      {/* Pionowa przerywana linia zrzutowana na oś */}
                      <line
                        x1={pt.x}
                        y1={pt.y}
                        x2={pt.x}
                        y2={BOUNDS.yBaseline}
                        stroke="currentColor"
                        strokeDasharray="2 2"
                        strokeWidth="1"
                        className={cn(
                          "transition-colors duration-200",
                          isSelected ? "text-accent/70" : "text-line/60 group-hover:text-line"
                        )}
                      />

                      {/* Punkt na krzywej (czyste SVG geometryczne bez CSS transform scale-110) */}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 6.5 : 4.5}
                        className={cn(
                          "transition-colors duration-200 stroke-2",
                          isSelected
                            ? "fill-accent stroke-surface shadow-xs"
                            : "fill-surface stroke-accent/80 group-hover:fill-accent"
                        )}
                      />

                      {/* Etykieta etapu nad punktem (widoczna na sm+) */}
                      <g transform={`translate(${pt.x}, ${pt.y - 24})`} className="hidden sm:inline">
                        <rect
                          x="-57"
                          y="-11"
                          width="114"
                          height="22"
                          rx="6"
                          className={cn(
                            "stroke-1 transition-colors duration-200",
                            isSelected
                              ? "fill-surface stroke-accent shadow-xs"
                              : "fill-surface/90 stroke-line group-hover:stroke-accent/50"
                          )}
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          className={cn(
                            "text-[9.5px] font-mono font-medium select-none transition-colors",
                            isSelected ? "fill-accent-text" : "fill-ink-muted group-hover:fill-ink"
                          )}
                        >
                          {m.step}. {m.shortLabel}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* Czubek krzywej z koralową kropką i pulsacją */}
                <g
                  transform={`translate(${SCALED_POINTS[SCALED_POINTS.length - 1].x}, ${SCALED_POINTS[SCALED_POINTS.length - 1].y})`}
                  className="pointer-events-none"
                >
                  <circle
                    r="10"
                    className="fill-coral/20"
                  />
                  <circle
                    r="5.5"
                    className="fill-coral stroke-surface stroke-2 shadow-sm"
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* PRAWA KOLUMNA: Interaktywna lista 4 etapów */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4 text-left">
            <div className="space-y-3">
              {MILESTONES.map((m, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={m.step}
                    role="button"
                    tabIndex={0}
                    onClick={() => setActiveStep(idx)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveStep(idx);
                      }
                    }}
                    className={cn(
                      "p-3.5 sm:p-4 rounded-xl border transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                      isActive
                        ? "bg-card border-accent/40 shadow-card translate-x-1"
                        : "bg-surface/30 border-transparent hover:bg-surface/70"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={cn(
                            "font-mono text-xs font-bold",
                            isActive ? "text-accent-text" : "text-ink-muted"
                          )}
                        >
                          {m.step}
                        </span>
                        <h3
                          className={cn(
                            "font-heading font-bold text-sm sm:text-base leading-tight",
                            isActive ? "text-ink" : "text-ink/80"
                          )}
                        >
                          {m.title}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-ink-muted uppercase">
                        Krok 0{idx + 1}
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs text-ink-muted leading-relaxed pl-6">
                      {m.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA pod listą */}
            <div className="pt-2">
              <Link href="/kontakt" className="block w-full sm:w-auto">
                <InteractiveHoverButton className="w-full sm:w-auto">
                  Zaplanujmy Twój wzrost
                </InteractiveHoverButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
