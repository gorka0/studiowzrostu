import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealHeading } from "@/components/effects/reveal-heading";
import { InteractiveHoverButton } from "@/components/effects/interactive-hover-button";
import { cn } from "@/lib/utils";

interface SubpageDarkCtaProps {
  eyebrow?: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

/**
 * Spójny ciemny pas CTA dla podstron usługowych, blogowych i /o-nas.
 */
export function SubpageDarkCta({
  eyebrow = "Realizacja w 7 dni · Stała cena w umowie",
  heading,
  description,
  ctaLabel,
  ctaHref = "/kontakt",
  secondaryLabel,
  secondaryHref,
  className,
}: SubpageDarkCtaProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-darkband-line bg-darkband-bg text-darkband-foreground overflow-hidden p-6 sm:p-10 lg:p-12",
        className
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none z-0 opacity-25"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="subpage-cta-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 48 0 L 48 48 M 0 48 L 48 48"
              stroke="var(--darkband-line)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subpage-cta-grid)" />
      </svg>

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10 text-left">
        <div className="space-y-3 max-w-xl">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-darkband-accent-text border-l-2 border-darkband-accent pl-2.5 leading-none">
            {eyebrow}
          </div>

          <RevealHeading
            as="h2"
            text={heading}
            className="text-2xl sm:text-3xl font-bold font-heading text-darkband-foreground tracking-tight leading-tight"
          />

          <p className="text-sm sm:text-[15px] text-darkband-muted leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link href={ctaHref} className="w-full sm:w-auto">
            <InteractiveHoverButton variant="darkband" className="w-full sm:w-auto min-h-[48px]">
              {ctaLabel}
            </InteractiveHoverButton>
          </Link>

          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-darkband-line text-sm font-semibold text-darkband-foreground hover:border-darkband-accent/50 hover:text-darkband-accent-text transition-colors min-h-[48px]"
            >
              <span>{secondaryLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
