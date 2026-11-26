import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { BlogCatalog } from "@/components/sections/blog-catalog";
import { SubpageDarkCta } from "@/components/sections/subpage-dark-cta";
import { ArrowRight, FileText } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.blog.title,
  description: routesSeo.blog.description,
  keywords: routesSeo.blog.keywords,
  path: "/blog",
});

export default function BlogListPage() {
  const publishedPosts = blogPosts.filter((post) => !post.draft);

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

          {publishedPosts.length === 0 ? (
            <div className="mt-12 p-8 sm:p-12 rounded-2xl border border-line bg-surface/50 text-left max-w-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent-text">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-heading text-ink">
                Artykuły w przygotowaniu
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Przygotowujemy aktualne, merytoryczne publikacje o architekturze stron, optymalizacji Core Web Vitals oraz technologicznym SEO. Nowe artykuły pojawią się wkrótce po zakończeniu weryfikacji redakcyjnej.
              </p>
              <div className="pt-2">
                <Link
                  href="/uslugi"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-text hover:underline"
                >
                  <span>Sprawdź naszą ofertę wdrożeń</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ) : (
            <BlogCatalog posts={publishedPosts} />
          )}

          <SubpageDarkCta
            className="mt-16"
            heading="Chcesz przełożyć tę wiedzę na własną stronę firmową?"
            description="Przygotujemy bezpłatną wycenę wdrożenia lub przeanalizujemy obecną witrynę pod kątem szybkości i widoczności."
            ctaLabel="Zamów bezpłatną konsultację"
            secondaryLabel="Zobacz usługi"
            secondaryHref="/uslugi"
          />
        </Container>
      </Section>
    </main>
  );
}
