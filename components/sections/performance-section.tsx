import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const METRICS_DATA = [
  {
    badge: "Błyskawiczny start",
    title: "Otwiera się natychmiast",
    desc: "Klient nie czeka ani sekundy. Treść i zdjęcia pojawiają się od razu, nawet przy słabym zasięgu w telefonie.",
  },
  {
    badge: "Wygoda na telefonie",
    title: "Płynne działanie",
    desc: "Menu rozwija się bez zacięć, formularze klikają się precyzyjnie, a przeglądanie oferty jest w 100% naturalne.",
  },
  {
    badge: "Czytelność od razu",
    title: "Stabilny układ",
    desc: "Żadne przyciski ani teksty nie skaczą przed oczami podczas ładowania. Klient bez problemu trafia w numer telefonu.",
  },
];

export function PerformanceSection() {
  return (
    <Section spacing="default" className="border-b border-line">
      <Container>
        <SectionHeader
          title="Dlaczego szybka strona pomaga zdobyć więcej klientów?"
          description="Większość klientów przegląda Twoją ofertę na telefonie. Jeśli strona ładuje się zbyt wolno albo rozjeżdża na małym ekranie, klient zamyka kartę i dzwoni do konkurencji."
        />

        {/* Trzy kolumny redakcyjne z mocną typografią i korzyściami biznesowymi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {METRICS_DATA.map((item) => (
            <div
              key={item.badge}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-4 text-left"
            >
              <div className="space-y-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-accent/10 text-accent-text border border-accent/20">
                  {item.badge}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-ink leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
