"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { conceptProjects, type ConceptProject } from "@/content/projects";
import { BeforeAfterSlider } from "@/components/effects/before-after-slider";
import { ConceptDialog } from "@/components/effects/concept-dialog";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

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
  const [activeSlide, setActiveSlide] = React.useState(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const hasNudged = React.useRef(false);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.offsetWidth * 0.86;
    const scrollPos = el.scrollLeft;
    const newIndex = Math.round(scrollPos / cardWidth);
    if (newIndex !== activeSlide && newIndex >= 0 && newIndex < conceptProjects.length) {
      setActiveSlide(newIndex);
    }
  };

  const scrollToSlide = (idx: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const card = el.children[idx] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setActiveSlide(idx);
    }
  };

  // B5: Jednorazowa podpowiedź przesunięcia po wejściu w widok (karta 2 przytrzaśnięcie)
  React.useEffect(() => {
    if (shouldReduceMotion || hasNudged.current || isStandalonePage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasNudged.current) {
          hasNudged.current = true;
          const el = carouselRef.current;
          if (el && window.innerWidth < 1024) {
            setTimeout(() => {
              el.scrollBy({ left: 32, behavior: "smooth" });
              setTimeout(() => {
                el.scrollTo({ left: 0, behavior: "smooth" });
              }, 400);
            }, 300);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    return () => observer.disconnect();
  }, [shouldReduceMotion, isStandalonePage]);

  return (
    <Section spacing="none" id={id} className={cn("py-6 sm:py-10 lg:py-16 text-[15px]", className)}>
      <Container>
        <SectionHeader
          as={isStandalonePage ? "h1" : "h2"}
          title="Projekty"
          description="Trzy autorskie koncepcje pokazujące nasze podejście do układu, czytelności i szybkości działania."
          align="left"
        />

        {/* Karuzela na mobile (<1024px) z scroll-snap / Siatka 3 kolumn na desktopie (>=1024px) */}
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex lg:grid overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid-cols-3 no-scrollbar"
        >
          {conceptProjects.map((project) => (
            <div
              key={project.id}
              className="w-[86%] sm:w-[72%] lg:w-full shrink-0 snap-center flex flex-col"
            >
              <ConceptCard
                project={project}
                headingTag={isStandalonePage ? "h2" : "h3"}
                isPriority={false}
              />
            </div>
          ))}
        </div>

        {/* Wskaźnik kropkowy na mobile */}
        <div
          className="flex lg:hidden justify-center items-center gap-1 mt-4 select-none"
          aria-label="Wskaźnik slajdów projektów"
        >
          {conceptProjects.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToSlide(i)}
              aria-label={`Przejdź do projektu ${i + 1}`}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center p-1 cursor-pointer active:scale-[0.98]"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all duration-200",
                  activeSlide === i ? "w-6 bg-accent" : "w-2 bg-line hover:bg-ink-muted/50"
                )}
              />
            </button>
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
  const primaryTag = project.tags[0];

  return (
    <article className="group flex flex-col h-full rounded-2xl bg-surface border border-line shadow-xs hover:border-accent-text/40 hover:shadow-lg transition-all duration-300 overflow-hidden text-left">
      {/* 1. Belka atrap okna przeglądarki z adresem */}
      <div className="bg-surface-subtle border-b border-line px-3.5 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-sans font-medium text-ink-muted px-2 py-0.5 rounded bg-surface border border-line">
            koncepcja.example
          </span>
        </div>
        <span className="text-[13px] font-medium text-ink-muted">
          {isSlider ? "Przed / Po" : "Desktop + Mobile"}
        </span>
      </div>

      {/* 2. Zrzut ekranu z delikatną paralaksą (±8px) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] bg-surface-subtle overflow-hidden border-b border-line">
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
          <div className="relative w-full h-full">
            <Image
              src={project.desktopImage}
              alt={project.desktopAlt}
              fill
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 72vw, 33vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              priority={isPriority}
              loading={isPriority ? undefined : "lazy"}
            />

{/* Czysty zrzut desktopowy bez tandetnych miniaturowych nakładek */}
          </div>
        )}
      </div>

      {/* 3. Treść karty (max 3 style tekstu, żadnych kart w karcie) */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[13px] font-medium bg-surface-subtle text-accent-text border border-line">
            Koncepcja własna
          </span>
          {primaryTag && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[13px] text-ink-muted bg-surface-subtle border border-line">
              {primaryTag}
            </span>
          )}
        </div>

        <HeadingTag className="text-[20px] font-bold font-heading text-ink group-hover:text-accent-text transition-colors leading-tight">
          {project.title}
        </HeadingTag>

        <p className="mt-2 text-[15px] text-ink-muted leading-[1.5] flex-1">
          {project.shortDescription}
        </p>

        {/* 4. Link i dialog koncepcji */}
        <div className="pt-3 border-t border-line/60 flex items-center justify-between gap-3">
          <Link
            href={project.serviceUrl}
            className="text-[13px] font-semibold text-accent-text hover:underline min-h-[44px] inline-flex items-center py-1"
          >
            <span>{project.serviceLabel}</span>
          </Link>

          <ConceptDialog
            project={project}
            trigger={
              <button
                type="button"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-semibold border border-line bg-surface hover:bg-surface-subtle transition-colors min-h-[44px] cursor-pointer active:scale-[0.98]"
              >
                <Eye className="h-4 w-4" />
                <span>Zobacz</span>
              </button>
            }
          />
        </div>
      </div>
    </article>
  );
}
