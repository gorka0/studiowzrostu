import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full pt-16 pb-20 md:pt-28 md:pb-32 border-b border-line bg-background">
      <Container>
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          {/* Surowy znacznik studia bez pigułkowego obramowania */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-text font-semibold uppercase tracking-widest mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Niezależne studio projektowo-programistyczne</span>
          </div>

          {/* Główny nagłówek - wyśrodkowany, wyrazisty, o szwajcarskiej skali */}
          <h1 className="font-heading font-bold text-ink tracking-tight text-pretty">
            Strony internetowe dla firm – Bydgoszcz i cała Polska. <br className="hidden sm:inline" />
            <span className="text-accent-text">Nowoczesna architektura Next.js nastawiona na wzrost.</span>
          </h1>

          {/* Neutralny szkic podtytułu do autorskiej redakcji */}
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed text-pretty">
            Projektujemy i wdrażamy serwisy internetowe zorientowane na czytelną prezentację oferty, błyskawiczne ładowanie na smartfonach i bezpośrednie pozyskiwanie zapytań ofertowych.
          </p>

          {/* Kluczowe przewagi studia */}
          <div className="mt-4 font-mono text-xs uppercase tracking-wider text-accent-text font-semibold">
            Strona w 3–4 dni • Cena z góry
          </div>

          {/* Wyśrodkowana grupa akcji CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
            <Link href="/kontakt" className="w-full sm:w-auto">
              <InteractiveHoverButton className="w-full sm:w-auto">
                Zamów bezpłatną wycenę
              </InteractiveHoverButton>
            </Link>

            <Link
              href="/projekty"
              className="inline-flex items-center text-sm font-semibold text-ink hover:text-accent-text transition-colors py-2.5 px-4 group"
            >
              <span>Zobacz wybrane projekty</span>
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Dolny, wycentrowany pasek standardów inżynieryjnych */}
          <div className="mt-16 pt-8 border-t border-line/80 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-mono text-xs text-accent-text font-bold">
                01 • Pełna własność
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Czysty kod źródłowy bez comiesięcznych opłat za CMS.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs text-accent-text font-bold">
                02 • Czas reakcji &lt; 1.2s
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Server-Side Rendering gwarantuje brak pustych ekranów.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs text-accent-text font-bold">
                03 • Trwałość kodu
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Architektura React i TypeScript wolna od podatnych wtyczek.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
