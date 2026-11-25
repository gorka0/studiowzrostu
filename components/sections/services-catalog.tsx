"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { ServiceDetail } from "@/content/services";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicesCatalogProps {
  services: ServiceDetail[];
}

export function ServicesCatalog({ services }: ServicesCatalogProps) {
  const prefersReducedMotion = useReducedMotion();
  const [featured, ...secondary] = services;

  if (!featured) return null;

  return (
    <div className="space-y-6 mt-10">
      {/* Karta główna 01 w pełnej szerokości na desktopie — eliminuje osieroconą 5. kartę */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <SpotlightCard className="overflow-hidden rounded-2xl border border-line bg-surface hover:border-accent/60 transition-colors duration-200 group shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 p-6 sm:p-8 items-center text-left">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="eyebrow-line">01 · Usługa bazowa</span>
                <span className="text-xs text-ink-muted">Next.js / React</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-ink group-hover:text-accent-text transition-colors leading-tight">
                <Link href={`/uslugi/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                {featured.shortDescription}
              </p>

              <p className="border-l-2 border-line pl-3.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                <strong className="text-ink font-semibold">Problem, który rozwiązujemy: </strong>
                {featured.problem.description}
              </p>

              <div className="pt-1">
                <Link
                  href={`/uslugi/${featured.slug}`}
                  className="inline-flex items-center gap-2 font-semibold text-sm text-accent-text hover:text-accent-text/80 transition-colors link-underline py-1"
                >
                  <span>Poznaj szczegóły wdrożenia</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-line/70 pt-5 lg:pt-0 lg:pl-8 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Zakres prac w standardzie
              </div>
              <div className="space-y-2.5">
                {featured.solution.deliverables.slice(0, 4).map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-ink">
                    <Check className="h-4 w-4 text-accent-text shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>

      {/* Pozostałe 4 usługi w zrównoważonej siatce 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondary.map((service, idx) => {
          const num = String(idx + 2).padStart(2, "0");
          return (
            <motion.div
              key={service.slug}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.4,
                delay: idx * 0.06,
                ease: [0.2, 0.7, 0.2, 1],
              }}
              className="flex"
            >
              <SpotlightCard className="w-full flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface hover:border-accent/60 transition-colors duration-200 group shadow-xs">
                <div className="p-6 sm:p-7 space-y-4 text-left flex-1">
                  <div className="flex items-center justify-between text-xs text-ink-muted">
                    <span className="eyebrow-line tabular-nums">{num} · Wdrożenie</span>
                    <span>Next.js / React</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold font-heading text-ink group-hover:text-accent-text transition-colors leading-tight">
                    <Link href={`/uslugi/${service.slug}`}>
                      {service.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-[15px] text-ink-muted leading-relaxed">
                    {service.shortDescription}
                  </p>

                  {/* Edytorska adnotacja zamiast zagnieżdżonej szarej karty */}
                  <p className="border-l-2 border-line pl-3.5 text-xs sm:text-sm text-ink-muted leading-relaxed">
                    <strong className="text-ink font-semibold">Wyzwanie: </strong>
                    {service.problem.description}
                  </p>

                  <div className="pt-2 space-y-2 border-t border-line/50">
                    {service.solution.deliverables.slice(0, 3).map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-ink-muted">
                        <Check className="h-3.5 w-3.5 text-accent-text shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href={`/uslugi/${service.slug}`}
                  className={cn(
                    "w-full py-4 px-6 sm:px-7 border-t border-line bg-surface-subtle/35 transition-colors group-hover:bg-accent/5",
                    "flex items-center justify-between font-semibold text-sm text-accent-text hover:text-accent-text/80"
                  )}
                >
                  <span>Poznaj szczegóły usługi i proces</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
