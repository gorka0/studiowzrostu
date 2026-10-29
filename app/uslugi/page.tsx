import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { servicesList } from "@/content/services";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.services.title,
  description: routesSeo.services.description,
  path: "/uslugi",
});

export default function ServicesOverviewPage() {
  return (
    <main className="flex-1 pb-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Usługi" }]} className="mb-8" />

          <SectionHeader
            as="h1"
            title="Usługi tworzone z myślą o wzroście firm"
            description="Nie sprzedajemy szablonów ani pustych obietnic. Każda usługa to dopracowany inżynierski proces skupiony na szybkości, estetyce i konwersji."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {servicesList.map((service) => (
              <Card
                key={service.slug}
                className="flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
              >
                <div>
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span className="text-primary font-semibold uppercase tracking-wider">Dedykowane wdrożenie</span>
                      <span>Next.js / React</span>
                    </div>

                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>

                    <CardDescription className="text-sm sm:text-base leading-relaxed">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-xl bg-muted/40 border border-border/80 text-xs text-muted-foreground leading-relaxed">
                      <strong className="text-foreground block mb-1">Problem, który rozwiązujemy:</strong>
                      {service.problem.description}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-foreground">Co zawiera wdrożenie:</div>
                      {service.solution.deliverables.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="pt-4 border-t border-border">
                  <Link
                    href={`/uslugi/${service.slug}`}
                    className="w-full inline-flex items-center justify-between font-semibold text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Poznaj szczegóły usługi i proces</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
