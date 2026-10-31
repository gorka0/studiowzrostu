"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Search, MoreVertical } from "lucide-react";

const SEO_ADVANTAGES = [
  {
    number: "01",
    title: "Czytelna struktura dla wyszukiwarki",
    desc: "Układamy nagłówki i treści w logiczny sposób, dzięki czemu roboty Google precyzyjnie indeksują każdą Twoją usługę.",
  },
  {
    number: "02",
    title: "Szybkość premiowana przez algorytmy",
    desc: "Google oficjalnie promuje szybkie strony. Im szybciej Twoja witryna działa na telefonach, tym chętniej wyszukiwarka wyświetla ją wyżej.",
  },
  {
    number: "03",
    title: "Wizytówka i obecność lokalna",
    desc: "Optymalizujemy stronę pod zapytania lokalne, aby klienci z Twojego miasta i regionu trafiali wprost do Ciebie.",
  },
  {
    number: "04",
    title: "Gotowość na treści i bloga",
    desc: "Gdy zechcesz rozbudować stronę o artykuły poradnikowe lub opisy kolejnych realizacji, masz do tego gotowy, szybki fundament.",
  },
];

export function SeoAdvantageSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const shouldReduceMotion = useReducedMotion();

  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (isInView && !shouldReduceMotion) {
      const timer = setTimeout(() => {
        setHasAnimated(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView, shouldReduceMotion]);

  const isMoved = shouldReduceMotion || hasAnimated;

  return (
    <Section ref={sectionRef} spacing="default" className="bg-background border-b border-line">
      <Container>
        <SectionHeader
          title="Dlaczego nasze strony łatwiej zdobywają wysokie pozycje w Google?"
          description="Dobra oferta nie zadziała, jeśli klienci nie mogą na nią trafić. Budujemy strony tak, aby wyszukiwarka Google od razu rozumiała, czym się zajmujesz i komu pomagasz."
          align="left"
        />

        {/* UKŁAD 2-KOLUMNOWY: Lewo Checklista SEO (kol. 1–6), Prawo Makieta wyników wyszukiwania (kol. 7–12) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-8 sm:mt-10">
          
          {/* LEWA KOLUMNA: 4 elementy jako estetyczna checklista */}
          <div className="lg:col-span-6 space-y-4 text-left">
            {SEO_ADVANTAGES.map((item) => (
              <div
                key={item.number}
                className="p-4 sm:p-5 rounded-xl border border-line bg-surface/50 hover:bg-surface/80 transition-colors flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-accent" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent-text">
                      {item.number}
                    </span>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PRAWA KOLUMNA: Autentyczna makieta Google SERP */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl border border-line bg-surface overflow-hidden shadow-card text-left">
              
              {/* Belka wyszukiwarki Google z polem zapytania i filtrami */}
              <div className="p-4 sm:p-5 border-b border-line bg-surface-subtle/40 space-y-3">
                {/* Pasek wyszukiwania z zaokrągleniem, lupą i zapytaniem */}
                <div className="flex items-center gap-2.5 px-3.5 py-2 sm:py-2.5 rounded-full border border-line bg-background shadow-xs">
                  <Search className="h-4 w-4 text-accent shrink-0" />
                  <span className="font-sans text-xs sm:text-sm text-ink font-medium truncate flex-1">
                    nowoczesne strony internetowe dla firm
                  </span>
                  <div className="flex items-center gap-1.5 text-ink-muted shrink-0 text-xs font-mono">
                    <span className="hidden sm:inline text-[10px] bg-surface px-1.5 py-0.5 rounded border border-line/60">
                      Enter ↵
                    </span>
                  </div>
                </div>

                {/* Zakładki Google (Wszystko, Mapy, Grafika) + Metryka */}
                <div className="flex items-center justify-between text-xs text-ink-muted px-1">
                  <div className="flex items-center gap-3.5 sm:gap-5">
                    <span className="font-bold text-ink border-b-2 border-accent pb-1 cursor-default">
                      Wszystko
                    </span>
                    <span className="cursor-default hover:text-ink transition-colors">Mapy</span>
                    <span className="cursor-default hover:text-ink transition-colors">Grafika</span>
                    <span className="cursor-default hover:text-ink transition-colors hidden sm:inline">Wiadomości</span>
                  </div>
                  <span className="text-[10px] font-mono text-ink-muted/80 hidden sm:inline">
                    Około 162 000 wyników (0,26 s)
                  </span>
                </div>
              </div>

              {/* Płótno wyników organicznych z animacją wejścia na #1 pozycję */}
              <div className="p-4 sm:p-6 bg-background space-y-4 relative min-h-[380px]">
                
                {/* WYNIK #1: Twoja Firma (płynny ruch FLIP z dołu na sam szczyt) */}
                <motion.div
                  className="rounded-xl border border-accent/40 bg-accent/[0.04] p-4 space-y-2.5 relative z-20 shadow-xs"
                  initial={false}
                  animate={{
                    y: isMoved ? 0 : 200,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 75,
                    damping: 14,
                  }}
                >
                  {/* Nagłówek wyniku: Favicon + Nazwa firmy + Adres URL + Kebab menu */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-ink">Twoja Firma</span>
                        <span className="text-[11px] font-mono text-accent-text truncate">
                          https://twojadomena.pl › uslugi
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[9.5px] font-mono uppercase font-bold text-accent-text bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                        POZYCJA #1
                      </span>
                      <MoreVertical className="w-3.5 h-3.5 text-ink-muted/60" />
                    </div>
                  </div>

                  {/* Klikalny tytuł wyniku w stylu wyszukiwarki Google */}
                  <div className="text-base sm:text-lg font-heading font-bold text-ink hover:text-accent-text hover:underline cursor-pointer leading-snug">
                    Twoja Firma · Nowoczesne strony internetowe dla firm
                  </div>

                  {/* Rich Snippets (Gwiazdki, opinie, czas realizacji) */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono text-ink-muted">
                    <span className="text-coral font-bold tracking-tighter">★★★★★</span>
                    <span className="font-bold text-ink">5.0 (32)</span>
                    <span className="text-line">·</span>
                    <span>Czas realizacji: 3–4 dni</span>
                    <span className="text-line">·</span>
                    <span className="text-accent-text font-semibold">Cena z góry</span>
                  </div>

                  {/* Snippet / Meta opis */}
                  <p className="text-xs sm:text-[13px] text-ink-muted leading-relaxed font-sans">
                    Dedykowane serwisy internetowe zaprojektowane od zera pod pozyskiwanie klientów. Błyskawiczny czas ładowania poniżej 1s, pełne techniczne SEO i 100% własności kodu.
                  </p>

                  {/* Podstrony (Google Sitelinks) */}
                  <div className="pt-2 border-t border-accent/20 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-surface/80 border border-line/60">
                      <div className="font-semibold text-accent-text hover:underline cursor-pointer">
                        Cennik i zakres prac
                      </div>
                      <div className="text-[10.5px] text-ink-muted leading-tight mt-0.5">
                        Stała wycena ustalona przed startem.
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-surface/80 border border-line/60">
                      <div className="font-semibold text-accent-text hover:underline cursor-pointer">
                        Bezpłatna wycena
                      </div>
                      <div className="text-[10.5px] text-ink-muted leading-tight mt-0.5">
                        Odpowiedź i audyt w 24 godziny.
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* WYNIK #2 (Konkurencja / Standardowy wynik organiczny Google) */}
                <motion.div
                  className="space-y-1.5 pt-1 opacity-70"
                  animate={{ y: isMoved ? 0 : -100 }}
                  transition={{ type: "spring", stiffness: 75, damping: 14 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-line/60 shrink-0" />
                    <div className="h-2.5 w-36 bg-line/70 rounded" />
                  </div>
                  <div className="h-4 w-3/4 bg-ink/25 rounded" />
                  <div className="space-y-1 pt-0.5">
                    <div className="h-2.5 w-full bg-line/50 rounded" />
                    <div className="h-2.5 w-4/5 bg-line/50 rounded" />
                  </div>
                </motion.div>

                {/* WYNIK #3 (Konkurencja / Wolny szablon WordPress) */}
                <motion.div
                  className="space-y-1.5 pt-1 opacity-50"
                  animate={{ y: isMoved ? 0 : -100 }}
                  transition={{ type: "spring", stiffness: 75, damping: 14 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-line/60 shrink-0" />
                    <div className="h-2.5 w-44 bg-line/70 rounded" />
                  </div>
                  <div className="h-4 w-2/3 bg-ink/25 rounded" />
                  <div className="space-y-1 pt-0.5">
                    <div className="h-2.5 w-5/6 bg-line/50 rounded" />
                  </div>
                </motion.div>
              </div>

              {/* Dolny pasek parametrów */}
              <div className="px-5 py-3 border-t border-line bg-surface-subtle/50 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                <span>Struktura Schema.org + SSR</span>
                <span className="text-accent-text font-semibold">Organiczny wynik #1</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
