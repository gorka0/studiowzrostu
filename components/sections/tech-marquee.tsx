import * as React from "react";

const TECH_ITEMS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "SEO techniczne",
  "Core Web Vitals",
];

export function TechMarquee() {
  return (
    <section
      aria-label="Wykorzystywany stos technologiczny"
      className="relative w-full border-b border-line bg-surface/35 py-3.5 sm:py-4 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Kontener z maską krawędziową (fade na lewym i prawym brzegu) */}
        <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8 select-none">
            {/* Rząd 1: Dostępny semantycznie */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0">
              {TECH_ITEMS.map((tech) => (
                <div key={tech} className="flex items-center gap-6 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm font-medium tracking-tight text-ink/80 hover:text-accent-text transition-colors">
                    {tech}
                  </span>
                  <span
                    className="h-1 w-1 rounded-full bg-accent/50 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            {/* Rząd 2: Zduplikowany dla płynnej pętli CSS, oznaczony aria-hidden */}
            <div
              className="flex items-center gap-6 sm:gap-8 shrink-0"
              aria-hidden="true"
            >
              {TECH_ITEMS.map((tech, idx) => (
                <div key={`${tech}-dup-${idx}`} className="flex items-center gap-6 sm:gap-8">
                  <span className="font-mono text-xs sm:text-sm font-medium tracking-tight text-ink/80 hover:text-accent-text transition-colors">
                    {tech}
                  </span>
                  <span
                    className="h-1 w-1 rounded-full bg-accent/50 shrink-0"
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
