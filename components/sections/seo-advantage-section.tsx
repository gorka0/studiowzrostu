"use client";

import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Search } from "lucide-react";

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

          {/* PRAWA KOLUMNA: Makieta wyników wyszukiwania (z płynnym ruchem na 1. miejsce) */}
          <div className="lg:col-span-6 w-full">
            <div className="rounded-2xl border border-line bg-card p-5 sm:p-7 shadow-card text-left space-y-4">
              
              {/* Pasek wyszukiwania w tokenach marki (bez nazw korporacji) */}
              <div className="flex items-center justify-between border-b border-line/70 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-ink">
                  <Search className="h-3.5 w-3.5 text-accent" />
                  <span>Wyniki wyszukiwania</span>
                </div>
                <span className="text-[10px] font-mono text-accent-text uppercase tracking-wider">
                  Ilustracja
                </span>
              </div>

              {/* Okno wyników z płynną animacją FLIP (przejście z dołu na szczyt) */}
              <div className="relative space-y-3 font-mono text-[11px] min-h-[300px]">
                
                {/* 1. Wyróżniony wynik firmy (animuje się z pozycji dolnej na samą górę) */}
                <motion.div
                  className="rounded-xl border border-accent/40 bg-accent/5 p-3.5 space-y-1.5 shadow-xs relative z-20"
                  initial={false}
                  animate={{
                    y: isMoved ? 0 : 210,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 14,
                  }}
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-accent-text font-bold">
                    <span>twojafirma.example</span>
                    <span>›</span>
                    <span>uslugi</span>
                  </div>
                  <div className="font-heading font-bold text-sm sm:text-base text-ink text-left leading-snug">
                    Twoja Firma · Nowoczesne usługi dla biznesu
                  </div>
                  <div className="text-[11px] text-ink-muted leading-relaxed">
                    Dedykowana oferta, przejrzysty cennik i szybka realizacja. Sprawdź referencje i zamów bezpłatną wycenę online.
                  </div>
                </motion.div>

                {/* 2. Szary wynik neutralny 1 */}
                <motion.div
                  className="p-3 rounded-lg border border-line/50 bg-surface/40 space-y-1 opacity-70"
                  animate={{ y: isMoved ? 0 : -85 }}
                  transition={{ type: "spring", stiffness: 70, damping: 14 }}
                >
                  <div className="h-2 w-28 bg-line rounded" />
                  <div className="h-3 w-3/4 bg-ink/30 rounded" />
                  <div className="h-2 w-full bg-line/60 rounded" />
                </motion.div>

                {/* 3. Szary wynik neutralny 2 */}
                <motion.div
                  className="p-3 rounded-lg border border-line/50 bg-surface/40 space-y-1 opacity-60"
                  animate={{ y: isMoved ? 0 : -85 }}
                  transition={{ type: "spring", stiffness: 70, damping: 14 }}
                >
                  <div className="h-2 w-32 bg-line rounded" />
                  <div className="h-3 w-2/3 bg-ink/30 rounded" />
                  <div className="h-2 w-4/5 bg-line/60 rounded" />
                </motion.div>

                {/* 4. Szary wynik neutralny 3 */}
                <motion.div
                  className="p-3 rounded-lg border border-line/50 bg-surface/40 space-y-1 opacity-50"
                  animate={{ y: isMoved ? 0 : -85 }}
                  transition={{ type: "spring", stiffness: 70, damping: 14 }}
                >
                  <div className="h-2 w-24 bg-line rounded" />
                  <div className="h-3 w-1/2 bg-ink/30 rounded" />
                </motion.div>
              </div>

              <div className="pt-2 border-t border-line/60 text-[10px] font-mono text-ink-muted text-right">
                Płynny wzrost widoczności dzięki czystej strukturze HTML i Core Web Vitals
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
