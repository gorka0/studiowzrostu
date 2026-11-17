import * as React from "react";
import { Container } from "@/components/ui/container";

/**
 * FounderStrip — minimalistyczna belka "za tym stoją ludzie".
 * Cel: humanizacja marki, premium social proof, editorial feel.
 * Design: ciągła linia, inicjał w kółku, dane tekstowe + rok.
 * Zero animacji, zero kart, zero gradientów.
 */
export function FounderStrip() {
  return (
    <section
      aria-label="O Studio Wzrostu"
      className="relative border-b border-line bg-background py-5 sm:py-6"
    >
      {/* Górna linia dekoracyjna — Swiss grid accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent) 20%, var(--accent) 80%, transparent)",
          opacity: 0.15,
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          {/* Lewa strona: avatar + dane */}
          <div className="flex items-center gap-3.5">
            {/* Inicjał w kółku */}
            <div
              className="w-9 h-9 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0 select-none"
              aria-hidden="true"
            >
              <span className="text-[13px] font-bold font-heading text-accent-text leading-none">
                TG
              </span>
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-semibold text-ink">
                Tomasz Górka
              </span>
              <span className="text-[12px] text-ink-muted">
                Założyciel · Studio Wzrostu · Bydgoszcz, 2026
              </span>
            </div>
          </div>

          {/* Prawa strona: cytat / deklaracja */}
          <p className="text-[13px] text-ink-muted leading-[1.5] max-w-sm sm:text-right italic">
            &ldquo;Każdą stronę buduję jak własną &mdash; z czystym kodem
            i terminowym wdrożeniem.&rdquo;
          </p>
        </div>
      </Container>
    </section>
  );
}
