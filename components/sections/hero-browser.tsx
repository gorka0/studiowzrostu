"use client";

import * as React from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, Phone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroBrowserProps {
  className?: string;
}

interface PreviewMode {
  id: "uslugi" | "b2b" | "produkt";
  label: string;
  domain: string;
  eyebrow: string;
  headline: string;
  subline: string;
  ctaLabel: string;
  features: [string, string];
  statValue: string;
  statLabel: string;
}

const PREVIEW_MODES: PreviewMode[] = [
  {
    id: "uslugi",
    label: "Usługi lokalne",
    domain: "warsztat-bydgoszcz.example",
    eyebrow: "Szybki kontakt",
    headline: "Jasna oferta i termin wizyty w 30 sekund.",
    subline: "Widoczny telefon oraz formularz wyceny już nad linią zgięcia.",
    ctaLabel: "Zarezerwuj termin",
    features: ["Cennik prac przed startem", "Wsparcie SEO na miasto"],
    statValue: "0,8 s",
    statLabel: "Start na telefonie",
  },
  {
    id: "b2b",
    label: "Przemysł B2B",
    domain: "serwis-maszyn.example",
    eyebrow: "Wdrożenie 7 dni",
    headline: "Specyfikacja techniczna gotowa pod zapytania.",
    subline: "Czytelne karty parametrów oraz szybkie zgłoszenie serwisowe.",
    ctaLabel: "Poproś o ofertę",
    features: ["Karty katalogowe PDF", "Obsługa zapytań 24h"],
    statValue: "100%",
    statLabel: "Stała cena w umowie",
  },
  {
    id: "produkt",
    label: "Nowy produkt",
    domain: "grafik-zespolu.example",
    eyebrow: "Landing page",
    headline: "Jedna obietnica. Jeden cel. Zero rozpraszaczy.",
    subline: "Skupienie uwagi na demonstracji narzędzia i zapisie na start.",
    ctaLabel: "Sprawdź wersję demo",
    features: ["Układ prowadzący wzrok", "Czysty kod Next.js"],
    statValue: "AA",
    statLabel: "Kontrast i czytelność",
  },
];

export function HeroBrowser({ className }: HeroBrowserProps) {
  const figureRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [isUserControlled, setIsUserControlled] = React.useState(false);

  const activeMode = PREVIEW_MODES[activeIdx] ?? PREVIEW_MODES[0];

  // Delikatny paralaks kursora względem środka okna
  React.useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    let rafId: number | null = null;

    const onMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const root = figureRef.current;
        if (!root) return;

        const rect = root.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

        root.style.setProperty("--hero-window-x", `${(nx * 5).toFixed(2)}px`);
        root.style.setProperty("--hero-window-y", `${(ny * 3.5).toFixed(2)}px`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Automatyczna prezentacja trybów zatrzymuje się natychmiast po interakcji użytkownika
  React.useEffect(() => {
    if (isUserControlled || prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PREVIEW_MODES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [isUserControlled, prefersReducedMotion]);

  const selectMode = (idx: number) => {
    setIsUserControlled(true);
    setActiveIdx(idx);
  };

  return (
    <figure
      ref={figureRef}
      aria-label="Interaktywny podgląd struktury strony firmowej dla różnych branż"
      className={cn(
        "relative w-full max-w-[540px] lg:max-w-none lg:w-[clamp(520px,44vw,640px)] mx-auto lg:mx-0 select-none",
        className
      )}
    >
      {/* Przełącznik branży w stylu edytorskim nad makietą */}
      <div className="mb-3 flex items-center justify-between gap-2">
        <LayoutGroup id="hero-browser-modes">
          <div
            role="tablist"
            aria-label="Wybierz scenariusz strony"
            className="inline-flex items-center p-1 rounded-xl border border-line bg-surface/90 shadow-xs"
          >
            {PREVIEW_MODES.map((mode, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => selectMode(idx)}
                  onMouseEnter={() => {
                    setIsUserControlled(true);
                    setActiveIdx(idx);
                  }}
                  className={cn(
                    "relative px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                    isSelected ? "text-ink font-semibold" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="hero-mode-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-0 rounded-lg bg-secondary border border-line/80 shadow-2xs z-0"
                    />
                  )}
                  <span className="relative z-10">{mode.label}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <span className="text-[11px] font-medium text-ink-muted tracking-wide uppercase">
          Podgląd układu
        </span>
      </div>

      {/* Okno przeglądarki ze stałą wysokością zapobiegającą przesunięciom CLS */}
      <div
        className="hero-anim-window relative w-full lg:aspect-[4/3] rounded-2xl border border-line bg-surface shadow-elevated overflow-hidden flex flex-col z-10 transition-transform duration-150 ease-out"
        style={{
          transform: "translate3d(var(--hero-window-x, 0px), var(--hero-window-y, 0px), 0)",
        }}
        onMouseEnter={() => setIsUserControlled(true)}
      >
        {/* Pasek przeglądarki z adresem dopasowanym do trybu */}
        <div className="h-10 px-4 border-b border-line/70 flex items-center justify-between bg-surface-subtle/40 relative shrink-0">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="w-2 h-2 rounded-full bg-line" />
            <span className="w-2 h-2 rounded-full bg-line" />
            <span className="w-2 h-2 rounded-full bg-line" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode.domain}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
              className="px-3 py-0.5 rounded-md bg-background border border-line/80 text-[12px] font-sans font-medium text-ink-muted"
            >
              {activeMode.domain}
            </motion.div>
          </AnimatePresence>

          <span className="text-[11px] font-medium text-accent-text tabular-nums">
            HTTPS
          </span>
        </div>

        {/* Główny obszar makiety przełączany z płynnym morphingiem */}
        <div className="p-5 lg:p-6 flex-1 flex flex-col justify-between overflow-hidden">
          {/* Górna nawigacja wewnętrznej makiety */}
          <div className="flex items-center justify-between pb-3 border-b border-line/50 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-xs bg-accent" />
              <div className="w-16 h-2.5 rounded-xs bg-ink/80" />
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-1.5 rounded-full bg-ink-muted/30" />
              <div className="w-10 h-1.5 rounded-full bg-ink-muted/30" />
              <div className="w-8 h-1.5 rounded-full bg-ink-muted/30" />
            </div>

            <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary border border-line text-[11px] font-semibold text-ink">
              <Phone className="h-3 w-3 text-accent-text" />
              <span>Kontakt</span>
            </div>
          </div>

          {/* Treść zależna od wybranej branży */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
              className="grid grid-cols-12 gap-4 items-center my-auto py-3"
            >
              {/* Lewa kolumna: treść oferty */}
              <div className="col-span-8 space-y-2.5 text-left">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-accent-text border-l-2 border-accent pl-2 leading-none">
                  {activeMode.eyebrow}
                </div>

                <div className="font-heading font-bold text-[19px] leading-[1.18] text-ink tracking-tight text-balance">
                  {activeMode.headline}
                </div>

                <p className="text-[12.5px] text-ink-muted leading-[1.45] max-w-[95%]">
                  {activeMode.subline}
                </p>

                <div className="pt-1 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent-text text-white dark:bg-accent dark:text-accent-foreground text-[12px] font-semibold shadow-2xs">
                    <span>{activeMode.ctaLabel}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>

              {/* Prawa kolumna: kluczowy wskaźnik i rosnące słupki */}
              <div className="col-span-4 flex flex-col gap-2.5 items-stretch">
                <div className="rounded-xl border border-line bg-secondary/45 p-3 text-left space-y-1">
                  <div className="font-heading font-bold text-[22px] leading-none text-accent-text tabular-nums">
                    {activeMode.statValue}
                  </div>
                  <div className="text-[11px] text-ink-muted leading-tight">
                    {activeMode.statLabel}
                  </div>
                </div>

                <div className="rounded-xl border border-line bg-background p-2.5 h-20 flex items-end justify-center gap-2">
                  {[32, 54, 76, 100].map((h, barIdx) => (
                    <motion.div
                      key={`${activeMode.id}-bar-${barIdx}`}
                      initial={prefersReducedMotion ? false : { scaleY: 0.3, opacity: 0.6 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{
                        duration: 0.26,
                        delay: barIdx * 0.04,
                        ease: [0.2, 0.7, 0.2, 1],
                      }}
                      className="w-2.5 rounded-xs bg-accent origin-bottom"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dolna linia atutów bez zagnieżdżania zbędnych kart */}
          <div className="border-t border-line/60 pt-3 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-4">
              {activeMode.features.map((feat) => (
                <div key={feat} className="flex items-center gap-1.5 text-[11.5px] font-medium text-ink-muted">
                  <Check className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-accent-text shrink-0">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Czysty kod</span>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 sm:mt-4 text-center sm:text-left text-[13px] font-sans text-ink-muted select-none text-balance leading-normal">
        Kliknij branżę powyżej, aby zobaczyć jak zmienia się układ strony pod konkretny cel.
      </figcaption>
    </figure>
  );
}
