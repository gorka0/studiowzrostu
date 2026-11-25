"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/site.config";
import { RevealHeading } from "@/components/effects/reveal-heading";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import type { ContactFormData } from "@/lib/contact-schema";
import { Check, Phone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const ContactForm = dynamic(
  () => import("@/components/sections/contact-form").then((m) => m.ContactForm),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 flex items-center justify-center text-sm text-ink-muted">
        Ładowanie formularza...
      </div>
    ),
  }
);

interface ScopeOption {
  id: "landing" | "firma" | "przebudowa";
  label: string;
  basePrice: number;
  minDays: number;
  maxDays: number;
  projectType: ContactFormData["projectType"];
}

interface AddonOption {
  id: string;
  label: string;
  price: number;
  extraDays: number;
}

const SCOPE_OPTIONS: ScopeOption[] = [
  {
    id: "landing",
    label: "Landing / Wizytówka",
    basePrice: 900,
    minDays: 4,
    maxDays: 7,
    projectType: "nowa-strona",
  },
  {
    id: "firma",
    label: "Strona firmowa",
    basePrice: 1400,
    minDays: 5,
    maxDays: 7,
    projectType: "nowa-strona",
  },
  {
    id: "przebudowa",
    label: "Przebudowa + SEO",
    basePrice: 1400,
    minDays: 7,
    maxDays: 10,
    projectType: "modernizacja-strony",
  },
];

const ADDON_OPTIONS: AddonOption[] = [
  { id: "seo-lokalne", label: "SEO lokalne", price: 300, extraDays: 1 },
  { id: "blog", label: "Sekcja bloga", price: 350, extraDays: 1 },
  { id: "analityka", label: "Pomiar konwersji", price: 200, extraDays: 0 },
];

export function CtaSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [shouldLoadForm, setShouldLoadForm] = React.useState(false);
  const [selectedScopeId, setSelectedScopeId] = React.useState<ScopeOption["id"]>("landing");
  const [selectedAddons, setSelectedAddons] = React.useState<string[]>([]);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadForm(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeScope = SCOPE_OPTIONS.find((s) => s.id === selectedScopeId) ?? SCOPE_OPTIONS[0];
  const activeAddonObjects = ADDON_OPTIONS.filter((a) => selectedAddons.includes(a.id));

  const estimatedPrice =
    activeScope.basePrice + activeAddonObjects.reduce((sum, a) => sum + a.price, 0);
  const extraDays = activeAddonObjects.reduce((sum, a) => sum + a.extraDays, 0);
  const minDays = activeScope.minDays + extraDays;
  const maxDays = activeScope.maxDays + extraDays;

  const formattedPrice = `${estimatedPrice.toLocaleString("pl-PL")} zł netto`;
  const addonsSummary =
    activeAddonObjects.length > 0
      ? ` + ${activeAddonObjects.map((a) => a.label).join(", ")}`
      : "";
  const estimatorSummary = `${activeScope.label}${addonsSummary} · szac. od ${formattedPrice} (${minDays}–${maxDays} dni)`;

  const switchAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Section
      ref={sectionRef}
      id="kontakt-cta"
      data-section="cta"
      spacing="none"
      className="relative border-t border-b border-darkband-line bg-darkband-bg text-darkband-foreground overflow-hidden py-7 sm:py-12 lg:py-18"
    >
      {/* 1. Subtelna kratka SVG w tle ciemnego pasa CTA */}
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

      {/* 2. Krzywa wzrostu z punktem zwieńczenia */}
      <div className="hidden md:block pointer-events-none absolute inset-0 w-full h-full overflow-hidden select-none z-0">
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
          <path
            d="M 0 540 C 320 520, 540 420, 780 240 C 980 120, 1160 80, 1320 65 L 1320 600 L 0 600 Z"
            fill="url(#cta-curve-area)"
          />
          <path
            d="M 0 540 C 320 520, 540 420, 780 240 C 980 120, 1160 80, 1320 65"
            stroke="var(--darkband-accent)"
            strokeWidth="3.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx="1320"
            cy="65"
            r="6"
            fill="var(--color-coral)"
            stroke="var(--darkband-bg)"
            strokeWidth="2"
          />
        </svg>

        <div
          className="absolute -translate-y-1/2 flex items-center pointer-events-none select-none z-10 pl-3.5"
          style={{ left: "91.667%", top: "10.833%" }}
        >
          <span className="text-[12px] font-sans text-darkband-accent-text font-semibold hidden sm:inline whitespace-nowrap">
            Cel: stały wzrost
          </span>
        </div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Lewa kolumna: opis, szybki konfigurator estymacji i dane kontaktowe */}
          <div className="lg:col-span-5 text-left space-y-5">
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-darkband-accent-text border-l-2 border-darkband-accent pl-2.5 leading-none">
                Darmowa konsultacja techniczna
              </div>

              <RevealHeading
                as="h2"
                text="Rozpocznijmy współpracę nad Twoją nową stroną"
                className="text-[clamp(1.75rem,7vw,2.25rem)] font-bold font-heading text-darkband-foreground tracking-tight leading-tight"
              />
            </div>

            <p className="text-[15.5px] text-darkband-muted leading-[1.55] max-w-lg">
              Wybierz orientacyjny zakres poniżej albo opisz temat w formularzu. Wrócimy z konkretną propozycją i stałą wyceną.
            </p>

            {/* Interaktywny mini-konfigurator zsynchronizowany z formularzem obok */}
            <div className="rounded-xl border border-darkband-line bg-darkband-bg/85 p-4 space-y-3.5">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-darkband-accent-text">
                Szybka estymacja zakresu
              </div>

              <LayoutGroup id="cta-scope-tabs">
                <div
                  role="radiogroup"
                  aria-label="Rodzaj wdrożenia"
                  className="grid grid-cols-1 sm:grid-cols-3 gap-1.5"
                >
                  {SCOPE_OPTIONS.map((scope) => {
                    const isSelected = scope.id === selectedScopeId;
                    return (
                      <button
                        key={scope.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setSelectedScopeId(scope.id)}
                        className={cn(
                          "relative px-2.5 py-2 rounded-lg text-[12px] font-medium transition-colors text-left sm:text-center cursor-pointer",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkband-accent",
                          isSelected
                            ? "text-darkband-bg font-bold"
                            : "text-darkband-muted hover:text-darkband-foreground border border-darkband-line/80"
                        )}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="cta-scope-pill"
                            transition={
                              prefersReducedMotion
                                ? { duration: 0 }
                                : { type: "spring", stiffness: 380, damping: 32 }
                            }
                            className="absolute inset-0 rounded-lg bg-darkband-accent z-0"
                          />
                        )}
                        <span className="relative z-10">{scope.label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>

              {/* Dodatkowe moduły opcjonalne */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {ADDON_OPTIONS.map((addon) => {
                  const active = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => switchAddon(addon.id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-medium border transition-colors cursor-pointer",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-darkband-accent",
                        active
                          ? "border-darkband-accent bg-darkband-accent/15 text-darkband-foreground"
                          : "border-darkband-line text-darkband-muted hover:text-darkband-foreground hover:border-darkband-muted/50"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3 w-3 transition-opacity",
                          active ? "text-darkband-accent opacity-100" : "opacity-35"
                        )}
                      />
                      <span>{addon.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Wynik estymacji odświeżany na żywo */}
              <div className="pt-2.5 border-t border-darkband-line/70 flex items-baseline justify-between gap-3">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-darkband-muted">
                    Orientacyjny start
                  </div>
                  <div className="font-heading font-bold text-[22px] text-darkband-accent-text tabular-nums leading-tight">
                    od {formattedPrice}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] uppercase tracking-wider text-darkband-muted">
                    Czas prac
                  </div>
                  <div className="font-heading font-semibold text-[15px] text-darkband-foreground tabular-nums">
                    {minDays}–{maxDays} dni roboczych
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-darkband-muted/85 leading-snug">
                Rozbudowane systemy wyceniamy indywidualnie przed podpisaniem umowy.
              </div>
            </div>

            <div className="pt-3 space-y-3 text-[13px] text-darkband-muted border-t border-darkband-line/60">
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
                <span className="text-sm font-semibold">{siteConfig.contact.phone}</span>
              </a>

              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-darkband-accent shrink-0" />
                <span>Sprawna odpowiedź w dni robocze</span>
              </div>
            </div>
          </div>

          {/* Prawa kolumna: formularz z automatycznie podstawionym wariantem */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-line bg-surface text-foreground p-6 sm:p-8 lg:p-10 shadow-elevated relative">
              <div className="text-[20px] font-bold font-heading text-ink mb-5 pb-3 border-b border-line/60">
                Szybkie zapytanie ofertowe
              </div>
              {shouldLoadForm ? (
                <ContactForm
                  compact={true}
                  presetProjectType={activeScope.projectType}
                  estimatorSummary={estimatorSummary}
                />
              ) : (
                <div className="h-64 flex items-center justify-center text-sm text-ink-muted">
                  Wczytywanie formularza...
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
