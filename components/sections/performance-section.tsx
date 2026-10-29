import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

const METRICS_DATA = [
  {
    metricValue: "< 1.2 s",
    name: "Czas pierwszego wrażenia",
    business: "Gdy strona ładuje się dłużej niż 3 sekundy, ponad połowa odwiedzających wraca do wyszukiwarki. Nasze serwisy wyświetlają ofertę w ułamku sekundy, zatrzymując uwagę klienta od pierwszej chwili.",
  },
  {
    metricValue: "0 ms",
    name: "Płynność reakcji na dotyk",
    business: "Kliknięcie w menu, ofertę czy numer telefonu następuje bez najmniejszego opóźnienia. Użytkownik ma pełne poczucie stabilności i obcowania z dopracowanym serwisem.",
  },
  {
    metricValue: "0 px",
    name: "Stabilność wizualna układu",
    business: "Eliminujemy zjawisko przesuwających się nagle elementów podczas ładowania grafik i fontów. Układ jest zablokowany i stabilny od pierwszej klatki renderowania.",
  },
];

export function PerformanceSection() {
  return (
    <Section spacing="default" className="border-b border-line">
      <Container>
        <SectionHeader
          title="Dlaczego szybka strona w Next.js pomaga zdobyć więcej klientów?"
          description="Szybkość to nie kwestia estetyki, lecz bezpośredni czynnik rankingowy w Google i warunek konieczny, by klient zapoznał się z ofertą, a nie opuszczał serwisu."
        />

        {/* Trzy kolumny redakcyjne z mocną typografią metryk bez sztucznych ikonek w ramkach */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {METRICS_DATA.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between border-t border-line pt-6 space-y-4 text-left"
            >
              <div className="space-y-3">
                <div className="font-mono text-3xl sm:text-4xl font-bold text-accent-text tracking-tight">
                  {item.metricValue}
                </div>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-ink leading-snug">
                  {item.name}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pt-1">
                  {item.business}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
