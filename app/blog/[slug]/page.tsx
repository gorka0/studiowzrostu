import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { blogPosts, BlogPost } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Bookmark } from "lucide-react";

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
  });
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post: BlogPost | undefined = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex-1 pb-16">
      <ArticleJsonLd post={post} />
      <Section spacing="sm">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
            className="mb-8"
          />

          <article className="space-y-8">
            {/* Nagłówek artykułu */}
            <header className="space-y-4 border-b border-border pb-8">
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-primary font-semibold uppercase tracking-wider">{post.category}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-coral">{post.draftNotice}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Metadane autora i daty */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{post.author.name}</div>
                    <div className="text-[10px] text-muted-foreground">{post.author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 border-l border-border pl-4">
                  <Calendar className="h-3.5 w-3.5" />
                  <time dateTime={post.date}>{post.formattedDate}</time>
                </div>

                <div className="flex items-center gap-1.5 border-l border-border pl-4">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </header>

            {/* Wstęp (Lead) */}
            <div className="text-lg sm:text-xl text-foreground/90 font-medium leading-relaxed italic border-l-2 border-primary pl-4">
              {post.content.lead}
            </div>

            {/* Sekcje treści */}
            <div className="space-y-10 pt-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
              {post.content.sections.map((sec, idx) => (
                <section key={sec.heading} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight pt-2">
                    {idx + 1}. {sec.heading}
                  </h2>

                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {sec.keyTakeaway && (
                    <div className="my-6 p-4 rounded-2xl border border-primary/25 bg-primary/5 text-sm sm:text-base font-semibold text-foreground flex items-start gap-3">
                      <Bookmark className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase text-primary font-bold tracking-wider block">Wniosek:</span>
                        {sec.keyTakeaway}
                      </div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Podsumowanie autora */}
            <div className="mt-16 p-6 sm:p-8 rounded-3xl border border-border bg-card/60 flex flex-col sm:flex-row items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                <User className="h-8 w-8" />
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <div className="font-heading font-bold text-base text-foreground">
                  Autor: {post.author.name}
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Założyciel Studia Wzrostu. Projektuje i wdraża strony internetowe w Next.js skupione na bezkompromisowej wydajności i mierzalnym wzroście biznesowym klientów.
                </div>
              </div>
            </div>

            {/* CTA z artykułu do formularza */}
            <div className="mt-12 p-8 rounded-3xl border border-primary/30 bg-card text-center space-y-4">
              <h3 className="text-2xl font-bold font-heading text-foreground">
                Chcesz wdrożyć te zasady w swojej firmie?
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Skontaktuj się z nami. Zbadamy Twoją obecną stronę i podpowiemy, które elementy wymagają pilnej poprawy.
              </p>
              <div className="pt-2 flex justify-center">
                <Link href="/kontakt">
                  <InteractiveHoverButton>
                    Zamów bezpłatny audyt strony
                  </InteractiveHoverButton>
                </Link>
              </div>
            </div>

            {/* Nawigacja powrotna */}
            <div className="pt-8 border-t border-border flex items-center justify-between text-xs font-semibold text-muted-foreground">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Wróć do listy wpisów</span>
              </Link>
              <Link
                href="/uslugi"
                className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors"
              >
                <span>Sprawdź nasze usługi</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        </Container>
      </Section>
    </main>
  );
}
