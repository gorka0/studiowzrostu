"use client";

import * as React from "react";

/**
 * Social Proof Strip — zastępuje TechMarquee.
 * 4 liczby z count-up animacją przy wejściu w viewport.
 * Zero zewnętrznych bibliotek, pure IntersectionObserver + requestAnimationFrame.
 */

const STATS = [
  { value: 7, suffix: " dni", label: "czas realizacji" },
  { value: 900, suffix: " zł", label: "cena od (netto)" },
  { value: 100, suffix: "%", label: "stała cena w umowie" },
  { value: 3, suffix: "+", label: "zrealizowane projekty" },
] as const;

function useCountUp(target: number, duration = 900, active: boolean) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }
    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return count;
}

function StatItem({
  value,
  suffix,
  label,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  delay: number;
}) {
  const [delayedActive, setDelayedActive] = React.useState(false);

  React.useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setDelayedActive(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);

  const count = useCountUp(value, 800, delayedActive);

  return (
    <div className="flex flex-col items-center sm:items-start gap-0.5 min-w-[80px]">
      <div className="font-heading font-bold text-[1.35rem] sm:text-[1.6rem] leading-none text-ink tracking-tight tabular-nums">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="text-[11px] sm:text-[12px] text-ink-muted font-sans uppercase tracking-wider leading-tight">
        {label}
      </div>
    </div>
  );
}

export function SocialProofStrip() {
  const ref = React.useRef<HTMLElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Dane o realizacjach Studio Wzrostu"
      className="relative w-full border-b border-line bg-surface/35 py-4 sm:py-5 overflow-hidden"
    >
      {/* 1px accent top line — premium detail */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-row items-center justify-around sm:justify-start sm:gap-10 md:gap-14 overflow-x-auto scrollbar-none">
          {STATS.map((stat, i) => (
            <React.Fragment key={stat.label}>
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                active={active}
                delay={i * 120}
              />
              {i < STATS.length - 1 && (
                <div
                  className="hidden sm:block w-px h-8 bg-line/60 shrink-0"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 1px accent bottom line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
