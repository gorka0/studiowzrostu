import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.blog.title,
  description: routesSeo.blog.description,
  path: "/blog",
});

export default function BlogListPage() {
  return (
    <main id="main-content" className="flex-1 pb-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Blog" }]} className="mb-8" />

          <SectionHeader
            as="h1"
            title="Blog o technologii, SEO i rozwoju biznesu online"
            description="Konkretne analizy bez marketingowego żargonu. Wyjaśniamy, dlaczego architektura strony, czas ładowania i semantyczny kod decydują o sukcesie w sieci."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {blogPosts.map((post) => (
              <SpotlightCard
                key={post.slug}
                className="flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface hover:border-accent/60 transition-all duration-300 group shadow-xs"
              >
                <div>
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-accent-text font-semibold uppercase tracking-wider">{post.category}</span>
                      <div className="flex items-center gap-1.5 text-ink-muted">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <CardTitle as="h2" className="text-xl sm:text-2xl text-ink group-hover:text-accent-text transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-sm text-ink-muted leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                </div>

                <CardFooter className="p-0 border-t border-line bg-surface-subtle/40 transition-colors group-hover:bg-accent/5">
                  <div className="w-full py-4 px-6 sm:px-8 flex items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-ink-muted font-mono">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-accent-text" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.formattedDate}</span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs sm:text-sm font-semibold text-accent-text hover:text-accent-text/80 transition-colors shrink-0"
                    >
                      <span>Przeczytaj artykuł</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </CardFooter>
              </SpotlightCard>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
