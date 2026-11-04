"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface HeroBrowserProps {
  className?: string;
}

export function HeroBrowser({ className }: HeroBrowserProps) {
  const figureRef = React.useRef<HTMLElement>(null);

  // Subtelny paralaks kursora tylko przy pointer: fine i bez reduced-motion
  React.useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let rafId: number | null = null;

    const handlePointerMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const root = figureRef.current;
        if (!root) return;

        const rect = root.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normalizedX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
        const normalizedY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));

        const windowX = normalizedX * 6;
        const windowY = normalizedY * 4;

        root.style.setProperty("--hero-window-x", `${windowX.toFixed(2)}px`);
        root.style.setProperty("--hero-window-y", `${windowY.toFixed(2)}px`);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <figure
      ref={figureRef}
      aria-label="Przykładowa strona firmowa w widoku na komputerze (ilustracja)"
      className={cn(
        "relative w-full max-w-[520px] lg:max-w-none lg:w-[clamp(520px,44vw,640px)] mx-auto lg:mx-0 select-none",
        className
      )}
    >
      {/* Okno przeglądarki z makietą strony (stały aspect-ratio 4:3, brak CLS) */}
      <div
        aria-hidden="true"
        className="hero-anim-window relative w-full h-[270px] sm:h-[300px] lg:h-auto lg:aspect-[4/3] rounded-2xl border border-line bg-surface shadow-elevated overflow-hidden flex flex-col z-10"
        style={{
          transform: "translate3d(var(--hero-window-x, 0px), var(--hero-window-y, 0px), 0)",
        }}
      >
        {/* Pasek górny 40 px z wyśrodkowaną pigułką adresu (bez 3 kropek) */}
        <div className="h-10 px-4 border-b border-line/70 flex items-center justify-center bg-surface/85 relative shrink-0">
          <div className="px-3.5 py-1 rounded-full bg-secondary/80 border border-line/60 text-[13px] font-sans font-medium text-ink-muted">
            przyklad.example
          </div>
        </div>

        {/* Zawartość makiety strony firmowej w tokenach marki */}
        <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between overflow-hidden">
          
          {/* a) Rząd nawigacji: zielony kwadrat + pasek jako logo, 4 krótkie paski, mały przycisk po prawej */}
          <div className="flex items-center justify-between pb-3 border-b border-line/50 shrink-0">
            <div className="hero-anim-nav-logo flex items-center gap-1.5">
              <div className="w-3.5 h-3.5 rounded-xs bg-accent" />
              <div className="w-14 h-2.5 rounded-full bg-ink/80" />
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <div className="hero-anim-nav-1 w-8 h-2 rounded-full bg-ink-muted/30" />
              <div className="hero-anim-nav-2 w-10 h-2 rounded-full bg-ink-muted/30" />
              <div className="hero-anim-nav-3 w-8 h-2 rounded-full bg-ink-muted/30" />
              <div className="hero-anim-nav-4 w-9 h-2 rounded-full bg-ink-muted/30" />
            </div>

            <div className="hero-anim-nav-btn w-12 sm:w-14 h-5 rounded-full bg-accent/85" />
          </div>

          {/* b) Strefa hero: 3 paski nagłówka, 2 paski opisu, przycisk z tekstem, po prawej rosnące słupki */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4 items-center py-2 sm:py-3 my-auto">
            <div className="col-span-8 space-y-2.5">
              <div className="space-y-1.5">
                <div className="hero-anim-head-1 h-2.5 sm:h-3 rounded-xs bg-ink w-[92%]" />
                <div className="hero-anim-head-2 h-2.5 sm:h-3 rounded-xs bg-ink w-[78%]" />
                <div className="hero-anim-head-3 h-2.5 sm:h-3 rounded-xs bg-ink w-[52%]" />
              </div>

              <div className="space-y-1 pt-0.5">
                <div className="hero-anim-desc-1 h-1.5 rounded-full bg-ink-muted/50 w-[85%]" />
                <div className="hero-anim-desc-2 h-1.5 rounded-full bg-ink-muted/40 w-[65%]" />
              </div>

              <div className="pt-1.5">
                <span className="hero-anim-btn inline-flex items-center justify-center px-3.5 py-1.5 rounded-md bg-accent text-[15px] font-semibold text-accent-foreground shadow-xs border border-accent/20 cursor-default">
                  Zapytaj o wycenę
                </span>
              </div>
            </div>

            {/* Zaokrąglony blok z motywem rosnących słupków z logo */}
            <div className="col-span-4 flex justify-end">
              <div className="hero-anim-graphic rounded-xl border border-line bg-secondary/35 p-2.5 sm:p-3 h-20 sm:h-24 w-24 sm:w-28 flex items-end justify-center gap-1.5 sm:gap-2">
                <div className="w-2 rounded-xs bg-accent/60 h-[28%]" />
                <div className="w-2 rounded-xs bg-accent/80 h-[48%]" />
                <div className="w-2 rounded-xs bg-accent h-[72%]" />
                <div className="w-2 rounded-xs bg-accent h-[96%]" />
              </div>
            </div>
          </div>

          {/* c) Pod spodem: trzy równe karty (kółko + dwa paski) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 py-1 shrink-0">
            <div className="hero-anim-card-1 rounded-lg border border-line/70 bg-secondary/25 p-2 sm:p-2.5 flex flex-col gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-accent/25" />
              <div className="w-full h-1.5 rounded-full bg-ink-muted/40" />
              <div className="w-2/3 h-1.5 rounded-full bg-ink-muted/25" />
            </div>

            <div className="hero-anim-card-2 rounded-lg border border-line/70 bg-secondary/25 p-2 sm:p-2.5 flex flex-col gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-accent/25" />
              <div className="w-full h-1.5 rounded-full bg-ink-muted/40" />
              <div className="w-2/3 h-1.5 rounded-full bg-ink-muted/25" />
            </div>

            <div className="hero-anim-card-3 hidden sm:flex rounded-lg border border-line/70 bg-secondary/25 p-2 sm:p-2.5 flex-col gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full bg-accent/25" />
              <div className="w-full h-1.5 rounded-full bg-ink-muted/40" />
              <div className="w-2/3 h-1.5 rounded-full bg-ink-muted/25" />
            </div>
          </div>

          {/* d) Cienki pasek stopki */}
          <div className="border-t border-line/50 pt-2 flex items-center justify-between shrink-0">
            <div className="w-16 h-1.5 rounded-full bg-ink-muted/30" />
            <div className="w-20 h-1.5 rounded-full bg-ink-muted/20" />
          </div>
        </div>
      </div>

      {/* Jeden podpis pod oknem */}
      <figcaption className="mt-3 sm:mt-4 text-center sm:text-left text-[13px] font-sans text-ink-muted select-none text-balance leading-normal">
        Przykładowa strona, ilustracja.
      </figcaption>
    </figure>
  );
}
