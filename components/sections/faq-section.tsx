import * as React from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { faqData } from "@/content/faq";

export function FaqSection() {
  return (
    <Section spacing="default" className="bg-card/30">
      <Container size="narrow">
        <SectionHeader
          title="Wszystko, co warto wiedzieć przed startem"
          description="Odpowiadamy na najczęstsze pytania właścicieli firm dotyczące procesu, technologii, terminów i kosztów wdrożenia nowej strony."
        />

        <Accordion items={faqData} className="mt-8" />
      </Container>
    </Section>
  );
}
