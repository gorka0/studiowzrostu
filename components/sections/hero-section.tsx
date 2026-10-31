"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight, TrendingUp, MessageSquare, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { cn } from "@/lib/utils";

const BAR_HEIGHTS = [30, 42, 54, 66, 78, 88, 100];

function subscribeResize(notify: () => void) {
  window.addEventListener("resize", notify, { passive: true });
  return () => window.removeEventListener("resize", notify);
}

function emptySubscribe() {
  return () => {};
}

export function HeroSection() {
  const heroRef = React.useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Zgodna z React 19 detekcja klienta i szerokości ekranu (zero kaskadowych renderów w useEffect)
  const isHydrated = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDesktop = React.useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth >= 1024,
    () => false
  );

  React.useEffect(() => {
    // Reflektor podążający za kursorem (tylko pointer: fine, rAF + CSS variables, zero re-renderów)
    const el = heroRef.current;
    if (
      !el ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const onPointerMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          el.style.setProperty("--mouse-x", `${targetX}px`);
          el.style.setProperty("--mouse-y", `${targetY}px`);
          rafId = null;
        });
      }
    };

    const onPointerLeave = () => {
      el.style.setProperty("--mouse-x", "-1000px");
      el.style.setProperty("--mouse-y", "-1000px");
    };

    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Paralaksa kart (tylko transform, ±16–24 px względem scrolla, wyłączone na mobile i reduced-motion)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yCard1 = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const yCard2 = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const yCard3 = useTransform(scrollYProgress, [0, 1], [0, -22]);

  const canAnimateParallax = isHydrated && isDesktop && !shouldReduceMotion;

  return (
    <section
      ref={heroRef}
      className="relative w-full border-b border-line bg-background overflow-x-clip min-h-[640px] lg:min-h-[min(720px,calc(100svh-4.5rem))] flex flex-col justify-center py-12 sm:py-16 lg:py-20"
      aria-label="Wprowadzenie – Studio Wzrostu"
    >
      {/* 1. TŁO: Reflektor podążający za kursorem */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* 2. TŁO: Kratka 48px z maską radial/linear i znacznikami '+' */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none z-0"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 70%, transparent 100%)",
        }}
      >
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="192"
            height="192"
            patternUnits="userSpaceOnUse"
          >
            {/* Linie 48px standardowe */}
            <path
              d="M 48 0 L 48 192 M 96 0 L 96 192 M 144 0 L 144 192 M 0 48 L 192 48 M 0 96 L 192 96 M 0 144 L 192 144"
              strokeWidth="1"
              fill="none"
              className="hero-grid-subline"
            />
            {/* Co czwarta linia (192px) nieco mocniejsza */}
            <path
              d="M 0 0 L 192 0 M 0 0 L 0 192"
              strokeWidth="1"
              fill="none"
              className="hero-grid-majorline"
            />
          </pattern>

          {/* Maska radialna: biały (#fff) = widoczne, czarny (#000) = przezroczyste */}
          <radialGradient
            id="hero-grid-radial"
            cx="82%"
            cy="22%"
            r="70%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#888888" />
            <stop offset="85%" stopColor="#000000" />
          </radialGradient>

          <mask id="hero-grid-svg-mask">
            <rect width="100%" height="100%" fill="url(#hero-grid-radial)" />
          </mask>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#hero-grid-pattern)"
          mask="url(#hero-grid-svg-mask)"
        />

        {/* 5 małych znaczników '+' na przecięciach siatki w prawej górnej części */}
        <g
          mask="url(#hero-grid-svg-mask)"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="hero-grid-plus"
        >
          <path d="M 576 96 m -3 0 h 6 m -3 -3 v 6" />
          <path d="M 768 192 m -3 0 h 6 m -3 -3 v 6" />
          <path d="M 960 96 m -3 0 h 6 m -3 -3 v 6" />
          <path d="M 1152 288 m -3 0 h 6 m -3 -3 v 6" />
          <path d="M 1344 144 m -3 0 h 6 m -3 -3 v 6" />
        </g>
      </svg>

      {/* 3. TŁO: Duży rosnący wykres w tle (SVG z obszarem i linią) */}
      <svg
        viewBox="0 0 1440 680"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="hero-bg-curve-area-grad"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="var(--accent)"
              stopOpacity="0.10"
            />
            <stop
              offset="70%"
              stopColor="var(--accent)"
              stopOpacity="0.03"
            />
            <stop
              offset="100%"
              stopColor="var(--accent)"
              stopOpacity="0.0"
            />
          </linearGradient>
        </defs>

        {/* Półprzezroczysty obszar pod krzywą (max 10% krycia) */}
        <path
          d="M 0 600 C 400 560, 750 440, 1050 260 C 1220 160, 1340 100, 1440 70 L 1440 680 L 0 680 Z"
          fill="url(#hero-bg-curve-area-grad)"
          className="hero-bg-area"
        />

        {/* Linia krzywej w akcencie ok. 35% krycia (rysuje się 1.6s ease-out) */}
        <path
          d="M 0 600 C 400 560, 750 440, 1050 260 C 1220 160, 1340 100, 1440 70"
          fill="none"
          stroke="var(--accent)"
          strokeOpacity="0.35"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="hero-bg-curve"
        />
      </svg>

      {/* 4. ZAWARTOŚĆ: Siatka 12 kolumn (Desktop: 7 lewo + 5 prawo) */}
      <Container className="relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* LEWA KOLUMNA (kol. 1–7): Nagłówek, podtytuł, CTA, linia faktów */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Główny nagłówek H1 */}
            <h1 className="font-heading font-semibold text-ink tracking-tight text-pretty text-left text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] leading-[1.08]">
              Nowoczesne strony internetowe dla rozwijających się firm.{" "}
              <span className="text-accent-text block sm:inline">
                Czysty kod nastawiony na wzrost.
              </span>
            </h1>

            {/* Podtytuł */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-ink-muted leading-relaxed text-pretty text-left">
              Projektujemy i wdrażamy szybkie strony firmowe, które czytelnie tłumaczą Twoją ofertę, świetnie działają na telefonach i zamieniają odwiedzających w zapytania ofertowe.
            </p>

            {/* JEDEN główny przycisk CTA + link tekstowy */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Link href="/kontakt" className="w-full sm:w-auto">
                <InteractiveHoverButton className="w-full sm:w-auto">
                  Zamów bezpłatną wycenę
                </InteractiveHoverButton>
              </Link>

              <Link
                href="/projekty"
                className="inline-flex items-center justify-center text-sm font-semibold text-ink hover:text-accent-text transition-colors py-2.5 px-3 group"
              >
                <span>Zobacz projekty</span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Jedna linia faktów w jednym wierszu */}
            <div className="mt-8 pt-6 border-t border-line/70 flex flex-wrap items-center gap-2.5 text-xs font-mono text-ink-muted/90 select-none">
              <span>Strona w 3–4 dni</span>
              <span className="text-line select-none font-sans" aria-hidden="true">·</span>
              <span>Cena z góry</span>
              <span className="text-line select-none font-sans" aria-hidden="true">·</span>
              <span>Czysty kod</span>
            </div>
          </div>

          {/* PRAWA KOLUMNA (kol. 8–12): Trzy małe karty-wykresy */}
          <div className="lg:col-span-5 w-full">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-4 lg:gap-5 pb-3 lg:pb-0 pt-1 lg:pt-0 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 no-scrollbar">
              
              {/* KARTA 1: Widoczność w wyszukiwarce */}
              <motion.div
                initial={false}
                style={{ y: canAnimateParallax ? yCard1 : 0 }}
                className="w-[280px] sm:w-[310px] lg:w-full lg:max-w-[350px] shrink-0 snap-start rounded-xl border border-line bg-card/95 p-4 sm:p-5 shadow-card backdrop-blur-xs transition-colors duration-200 lg:self-start lg:translate-x-0"
              >
                <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="size-4 text-accent" aria-hidden="true" />
                    <span className="font-heading text-xs font-semibold text-ink">
                      Widoczność w wyszukiwarce
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-ink-muted bg-surface px-1.5 py-0.5 rounded border border-line select-none">
                    Ilustracja
                  </span>
                </div>

                <div className="mt-4 h-16 w-full relative">
                  <svg
                    viewBox="0 0 280 64"
                    className="w-full h-full overflow-visible select-none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="hero-sparkline-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 54 Q 40 50, 75 52 T 145 36 T 215 24 T 276 8 L 276 64 L 0 64 Z"
                      fill="url(#hero-sparkline-area)"
                    />
                    <path
                      d="M 0 54 Q 40 50, 75 52 T 145 36 T 215 24 T 276 8"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.25"
                      strokeLinecap="round"
                    />
                    <circle cx="276" cy="8" r="7" className="fill-accent/20" />
                    <circle cx="276" cy="8" r="3.5" className="fill-accent stroke-card stroke-2" />
                  </svg>
                </div>
              </motion.div>

              {/* KARTA 2: Zapytania (7 rosnących słupków w stylu logo) */}
              <motion.div
                initial={false}
                style={{ y: canAnimateParallax ? yCard2 : 0 }}
                className="w-[280px] sm:w-[310px] lg:w-full lg:max-w-[350px] shrink-0 snap-start rounded-xl border border-line bg-card/95 p-4 sm:p-5 shadow-card backdrop-blur-xs transition-colors duration-200 lg:self-end lg:translate-x-5"
              >
                <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="size-4 text-accent" aria-hidden="true" />
                    <span className="font-heading text-xs font-semibold text-ink">
                      Zapytania
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-ink-muted bg-surface px-1.5 py-0.5 rounded border border-line select-none">
                    Ilustracja
                  </span>
                </div>

                <div className="mt-4 h-16 w-full flex items-end justify-between gap-2 px-2 pb-1 relative">
                  {BAR_HEIGHTS.map((h, i) => {
                    const isTop = i === BAR_HEIGHTS.length - 1;
                    return (
                      <div
                        key={i}
                        className="flex-1 flex flex-col items-center h-full justify-end relative"
                      >
                        {isTop && (
                          <span
                            className="absolute -top-1.5 size-2 rounded-full bg-coral"
                            aria-hidden="true"
                          />
                        )}
                        <motion.div
                          initial={
                            isHydrated && !shouldReduceMotion
                              ? { scaleY: 0 }
                              : { scaleY: 1 }
                          }
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: i * 0.08,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          style={{
                            height: `${h}%`,
                            transformOrigin: "bottom",
                          }}
                          className={cn(
                            "w-full max-w-[11px] rounded-full transition-colors",
                            i < 2
                              ? "bg-ink/15 dark:bg-accent/15"
                              : i < 5
                              ? "bg-accent/40 dark:bg-accent/40"
                              : isTop
                              ? "bg-accent"
                              : "bg-accent/80"
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* KARTA 3: Szybkość strony (cienki pasek wypełniający się do pełna z etykietą 'szybko') */}
              <motion.div
                initial={false}
                style={{ y: canAnimateParallax ? yCard3 : 0 }}
                className="w-[280px] sm:w-[310px] lg:w-full lg:max-w-[350px] shrink-0 snap-start rounded-xl border border-line bg-card/95 p-4 sm:p-5 shadow-card backdrop-blur-xs transition-colors duration-200 lg:self-start lg:-translate-x-2"
              >
                <div className="flex items-center justify-between gap-2 border-b border-line/60 pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-accent" aria-hidden="true" />
                    <span className="font-heading text-xs font-semibold text-ink">
                      Szybkość strony
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-wider uppercase text-ink-muted bg-surface px-1.5 py-0.5 rounded border border-line select-none">
                    Ilustracja
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-ink-muted">
                      Wskaźnik CWV
                    </span>
                    <span className="font-mono text-[11px] font-semibold text-accent-text tracking-wider uppercase bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full">
                      szybko
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-surface-subtle border border-line/60 overflow-hidden p-0.5">
                    <motion.div
                      initial={
                        isHydrated && !shouldReduceMotion
                          ? { scaleX: 0 }
                          : { scaleX: 1 }
                      }
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{ transformOrigin: "left" }}
                      className="h-full w-full rounded-full bg-accent"
                    />
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
