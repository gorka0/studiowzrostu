"use client";

import * as React from "react";
import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, Zap, Search, MailCheck, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { cn } from "@/lib/utils";

const NORMALIZED_POINTS = [
  { x: 0.0, y: 0.08 },
  { x: 0.16, y: 0.13 },
  { x: 0.40, y: 0.27 },
  { x: 0.68, y: 0.54 },
  { x: 0.90, y: 0.82 },
  { x: 1.0, y: 0.96 },
];

export const MILESTONES = [
  {
    step: "01",
    shortLabel: "Szybkość",
    metric: "Start < 1 s",
    title: "Szybka, nowoczesna strona",
    desc: "Błyskawiczne ładowanie i natychmiastowa reakcja na smartfonie budują zaufanie odwiedzającego od pierwszej sekundy.",
    linkLabel: "Zobacz analizę szybkości",
    linkHref: "/uslugi/redesign-i-wydajnosc",
    xPct: 0.16,
    icon: Zap,
  },
  {
    step: "02",
    shortLabel: "SEO",
    metric: "Semantyka + Schema",
    title: "Widoczność w wynikach wyszukiwania",
    desc: "Czysty kod i zoptymalizowana semantyka HTML ułatwiają robotom wyszukiwarek bezbłędne odczytanie Twojej oferty.",
    linkLabel: "Sprawdź techniczne SEO",
    linkHref: "/uslugi/seo-techniczne",
    xPct: 0.40,
    icon: Search,
  },
  {
    step: "03",
    shortLabel: "Zapytania",
    metric: "Wyższa konwersja",
    title: "Więcej zapytań ofertowych",
    desc: "Przejrzysta hierarchia treści prowadzi klientów prosto do formularza wyceny lub bezpośredniego telefonu.",
    linkLabel: "Poznaj strony pod reklamy",
    linkHref: "/uslugi/landing-page",
    xPct: 0.68,
    icon: MailCheck,
  },
  {
    step: "04",
    shortLabel: "Klienci",
    metric: "Stały napływ",
    title: "Nowi, zdecydowani klienci",
    desc: "Systematyczny napływ zapytań od klientów szukających Twojej specjalizacji wspiera stabilny i przewidywalny wzrost firmy.",
    linkLabel: "Zobacz ofertę wdrożeń",
    linkHref: "/uslugi/strony-internetowe",
    xPct: 0.90,
    icon: UserCheck,
  },
];

const VIEWBOX = { width: 800, height: 380 };
const BOUNDS = {
  xMin: 40,
  xMax: 760,
  yBaseline: 344,
  yTop: 26,
};

function scalePoint(p: { x: number; y: number }) {
  return {
    x: BOUNDS.xMin + p.x * (BOUNDS.xMax - BOUNDS.xMin),
    y: BOUNDS.yBaseline - p.y * (BOUNDS.yBaseline - BOUNDS.yTop),
  };
}

const SCALED_POINTS = NORMALIZED_POINTS.map(scalePoint);

// Konwersja Catmull-Rom -> Cubic Bezier gwarantująca płynną krzywą bez załamań schodkowych
const CURVE_PATH_D = SCALED_POINTS.reduce((acc, p1, i, pts) => {
  if (i === 0) return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  const p0 = pts[Math.max(0, i - 2)];
  const prev = pts[i - 1];
  const p2 = pts[Math.min(pts.length - 1, i + 1)];
  const cp1x = prev.x + (p1.x - p0.x) / 6;
  const cp1y = prev.y + (p1.y - p0.y) / 6;
  const cp2x = p1.x - (p2.x - prev.x) / 6;
  const cp2y = p1.y - (p2.y - prev.y) / 6;
  return `${acc} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
}, "");

const AREA_PATH_D = `${CURVE_PATH_D} L ${BOUNDS.xMax} ${BOUNDS.yBaseline} L ${BOUNDS.xMin} ${BOUNDS.yBaseline} Z`;

const MILESTONE_COORDS = MILESTONES.map((m) => {
  const match =
    NORMALIZED_POINTS.find((p) => Math.abs(p.x - m.xPct) < 0.05) ??
    NORMALIZED_POINTS[0];
  return scalePoint({ x: m.xPct, y: match.y });
});

export function GrowthChart() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = React.useState<number>(1);
  const [hasInteracted, setHasInteracted] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Łagodna automatyczna prezentacja etapów zatrzymuje się po pierwszym wyborze użytkownika
  React.useEffect(() => {
    if (!isVisible || hasInteracted || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveStep((prev) => (prev + 1) % MILESTONES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isVisible, hasInteracted, prefersReducedMotion]);

  const selectStep = (idx: number) => {
    setHasInteracted(true);
    setActiveStep(idx);
  };

  const activeMilestone = MILESTONES[activeStep] ?? MILESTONES[0];
  const activeCoord = MILESTONE_COORDS[activeStep] ?? MILESTONE_COORDS[0];
  const clipRightPct =
    activeStep >= MILESTONES.length - 1
      ? 0
      : Math.max(0, 100 - (activeCoord.x / VIEWBOX.width) * 100);

  return (
    <section
      ref={sectionRef}
      id="jak-rosnie-firma"
      aria-label="Wykres ilustrujący wzrost biznesu dzięki nowoczesnej stronie"
      className="relative w-full py-8 sm:py-12 lg:py-16 border-b border-line bg-surface/35 text-[15px]"
    >
      <Container>
        <SectionHeader
          title="Jak rośnie firma ze sprawną stroną"
          description="Od czystego kodu i szybkiego ładowania na smartfonie do stałego pozyskiwania wartościowych zapytań ofertowych."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch mt-4 sm:mt-6">
          {/* LEWA KOLUMNA: Zsynchronizowany wykres + aktywny odczyt etapu */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="flex-1 rounded-2xl border border-line bg-card p-4 sm:p-6 shadow-card flex flex-col justify-between">
              {/* Nagłówek wykresu z odczytem aktywnego etapu */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line/60 pb-3.5">
                <div className="space-y-1 text-left">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text tabular-nums">
                    Etap {activeMilestone.step} / 04 · Rozwój w czasie
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMilestone.step}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
                      className="font-heading font-bold text-[18px] sm:text-[20px] text-ink leading-tight"
                    >
                      {activeMilestone.title}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeMilestone.metric}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent/10 border border-accent/25 text-[12px] font-semibold text-accent-text shrink-0"
                  >
                    {activeMilestone.metric}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Obszar wykresu SVG: warstwa bazowa + warstwa wypełnienia przycięta dokładnie do aktywnego punktu */}
              <div className="relative w-full aspect-[16/9] my-3 sm:my-4 select-none">
                {/* Warstwa 1: Siatka tła, linia porównawcza i przyszła trajektoria */}
                <svg
                  viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                  className="absolute inset-0 w-full h-full overflow-visible"
                  role="img"
                  aria-label="Wykres etapów wzrostu biznesu"
                >
                  {[115, 195, 275].map((y) => (
                    <line
                      key={y}
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

                  {/* Oś bazowa (strona bez optymalizacji) */}
                  <line
                    x1={BOUNDS.xMin}
                    y1={BOUNDS.yBaseline - 14}
                    x2={BOUNDS.xMax}
                    y2={BOUNDS.yBaseline - 38}
                    stroke="currentColor"
                    strokeOpacity="0.28"
                    strokeDasharray="5 5"
                    strokeWidth="1.5"
                  />
                  <text
                    x={BOUNDS.xMax}
                    y={BOUNDS.yBaseline - 48}
                    textAnchor="end"
                    className="fill-ink-muted/75 text-[12px] font-sans"
                  >
                    Bez zmian
                  </text>

                  {/* Subtelna przerywana prognoza przyszłej ścieżki, na której osadzone są kolejne kroki */}
                  <path
                    d={CURVE_PATH_D}
                    fill="none"
                    stroke="var(--accent)"
                    strokeOpacity="0.18"
                    strokeDasharray="5 5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                {/* Warstwa 2: Wypełnienie i główna linia docięte dokładnie do aktywnego etapu */}
                <div
                  className="absolute inset-0 w-full h-full pointer-events-none transition-[clip-path] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none will-change-[clip-path]"
                  style={{ clipPath: `inset(0 ${clipRightPct.toFixed(2)}% 0 0)` }}
                >
                  <svg
                    viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                    className="w-full h-full overflow-visible"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="growth-area-grad-v2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
                        <stop offset="75%" stopColor="var(--accent)" stopOpacity="0.04" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    <path d={AREA_PATH_D} fill="url(#growth-area-grad-v2)" />

                    <path
                      d={CURVE_PATH_D}
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                {/* Warstwa 3: Klikalne węzły kroków na wierzchu (nigdy nie ucięte przez clipPath) */}
                <svg
                  viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                  className="absolute inset-0 w-full h-full overflow-visible z-10"
                  aria-hidden="true"
                >
                  {MILESTONES.map((m, idx) => {
                    const pt = MILESTONE_COORDS[idx];
                    const isReached = idx <= activeStep;
                    const isCurrent = idx === activeStep;

                    return (
                      <g
                        key={m.step}
                        className="cursor-pointer group"
                        onClick={() => selectStep(idx)}
                      >
                        <line
                          x1={pt.x}
                          y1={pt.y + 14}
                          x2={pt.x}
                          y2={BOUNDS.yBaseline}
                          stroke="currentColor"
                          strokeDasharray="2 3"
                          strokeWidth="1"
                          className={cn(
                            "transition-colors duration-200",
                            isCurrent ? "text-accent/70" : "text-line/70"
                          )}
                        />

                        <g transform={`translate(${pt.x}, ${pt.y})`}>
                          {isCurrent && (
                            <circle
                              r={20}
                              className="fill-accent/15 stroke-accent/35 stroke-1"
                            />
                          )}
                          <circle
                            r={isCurrent ? 14 : 11.5}
                            className={cn(
                              "stroke-2 transition-all duration-200",
                              isCurrent
                                ? "fill-accent-text stroke-surface dark:fill-accent"
                                : isReached
                                ? "fill-surface stroke-accent"
                                : "fill-surface stroke-line group-hover:stroke-accent/60"
                            )}
                          />
                          <text
                            x="0"
                            y="0"
                            textAnchor="middle"
                            dominantBaseline="central"
                            className={cn(
                              "text-[13px] font-sans font-bold select-none tabular-nums",
                              isCurrent
                                ? "fill-white dark:fill-accent-foreground"
                                : "fill-ink"
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

              {/* Pasek dolny karty: szybkie przełączenie etapów oraz kontekstowy link */}
              <div className="pt-3.5 border-t border-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-4 text-[12.5px] font-sans text-ink-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1.5 bg-accent rounded-full shrink-0" />
                    <span className="font-semibold text-ink">Z naszą stroną</span>
                  </div>
                  <span className="text-line" aria-hidden="true">|</span>
                  <span className="text-[12px]">Ilustracja procesu</span>
                </div>

                <Link
                  href={activeMilestone.linkHref}
                  className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-accent-text hover:underline shrink-0"
                >
                  <span>{activeMilestone.linkLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* PRAWA KOLUMNA: Zwarta edytorska lista etapów bez ciężkich pudełek w pudełkach */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-5">
            <LayoutGroup id="growth-editorial-steps">
              <div className="space-y-2.5 text-left">
                {MILESTONES.map((m, idx) => {
                  const isActive = activeStep === idx;
                  const IconComponent = m.icon;

                  return (
                    <button
                      key={m.step}
                      type="button"
                      onClick={() => selectStep(idx)}
                      onMouseEnter={() => selectStep(idx)}
                      aria-current={isActive ? "step" : undefined}
                      className={cn(
                        "relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-colors duration-200 cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                        isActive
                          ? "border-transparent"
                          : "border-line/70 bg-surface/40 hover:bg-surface/80 hover:border-line"
                      )}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="growth-active-step-card"
                          transition={
                            prefersReducedMotion
                              ? { duration: 0 }
                              : { type: "spring", stiffness: 360, damping: 32 }
                          }
                          className="absolute inset-0 rounded-2xl border border-accent bg-card shadow-card ring-1 ring-accent/20 z-0 pointer-events-none"
                        />
                      )}

                      <div className="relative z-10 flex items-start gap-3.5">
                        <div
                          className={cn(
                            "mt-0.5 w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 transition-colors",
                            isActive
                              ? "bg-accent-text text-white border-accent-text dark:bg-accent dark:text-accent-foreground dark:border-accent"
                              : "bg-surface-subtle text-ink-muted border-line"
                          )}
                        >
                          <IconComponent className="h-4 w-4" aria-hidden="true" />
                        </div>

                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-baseline gap-2 min-w-0">
                            <span className="font-sans text-[12px] font-bold text-accent-text tabular-nums shrink-0">
                              {m.step}
                            </span>
                            <h3 className="font-heading font-bold text-[17px] sm:text-[18px] text-ink leading-tight">
                              {m.title}
                            </h3>
                          </div>

                          <p className="text-[14px] sm:text-[14.5px] text-ink-muted leading-[1.5]">
                            {m.desc}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
              <Link href="#kontakt-cta" className="w-full sm:w-auto">
                <InteractiveHoverButton className="w-full sm:w-auto min-h-[48px]">
                  Zaplanujmy Twój wzrost
                </InteractiveHoverButton>
              </Link>

              <span className="text-[12.5px] text-ink-muted">
                Kliknij dowolny etap na wykresie lub liście
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
