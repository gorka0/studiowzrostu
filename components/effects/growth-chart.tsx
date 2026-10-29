"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { RevealHeading } from "@/components/effects/reveal-heading";
import { cn } from "@/lib/utils";

// 1. Znormalizowane punkty danych (0-1) - jedno źródło prawdy dla krzywych
const NORMALIZED_POINTS = [
  { x: 0.0, y: 0.06 },
  { x: 0.12, y: 0.08 },
  { x: 0.22, y: 0.10 },
  { x: 0.30, y: 0.09 },
  { x: 0.40, y: 0.16 },
  { x: 0.52, y: 0.26 },
  { x: 0.62, y: 0.30 },
  { x: 0.72, y: 0.46 },
  { x: 0.84, y: 0.64 },
  { x: 1.0, y: 0.90 },
];

// Prawie płaska linia odniesienia ("Strona bez optymalizacji")
const REFERENCE_POINTS = [
  { x: 0.0, y: 0.05 },
  { x: 0.35, y: 0.065 },
  { x: 0.70, y: 0.085 },
  { x: 1.0, y: 0.11 },
];

// Kamienie milowe z progami aktywacji
export const MILESTONES = [
  {
    step: "01",
    title: "Szybka, nowoczesna strona",
    desc: "Błyskawiczne ładowanie i bezbłędne działanie na telefonach budują silne zaufanie.",
    threshold: 0.18,
    labelDx: 10,
    labelDy: -55,
    textAnchor: "start" as const,
  },
  {
    step: "02",
    title: "Widoczność w Google",
    desc: "Czysty kod i zoptymalizowane Core Web Vitals ułatwiają robotom indeksowanie i pozycjonowanie.",
    threshold: 0.44,
    labelDx: 0,
    labelDy: -75,
    textAnchor: "middle" as const,
  },
  {
    step: "03",
    title: "Więcej zapytań",
    desc: "Przejrzysta architektura informacji prowadzi odwiedzających wprost do wysłania formularza.",
    threshold: 0.70,
    labelDx: -20,
    labelDy: -80,
    textAnchor: "middle" as const,
  },
  {
    step: "04",
    title: "Więcej klientów",
    desc: "Systematyczny napływ wartościowych kontaktów biznesowych wspiera stabilny rozwój firmy.",
    threshold: 0.92,
    labelDx: -90,
    labelDy: -40,
    textAnchor: "end" as const,
  },
];

// Geometria i układ współrzędnych viewBox 800x450
const VIEWBOX = { width: 800, height: 450 };
const BOUNDS = {
  xMin: 70,
  xMax: 740,
  yBaseline: 390,
  yTop: 45,
};

// Generator monotonicznej krzywej sześciennej (Fritsch-Carlson)
export function createMonotonePath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 2) return "";
  if (n === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

  const dx: number[] = [];
  const dy: number[] = [];
  const slope: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    const deltax = points[i + 1].x - points[i].x;
    const deltay = points[i + 1].y - points[i].y;
    dx.push(deltax);
    dy.push(deltay);
    slope.push(deltax === 0 ? 0 : deltay / deltax);
  }

  const d: number[] = [slope[0]];
  for (let i = 0; i < n - 2; i++) {
    if (slope[i] * slope[i + 1] <= 0) {
      d.push(0);
    } else {
      const common = dx[i] + dx[i + 1];
      d.push((3 * common) / ((common + dx[i + 1]) / slope[i] + (common + dx[i]) / slope[i + 1]));
    }
  }
  d.push(slope[n - 2]);

  let path = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < n - 1; i++) {
    const c1x = points[i].x + dx[i] / 3;
    const c1y = points[i].y + (d[i] * dx[i]) / 3;
    const c2x = points[i + 1].x - dx[i] / 3;
    const c2y = points[i + 1].y - (d[i + 1] * dx[i]) / 3;
    path += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${points[i + 1].x.toFixed(2)} ${points[i + 1].y.toFixed(2)}`;
  }
  return path;
}

// Przeliczenie punktów znormalizowanych do wymiarów układu
function scalePoints(
  pts: { x: number; y: number }[],
  bounds: typeof BOUNDS
): { x: number; y: number }[] {
  return pts.map((p) => ({
    x: bounds.xMin + p.x * (bounds.xMax - bounds.xMin),
    y: bounds.yBaseline - p.y * (bounds.yBaseline - bounds.yTop),
  }));
}

// Wygenerowane ścieżki SVG dla całego komponentu
export const SCALED_CURVE_POINTS = scalePoints(NORMALIZED_POINTS, BOUNDS);
export const SCALED_REFERENCE_POINTS = scalePoints(REFERENCE_POINTS, BOUNDS);

export const CURVE_PATH_D = createMonotonePath(SCALED_CURVE_POINTS);
export const REFERENCE_PATH_D = createMonotonePath(SCALED_REFERENCE_POINTS);

// Ścieżka wypełnienia z domknięciem do osi X
export const AREA_PATH_D = `${CURVE_PATH_D} L ${BOUNDS.xMax} ${BOUNDS.yBaseline} L ${BOUNDS.xMin} ${BOUNDS.yBaseline} Z`;

// Poziome linie pomocnicze siatki
const GRID_Y_LINES = [
  BOUNDS.yBaseline - (BOUNDS.yBaseline - BOUNDS.yTop) * 0.25,
  BOUNDS.yBaseline - (BOUNDS.yBaseline - BOUNDS.yTop) * 0.5,
  BOUNDS.yBaseline - (BOUNDS.yBaseline - BOUNDS.yTop) * 0.75,
  BOUNDS.yBaseline - (BOUNDS.yBaseline - BOUNDS.yTop) * 1.0,
];

export function GrowthChart() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mainPathRef = React.useRef<SVGPathElement>(null);
  const tipGroupRef = React.useRef<SVGGElement>(null);
  const guideLineRef = React.useRef<SVGLineElement>(null);
  const maskGradRef = React.useRef<SVGLinearGradientElement>(null);
  const verticalProgressRef = React.useRef<HTMLDivElement>(null);
  const stepItemsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
  const svgMilestonesRef = React.useRef<(SVGGElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);

  // Śledzenie postępu przewijania w obrębie kontenera sekcji
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Wygładzona dynamika sprężyny - natychmiastowa reakcja bez opóźnień
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.0005,
  });

  const scrollToMilestone = (threshold: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
    if (totalDistance <= 0) return;

    const targetY = scrollTop + Math.min(threshold + 0.02, 1) * totalDistance;
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const skipPastChart = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const endY = window.scrollY + rect.bottom;
    window.scrollTo({
      top: endY,
      behavior: "smooth",
    });
  };

  // Reakcja na zmianę postępu - bezpośrednie atrybuty DOM bez re-renderów React
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (shouldReduceMotion) return;

    const path = mainPathRef.current;
    if (!path) return;

    const totalLen = path.getTotalLength();
    if (!totalLen || isNaN(totalLen)) return;

    const clamped = Math.max(0, Math.min(1, latest));
    const targetLength = clamped * totalLen;

    // Matematycznie dokładny punkt na krzywej z getPointAtLength
    const pt = path.getPointAtLength(targetLength);

    // 1. Pozycja kropki na czubku krzywej (środek kropki dokładnie na końcu linii)
    if (tipGroupRef.current) {
      tipGroupRef.current.setAttribute("transform", `translate(${pt.x.toFixed(2)}, ${pt.y.toFixed(2)})`);
      tipGroupRef.current.style.opacity = clamped > 0.01 ? "1" : "0";
    }

    // 2. Pionowa przerywana linia rzutująca do osi X
    if (guideLineRef.current) {
      guideLineRef.current.setAttribute("x1", pt.x.toFixed(2));
      guideLineRef.current.setAttribute("y1", pt.y.toFixed(2));
      guideLineRef.current.setAttribute("x2", pt.x.toFixed(2));
      guideLineRef.current.setAttribute("y2", String(BOUNDS.yBaseline));
      guideLineRef.current.style.opacity = clamped > 0.03 ? "0.6" : "0";
    }

    // 3. Dynamiczna maska wypełnienia z miękką prawą krawędzią (ok. 6% szerokości wykresu)
    if (maskGradRef.current) {
      const featherWidth = (BOUNDS.xMax - BOUNDS.xMin) * 0.06;
      const x1 = Math.max(BOUNDS.xMin - 20, pt.x - featherWidth);
      const x2 = pt.x + 2;
      maskGradRef.current.setAttribute("x1", x1.toFixed(2));
      maskGradRef.current.setAttribute("x2", x2.toFixed(2));
    }

    // 4. Pionowy pasek postępu w kolumnie kroków
    if (verticalProgressRef.current) {
      verticalProgressRef.current.style.height = `${(clamped * 100).toFixed(1)}%`;
    }

    // 5. Aktualizacja aktywnego kroku i markerów SVG
    let currentIdx = 0;
    MILESTONES.forEach((m, idx) => {
      const isReached = clamped >= m.threshold;
      if (isReached) currentIdx = idx;

      // Aktualizacja klas markerów SVG
      const markerEl = svgMilestonesRef.current[idx];
      if (markerEl) {
        if (isReached) {
          markerEl.setAttribute("data-state", "reached");
        } else {
          markerEl.setAttribute("data-state", "future");
        }
      }
    });

    setActiveStepIndex(currentIdx);
  });

  // Wersja statyczna dla preferencji ograniczonego ruchu (zero scroll-trap)
  if (shouldReduceMotion) {
    return (
      <section
        className="w-full py-16 md:py-24 bg-surface/30 border-b border-line"
        aria-label="Wykres ilustrujący wzrost biznesu dzięki nowoczesnej stronie"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-left max-w-2xl mb-10">
            <RevealHeading
              as="h2"
              text="Architektura serwisu a tempo rozwoju firmy"
              className="text-3xl sm:text-4xl font-bold font-heading text-ink"
            />
            <p className="mt-3 text-ink-muted text-sm sm:text-base">
              Od stabilnego fundamentu technologicznego do regularnego pozyskiwania klientów.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <svg
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                className="w-full h-auto overflow-visible select-none"
                role="img"
                aria-label="Statyczny wykres etapów wzrostu"
              >
                <StaticChartDefs />
                <GridAndAxes />
                <path d={REFERENCE_PATH_D} fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="4 4" />
                <text x={BOUNDS.xMax} y={BOUNDS.yBaseline - 25} textAnchor="end" className="text-[11px] font-mono fill-ink-muted">
                  Strona bez optymalizacji
                </text>
                <path d={AREA_PATH_D} fill="url(#static-area-grad)" />
                <path d={CURVE_PATH_D} fill="none" stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round" />
                <circle cx={BOUNDS.xMax} cy={SCALED_CURVE_POINTS[SCALED_CURVE_POINTS.length - 1].y} r="6" className="fill-coral" />
              </svg>
              <p className="mt-4 text-[11px] text-ink-muted text-center font-mono">
                Ilustracja, nie obietnica konkretnych wyników.
              </p>
            </div>

            <div className="lg:col-span-4 space-y-4">
              {MILESTONES.map((m) => (
                <div key={m.step} className="p-4 rounded-xl border border-line bg-surface space-y-1">
                  <div className="font-mono text-xs text-accent-text font-bold">{m.step}</div>
                  <div className="font-heading font-bold text-sm text-ink">{m.title}</div>
                  <div className="text-xs text-ink-muted">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[140vh] sm:h-[160vh] md:h-[180vh] bg-background border-b border-line"
      aria-label="Interaktywny wykres wzrostu"
    >
      {/* Treść dostępna dla czytników ekranu (A11y & SEO) */}
      <div className="sr-only">
        <p>Wykres ilustruje fazy wzrostu firmy dzięki wdrożeniu nowoczesnej strony internetowej:</p>
        <ol>
          {MILESTONES.map((m) => (
            <li key={m.step}>
              <strong>{m.step}. {m.title}</strong>: {m.desc}
            </li>
          ))}
        </ol>
      </div>

      {/* Sticky viewport container (100svh) */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-center overflow-clip px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-6xl flex flex-col h-full max-h-[900px] justify-between py-4 sm:py-6 md:py-10">
          
          {/* Nagłówek sekcji wyrównany do lewej z przyciskiem szybkiego pominięcia */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 max-w-6xl shrink-0 mb-4 sm:mb-8 lg:mb-10">
            <div className="text-left max-w-2xl">
              <RevealHeading
                as="h2"
                text="Architektura serwisu a tempo rozwoju firmy"
                className="text-xl sm:text-3xl lg:text-4xl font-bold font-heading tracking-tight text-ink"
              />
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                Przewiń stronę lub kliknij wybrany etap, aby zobaczyć tempo wzrostu.
              </p>
            </div>
            <button
              type="button"
              onClick={skipPastChart}
              className="self-start sm:self-auto text-xs font-mono text-ink hover:text-accent-text transition-colors inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-md px-2.5 py-1.5 border border-line bg-surface hover:bg-surface/80 cursor-pointer"
              aria-label="Pomiń wykres i przejdź do kolejnej sekcji"
            >
              <span>Pomiń wykres</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          </div>

          {/* Główny układ: Wykres (8 kolumn) + Lista etapów (4 kolumny) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
            
            {/* Lewa kolumna: Wykres z symetrycznym paddingiem w karcie */}
            <div className="lg:col-span-8 rounded-2xl border border-line bg-surface/80 shadow-card p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="relative w-full aspect-[16/9] select-none">
                <svg
                  viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                  className="w-full h-full overflow-visible"
                  role="img"
                  aria-label="Wykres zależności rozwoju biznesu od jakości wdrożenia strony"
                >
                  <defs>
                    {/* Gradient pionowy dla wypełnienia pod krzywą */}
                    <linearGradient id="area-vertical-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Gradient dla linii głównej */}
                    <linearGradient id="curve-stroke-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="1.0" />
                    </linearGradient>

                    {/* Maska z miękką prawą krawędzią synchronizowaną z czubkiem */}
                    <linearGradient
                      id="mask-soft-edge"
                      ref={maskGradRef}
                      gradientUnits="userSpaceOnUse"
                      x1={BOUNDS.xMin}
                      y1="0"
                      x2={BOUNDS.xMin + 50}
                      y2="0"
                    >
                      <stop offset="0%" stopColor="white" stopOpacity="1" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>

                    <mask id="soft-reveal-mask">
                      <rect
                        x="0"
                        y="0"
                        width={VIEWBOX.width}
                        height={VIEWBOX.height}
                        fill="url(#mask-soft-edge)"
                      />
                    </mask>
                  </defs>

                  {/* Siatka pomocnicza i osie współrzędnych */}
                  <GridAndAxes />

                  {/* Linia odniesienia ("Strona bez optymalizacji") */}
                  <motion.path
                    d={REFERENCE_PATH_D}
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeWidth="1.75"
                    strokeDasharray="4 4"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: smoothProgress }}
                  />
                  <text
                    x={BOUNDS.xMax}
                    y={BOUNDS.yBaseline - 25}
                    textAnchor="end"
                    className="text-[10px] font-mono fill-ink-muted select-none"
                  >
                    Strona bez optymalizacji
                  </text>

                  {/* Wypełnienie pod krzywą z miękkim zakończeniem */}
                  <g mask="url(#soft-reveal-mask)">
                    <path d={AREA_PATH_D} fill="url(#area-vertical-grad)" />
                  </g>

                  {/* Poświata krzywej (szeroki duplikat o niskim kryciu bez filtrów SVG) */}
                  <motion.path
                    d={CURVE_PATH_D}
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="8"
                    strokeOpacity="0.16"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: smoothProgress }}
                  />

                  {/* Główna krzywa wzrostu */}
                  <motion.path
                    ref={mainPathRef}
                    d={CURVE_PATH_D}
                    fill="none"
                    stroke="url(#curve-stroke-grad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{ pathLength: smoothProgress }}
                  />

                  {/* Pionowa przerywana linia zrzutowana z kropki na oś X */}
                  <line
                    ref={guideLineRef}
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    className="text-ink-muted/50"
                    vectorEffect="non-scaling-stroke"
                  />

                  {/* Czubek krzywej: Koralowa kropka z pierścieniem pulsacyjnym */}
                  <g ref={tipGroupRef} className="pointer-events-none transition-opacity duration-150">
                    <circle
                      r="12"
                      className="fill-coral/20 animate-ping motion-reduce:hidden"
                    />
                    <circle
                      r="5.5"
                      className="fill-coral stroke-surface stroke-[1.5]"
                    />
                  </g>

                  {/* Kamienie milowe na wykresie z liniami łączącymi */}
                  {MILESTONES.map((m, idx) => {
                    // Wyznaczenie pozycji markera na znormalizowanej krzywej
                    const targetX = BOUNDS.xMin + (NORMALIZED_POINTS[idx * 3] || NORMALIZED_POINTS[NORMALIZED_POINTS.length - 1]).x * (BOUNDS.xMax - BOUNDS.xMin);
                    const targetY = BOUNDS.yBaseline - (NORMALIZED_POINTS[idx * 3] || NORMALIZED_POINTS[NORMALIZED_POINTS.length - 1]).y * (BOUNDS.yBaseline - BOUNDS.yTop);

                    return (
                      <g
                        key={m.step}
                        ref={(el) => { svgMilestonesRef.current[idx] = el; }}
                        data-state="future"
                        role="button"
                        tabIndex={0}
                        onClick={() => scrollToMilestone(m.threshold)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            scrollToMilestone(m.threshold);
                          }
                        }}
                        aria-label={`${m.step}. ${m.title}`}
                        className="transition-all duration-300 group cursor-pointer focus-visible:outline-none"
                      >
                        {/* Linia łącząca marker z etykietą */}
                        <line
                          x1={targetX}
                          y1={targetY}
                          x2={targetX + m.labelDx}
                          y2={targetY + m.labelDy + 12}
                          stroke="currentColor"
                          strokeDasharray="2 2"
                          strokeWidth="1"
                          className="text-line group-data-[state=reached]:text-accent/60"
                        />

                        {/* Punkt na krzywej */}
                        <circle
                          cx={targetX}
                          cy={targetY}
                          r="4"
                          className="fill-surface stroke-line stroke-2 group-data-[state=reached]:fill-accent group-data-[state=reached]:stroke-surface"
                        />

                        {/* Etykieta kamienia milowego w wolnej przestrzeni */}
                        <g transform={`translate(${targetX + m.labelDx}, ${targetY + m.labelDy})`}>
                          <rect
                            x={m.textAnchor === "end" ? -140 : m.textAnchor === "middle" ? -70 : 0}
                            y="-14"
                            width="140"
                            height="24"
                            rx="6"
                            className="fill-surface/95 stroke-line stroke-1 group-data-[state=reached]:stroke-accent/40 shadow-xs"
                          />
                          <text
                            x={m.textAnchor === "end" ? -6 : m.textAnchor === "middle" ? 0 : 8}
                            y="2"
                            textAnchor={m.textAnchor}
                            className="text-[10px] font-heading font-semibold fill-ink group-data-[state=reached]:fill-accent-text leading-none"
                          >
                            {m.step}. {m.title}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Podpis pod wykresem */}
              <div className="mt-3 pt-3 border-t border-line flex items-center justify-between text-[11px] text-ink-muted font-mono">
                <span>Wykres trajektorii optymalizacji</span>
                <span>Ilustracja, nie obietnica konkretnych wyników.</span>
              </div>
            </div>

            {/* Prawa kolumna: Lista kroków 01-04 z pionowym wskaźnikiem postępu */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:pl-2">
              <div className="relative pl-6 space-y-6">
                {/* Oś pionowa postępu */}
                <div className="absolute left-2 top-2 bottom-2 w-[2px] bg-line rounded-full overflow-hidden">
                  <div
                    ref={verticalProgressRef}
                    className="w-full bg-accent transition-all duration-75 rounded-full"
                    style={{ height: "0%" }}
                  />
                </div>

                {/* 4 kroki procesu jako interaktywne etapy */}
                {MILESTONES.map((m, idx) => {
                  const isActive = activeStepIndex === idx;

                  return (
                    <button
                      key={m.step}
                      type="button"
                      onClick={() => scrollToMilestone(m.threshold)}
                      ref={(el) => { stepItemsRef.current[idx] = el; }}
                      className={cn(
                        "group w-full block text-left transition-all duration-200 rounded-lg p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text cursor-pointer",
                        isActive ? "translate-x-1 bg-surface/80 shadow-xs" : "hover:bg-surface/40"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-mono text-xs font-bold transition-colors",
                          isActive ? "text-accent-text" : "text-ink-muted group-hover:text-ink"
                        )}>
                          {m.step}
                        </span>
                        <h3 className={cn(
                          "font-heading font-bold text-xs sm:text-sm lg:text-base transition-colors",
                          isActive ? "text-ink font-extrabold" : "text-ink group-hover:text-accent-text"
                        )}>
                          {m.title}
                        </h3>
                      </div>
                      <p className={cn(
                        "mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-ink-muted leading-relaxed max-w-sm transition-all",
                        isActive ? "block" : "hidden sm:block"
                      )}>
                        {m.desc}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Końcowe CTA zsynchronizowane z etapami */}
              <div className="pt-2">
                <Link href="/kontakt" className="inline-block w-full">
                  <InteractiveHoverButton className="w-full">
                    Zaplanujmy Twój wzrost
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Komponent osi i siatki pomocniczej (wspólny dla obu motywów)
function GridAndAxes() {
  return (
    <g className="select-none pointer-events-none">
      {/* Przerywane poziome linie siatki */}
      {GRID_Y_LINES.map((y, idx) => (
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

      {/* Subtelna oś X */}
      <line
        x1={BOUNDS.xMin}
        y1={BOUNDS.yBaseline}
        x2={BOUNDS.xMax}
        y2={BOUNDS.yBaseline}
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />

      {/* Podpisy osi */}
      <text
        x={BOUNDS.xMax}
        y={BOUNDS.yBaseline + 20}
        textAnchor="end"
        className="text-[11px] font-mono fill-ink-muted"
      >
        Czas →
      </text>

      <text
        x={BOUNDS.xMin - 12}
        y={BOUNDS.yTop + 10}
        transform={`rotate(-90 ${BOUNDS.xMin - 12} ${BOUNDS.yTop + 10})`}
        textAnchor="end"
        className="text-[11px] font-mono fill-ink-muted hidden sm:inline"
      >
        Rozwój biznesu ↑
      </text>
    </g>
  );
}

// Statyczne definicje dla widoku bez animacji
function StaticChartDefs() {
  return (
    <defs>
      <linearGradient id="static-area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
      </linearGradient>
    </defs>
  );
}
