import * as React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { blogPosts } from "@/content/blog";

export function BlogPreviewSection() {
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <Section spacing="default" id="wiedza" className="border-t border-line">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {latestPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface hover:border-accent/60 transition-all duration-200"
            >
              <div className="p-6 sm:p-7 space-y-4">
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

              <div className="border-t border-line bg-surface-subtle/40 px-6 py-4 sm:px-7 sm:py-4 flex items-center justify-between transition-colors group-hover:bg-accent/5">
                <div className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>{post.formattedDate}</time>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  aria-label={`Czytaj artykuł: ${post.title}`}
                  className="inline-flex items-center text-xs font-semibold text-accent-text hover:text-accent-text/80 transition-colors"
                >
                  <span>Czytaj artykuł</span>
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
