import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { projectsData } from "@/content/projects";
import { ArrowRight } from "lucide-react";

export function ProjectsPreview() {
  return (
    <Section spacing="default" id="realizacje">
      <Container>
        <SectionHeader
          title="Przykładowe koncepcje wdrożeń"
          description="Projektujemy dedykowane serwisy dopasowane do specyfiki danej branży. Poniżej prezentujemy kierunki projektowe przygotowane z myślą o konwersji."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col justify-between hover:border-primary/40 transition-all duration-300 group"
            >
              <div>
                {/* Atrapa okna przeglądarki */}
                <div className="h-44 rounded-t-2xl bg-muted/50 border-b border-border p-4 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                    <span className="h-2.5 w-2.5 rounded-full bg-border" />
                  </div>

                  <div className="my-auto flex flex-col items-center justify-center text-center p-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                      {project.category}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-background/80 border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <CardHeader>
                  <div className="text-[11px] font-mono text-primary font-semibold uppercase tracking-wider mb-1">
                    {project.category}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm mt-1 leading-relaxed">
                    {project.shortDescription}
                  </CardDescription>
                </CardHeader>
              </div>

              <CardContent className="pt-0">
                <div className="p-3 rounded-lg bg-surface-subtle border border-line text-[11px] text-ink-muted font-mono">
                  {project.placeholderNotice}
                </div>
              </CardContent>

              <CardFooter className="pt-2 border-t border-border">
                <Link
                  href="/kontakt"
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-foreground hover:text-primary transition-colors"
                >
                  <span>Porozmawiajmy o podobnym wdrożeniu</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
