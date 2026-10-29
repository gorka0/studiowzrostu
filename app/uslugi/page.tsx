import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { servicesList } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.services.title,
  description: routesSeo.services.description,
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {servicesList.map((service) => (
              <SpotlightCard
                key={service.slug}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface hover:border-accent/60 transition-all duration-300 group shadow-xs"
              >
                <div>
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
                      <span className="text-accent-text font-semibold uppercase tracking-wider">Dedykowane wdrożenie</span>
                      <span>Next.js / React</span>
                    </div>

                    <CardTitle as="h2" className="text-2xl text-ink group-hover:text-accent-text transition-colors leading-tight">
                      <Link href={`/uslugi/${service.slug}`} className="hover:text-accent-text transition-colors">
                        {service.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-sm sm:text-base text-ink-muted leading-relaxed">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-surface-subtle border border-line text-xs sm:text-sm text-ink-muted leading-relaxed">
                      <strong className="text-ink block mb-1">Problem, który rozwiązujemy:</strong>
                      {service.problem.description}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-ink">Co zawiera wdrożenie:</div>
                      {service.solution.deliverables.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-ink-muted">
                          <Check className="h-3.5 w-3.5 text-accent-text shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-0 border-t border-line bg-surface-subtle/40 transition-colors group-hover:bg-accent/5">
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="w-full py-4 px-6 sm:px-8 flex items-center justify-between font-semibold text-sm text-accent-text hover:text-accent-text/80 transition-colors"
                  >
                    <span>Poznaj szczegóły usługi i proces</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardFooter>
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
