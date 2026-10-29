import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { projectsData, ProjectItem } from "@/content/projects";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ProjectJsonLd } from "@/components/seo/json-ld";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";


interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return buildMetadata({ title: "Nie znaleziono projektu" });
  }

  return buildMetadata({
    title: project.seoTitle || `${project.title} | Studio Wzrostu`,
    description: project.shortDescription,
    path: `/realizacje/${project.slug}`,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project: ProjectItem | undefined = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex-1 pb-16">
      <ProjectJsonLd project={project} />
      <Section spacing="sm">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Realizacje", href: "/realizacje" },
              { label: project.title },
            ]}
            className="mb-8"
          />

          {/* Hero Projektu */}
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
              <span className="text-primary font-semibold">{project.category}</span>
              <span>•</span>
              <span>{project.clientIndustry}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {project.shortDescription}
            </p>

            <div className="p-3.5 rounded-xl border border-line bg-surface text-xs text-ink-muted">
              <span className="font-mono text-primary font-medium mr-1.5">[Szkic koncepcyjny]</span>
              {project.placeholderNotice}
            </div>
          </div>

          {/* Podsumowanie parametrów technologicznych */}
          <div className="mt-12 p-6 rounded-2xl border border-line bg-surface flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs uppercase font-semibold text-ink-muted tracking-wider">
                Wykorzystany stack
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-xs px-2.5 py-1 rounded bg-surface-subtle border border-line text-ink font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="font-mono text-xs text-primary font-semibold">
              Czysty kod produkcyjny • WCAG AA
            </div>
          </div>

          {/* 1. Wyzwanie biznesowe */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="space-y-3 p-6 sm:p-8 rounded-2xl border border-line bg-surface">
              <div className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                01 / Kontekst
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink">
                Wyzwanie biznesowe klienta
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3 p-6 sm:p-8 rounded-2xl border border-line bg-surface">
              <div className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                02 / Architektura
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink">
                Dedykowana architektura w Next.js
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* 2. Osiągnięte rezultaty jakościowe */}
          <div className="mt-16 p-8 sm:p-10 rounded-2xl border border-line bg-surface space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                Efekty wdrożenia
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink mt-1">
                Rezultaty jakościowe dla firmy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.results.map((res, idx) => (
                <div key={res} className="p-5 rounded-xl border border-line bg-surface-subtle space-y-2">
                  <div className="font-mono text-xs text-primary font-semibold">0{idx + 1}</div>
                  <span className="text-sm font-semibold text-ink leading-snug block">{res}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Projektu */}
          <div className="mt-16 p-8 rounded-3xl border border-border bg-card text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
              Potrzebujesz podobnego rozwiązania dla swojej firmy?
            </h2>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              Skontaktuj się z nami. Przeanalizujemy Twoją obecną stronę i zaproponujemy dedykowany harmonogram wdrożenia.
            </p>
            <div className="pt-2 flex justify-center">
              <Link href="/kontakt">
                <InteractiveHoverButton>
                  Zamów bezpłatną wycenę
                </InteractiveHoverButton>
              </Link>
            </div>
          </div>

          {/* Powrót do listy realizacji */}
          <div className="mt-12 text-center">
            <Link
              href="/realizacje"
              className="inline-flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>← Wróć do przeglądu realizacji</span>
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}
