"use client";

import * as React from "react";

/**
 * Social Proof Strip — zastępuje TechMarquee.
 * 4 liczby z count-up animacją przy wejściu w viewport.
 * Zero zewnętrznych bibliotek, pure IntersectionObserver + requestAnimationFrame.
 */

const STATS = [
  { value: 7, suffix: " dni", label: "realizacja" },
  { value: 900, suffix: " zł", label: "cena od (netto)" },
  { value: 100, suffix: "%", label: "stała cena" },
  { value: 3, suffix: "+", label: "projekty" },
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
    <div className="flex flex-col gap-1">
      {/* Liczba — zawsze 1 linia, baseline wyrównana w rzędzie */}
      <div className="font-heading font-bold text-[1.25rem] sm:text-[1.5rem] leading-none text-ink tracking-tight tabular-nums whitespace-nowrap">
        {count}
        <span className="text-accent">{suffix}</span>
      </div>
      {/* Etykieta — max 2 linie, stały min-height żeby rzędy były równe */}
      <div className="text-[10px] sm:text-[11px] text-ink-muted font-sans uppercase tracking-wider leading-[1.3] min-h-[2.6em]">
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
        {/* Grid 4 kolumn — liczby zawsze w jednym rzędzie, etykiety w rzędzie poniżej */}
        <div className="grid grid-cols-4 gap-x-4 sm:gap-x-10 md:gap-x-14">
          {/* Rząd 1: liczby wyrównane do basline */}
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              active={active}
              delay={i * 120}
            />
          ))}
        </div>
      </div>

      {/* 1px accent bottom line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
    </section>
  );
}
