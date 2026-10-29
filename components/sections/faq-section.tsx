import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Accordion } from "@/components/ui/accordion";
import { faqData } from "@/content/faq";
import { ArrowRight } from "lucide-react";

export function FaqSection() {
  return (
    <Section spacing="default" className="bg-card/30">
      <Container size="narrow">
        <SectionHeader
          title="Wszystko, co warto wiedzieć przed startem"
          description="Odpowiadamy na najczęstsze pytania właścicieli firm dotyczące procesu, technologii, terminów i kosztów wdrożenia nowej strony."
        />

        <Accordion items={faqData} className="mt-8" />

        <div className="mt-10 p-6 rounded-2xl border border-border bg-card text-center space-y-3">
          <h4 className="font-heading font-bold text-base text-foreground">
            Masz inne pytanie dotyczące Twojej branży?
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Chętnie odpowiemy podczas krótkiej, niezobowiązującej rozmowy. Bez presji sprzedażowej.
          </p>
          <div className="pt-2">
            <Link
              href="/kontakt"
              className="inline-flex items-center text-xs sm:text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <span>Napisz do nas lub zadzwoń</span>
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
