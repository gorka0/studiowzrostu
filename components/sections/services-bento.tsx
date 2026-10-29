import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { servicesList } from "@/content/services";
import { ArrowUpRight } from "lucide-react";

export function ServicesBento() {
  return (
    <Section spacing="default" id="uslugi" className="border-b border-line">
      <Container>
        <SectionHeader
          title="Zakres usług inżynieryjnych i projektowych"
          description="Projektujemy serwisy od fundamentów lub przebudowujemy istniejące rozwiązania, kładąc nacisk na błyskawiczne ładowanie i konwersję."
        />

        {/* Układ redakcyjny (Editorial Service Index) w miejsce szablonowego Bento Grid */}
        <div className="border-t border-line divide-y divide-line">
          {servicesList.map((service, idx) => {
            const indexNumber = String(idx + 1).padStart(2, "0");
            return (
              <Link
                key={service.slug}
                href={`/uslugi/${service.slug}`}
                className="group block py-6 sm:py-8 transition-colors hover:bg-surface-subtle/40 px-3 -mx-3 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline">
                  {/* Numer porządkowy w stylu redakcyjnym */}
                  <div className="md:col-span-1 font-mono text-sm text-primary font-semibold">
                    {indexNumber}
                  </div>

                  {/* Tytuł usługi */}
                  <div className="md:col-span-5 space-y-1">
                    <div className="text-xl sm:text-2xl font-bold font-heading text-ink group-hover:text-primary transition-colors flex items-center gap-2">
                      <span>{service.title}</span>
                      <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all -translate-y-0.5 group-hover:translate-x-0.5 text-primary shrink-0" />
                    </div>
                    <div className="text-xs text-primary font-medium md:hidden">
                      {service.tagline}
                    </div>
                  </div>

                  {/* Opis redakcyjny */}
                  <div className="md:col-span-4 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {service.shortDescription}
                  </div>

                  {/* Bezpośredni wskaźnik linku */}
                  <div className="md:col-span-2 text-right hidden md:flex justify-end items-center">
                    <span className="text-xs font-mono font-medium text-ink-muted group-hover:text-primary transition-colors inline-flex items-center gap-1">
                      Szczegóły
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Dół sekcji: bezpośredni kontakt */}
        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-ink-muted font-mono">
          <div>
            Każdy projekt realizowany jest bezpośrednio przez studio, bez podwykonawców.
          </div>
          <Link
            href="/uslugi"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            Pełny przegląd usług i procesu
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
