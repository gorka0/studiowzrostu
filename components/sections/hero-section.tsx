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
          
          {/* Główny nagłówek - wyśrodkowany, wyrazisty, o szwajcarskiej skali */}
          <h1 className="font-heading font-bold text-ink tracking-tight text-pretty">
            Nowoczesne strony internetowe dla rozwijających się firm. <br className="hidden sm:inline" />
            <span className="text-accent-text">Czysty kod nastawiony na wzrost.</span>
          </h1>

          {/* Podtytuł w języku korzyści */}
          <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed text-pretty">
            Projektujemy i wdrażamy szybkie strony firmowe, które czytelnie tłumaczą Twoją ofertę, świetnie działają na telefonach i zamieniają odwiedzających w zapytania ofertowe.
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

          {/* Dolny, wycentrowany pasek korzyści biznesowych */}
          <div className="mt-16 pt-8 border-t border-line/80 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-mono text-xs text-accent-text font-bold">
                01 • Pełna własność
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Strona należy w 100% do Ciebie – bez abonamentów i uzależnienia od agencji.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs text-accent-text font-bold">
                02 • Natychmiastowy start
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Oferta wyświetla się od razu po kliknięciu – bez pustego ekranu i czekania.
              </p>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-xs text-accent-text font-bold">
                03 • Święty spokój
              </div>
              <p className="text-xs text-ink-muted leading-relaxed">
                Brak kłopotliwych wtyczek, które psują stronę po automatycznej aktualizacji.
              </p>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
