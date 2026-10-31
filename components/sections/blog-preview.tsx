import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { blogPosts } from "@/content/blog";

// Typograficzne okładki generowane w SVG/CSS (bez zdjęć, z siatką i unikalnym wykresem)
function BlogCoverIllustration({ slug }: { slug: string }) {
  if (slug === "jak-zdobyc-wiecej-klientow-ze-strony-internetowej") {
    // Okładka 1: Duża cyfra "01" + schodkowy wykres lejka konwersji
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl bg-surface border-b border-line flex items-center justify-between p-6 select-none" aria-hidden="true">
        {/* Subtelna kratka w tle */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" aria-hidden="true">
          <pattern id="blog-grid-1" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 24 24 M 0 24 L 24 24" stroke="var(--line)" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blog-grid-1)" />
        </svg>

        {/* Duża typografia liczbowa */}
        <svg className="relative z-10 w-24 h-16 select-none pointer-events-none" viewBox="0 0 100 60" aria-hidden="true">
          <text x="0" y="52" className="font-heading font-black text-6xl fill-ink/20 tracking-tighter select-none">
            01
          </text>
        </svg>

        {/* Mini wykres lejka konwersji */}
        <div className="relative z-10 w-28 h-16 flex flex-col justify-end gap-1.5">
          <div className="h-2 w-full bg-line rounded" />
          <div className="h-2 w-4/5 bg-accent/40 rounded" />
          <div className="h-2 w-3/5 bg-accent/70 rounded" />
          <div className="h-2.5 w-2/5 bg-accent rounded" />
        </div>
      </div>
    );
  }

  if (slug === "strona-internetowa-a-rozwoj-biznesu") {
    // Okładka 2: Duża cyfra "02" + rosnąca krzywa trendu
    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl bg-surface border-b border-line flex items-center justify-between p-6 select-none" aria-hidden="true">
        {/* Subtelna kratka w tle */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" aria-hidden="true">
          <pattern id="blog-grid-2" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 24 24 M 0 24 L 24 24" stroke="var(--line)" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#blog-grid-2)" />
        </svg>

        <svg className="relative z-10 w-24 h-16 select-none pointer-events-none" viewBox="0 0 100 60" aria-hidden="true">
          <text x="0" y="52" className="font-heading font-black text-6xl fill-ink/20 tracking-tighter select-none">
            02
          </text>
        </svg>

        {/* Mini krzywa wykresu */}
        <div className="relative z-10 w-32 h-16">
          <svg viewBox="0 0 120 60" className="w-full h-full overflow-visible" fill="none">
            <path d="M 10 50 Q 50 48, 80 25 T 110 8" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="110" cy="8" r="3.5" className="fill-coral" />
            <path d="M 10 50 Q 50 48, 80 25 T 110 8 L 110 55 L 10 55 Z" fill="color-mix(in oklab, var(--accent) 12%, transparent)" />
          </svg>
        </div>
      </div>
    );
  }

  // Okładka 3: Duża cyfra "03" + radar słupków pozycji SEO
  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-xl bg-surface border-b border-line flex items-center justify-between p-6 select-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" aria-hidden="true">
        <pattern id="blog-grid-3" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 24 24 M 0 24 L 24 24" stroke="var(--line)" strokeWidth="1" fill="none" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#blog-grid-3)" />
      </svg>

      <svg className="relative z-10 w-24 h-16 select-none pointer-events-none" viewBox="0 0 100 60" aria-hidden="true">
        <text x="0" y="52" className="font-heading font-black text-6xl fill-ink/20 tracking-tighter select-none">
          03
        </text>
      </svg>

      {/* Mini słupki pozycji SEO */}
      <div className="relative z-10 flex items-end gap-1.5 h-14">
        <div className="w-3.5 h-5 bg-line rounded-t" />
        <div className="w-3.5 h-8 bg-line rounded-t" />
        <div className="w-3.5 h-11 bg-accent/60 rounded-t" />
        <div className="w-3.5 h-14 bg-accent rounded-t relative">
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-coral" />
        </div>
      </div>
    </div>
  );
}

export function BlogPreviewSection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <Section spacing="default" id="wiedza" className="border-b border-line bg-surface/35">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4 text-left">
          <SectionHeader
            as="h2"
            title="Wiedza dla rosnących firm"
            description="Praktyczne analizy o architekturze stron, optymalizacji konwersji i pozycjonowaniu w Google. Bez marketingowego żargonu i bez pustych obietnic."
            align="left"
            className="mb-0 md:mb-0 max-w-2xl"
          />
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-accent-text hover:text-accent-text/80 transition-colors shrink-0 group self-start md:self-auto"
          >
            <span>Wszystkie artykuły na blogu</span>
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Karty artykułów z typograficznymi okładkami SVG/CSS (bez zdjęć!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-card hover:border-accent/60 transition-all duration-200 shadow-card text-left"
            >
              <div>
                {/* Okładka typograficzna SVG/CSS */}
                <BlogCoverIllustration slug={post.slug} />

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-accent-text font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-ink-muted">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg sm:text-xl text-ink group-hover:text-accent-text transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`} className="focus-visible:outline-none focus-visible:underline">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Dolna belka z datą i linkiem */}
              <div className="border-t border-line bg-surface/40 px-5 py-3.5 sm:px-6 sm:py-3.5 flex items-center justify-between transition-colors group-hover:bg-accent/5">
                <div className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>{post.formattedDate}</time>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Czytaj artykuł: ${post.title}`}
                  className="inline-flex items-center text-xs font-semibold text-accent-text hover:text-accent-text/80 transition-colors"
                >
                  <span>Czytaj</span>
                  <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
