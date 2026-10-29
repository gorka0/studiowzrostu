import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/site.config";
import { Mail, Phone, Clock } from "lucide-react";

export function CtaSection() {
  return (
    <Section spacing="default" className="relative border-b border-line bg-surface/30">
      <Container>
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10 md:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Lewa kolumna: Opis i dane kontaktowe */}
            <div className="lg:col-span-5 text-left space-y-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-ink tracking-tight">
                Rozpocznijmy współpracę nad Twoją nową stroną
              </h2>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Opowiedz o profilu swojej działalności. Przygotujemy bezpłatną analizę techniczną oraz precyzyjną wycenę wdrożenia serwisu w Next.js.
              </p>

              <div className="pt-4 space-y-3 text-xs text-ink-muted border-t border-line">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors font-medium text-ink"
                >
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <span>{siteConfig.contact.email}</span>
                </a>

                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <span>{siteConfig.contact.phone}</span>
                </a>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary shrink-0" />
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
