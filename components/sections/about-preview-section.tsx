import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";

export function AboutPreviewSection() {
  return (
    <Section
      id="o-nas-preview"
      spacing="none"
      className="border-b border-line bg-surface/30 py-6 sm:py-10"
      aria-label="Kto za tym stoi"
    >
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 text-left">
          {/* Ramka na zdjęcie: placeholder z inicjałami TG (jasno oznaczony do podmiany) */}
          <div className="shrink-0 flex flex-col items-center gap-1.5">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border border-line bg-surface-subtle shadow-2xs flex flex-col items-center justify-center text-ink shadow-xs select-none"
              aria-label="Ramka na zdjęcie Tomasza Górki (placeholder)"
            >
              <span className="font-heading font-bold text-[20px] text-accent-text tracking-wider">
                TG
              </span>
              <span className="text-[11px] font-sans text-ink-muted uppercase tracking-wider mt-1 text-center px-1">
                Założyciel
              </span>
            </div>
          </div>

          {/* Treść szkicu: 2–3 zdania bez wymyślonych kwalifikacji */}
          <div className="space-y-2.5 flex-1 text-left">
            <div className="text-[13px] font-semibold text-accent-text font-sans">
              Osoba odpowiedzialna za wdrożenie
            </div>

            <h2 className="font-heading font-bold text-[20px] text-ink leading-tight">
              Kto za tym stoi
            </h2>

            <p className="text-[15px] text-ink-muted leading-[1.5]">
              Studio prowadzi Tomasz Górka. Osobiście wdrażam strony w Next.js nastawione na czytelność i szybkość.
            </p>

            <div className="pt-1">
              <Link
                href="/o-nas"
                className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-text hover:underline transition-colors min-h-[44px] py-1 active:scale-[0.98]"
              >
                <span>Dowiedz się więcej o studiu</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
