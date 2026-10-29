import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Eye } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { conceptProjects, type ConceptProject } from "@/content/projects";
import { BeforeAfterSlider } from "@/components/effects/before-after-slider";
import { ConceptDialog } from "@/components/effects/concept-dialog";

interface ProjectsSectionProps {
  id?: string;
  className?: string;
  isStandalonePage?: boolean;
}

export function ProjectsPreview({
  id = "projekty",
  className,
  isStandalonePage = false,
}: ProjectsSectionProps) {
  return (
    <Section spacing={isStandalonePage ? "sm" : "default"} id={id} className={className}>
      <Container>
        <SectionHeader
          as={isStandalonePage ? "h1" : "h2"}
          title="Projekty"
          description="Trzy koncepcje własne. Firmy i treści są fikcyjne, a projekty pokazują, jak podchodzimy do układu, czytelności i szybkości."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
          {conceptProjects.map((project, index) => (
            <ConceptCard
              key={project.id}
              project={project}
              headingTag={isStandalonePage ? "h2" : "h3"}
              isPriority={isStandalonePage && index === 0}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ConceptCard({
  project,
  headingTag: HeadingTag = "h3",
  isPriority = false,
}: {
  project: ConceptProject;
  headingTag?: "h2" | "h3";
  isPriority?: boolean;
}) {
  const isSlider = Boolean(project.beforeImage && project.afterImage);

  return (
    <article className="group flex flex-col h-full rounded-2xl bg-surface border border-line shadow-xs hover:border-accent-text/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* 1. Atrapa okna przeglądarki */}
      <div className="bg-surface-subtle border-b border-line px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-mono text-ink-muted px-2 py-0.5 rounded bg-surface border border-line">
            koncepcja.example
          </span>
        </div>
        <span className="text-[11px] font-medium text-ink-muted">
          {isSlider ? "Przed / Po" : "Desktop + Mobile"}
        </span>
      </div>

      {/* 2. Zrzut ekranu (lub suwak dla koncepcji C) */}
      <div className="relative w-full aspect-[16/10] bg-surface-subtle overflow-hidden border-b border-line">
        {isSlider && project.beforeImage && project.afterImage ? (
          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            beforeAlt={project.beforeAlt || project.desktopAlt}
            afterImage={project.afterImage}
            afterAlt={project.afterAlt || project.desktopAlt}
            aspectRatio="aspect-[16/10]"
            className="border-0 rounded-none h-full"
          />
        ) : (
          <>
            {/* Zrzut ekranu desktop - unoptimized dla krystalicznej ostrości tekstu przy małej wadze (72 KB) */}
            <Image
              src={project.desktopImage}
              alt={project.desktopAlt}
              fill
              unoptimized
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              priority={isPriority}
              loading={isPriority ? undefined : "lazy"}
            />

            {/* Makieta telefonu ze zrzutem mobile w prawym dolnym rogu (ok. 22-24% szerokości) */}
            {project.mobileImage && (
              <div
                className="absolute -bottom-2 -right-1 w-[24%] min-w-[70px] max-w-[95px] aspect-[9/19] rounded-t-md rounded-b-none border-2 border-b-0 border-surface bg-surface shadow-xl overflow-hidden z-10 transition-transform duration-300 group-hover:-translate-y-1"
                aria-hidden="true"
              >
                <Image
                  src={project.mobileImage}
                  alt={project.mobileAlt || ""}
                  fill
                  unoptimized
                  className="object-cover object-top"
                  loading="lazy"
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* 3. Treść karty */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        {/* Plakietka "Koncepcja własna" + Tagi celu/rodzaju */}
        <ul aria-label="Kategorie projektu" className="flex flex-wrap items-center gap-1.5 mb-3 list-none p-0 m-0">
          <li>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-surface-subtle text-accent-text border border-line">
              Koncepcja własna
            </span>
          </li>
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] text-ink-muted bg-surface-subtle border border-line">
                {tag}
              </span>
            </li>
          ))}
        </ul>

        {/* Tytuł koncepcji */}
        <HeadingTag className="text-lg sm:text-xl font-heading font-bold text-ink group-hover:text-accent-text transition-colors leading-snug">
          {project.title}
        </HeadingTag>

        {/* Krótki opis */}
        <p className="text-xs sm:text-sm text-ink-muted mt-2 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Adnotacja o fikcyjnych danych */}
        <div className="mt-4 pt-3 border-t border-line/60 text-[11px] text-ink-muted">
          {project.disclaimer}
        </div>

        {/* 4. Dolna belka akcji (wyrównana do dołu dzięki mt-auto) */}
        <div className="mt-auto pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-line">
          {/* Przycisk otwierający okno Dialog */}
          <ConceptDialog
            project={project}
            trigger={
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-surface-subtle hover:bg-surface border border-line text-xs font-semibold text-ink hover:text-accent-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text"
              >
                <Eye className="h-3.5 w-3.5 text-accent-text" />
                <span>Zobacz koncepcję</span>
              </button>
            }
          />

          {/* Link do odpowiedniej usługi */}
          <Link
            href={project.serviceUrl}
            className="inline-flex items-center justify-center sm:justify-end gap-1.5 text-xs font-semibold text-accent-text hover:text-accent-text/80 transition-colors underline decoration-accent-text/40 underline-offset-4 py-1"
          >
            <span>{project.serviceLabel}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
