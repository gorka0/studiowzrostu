import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContactForm, ContactInfoBlock } from "@/components/sections/contact-form";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.contact.title,
  description: routesSeo.contact.description,
  path: "/kontakt",
});

export default function ContactPage() {
  return (
    <main id="main-content" className="flex-1 pb-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Kontakt" }]} className="mb-8" />

          <SectionHeader
            as="h1"
            title="Porozmawiajmy o nowej stronie dla Twojej firmy"
            description="Opisz swoje potrzeby lub zadaj pytanie. Przygotujemy dla Ciebie bezpłatną analizę i konkretną propozycję współpracy."
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
            {/* Formularz kontaktowy (7 kolumn) */}
            <div className="lg:col-span-7 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-xs">
              <ContactForm />
            </div>

            {/* Blok informacyjny (5 kolumn) */}
            <div className="lg:col-span-5">
              <ContactInfoBlock />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
