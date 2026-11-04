import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { HeroBrowser } from "@/components/sections/hero-browser";
import { HeroReflector } from "@/components/sections/hero-reflector";

export function HeroSection() {
  return (
    <section
      className="relative w-full border-b border-line bg-background overflow-x-clip min-h-[min(640px,calc(100svh-6.5rem))] flex flex-col justify-center py-8 sm:py-10 lg:py-12"
      aria-label="Wprowadzenie – Studio Wzrostu"
    >
      {/* 1. TŁO: Reflektor podążający za kursorem (tylko pointer: fine) */}
      <HeroReflector />

      {/* 2. TŁO: Kratka 48px z maską radial/linear i znacznikami '+' */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none z-0"
        aria-hidden="true"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 75%, transparent 100%)",
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

      {/* 3. TŁO: Duży rosnący wykres w tle (DESKTOP ≥1024px, nie zmieniony wizualnie) */}
      <div className="hidden lg:block pointer-events-none absolute inset-0 z-0 h-full w-full select-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 680"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
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

          {/* Półprzezroczysty obszar pod krzywą */}
          <path
            d="M 0 620 C 360 580, 680 460, 960 300 C 1140 190, 1240 140, 1310 100 L 1310 680 L 0 680 Z"
            fill="url(#hero-bg-curve-area-grad)"
            className="hero-bg-area"
          />

          {/* Linia krzywej w akcencie ok. 45% krycia (biegnie ZA oknem) */}
          <path
            d="M 0 620 C 360 580, 680 460, 960 300 C 1140 190, 1240 140, 1310 100"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.45"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="hero-bg-curve"
          />

          {/* Koniec linii (usunięto oderwaną kropkę) */}
        </svg>
      </div>

      {/* 3b. TŁO: Łagodna niska krzywa w dolnej części hero (MOBILE <1024px, za makietą, krycie max 12%, kołowa kropka) */}
      <div className="lg:hidden pointer-events-none absolute bottom-0 inset-x-0 z-0 h-[240px] w-full select-none overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 400 240"
          preserveAspectRatio="none"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="hero-mobile-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0 230 C 120 220, 240 170, 400 110 L 400 240 L 0 240 Z"
            fill="url(#hero-mobile-grad)"
          />
          <path
            d="M 0 230 C 120 220, 240 170, 400 110"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.12"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Koniec linii mobile */}
        </svg>
      </div>

      {/* 4. ZAWARTOŚĆ: Siatka 12 kolumn (Desktop: kol. 1–6 lewo, kol. 7–12 prawo) */}
      <Container className="relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEWA KOLUMNA (kol. 1–6): Nagłówek, podtytuł, CTA, linia faktów */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Główny nagłówek H1 */}
            <h1 className="font-heading font-semibold text-ink tracking-tight text-pretty text-left text-3xl sm:text-4xl md:text-5xl lg:text-[3.15rem] xl:text-[3.5rem] leading-[1.08]">
              Nowoczesne strony internetowe dla rozwijających się firm.{" "}
              <span className="text-accent-text block sm:inline">
                Czysty kod nastawiony na wzrost.
              </span>
            </h1>

            {/* Podtytuł */}
            <p className="mt-5 sm:mt-6 max-w-xl text-[15px] text-ink-muted leading-[1.5] text-pretty text-left">
              Projektujemy i wdrażamy szybkie strony firmowe, które czytelnie przedstawiają ofertę i zamieniają odwiedzających w klientów.
            </p>

            {/* JEDEN główny przycisk CTA + link tekstowy / drugorzędny na mobile */}
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
              <Link href="/kontakt" prefetch={false} className="w-full sm:w-auto">
                <InteractiveHoverButton className="w-full sm:w-auto min-h-[48px]">
                  Zamów bezpłatną wycenę
                </InteractiveHoverButton>
              </Link>

              <Link
                href="/projekty"
                prefetch={false}
                className="w-full sm:w-auto inline-flex items-center justify-center text-[15px] font-semibold text-ink border border-line/80 bg-surface/80 hover:bg-surface hover:text-accent-text transition-colors py-2.5 px-5 rounded-xl group min-h-[48px]"
              >
                <span>Zobacz projekty</span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Jedna linia faktów w jednym wierszu (zredukowana pusta przestrzeń pod nią) */}
            <div className="mt-6 pt-4 border-t border-line/70 flex flex-wrap items-center gap-2.5 text-[13px] text-ink-muted/90 select-none">
              <span>Strona w tydzień</span>
              <span className="text-line select-none font-sans" aria-hidden="true">·</span>
              <span>Cena z góry</span>
              <span className="text-line select-none font-sans" aria-hidden="true">·</span>
              <span>Czysty kod</span>
            </div>
          </div>

          {/* PRAWA KOLUMNA (kol. 7–12): Okno przeglądarki z makietą strony i telefonem */}
          <div className="lg:col-span-6 w-full flex items-center justify-center lg:justify-end mt-4 lg:mt-0">
            <HeroBrowser />
          </div>

        </div>
      </Container>
    </section>
  );
}
