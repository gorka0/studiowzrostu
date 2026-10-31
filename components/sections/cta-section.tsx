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
      spacing="default"
      className="relative border-b border-darkband-line bg-darkband-bg text-darkband-foreground overflow-hidden"
    >
      {/* Subtelna kratka SVG w tle ciemnego pasa CTA (niskie krycie) */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none z-0 opacity-30"
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

      <Container className="relative z-10">
        <div className="rounded-2xl border border-darkband-line bg-darkband-bg/90 backdrop-blur-xs p-6 sm:p-10 md:p-12 shadow-elevated relative overflow-hidden">
          
          {/* Zakończenie krzywej wykresu w tle (SVG rosnąca linia z koralową kropką) */}
          <svg
            viewBox="0 0 600 300"
            className="pointer-events-none absolute -bottom-10 -right-10 w-[360px] sm:w-[500px] h-auto select-none opacity-25 z-0"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 0 280 C 180 260, 320 200, 480 80 L 520 40"
              stroke="var(--darkband-accent)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="520" cy="40" r="7" className="fill-coral" />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            {/* Lewa kolumna: Opis i dane kontaktowe */}
            <div className="lg:col-span-5 text-left space-y-4">
              <RevealHeading
                as="h2"
                text="Rozpocznijmy współpracę nad Twoją nową stroną"
                className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-darkband-foreground tracking-tight"
              />

              <p className="text-sm sm:text-base text-darkband-muted leading-relaxed">
                Opowiedz nam krótko, czym zajmuje się Twoja firma. W ciągu 24 godzin wrócimy z konkretną propozycją, terminem i bezpłatną wyceną.
              </p>

              <div className="pt-4 space-y-3 text-xs text-darkband-muted border-t border-darkband-line">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <CopyEmailButton variant="inline" />
                </div>

                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 text-darkband-muted hover:text-darkband-accent-text hover:underline transition-colors"
                >
                  <Phone className="h-4 w-4 text-darkband-accent shrink-0" />
                  <span>{siteConfig.contact.phone}</span>
                </a>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-darkband-accent shrink-0" />
                  <span>Odpowiedź w 24 godziny (dni robocze)</span>
                </div>
              </div>
            </div>

            {/* Prawa kolumna: Skrót formularza */}
            <div className="lg:col-span-7 rounded-xl border border-line bg-background text-foreground p-6 sm:p-8 shadow-card relative">
              <div className="text-sm font-bold font-heading text-ink mb-4 flex items-center justify-between">
                <span>Szybkie zapytanie ofertowe</span>
                <span className="text-[10px] font-mono text-accent-text font-bold">24h odpowiedź</span>
              </div>
              <ContactForm compact={true} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
