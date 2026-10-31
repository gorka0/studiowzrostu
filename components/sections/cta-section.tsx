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
      <div className="h-64 flex items-center justify-center text-xs text-ink-muted">
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
      className="relative border-b border-line bg-surface/30"
    >
      <Container>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10 md:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Lewa kolumna: Opis i dane kontaktowe */}
            <div className="lg:col-span-5 text-left space-y-4">
              <RevealHeading
                as="h2"
                text="Rozpocznijmy współpracę nad Twoją nową stroną"
                className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-ink tracking-tight"
              />

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Opowiedz nam krótko, czym zajmuje się Twoja firma. W ciągu 24 godzin wrócimy z konkretną propozycją, terminem i bezpłatną wyceną.
              </p>

              <div className="pt-4 space-y-3 text-xs text-ink-muted border-t border-line">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <CopyEmailButton variant="inline" />
                </div>

                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-accent-text hover:underline transition-colors"
                >
                  <Phone className="h-4 w-4 text-accent-text shrink-0" />
                  <span>{siteConfig.contact.phone}</span>
                </a>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent-text shrink-0" />
                  <span>Odpowiedź w 24 godziny (dni robocze)</span>
                </div>
              </div>
            </div>

            {/* Prawa kolumna: Skrót formularza */}
            <div className="lg:col-span-7 rounded-xl border border-line bg-background p-6 sm:p-8">
              <div className="text-sm font-bold font-heading text-ink mb-4">
                Szybkie zapytanie ofertowe
              </div>
              <ContactForm compact={true} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
