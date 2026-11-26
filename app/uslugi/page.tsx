import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { servicesList } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { ServicesCatalog } from "@/components/sections/services-catalog";
import { SubpageDarkCta } from "@/components/sections/subpage-dark-cta";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.services.title,
  description: routesSeo.services.description,
  keywords: routesSeo.services.keywords,
  path: "/uslugi",
});

export default function ServicesOverviewPage() {
  return (
    <main id="main-content" className="flex-1 pb-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Usługi" }]} className="mb-8" />

          <SectionHeader
            as="h1"
            title="Projektowanie i tworzenie stron www dla firm"
            description="Nie sprzedajemy szablonów ani przypadkowych motywów. Każda usługa to dopracowany inżynierski proces skupiony na szybkości, estetyce i konwersji."
            align="left"
          />

          {/* Baner transparentnej polityki cenowej */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl border border-line bg-surface/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <div className="eyebrow-line">Gwarancja warunków</div>
              <div className="font-heading font-bold text-ink text-base sm:text-lg pt-1">
                Przejrzyste zasady wyceny i stała stawka w umowie
              </div>
              <p className="text-xs sm:text-sm text-ink-muted max-w-2xl leading-relaxed">
                Dedykowane strony firmowe wdrażamy od <strong className="text-ink">900 zł netto</strong>. Każdy projekt ma z góry zdefiniowany zakres, harmonogram i brak ukrytych dopłat.
              </p>
            </div>
            <Link href="/kontakt" className="shrink-0 w-full sm:w-auto">
              <InteractiveHoverButton className="w-full sm:w-auto">
                Zamów wycenę
              </InteractiveHoverButton>
            </Link>
          </div>

          <ServicesCatalog services={servicesList} />

          <SubpageDarkCta
            className="mt-16"
            heading="Nie wiesz, który wariant sprawdzi się u Ciebie najlepiej?"
            description="Opisz w skrócie profil działalności, a w 24 godziny zaproponujemy najprostszy zakres prac oraz dokładny kosztorys."
            ctaLabel="Porozmawiajmy o projekcie"
            secondaryLabel="Zobacz realizacje"
            secondaryHref="/projekty"
          />
        </Container>
      </Section>
    </main>
  );
}
