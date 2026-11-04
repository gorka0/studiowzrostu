"use client";

import * as React from "react";
import Link from "next/link";
// Pure GPU CSS transitions for Micro-UI preview
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { servicesList } from "@/content/services";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  Search,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 4 autorskie makiety Micro-UI w standardzie Tesla/Vercel dla prawej kolumny sekcji usług.
 * Zero tekstu monospace, zero zmyślonych statystyk, czysta reprezentacja wizualna oferty.
 */
function ServicePreview({ slug }: { slug: string }) {
  // WIDOK 01: Nowoczesne strony internetowe dla firm (Desktop + Mobile wireframe premium)
  if (slug === "strony-internetowe") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs">
        {/* Kontener okna przeglądarki z zakotwiczoną miniaturką telefonu */}
        <div className="relative pt-1 pb-2">
          {/* Okno przeglądarki Desktop */}
          <div className="rounded-xl border border-line bg-surface/80 p-3 sm:p-3.5 space-y-3 shadow-xs">
            {/* Pasek górny przeglądarki */}
            <div className="flex items-center justify-between pb-2 border-b border-line/70">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-background border border-line/80 text-[11px] font-sans text-ink-muted">
                twojafirma.pl
              </div>
              <div className="w-8" />
            </div>

            {/* Mini-nawigacja wewnątrz strony */}
            <div className="flex items-center justify-between pb-2 border-b border-line/40">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent" />
                <div className="h-2 w-12 rounded-full bg-ink/70" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-6 rounded-full bg-line" />
                <div className="h-1.5 w-8 rounded-full bg-line" />
                <div className="h-1.5 w-6 rounded-full bg-line" />
              </div>
              <div className="h-4 px-2 rounded-md bg-accent text-[9px] font-bold text-accent-foreground flex items-center">
                Kontakt
              </div>
            </div>

            {/* Środek strony: 2 kolumny (hero copy + graphic block) */}
            <div className="grid grid-cols-12 gap-3 items-center py-0.5">
              {/* Lewa kolumna: hasło + paski tekstu + przycisk */}
              <div className="col-span-7 space-y-2">
                <div className="text-[13px] sm:text-[14px] font-bold font-heading text-ink leading-tight">
                  Twoja oferta, która budzi zaufanie
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-line/80" />
                  <div className="h-1.5 w-1/2 rounded-full bg-line/60" />
                </div>
                <div className="pt-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent text-accent-foreground text-[11px] font-semibold">
                    <span>Sprawdź ofertę</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Prawa kolumna: karta z korzyściami */}
              <div className="col-span-5">
                <div className="rounded-lg border border-line bg-background/90 p-2 sm:p-2.5 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-1.5 pb-1 border-b border-line/50">
                    <Building2 className="h-3.5 w-3.5 text-accent shrink-0" />
                    <div className="h-2 w-10 sm:w-12 rounded-full bg-ink/60" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Check className="h-2.5 w-2.5 text-accent shrink-0" />
                      <div className="h-1.5 w-10 sm:w-14 rounded-full bg-line" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-2.5 w-2.5 text-accent shrink-0" />
                      <div className="h-1.5 w-8 sm:w-11 rounded-full bg-line" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="h-2.5 w-2.5 text-accent shrink-0" />
                      <div className="h-1.5 w-12 sm:w-16 rounded-full bg-line" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mniejsza ramka smartfona nachodząca bezpośrednio na róg okna */}
          <div className="absolute -bottom-2 -right-1 sm:right-2 w-[102px] sm:w-[114px] rounded-xl border-2 border-surface bg-background shadow-elevated p-1.5 flex flex-col gap-1 z-20">
            <div className="w-5 h-1 mx-auto rounded-full bg-line" />
            <div className="space-y-1 pt-0.5">
              <div className="h-2 w-12 rounded-xs bg-ink/80" />
              <div className="h-1 w-14 rounded-full bg-line" />
              <div className="h-1 w-9 rounded-full bg-line/70" />
            </div>
            <div className="mt-0.5 py-1 px-1.5 rounded-md bg-accent text-accent-foreground text-[9px] font-bold flex items-center justify-center gap-1">
              <Phone className="h-2.5 w-2.5" />
              <span>Zadzwoń</span>
            </div>
          </div>
        </div>

        {/* Podpis pod spodem w 1 linii */}
        <div className="text-[12px] text-ink-muted text-center pt-3 font-medium">
          Przejrzysty układ dopasowany do komputerów i telefonów
        </div>
      </div>
    );
  }

  // WIDOK 02: Strony docelowe / Landing Page (Wizualna makieta skupiona na konwersji + Toast)
  if (slug === "landing-page") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs relative">
        {/* Góra makiety: nagłówek z hasłem i przekreślonym menu */}
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-line">
          <div className="text-[13px] sm:text-[14px] font-bold font-heading text-ink whitespace-nowrap">
            Jedna usługa. Jeden cel.
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-subtle border border-line text-[10px] text-ink-muted font-medium shrink-0">
            <span className="line-through opacity-40">Menu</span>
            <span className="text-accent-text font-semibold whitespace-nowrap">Brak rozpraszaczy</span>
          </div>
        </div>

        {/* Środek: makieta prostego formularza z 2 polami i dużym przyciskiem */}
        <div className="my-auto py-2">
          <div className="rounded-xl border border-line bg-surface/70 p-3 sm:p-3.5 space-y-2.5 max-w-[340px] mx-auto shadow-xs">
            {/* Pole 1: Imię i nazwisko */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-line bg-background text-[12px]">
              <User className="h-3.5 w-3.5 text-accent-text shrink-0" />
              <span className="font-medium text-ink">Jan Kowalski</span>
            </div>

            {/* Pole 2: Numer telefonu */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-line bg-background text-[12px]">
              <Phone className="h-3.5 w-3.5 text-accent-text shrink-0" />
              <span className="text-ink-muted font-medium">500 ••• •••</span>
            </div>

            {/* Duży wyraźny zielony przycisk CTA */}
            <div className="w-full py-2 px-3 rounded-lg bg-accent text-accent-foreground text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-xs">
              <Send className="h-3.5 w-3.5" />
              <span>Wyślij zapytanie</span>
            </div>
          </div>
        </div>

        {/* Wypukła karta powiadomienia (toast) nachodząca od dołu */}
        <div className="rounded-xl border border-accent/40 bg-surface shadow-elevated p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
            <Mail className="h-4 w-4" />
          </div>
          <div className="space-y-0.5 text-left flex-1 min-w-0">
            <div className="text-[12px] sm:text-[13px] font-bold text-ink leading-none">
              Nowe zapytanie z formularza
            </div>
            <div className="text-[11px] text-ink-muted leading-tight truncate">
              Klient prosi o wycenę usługi • przed chwilą
            </div>
          </div>
        </div>
      </div>
    );
  }

  // WIDOK 03: Pozycjonowanie i techniczne SEO (Google #1 w wynikach + sitelinki)
  if (slug === "seo-techniczne") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs space-y-3">
        {/* Pasek wyszukiwania */}
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-line bg-surface text-[12px] text-ink shadow-xs">
          <Search className="h-3.5 w-3.5 text-accent shrink-0" />
          <span className="font-medium text-ink truncate">&quot;Twoja branża + Twoje miasto&quot;</span>
        </div>

        {/* Wyróżniony wynik #1 w Google */}
        <div className="rounded-xl border-2 border-accent/40 bg-accent/5 p-3 sm:p-3.5 space-y-1.5">
          {/* Favicon + URL + badge #1 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-[9px] font-bold">
                W
              </div>
              <span className="text-[11px] font-medium text-ink">twojafirma.pl › oferta</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">
              #1 w wynikach
            </span>
          </div>

          {/* Nagłówek wyniku */}
          <div className="text-[13px] sm:text-[14px] font-bold text-accent-text hover:underline leading-snug">
            Twoja Firma – Sprawdzone usługi w Twoim regionie
          </div>

          {/* Sitelinki pod spodem (pigułki) */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-[11px] font-medium text-ink">
              Cennik
            </span>
            <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-[11px] font-medium text-ink">
              Realizacje
            </span>
            <span className="px-2 py-0.5 rounded-md bg-surface border border-line text-[11px] font-medium text-ink">
              Szybki kontakt
            </span>
          </div>
        </div>

        {/* Przygaszone wyniki konkurencji (#2 i #3 w formie szkieletowej) */}
        <div className="space-y-1.5 opacity-35 select-none">
          <div className="p-2 rounded-lg border border-line bg-surface space-y-1">
            <div className="h-1.5 w-24 rounded-full bg-ink-muted/50" />
            <div className="h-2 w-44 rounded-full bg-ink/70" />
          </div>
          <div className="p-2 rounded-lg border border-line bg-surface space-y-1">
            <div className="h-1.5 w-20 rounded-full bg-ink-muted/50" />
            <div className="h-2 w-36 rounded-full bg-ink/70" />
          </div>
        </div>

        {/* Podpis w 1 linii */}
        <div className="text-[12px] text-ink-muted text-center pt-1 font-medium">
          Bezbłędna semantyka i kod, który wyszukiwarki stawiają na szczycie
        </div>
      </div>
    );
  }

  // WIDOK 04: Przebudowa i przyspieszenie starej strony (Porównanie: Stara strona vs Po przebudowie)
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs space-y-3">
      {/* 2 kolumny porównania: Stara strona vs Po przebudowie */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
        {/* Karta lewa: Stara strona (chaotyczna, przygaszona) */}
        <div className="rounded-xl border border-line bg-surface/50 p-2.5 sm:p-3 space-y-2 opacity-75 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-1.5 border-b border-line text-[11px] font-bold text-ink-muted">
            <span>Stara strona</span>
            <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
          </div>

          <div className="space-y-2 py-1">
            <div className="flex items-center gap-1.5 text-destructive/90 text-[10px] font-medium">
              <Loader2 className="h-3 w-3 animate-spin shrink-0" />
              <span>Długie ładowanie...</span>
            </div>

            {/* Skręcone / chaotyczne paski */}
            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-xs bg-ink-muted/30 rotate-[-1deg]" />
              <div className="h-1.5 w-4/5 rounded-xs bg-ink-muted/25 rotate-[0.5deg]" />
              <div className="h-1.5 w-3/5 rounded-xs bg-ink-muted/20" />
            </div>
          </div>

          <div className="text-[10px] text-destructive/90 font-medium pt-1 border-t border-line/40">
            Nieczytelna na telefonie
          </div>
        </div>

        {/* Karta prawa: Po przebudowie (czysta, zielona ramka) */}
        <div className="rounded-xl border-2 border-accent/40 bg-accent/5 p-2.5 sm:p-3 space-y-2 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-1.5 border-b border-accent/20 text-[11px] font-bold text-accent-text">
            <span>Po przebudowie</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>

          <div className="space-y-2 py-1">
            <div className="flex items-center gap-1.5 text-accent-text text-[10px] font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
              <span>Błyskawiczny start</span>
            </div>

            <div className="space-y-1">
              <div className="h-2 w-3/4 rounded-full bg-ink/80" />
              <div className="h-1.5 w-full rounded-full bg-line" />
            </div>
          </div>

          <div className="py-1 px-2 rounded-md bg-accent text-accent-foreground text-[10px] font-bold text-center">
            Czytelna oferta
          </div>
        </div>
      </div>

      {/* Wspólny pasek gwarancji zachowania pozycji */}
      <div className="p-2.5 rounded-xl border border-line bg-surface flex items-center gap-2 text-left">
        <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
        <span className="text-[12px] font-medium text-ink">
          Zachowujemy Twoje dotychczasowe adresy i pozycje w Google
        </span>
      </div>
    </div>
  );
}

export function ServicesBento() {
  const [hoveredIdx, setHoveredIdx] = React.useState(0);
  const [openMobileIdx, setOpenMobileIdx] = React.useState<number | null>(0);

  const activeService = servicesList[hoveredIdx] || servicesList[0];

  return (
    <Section spacing="none" id="uslugi" className="border-b border-line bg-background py-6 sm:py-10 lg:py-16 text-[15px]">
      <Container>
        <SectionHeader
          title="Jak możemy pomóc Twojej firmie urosnąć"
          description="Tworzymy nowe strony i porządkujemy obecne – z naciskiem na czytelność oferty i pozyskiwanie klientów."
          align="left"
        />

        {/* 1. WIDOK MOBILNY / TABLET (<1024px): Czysty akordeon z konkretnymi elementami wdrożenia */}
        <div className="lg:hidden border-t border-line divide-y divide-line text-left mt-5 sm:mt-8">
          {servicesList.map((service, idx) => {
            const indexNumber = String(idx + 1).padStart(2, "0");
            const isOpen = openMobileIdx === idx;

            return (
              <div
                key={service.slug}
                className={cn(
                  "transition-colors duration-150 rounded-xl",
                  isOpen && "bg-surface/50"
                )}
              >
                {/* Przycisk nagłówka akordeonu */}
                <button
                  type="button"
                  onClick={() => setOpenMobileIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.slug}`}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 sm:p-5 min-h-[48px] text-left cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-xl",
                    "[@media(hover:hover)]:hover:bg-surface/40 active:scale-[0.98]"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-sans text-[13px] font-bold text-accent-text shrink-0">
                      {indexNumber}
                    </span>
                    <h3 className="text-[20px] font-bold font-heading text-ink leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="shrink-0 p-1 text-ink-muted">
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isOpen && "rotate-180 text-accent-text"
                      )}
                    />
                  </div>
                </button>

                {/* Rozwinięty panel z opisem i punktami */}
                <div
                  id={`service-panel-${service.slug}`}
                  className={cn("accordion-grid overflow-hidden", isOpen ? "open" : "invisible h-0")}
                >
                  <div className="accordion-inner min-h-0 overflow-hidden">
                    <div className="px-3 pb-3 sm:px-5 sm:pb-4 pt-1 space-y-3">
                      <p className="text-[15px] text-ink/80 leading-[1.5]">
                        {service.shortDescription}
                      </p>

                      <ul className="space-y-1.5 text-[14px] text-ink-muted list-none p-0 m-0 pt-0.5">
                        {service.solution.deliverables.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden="true" />
                            <span className="text-ink/80">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-1">
                        <Link
                          href={`/uslugi/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-text hover:underline transition-colors min-h-[44px] py-2 px-1 cursor-pointer active:scale-[0.98]"
                        >
                          <span>Szczegóły usługi</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. WIDOK DESKTOP (≥1024px): Układ asymetryczny 7:5 z dynamicznym podglądem Micro-UI */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          {/* LEWA KOLUMNA: 4 karty usług z wyraźnym stanem aktywnym */}
          <div className="lg:col-span-7 space-y-3 text-left">
            {servicesList.map((service, idx) => {
              const indexNumber = String(idx + 1).padStart(2, "0");
              const isSelected = hoveredIdx === idx;

              return (
                <div
                  key={service.slug}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onClick={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                  tabIndex={0}
                  className={cn(
                    "p-5 rounded-2xl border transition-colors duration-200 cursor-pointer text-left",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                    isSelected
                      ? "border-accent bg-surface shadow-xs ring-1 ring-accent/30"
                      : "border-line/70 bg-surface/30 hover:bg-surface/70 hover:border-line"
                  )}
                >
                  <div className="flex items-start gap-4">
                    {/* Numer usługi: pigułka akcentu w stanie aktywnym */}
                    <span
                      className={cn(
                        "font-sans text-[12px] font-bold px-2 py-0.5 rounded-full shrink-0 transition-colors",
                        isSelected
                          ? "bg-accent text-accent-foreground"
                          : "bg-surface-subtle text-ink border border-line/60"
                      )}
                    >
                      {indexNumber}
                    </span>

                    <div className="space-y-1.5 flex-1">
                      <h3
                        className={cn(
                          "text-[19px] font-bold font-heading leading-tight transition-colors",
                          isSelected ? "text-ink" : "text-ink/90"
                        )}
                      >
                        {service.title}
                      </h3>

                      <p className="text-[14px] sm:text-[15px] text-ink-muted leading-relaxed">
                        {service.shortDescription}
                      </p>

                      <div className="pt-1">
                        <Link
                          href={`/uslugi/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-text hover:underline transition-colors py-0.5"
                        >
                          <span>Poznaj wdrożenie i proces</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PRAWA KOLUMNA: Sticky makieta Micro-UI z płynną animacją przełączania */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 w-full">
            <div className="rounded-2xl border border-line bg-surface p-3.5 sm:p-4 shadow-card min-h-[440px] flex items-center justify-center">
              <div className="w-full h-full max-w-[480px]">
                <div
                    key={activeService.slug}
                    className="w-full h-full animate-in fade-in slide-in-from-bottom-2 duration-200 ease-out will-change-[transform,opacity]"
                  >
                    <ServicePreview slug={activeService.slug} />
                  </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dół sekcji: link do pełnego zestawienia */}
        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[13px] text-ink-muted text-left">
          <Link
            href="/uslugi"
            className="text-accent-text hover:underline font-semibold inline-flex items-center gap-1 shrink-0 min-h-[44px] py-1"
          >
            Pełny przegląd oferty i technologii
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
