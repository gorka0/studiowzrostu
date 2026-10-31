import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, type BlogPost } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArticleJsonLd, BreadcrumbListJsonLd } from "@/components/seo/json-ld";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  Zap,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return buildMetadata({ title: "Nie znaleziono artykułu" });
  }

  return buildMetadata({
    title: post.seoTitle || `${post.title} | Studio Wzrostu`,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    category: post.category,
  });
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post: BlogPost | undefined = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Blog", href: "/blog" },
    { label: post.title },
  ];

  const tocItems = post.sections.map((sec) => ({
    id: sec.id,
    heading: sec.heading,
  }));

  return (
    <main id="main-content" className="flex-1 pb-16">
      <ArticleJsonLd post={post} />
      <BreadcrumbListJsonLd items={breadcrumbItems} />

      <Section spacing="sm">
        <Container size="narrow">
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          <article className="space-y-10">
            {/* Nagłówek artykułu */}
            <header className="space-y-5 border-b border-line pb-8">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-accent-text font-semibold font-mono text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-ink-muted">•</span>
                <span className="text-ink-muted">Publikacja ekspercka</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-ink tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Metadane autora i daty */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-ink-muted pt-2 border-t border-line/60">
                <Link
                  href="/o-nas"
                  className="flex items-center gap-2 hover:text-accent-text transition-colors group"
                >
                  <div className="h-7 w-7 rounded-full bg-surface-subtle border border-line flex items-center justify-center text-accent-text font-bold">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold text-ink group-hover:text-accent-text transition-colors">
                      {post.author.name}
                    </span>
                    <span className="block text-[10px] text-ink-muted">
                      {post.author.role}
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-1.5 border-l border-line pl-4">
                  <Calendar className="h-3.5 w-3.5 text-accent-text" />
                  <time dateTime={post.date}>{post.formattedDate}</time>
                </div>

                <div className="flex items-center gap-1.5 border-l border-line pl-4">
                  <Clock className="h-3.5 w-3.5 text-accent-text" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </header>

            {/* Wstęp (Lead) */}
            <div className="text-lg sm:text-xl text-ink font-medium leading-relaxed italic border-l-2 border-accent-text pl-5 py-1 bg-surface-subtle/40 rounded-r-xl">
              {post.lead}
            </div>

            {/* Automatyczny spis treści (TOC) */}
            <TableOfContents items={tocItems} />

            {/* Sekcje treści z nagłówkami H2 i kotwicami */}
            <div className="space-y-12 pt-2 text-base sm:text-lg text-ink/90 leading-relaxed">
              {post.sections.map((sec, idx) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="space-y-5 scroll-mt-24 pt-4 border-t border-line/40 first:border-0 first:pt-0"
                >
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink tracking-tight pt-2">
                    {idx + 1}. {sec.heading}
                  </h2>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Wypunktowania jeśli zdefiniowane */}
                  {sec.bullets && sec.bullets.length > 0 && (
                    <ul className="space-y-2.5 my-4 pl-1">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-sm sm:text-base">
                          <CheckCircle2 className="h-4 w-4 text-accent-text shrink-0 mt-1" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Podsumowanie sekcji / Wniosek */}
                  {sec.keyTakeaway && (
                    <div className="my-6 p-4 rounded-xl border border-line bg-surface text-sm sm:text-base font-semibold text-ink flex items-start gap-3 shadow-xs">
                      <Bookmark className="h-5 w-5 text-accent-text shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase text-accent-text font-bold tracking-wider block mb-1">
                          Kluczowy wniosek:
                        </span>
                        {sec.keyTakeaway}
                      </div>
                    </div>
                  )}

                  {/* Kontekstowy link wewnętrzny */}
                  {sec.internalLink && (
                    <div className="p-3.5 rounded-lg bg-surface-subtle border border-line text-xs sm:text-sm text-ink-muted flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-accent-text shrink-0" />
                      <span>
                        {sec.internalLink.text}{" "}
                        <Link
                          href={sec.internalLink.href}
                          className="font-semibold text-accent-text hover:underline underline-offset-4"
                        >
                          {sec.internalLink.anchorText} →
                        </Link>
                      </span>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Wizytówka autora (E-E-A-T) */}
            <div className="mt-16 p-6 sm:p-8 rounded-2xl border border-line bg-surface flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-xs">
              <div className="h-16 w-16 rounded-full bg-surface-subtle border border-line flex items-center justify-center text-accent-text shrink-0">
                <User className="h-8 w-8" />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="font-heading font-bold text-lg text-ink">
                    {post.author.name}
                  </span>
                  <span className="text-xs font-mono text-accent-text font-medium">
                    {post.author.role}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {post.author.bio}
                </p>
                <div className="pt-1">
                  <Link
                    href="/o-nas"
                    className="text-xs font-semibold text-accent-text hover:underline underline-offset-4 inline-flex items-center gap-1"
                  >
                    <span>Dowiedz się więcej o naszej filozofii wdrożeń</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Komponent: Powiązana usługa (Callout / CTA) */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-line bg-surface text-left space-y-4 shadow-md">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-surface-subtle text-accent-text border border-line">
                <Zap className="h-3.5 w-3.5" />
                <span>{post.relatedService.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-ink">
                {post.relatedService.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {post.relatedService.description}
              </p>
              <div className="pt-2">
                <Link href={post.relatedService.href}>
                  <InteractiveHoverButton>
                    {post.relatedService.ctaText}
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>

            {/* Nawigacja powrotna */}
            <div className="pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-ink-muted">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-ink hover:text-accent-text transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Wróć do wszystkich artykułów</span>
              </Link>
              <Link
                href="/uslugi"
                className="inline-flex items-center gap-1.5 text-accent-text hover:underline underline-offset-4 transition-colors font-medium"
              >
                <span>Poznaj pełną ofertę Studio Wzrostu</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </Container>
      </Section>
    </main>
  );
}
