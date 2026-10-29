import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Design System & Komponenty (Dev Only)",
  description: "Wewnętrzny podgląd design systemu Studia Wzrostu.",
  noIndexOverride: true,
});

export default function DesignPage() {
  // Blokada produkcyjna - w środowisku produkcyjnym strona zwraca 404
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="flex-1 pb-24">
      {/* Pasek informacyjny trybu deweloperskiego */}
      <div className="bg-primary/10 border-b border-primary/20 py-2.5 px-4 text-center text-xs font-medium text-accent-text">
        Środowisko Development – Strona <code>/design</code> jest zablokowana na produkcji (zwraca 404 + noindex).
      </div>

      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { label: "Design System" },
          ]}
          className="mb-8"
        />

        <SectionHeader
          title="Studio Wzrostu – Fundament Wizualny"
          description="Jasna, czysta, nowoczesna stylistyka oparta na szwajcarskiej siatce, rygorystycznym kontraście WCAG AA, ciepłej bieli, zieleni wzrostowej i koralowych akcentach."
          align="left"
        />

        {/* 1. PALETA KOLORÓW I TOKENY WCAG */}
        <Section spacing="sm">
          <div className="space-y-6">
            <div className="border-b border-border pb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold font-heading">1. Tokeny kolorystyczne & Kontrast WCAG AA</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Przełącz motyw:</span>
                <ThemeToggle size="sm" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Tło i Powierzchnia */}
              <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
                <div className="h-16 rounded-xl bg-background border border-border flex items-center justify-center text-xs font-mono font-medium">
                  --background
                </div>
                <div className="text-sm font-semibold">Tło Główne</div>
                <div className="text-xs text-muted-foreground font-mono">Jasny: #FBFAF6 | Ciemny: #0B1410</div>
                <div className="text-[11px] text-accent-text flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" /> Kontrast tekstu: &gt; 15:1 (AAA)
                </div>
              </div>

              {/* Powierzchnia / Karta */}
              <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
                <div className="h-16 rounded-xl bg-card border border-border flex items-center justify-center text-xs font-mono font-medium">
                  --card
                </div>
                <div className="text-sm font-semibold">Powierzchnie / Karty</div>
                <div className="text-xs text-muted-foreground font-mono">Jasny: #FFFFFF | Ciemny: #121E18</div>
                <div className="text-[11px] text-accent-text flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" /> Ostre obramowanie 1px
                </div>
              </div>

              {/* Akcent Główny: Zieleń */}
              <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
                <div className="h-16 rounded-xl bg-primary text-accent-text-foreground rounded-xl flex items-center justify-center text-xs font-mono font-bold">
                  --primary
                </div>
                <div className="text-sm font-semibold">Zieleń Wzrostowa</div>
                <div className="text-xs text-muted-foreground font-mono">Jasny: #188755 | Ciemny: #4ADE9C</div>
                <div className="text-[11px] text-accent-text flex items-center gap-1 font-medium">
                  <ShieldCheck className="h-3.5 w-3.5" /> WCAG AA: &gt; 4.5:1
                </div>
              </div>

              {/* Akcent Dodatkowy: Koral */}
              <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
                <div className="h-16 rounded-xl bg-coral text-coral-foreground rounded-xl flex items-center justify-center text-xs font-mono font-bold">
                  --coral
                </div>
                <div className="text-sm font-semibold">Akcent Koralowy (Oszczędny)</div>
                <div className="text-xs text-muted-foreground font-mono">Token stały: #FF7A45</div>
                <div className="text-[11px] text-foreground flex items-center gap-1 font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-coral" /> Używany w punktach akcji
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. TYPOGRAFIA */}
        <Section spacing="sm">
          <div className="space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-xl font-bold font-heading">2. Skala typograficzna (Bricolage Grotesque + Geist)</h3>
            </div>

            <div className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
              <div className="space-y-1">
                <span className="text-xs font-mono text-muted-foreground">h1 clamp(2.5rem, 6vw, 4.5rem) - letter-spacing: -0.02em</span>
                <h1 className="text-foreground">Projektujemy strony, które przyspieszają wzrost firm.</h1>
              </div>

              <div className="space-y-1 pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground">h2 clamp(1.875rem, 3.6vw, 2.875rem)</span>
                <h2 className="text-foreground">Dlaczego nowoczesny stack ma znaczenie dla Twoich zysków?</h2>
              </div>

              <div className="space-y-1 pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground">h3 text-2xl font-bold</span>
                <h3 className="text-2xl font-bold text-foreground">Szybkość ładowania poniżej 1 sekundy</h3>
              </div>

              <div className="space-y-1 pt-4 border-t border-border">
                <span className="text-xs font-mono text-muted-foreground">Tekst podstawowy (18px / 16px)</span>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">
                  Każda sekunda opóźnienia w ładowaniu strony zmniejsza liczbę zapytań od klientów. Tworzymy serwisy w Next.js i React, które działają błyskawicznie, budują zaufanie i zamieniają odwiedzających w klientów.
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center gap-4">
                <span className="text-xs font-mono text-muted-foreground">Podpisy & Kod:</span>
                <span className="text-xs text-muted-foreground">Podpis min. 13px</span>
                <code className="text-xs font-mono px-2 py-1 bg-muted rounded border border-border">
                  site.config.ts
                </code>
              </div>
            </div>
          </div>
        </Section>

        <Section spacing="sm">
          <div className="space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-xl font-bold font-heading">3. Identyfikacja i warianty Logo SVG</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-border bg-card flex flex-col items-center justify-center gap-4 min-h-[140px]">
                <Logo size="lg" />
                <span className="text-xs text-muted-foreground font-mono">Wordmark (lg)</span>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card flex flex-col items-center justify-center gap-4 min-h-[140px]">
                <Logo size="md" />
                <span className="text-xs text-muted-foreground font-mono">Wordmark (md - nagłówek)</span>
              </div>

              <div className="p-6 rounded-2xl border border-border bg-card flex flex-col items-center justify-center gap-4 min-h-[140px]">
                <Logo variant="mark" size="lg" />
                <span className="text-xs text-muted-foreground font-mono">Znak geometryczny (favicon / ikona)</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 4. PRZYCISKI, ODZNAKI I INTERAKCJE */}
        <Section spacing="sm">
          <div className="space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-xl font-bold font-heading">4. Komponenty akcji: Przyciski, Badges i Eyebrows</h3>
            </div>

            {/* Badges & Eyebrows */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Eyebrows & Etykiety</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow variant="growth">Nowość w ofercie</Eyebrow>
                <Eyebrow variant="coral">Rekomendowane rozwiązanie</Eyebrow>
                <Eyebrow variant="neutral">Wsparcie powdrożeniowe</Eyebrow>
                <Badge variant="growth">Next.js 16</Badge>
                <Badge variant="coral">Konwersja +40%</Badge>
                <Badge variant="secondary">TypeScript Strict</Badge>
                <Badge variant="outline">WCAG AA</Badge>
              </div>
            </div>

            {/* Przyciski standardowe i interaktywne */}
            <div className="space-y-3 pt-4 border-t border-border">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Przyciski</h4>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="default" className="rounded-full bg-primary text-accent-text-foreground hover:bg-primary/90">
                  <span>Rozpocznij projekt</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button variant="secondary" size="default" className="rounded-full">
                  Zobacz projekty
                </Button>

                <Button variant="outline" size="default" className="rounded-full">
                  Bezpłatna wycena
                </Button>

                {/* Magic UI Interactive Hover Button */}
                <InteractiveHoverButton>
                  Sprawdź ofertę
                </InteractiveHoverButton>
              </div>
            </div>
          </div>
        </Section>

        {/* 5. KARTY I UKŁAD MODUŁOWY */}
        <Section spacing="sm">
          <div className="space-y-6">
            <div className="border-b border-border pb-3">
              <h3 className="text-xl font-bold font-heading">5. Karty (Card Architecture)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-accent-text mb-2">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle>Szybkość i Performance</CardTitle>
                  <CardDescription>
                    Optymalizacja pod kątem wskaźników Google Core Web Vitals i błyskawicznego renderowania.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent-text shrink-0" />
                    <span>Czas ładowania poniżej 1.2 sekundy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent-text shrink-0" />
                    <span>Certyfikat SSL i CDN Vercel</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full rounded-xl">
                    Dowiedz się więcej
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-accent-text-foreground text-[10px] font-bold rounded-bl-xl uppercase tracking-wider">
                  Popularne
                </div>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-primary text-accent-text-foreground flex items-center justify-center mb-2">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <CardTitle>Dedykowane wdrożenie serwisu</CardTitle>
                  <CardDescription>
                    Projekt graficzny, kod w Next.js oraz przygotowanie treści nastawionych na kontakt.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent-text shrink-0" />
                    <span>Dedykowana szata graficzna</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent-text shrink-0" />
                    <span>Formularz z ochroną antyspamową</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button size="sm" className="w-full rounded-xl bg-primary text-accent-text-foreground hover:bg-primary/90">
                    Wybierz ten pakiet
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="h-10 w-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-foreground mb-2">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <CardTitle>Gwarancja i Wsparcie</CardTitle>
                  <CardDescription>
                    Pewność działania, bez ukrytych abonamentów i bez zbędnych, podatnych na błędy wtyczek.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent-text shrink-0" />
                    <span>Wsparcie powdrożeniowe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent-text shrink-0" />
                    <span>Pełna własność kodu źródłowego</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full rounded-xl">
                    Szczegóły wsparcia
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Section>
      </Container>
    </main>
  );
}
