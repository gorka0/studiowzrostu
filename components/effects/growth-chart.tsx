"use client";

import * as React from "react";
import Link from "next/link";
function usePrefersReducedMotion() {
  const [reduce, setReduce] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduce;
}
import { ArrowRight, Zap, Search, MailCheck, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

// Punkty danych monotonicznej krzywej wzrostu
const NORMALIZED_POINTS = [
  { x: 0.0, y: 0.08 },
  { x: 0.16, y: 0.12 },
  { x: 0.28, y: 0.15 },
  { x: 0.40, y: 0.22 },
  { x: 0.54, y: 0.34 },
  { x: 0.68, y: 0.48 },
  { x: 0.80, y: 0.66 },
  { x: 0.90, y: 0.80 },
  { x: 1.0, y: 0.94 },
];

export const MILESTONES = [
  {
    step: "01",
    shortLabel: "Szybka strona",
    title: "Szybka, nowoczesna strona",
    desc: "Błyskawiczne ładowanie i natychmiastowa reakcja na smartfonie budują zaufanie odwiedzającego od pierwszej sekundy.",
    xPct: 0.16,
    progress: 0.2,
  },
  {
    step: "02",
    shortLabel: "Widoczność",
    title: "Widoczność w wynikach wyszukiwania",
    desc: "Czysty kod i zoptymalizowana semantyka HTML ułatwiają robotom wyszukiwarek bezbłędne odczytanie Twojej oferty.",
    xPct: 0.40,
    progress: 0.45,
  },
  {
    step: "03",
    shortLabel: "Więcej zapytań",
    title: "Więcej zapytań ofertowych",
    desc: "Przejrzysta hierarchia treści prowadzi klientów prosto do formularza wyceny lub bezpośredniego telefonu.",
    xPct: 0.68,
    progress: 0.72,
  },
  {
    step: "04",
    shortLabel: "Nowi klienci",
    title: "Nowi, zdecydowani klienci",
    desc: "Systematyczny napływ zapytań od klientów szukających Twojej specjalizacji wspiera stabilny i przewidywalny wzrost firmy.",
    xPct: 0.90,
    progress: 1.0,
  },
];

const VIEWBOX = { width: 800, height: 440 };
const BOUNDS = {
  xMin: 60,
  xMax: 740,
  yBaseline: 380,
  yTop: 55,
};

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

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback, { passive: true });
  return () => window.removeEventListener("resize", callback);
};
const getIsDesktopSnapshot = () => (typeof window !== "undefined" ? window.innerWidth >= 1024 : false);
const getServerIsDesktopSnapshot = () => false;

export function GrowthChart() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = usePrefersReducedMotion();

  const [activeStep, setActiveStep] = React.useState<number>(0);
  const isDesktop = React.useSyncExternalStore(
    subscribeResize,
    getIsDesktopSnapshot,
    getServerIsDesktopSnapshot
  );

  // Scrollytelling: aktywny WYŁĄCZNIE na desktopie (≥1024px) w układzie 2-kolumnowym
  React.useEffect(() => {
    if (!isDesktop || shouldReduceMotion) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const triggerY = window.innerHeight * 0.50;
        let currentActive = 0;

        cardRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          if (center <= triggerY) {
            currentActive = idx;
          }
        });

        setActiveStep((prev) => (prev !== currentActive ? currentActive : prev));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isDesktop, shouldReduceMotion]);

  const targetProgress = !isDesktop || shouldReduceMotion ? 1 : MILESTONES[activeStep]?.progress || 0.2;

  return (
    <section
      ref={containerRef}
      id="jak-rosnie-firma"
      style={{ fontSize: "15px" }}
      aria-label="Wykres ilustrujący wzrost biznesu dzięki nowoczesnej stronie"
      className="relative w-full py-6 sm:py-10 lg:py-14 border-b border-line bg-surface/35"
    >
      <Container>
        <SectionHeader
          title="Jak rośnie firma ze sprawną stroną"
          description="Od czystego kodu i szybkiego ładowania na smartfonie do stałego pozyskiwania wartościowych zapytań ofertowych."
          align="left"
        />

        {/* Wrapper scrollytelling: wysokość naturalnie definiowana przez karty kroków (bez sztucznego pustego miejsca) */}
        <div className="relative mt-4 sm:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
            
            {/* STICKY WYKRES: przyklejony wyłącznie na desktopie (≥1024px) obok kart, na mobile/tablecie w naturalnym przepływie */}
            <div className="lg:col-span-6 z-20 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-line bg-card p-3 sm:p-5 shadow-card flex flex-col justify-between overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line/60 pb-2.5 mb-2 gap-1 select-none">
                  <span className="font-semibold text-accent-text text-[15px]">
                    Rozwój firmy w czasie
                  </span>
                  <span className="text-[12px] text-ink-muted">
                    Ilustracja, nie obietnica wyników
                  </span>
                </div>

                {/* Wykres proporcje ok. 16:10, wysokość min(38svh, 280px) */}
                <div className="relative w-full h-[min(38svh,280px)] aspect-[16/10] select-none">
                  <svg
                    viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                    className="w-full h-full overflow-visible select-none"
                    role="img"
                    aria-label="Wykres etapów wzrostu biznesu"
                  >
                    <defs>
                      <linearGradient id="growth-area-gradient-b" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
                        <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                      </linearGradient>

                      <linearGradient id="growth-stroke-gradient-b" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="1.0" />
                      </linearGradient>
                    </defs>

                    {/* Przerywane poziome linie siatki */}
                    {[120, 200, 280].map((y, idx) => (
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

                    {/* Obszar pod krzywą */}
                    <path
                      d={AREA_PATH_D}
                      fill="url(#growth-area-gradient-b)"
                      className="transition-opacity duration-500"
                    />

                    {/* Szara linia odniesienia (bez optymalizacji) */}
                    <line
                      x1={BOUNDS.xMin}
                      y1={BOUNDS.yBaseline - 15}
                      x2={BOUNDS.xMax}
                      y2={BOUNDS.yBaseline - 40}
                      stroke="currentColor"
                      strokeOpacity="0.3"
                      strokeDasharray="4 4"
                      strokeWidth="1.5"
                    />

                    {/* Dynamicznie rysowana krzywa wzrostu */}
                    <path
                      d={CURVE_PATH_D}
                      fill="none"
                      stroke="url(#growth-stroke-gradient-b)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      pathLength="1"
                      strokeDasharray="1"
                      style={{
                        strokeDashoffset: 1 - targetProgress,
                        transition: activeStep > 0 && !shouldReduceMotion ? "stroke-dashoffset 450ms cubic-bezier(0.2, 0.7, 0.2, 1)" : "none",
                      }}
                    />

                    {/* 4 Markery etapów (>= 24px średnicy, cyfry >= 13px) */}
                    {MILESTONES.map((m, idx) => {
                      const pt = scalePoint({ x: m.xPct, y: NORMALIZED_POINTS.find(p => Math.abs(p.x - m.xPct) < 0.05)?.y || 0.2 });
                      const isReached = !isDesktop || activeStep >= idx;
                      const isCurrent = isDesktop ? activeStep === idx : idx === 3;

                      return (
                        <g
                          key={m.step}
                          className="cursor-pointer group focus-visible:outline-none"
                          onClick={() => {
                            if (isDesktop) {
                              setActiveStep(idx);
                            }
                            cardRefs.current[idx]?.scrollIntoView({ behavior: "smooth", block: "center" });
                          }}
                          aria-label={`${m.step}. ${m.title}`}
                        >
                          {/* Pionowa linia zrzutowana na oś */}
                          <line
                            x1={pt.x}
                            y1={pt.y}
                            x2={pt.x}
                            y2={BOUNDS.yBaseline}
                            stroke="currentColor"
                            strokeDasharray="2 2"
                            strokeWidth="1"
                            className={cn(
                              isCurrent ? "text-accent/80" : "text-line/60"
                            )}
                          />

                          {/* Marker kołowy >= 24px średnicy (r=12.5) */}
                          <g transform={`translate(${pt.x}, ${pt.y})`}>
                            <circle
                              r={isCurrent ? 13 : 11}
                              className={cn(
                                "stroke-2",
                                isCurrent
                                  ? "fill-accent stroke-surface shadow-sm"
                                  : isReached
                                  ? "fill-surface stroke-accent"
                                  : "fill-surface stroke-line"
                              )}
                            />
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              dominantBaseline="central"
                              className={cn(
                                "text-[13px] font-sans font-bold select-none",
                                isCurrent ? "fill-white dark:fill-surface" : "fill-ink"
                              )}
                            >
                              {idx + 1}
                            </text>
                          </g>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                {/* Legenda pod wykresem (>= 13px, bez opisów osi wewnątrz) */}
                <div className="flex items-center justify-between text-[13px] font-sans text-ink-muted pt-2.5 mt-2 border-t border-line/60 select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-1.5 bg-accent rounded-full shrink-0" />
                    <span className="font-semibold text-ink">Z naszą stroną</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3.5 h-0.5 bg-ink-muted/60 border-b border-dashed border-ink-muted shrink-0" />
                    <span>Bez optymalizacji</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PRAWA KOLUMNA: 4 kroki (na mobile/tablecie naturalna lista bez dimowania, na desktopie scrollytelling) */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-6 lg:space-y-16 pt-4 lg:pt-0">
              {MILESTONES.map((m, idx) => {
                const isActive = activeStep === idx;

                return (
                  <div
                    key={m.step}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className={cn(
                      "p-4 sm:p-5 rounded-2xl border transition-[transform,opacity] duration-300 text-left bg-card",
                      isDesktop
                        ? isActive
                          ? "border-accent/40 shadow-card opacity-100 scale-[1.01]"
                          : "border-line/70 opacity-90 hover:opacity-100 bg-surface/30"
                        : "border-line shadow-xs opacity-100"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="font-sans text-[13px] font-bold text-accent-text">
                          {m.step}
                        </span>
                        <h3 className="font-heading font-bold text-[19px] sm:text-[20px] text-ink leading-tight">
                          {m.title}
                        </h3>
                      </div>
                      <span className="text-[13px] font-sans text-ink-muted">
                        Krok {idx + 1}
                      </span>
                    </div>

                    <p className="mt-2 text-[15px] text-ink-muted leading-[1.5]">
                      {m.desc}
                    </p>

                    {/* Krok 1: Miniwizualizacja ładowania (2 rzędy × 3 klatki, etykiety ≥ 14px) */}
                    {idx === 0 && (
                      <div className="mt-3.5 pt-3 border-t border-line/60 space-y-2.5">
                        <div className="space-y-1.5">
                          <span className="text-[15px] font-sans font-bold text-accent-text flex items-center gap-1.5">
                            <Zap className="h-4 w-4 text-accent" />
                            Szybka strona
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            <div className="h-8 rounded border border-accent/40 bg-surface p-1 flex flex-col justify-between">
                              <div className="h-1.5 w-6 bg-accent rounded" />
                              <div className="h-1 w-10 bg-line rounded" />
                            </div>
                            <div className="h-8 rounded border border-accent/40 bg-surface p-1 flex flex-col justify-between">
                              <div className="h-1.5 w-full bg-accent rounded" />
                              <div className="h-1 w-3/4 bg-line rounded" />
                            </div>
                            <div className="h-8 rounded border-2 border-accent bg-accent/15 p-1 flex items-center justify-center">
                              <div className="h-2 w-full bg-accent rounded" />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-line/60">
                          <span className="text-[15px] font-sans font-medium text-ink-muted">
                            Wolna strona
                          </span>
                          <div className="grid grid-cols-3 gap-2 opacity-60">
                            <div className="h-8 rounded border border-line bg-surface/40 p-1 flex items-center justify-center">
                              <div className="h-1 w-4 bg-line rounded" />
                            </div>
                            <div className="h-8 rounded border border-line bg-surface/40 p-1 flex items-center justify-center">
                              <div className="w-3 h-3 rounded-full border border-line border-t-coral animate-spin" />
                            </div>
                            <div className="h-8 rounded border border-line bg-surface/40 p-1 flex flex-col justify-between">
                              <div className="h-1 w-full bg-line rounded" />
                              <div className="h-1 w-2/3 bg-line rounded" />
                            </div>
                          </div>
                        </div>

                        <Link
                          href="/uslugi/redesign-i-wydajnosc"
                          className="inline-flex items-center gap-1 text-[15px] font-semibold text-accent-text hover:underline pt-1 min-h-[44px]"
                        >
                          <span>Zobacz analizę szybkości</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}

                    {/* Krok 2: Miniwizualizacja wyników wyszukiwania (3 wiersze, wspinający się wynik) */}
                    {idx === 1 && (
                      <div className="mt-3.5 pt-3 border-t border-line/60 space-y-2">
                        <div className="flex items-center justify-between text-[13px] text-ink-muted border-b border-line/50 pb-1.5">
                          <span className="font-semibold text-ink flex items-center gap-1.5 text-[15px]">
                            <Search className="h-4 w-4 text-accent" />
                            Wyniki wyszukiwania
                          </span>
                          <span className="text-[13px] text-ink-muted">Ilustracja</span>
                        </div>

                        {/* Wiersz 1: Twoja firma wspina się na 1. miejsce */}
                        <div className="p-2.5 rounded-lg border border-accent/40 bg-accent/10 space-y-1 transition-all duration-300">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" />
                            <span className="text-[15px] font-sans font-bold text-ink">Twoja Firma</span>
                          </div>
                          <div className="text-[13px] text-accent-text truncate pl-4.5">
                            twojadomena.example › oferta
                          </div>
                        </div>

                        {/* Wiersze konkurencji niżej */}
                        <div className="p-2 rounded border border-line/60 bg-surface/30 opacity-60 space-y-1">
                          <div className="h-2 w-32 bg-line rounded" />
                          <div className="h-1.5 w-full bg-line/60 rounded" />
                        </div>

                        <div className="p-2 rounded border border-line/60 bg-surface/30 opacity-60 space-y-1">
                          <div className="h-2 w-28 bg-line rounded" />
                          <div className="h-1.5 w-3/4 bg-line/60 rounded" />
                        </div>

                        <Link
                          href="/uslugi/seo-techniczne"
                          className="inline-flex items-center gap-1 text-[15px] font-semibold text-accent-text hover:underline pt-1 min-h-[44px]"
                        >
                          <span>Sprawdź techniczne SEO</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}

                    {/* Krok 3: Chip "Nowe zapytanie" wsuwa się */}
                    {idx === 2 && (
                      <div className="mt-3.5 pt-1">
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent/15 border border-accent/40 text-[14px] sm:text-[15px] font-bold text-[#134931] dark:text-accent-text transition-all duration-300 max-w-full flex-wrap">
                          <MailCheck className="h-4 w-4 text-accent" />
                          <span>Nowe zapytanie ofertowe z formularza</span>
                        </div>
                      </div>
                    )}

                    {/* Krok 4: Chip "Nowy klient" wsuwa się */}
                    {idx === 3 && (
                      <div className="mt-3.5 pt-1">
                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-coral/15 border border-coral/40 text-[15px] font-bold text-[#963810] dark:text-coral-text transition-all duration-300">
                          <UserCheck className="h-4 w-4 text-coral" />
                          <span>Zdecydowany stały klient</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Jedno główne CTA na końcu rozdziału: "Zaplanujmy Twój wzrost" */}
              <div className="pt-4 text-left">
                <Link
                  href="#kontakt-cta"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent-text text-white text-[15px] font-semibold hover:bg-accent transition-colors shadow-xs active:scale-[0.98] min-h-[48px]"
                >
                  <span>Zaplanujmy Twój wzrost</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}
