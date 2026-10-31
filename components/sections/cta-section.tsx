import * as React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/site.config";
import { RevealHeading } from "@/components/effects/reveal-heading";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { Phone, Clock } from "lucide-react";

const ContactForm = dynamic(
  () => import("@/components/sections/contact-form").then((m) => m.ContactForm),
  {
    loading: () => (
      <div className="h-64 flex items-center justify-center text-xs text-ink-muted font-mono">
        Ładowanie formularza...
      </div>
    ),
  }
);

export function CtaSection() {
  return (
    <Section
      id="kontakt-cta"
      data-section="cta"
      spacing="none"
      className="relative border-t border-b border-darkband-line bg-darkband-bg text-darkband-foreground overflow-hidden py-14 sm:py-20 lg:py-24"
    >
      {/* 1. Subtelna kratka SVG w tle ciemnego pasa CTA (pełna szerokość sekcji) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none z-0 opacity-25"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="cta-grid-pattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 48 48 M 0 48 L 48 48"
              stroke="var(--darkband-line)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cta-grid-pattern)" />
      </svg>

      {/* 2. Zakończenie krzywej wzrostu - biegnie przez całą sekcję i kończy się koralowym punktem zwieńczenia */}
      <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-0">
        <svg
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          className="w-full h-full opacity-40"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="cta-curve-area" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--darkband-accent)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--darkband-accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* Półprzezroczysty obszar pod krzywą - kończy się dokładnie w punkcie x=1320, y=65 */}
          <path
            d="M 0 540 C 320 520, 540 420, 780 240 C 980 120, 1160 80, 1320 65 L 1320 600 L 0 600 Z"
            fill="url(#cta-curve-area)"
          />
          {/* Główna rosnąca linia wzrostu - kończy się dokładnie w punkcie zwieńczenia x=1320, y=65 */}
          <path
            d="M 0 540 C 320 520, 540 420, 780 240 C 980 120, 1160 80, 1320 65"
            stroke="var(--darkband-accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Koralowa kropka zwieńczenia - bezpośrednio w wektorze SVG na końcu linii (x=1320, y=65) */}
          <circle
            cx="1320"
            cy="65"
            r="5"
            fill="var(--color-coral)"
            stroke="var(--darkband-bg)"
            strokeWidth="2"
          />
        </svg>

        {/* Etykieta tekstowa po prawej stronie kropki (1320/1440 = 91.667%, 65/600 = 10.833%) */}
        <div
          className="absolute -translate-y-1/2 flex items-center pointer-events-none select-none z-10 pl-3.5"
          style={{ left: "91.667%", top: "10.833%" }}
        >
          <span className="text-[11px] font-mono text-darkband-accent-text font-medium hidden sm:inline whitespace-nowrap">
            Cel: stały wzrost
          </span>
        </div>
      </div>

      <Container className="relative z-10">
        {/* Treść bezpośrednio w siatce 12-kolumnowej bez sztucznego zagnieżdżonego kontenera */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Lewa kolumna: Opis i dane kontaktowe */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-darkband-line bg-darkband-bg/80 text-[11px] font-mono font-semibold text-darkband-accent-text">
                <span className="w-1.5 h-1.5 rounded-full bg-darkband-accent" />
                Darmowa konsultacja techniczna
              </div>

              <RevealHeading
                as="h2"
                text="Rozpocznijmy współpracę nad Twoją nową stroną"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-darkband-foreground tracking-tight leading-tight"
              />
            </div>

            <p className="text-sm sm:text-base text-darkband-muted leading-relaxed max-w-lg">
              Opowiedz nam krótko, czym zajmuje się Twoja firma. W ciągu 24 godzin wrócimy z konkretną propozycją, terminem i bezpłatną wyceną.
            </p>

            <div className="pt-4 space-y-3.5 text-xs text-darkband-muted border-t border-darkband-line/60">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <CopyEmailButton
                  variant="inline"
                  className="text-darkband-muted hover:text-darkband-accent-text"
                />
              </div>

              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 text-darkband-muted hover:text-darkband-accent-text hover:underline transition-colors"
              >
                <Phone className="h-4 w-4 text-darkband-accent shrink-0" />
                <span className="font-mono text-sm">{siteConfig.contact.phone}</span>
              </a>

              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-darkband-accent shrink-0" />
                <span>Odpowiedź w 24 godziny (dni robocze)</span>
              </div>
            </div>
          </div>

          {/* Prawa kolumna: Formularz kontaktowy w czystej karcie */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-surface text-foreground p-6 sm:p-8 lg:p-10 shadow-elevated relative">
              <div className="text-base sm:text-lg font-bold font-heading text-ink mb-5 flex items-center justify-between pb-3 border-b border-line/60">
                <span>Szybkie zapytanie ofertowe</span>
                <span className="text-[11px] font-mono text-accent-text font-bold bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                  24h odpowiedź
                </span>
              </div>
              <ContactForm compact={true} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
