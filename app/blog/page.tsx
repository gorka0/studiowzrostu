import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { routesSeo } from "@/content/seo";
import { blogPosts } from "@/content/blog";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: routesSeo.blog.title,
  description: routesSeo.blog.description,
  path: "/blog",
});

export default function BlogListPage() {
  return (
    <main className="flex-1 pb-16">
      <Section spacing="sm">
        <Container>
          <Breadcrumbs items={[{ label: "Blog" }]} className="mb-8" />

          <SectionHeader
            as="h1"
            title="Jak technologia przekłada się na wyniki biznesowe"
            description="Konkretne analizy bez marketingowego żargonu. Wyjaśniamy, dlaczego architektura strony, czas ładowania i semantyczny kod decydują o sukcesie w sieci."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {blogPosts.map((post) => (
              <Card
                key={post.slug}
                className="flex flex-col justify-between hover:border-primary/50 transition-all duration-300 group"
              >
                <div>
                  <CardHeader className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-primary font-semibold uppercase tracking-wider">{post.category}</span>
                      <span className="text-coral">{post.draftNotice}</span>
                    </div>

                    <CardTitle as="h2" className="text-xl sm:text-2xl group-hover:text-primary transition-colors leading-tight">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>

                    <CardDescription className="text-sm leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                </div>

                <div>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{post.formattedDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="pt-2 border-t border-border/60">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      <span>Przeczytaj artykuł</span>
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Link>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
