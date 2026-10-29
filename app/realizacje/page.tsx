import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { projectsData } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, LayoutTemplate } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.projects.title,
  description: routesSeo.projects.description,
  path: "/realizacje",
});

export default function ProjectsOverviewPage() {
  return (
    <main className="flex-1 pb-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Realizacje" }]} className="mb-8" />

          <SectionHeader
            as="h1"
            title="Koncepcje wdrożeń dopasowane do branży"
            description="Nie publikujemy zmyślonych logotypów ani fałszywych referencji. Poniżej prezentujemy gotowe szablony architektoniczne i kierunki wdrożeń przygotowane pod kątem konwersji."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {projectsData.map((project) => (
              <Card
                key={project.id}
                className="flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
              >
                <div>
                  {/* Nagłówek okna projektu */}
                  <div className="h-48 rounded-t-2xl bg-muted/60 border-b border-border p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border" />
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                        {project.clientIndustry}
                      </span>
                    </div>

                    <div className="my-auto flex flex-col items-center justify-center text-center p-2">
                      <LayoutTemplate className="h-10 w-10 text-primary/40 group-hover:text-primary transition-colors mb-2" />
                      <span className="text-xs font-semibold text-foreground">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-background/80 border border-border text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle as="h2" className="text-xl group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-1 leading-relaxed">
                      {project.shortDescription}
                    </CardDescription>
                  </CardHeader>
                </div>

                <CardContent className="pt-0">
                  <div className="p-3 rounded-xl bg-muted/40 border border-border/80 text-[11px] text-muted-foreground">
                    <span className="font-mono text-primary font-medium mr-1.5">[Szkic]</span>
                    {project.placeholderNotice}
                  </div>
                </CardContent>

                <CardFooter className="pt-2 border-t border-border">
                  <Link
                    href={`/realizacje/${project.slug}`}
                    className="w-full inline-flex items-center justify-between text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Zobacz opis koncepcji (case study)</span>
                    <ArrowRight className="h-3.5 w-3.5" />
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
