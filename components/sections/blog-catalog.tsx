"use client";

import * as React from "react";
import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import type { BlogPost } from "@/content/blog";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCatalogProps {
  posts: BlogPost[];
}

export function BlogCatalog({ posts }: BlogCatalogProps) {
  const prefersReducedMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = React.useState<string>("Wszystkie");

  const categories = React.useMemo(() => {
    const unique = Array.from(new Set(posts.map((p) => p.category)));
    return ["Wszystkie", ...unique];
  }, [posts]);

  const filteredPosts = React.useMemo(() => {
    if (selectedCategory === "Wszystkie") return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [posts, selectedCategory]);

  const useFeaturedHero = filteredPosts.length >= 3 && filteredPosts.length % 2 === 1;

  return (
    <div className="mt-8 space-y-8">
      {/* Pasek filtrów kategorii z płynną pigułką spring */}
      {categories.length > 2 && (
        <LayoutGroup id="blog-category-filter">
          <div
            role="tablist"
            aria-label="Filtruj artykuły po kategorii"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl border border-line bg-surface/80"
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "relative px-3.5 py-2 min-h-[36px] inline-flex items-center rounded-lg text-xs sm:text-[13px] font-medium transition-colors cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                    isSelected ? "text-ink font-semibold" : "text-ink-muted hover:text-ink"
                  )}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="blog-cat-pill"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 32 }
                      }
                      className="absolute inset-0 rounded-lg bg-secondary border border-line/80 shadow-2xs z-0"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      )}

      {/* Siatka artykułów: pierwszy wyróżniony na całą szerokość przy nieparzystej liczbie */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredPosts.map((post, idx) => {
          const isFeatured = useFeaturedHero && idx === 0;
          return (
            <motion.div
              key={post.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.05,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className={cn("flex", isFeatured && "md:col-span-2")}
            >
              <SpotlightCard className="w-full flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface hover:border-accent/60 transition-colors duration-200 group shadow-xs">
                <CardHeader className={cn("space-y-3", isFeatured && "sm:p-8")}>
                  <div className="flex items-center justify-between text-xs gap-3">
                    <span className="eyebrow-line">{post.category}</span>
                    <div className="flex items-center gap-1.5 text-ink-muted tabular-nums">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  <CardTitle
                    as="h2"
                    className={cn(
                      "text-ink group-hover:text-accent-text transition-colors leading-tight pt-1",
                      isFeatured ? "text-2xl sm:text-3xl max-w-3xl" : "text-xl sm:text-2xl"
                    )}
                  >
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>

                  <CardDescription
                    className={cn(
                      "text-ink-muted leading-relaxed",
                      isFeatured ? "text-sm sm:text-base max-w-3xl" : "text-sm"
                    )}
                  >
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="p-0 border-t border-line bg-surface-subtle/40 transition-colors group-hover:bg-accent/5">
                  <div className="w-full py-4 px-6 sm:px-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-ink-muted">
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
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
