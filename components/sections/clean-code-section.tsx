import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { HIGHLIGHTED_CODE_HTML } from "@/content/clean-code-html";

export function CleanCodeSection() {
  return (
    <Section spacing="default" className="bg-surface/40 border-b border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEWA KOLUMNA (kol. 1–5): Szkic copy powiązany z hasłem z hero */}
          <div className="lg:col-span-5 text-left space-y-4">
            <div className="font-mono text-xs font-medium text-accent-text">
              Fundament technologiczny
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink tracking-tight">
              Czysty kod zamiast zbędnego balastu
            </h2>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Piszemy kod od podstaw, wykorzystując natywne możliwości nowoczesnego ekosystemu React i Next.js. Odrzucamy ciężkie wizualne kreatory i dziesiątki niesprawdzonych wtyczek, które spowalniają działanie serwisu.
            </p>

            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              W efekcie Twoja strona jest bezpieczna, błyskawiczna w renderowaniu i łatwa w utrzymaniu przez lata – bez ryzyka awarii przy aktualizacjach.
            </p>

            
          </div>

          {/* PRAWA KOLUMNA (kol. 6–12): Okno edytora kodu z podświetleniem Shiki */}
          <div className="lg:col-span-7 w-full text-left">
            <div className="rounded-2xl border border-line bg-card shadow-card overflow-hidden">
              {/* Belka okna edytora */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-line/70 bg-surface/80">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-line" />
                  <span className="w-3 h-3 rounded-full bg-line" />
                  <span className="w-3 h-3 rounded-full bg-line" />
                  <span className="ml-2 font-mono text-xs text-ink-muted font-medium">
                    app/page.tsx
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-accent-text font-medium px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
                    TypeScript
                  </span>
                </div>
              </div>

              {/* Treść kodu wygenerowana w buildzie przez Shiki (zero JS klienta) */}
              <div
                tabIndex={0}
                aria-label="Fragment kodu źródłowego Next.js"
                className="p-4 sm:p-6 overflow-x-auto text-xs sm:text-[13px] leading-relaxed font-mono focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text"
                dangerouslySetInnerHTML={{ __html: HIGHLIGHTED_CODE_HTML }}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
