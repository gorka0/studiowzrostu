"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "full",
  size = "md",
  className,
  ...props
}: LogoProps) {
  const sizeMap = {
    sm: { icon: 22, text: "text-base", gap: "gap-2" },
    md: { icon: 28, text: "text-lg", gap: "gap-2.5" },
    lg: { icon: 36, text: "text-2xl", gap: "gap-3" },
  };

  const currentSize = sizeMap[size];

  // Trzy rosnące "listki" – rect z pełnym rx (zaokrąglone wszystkie rogi)
  // viewBox 32x32, całość treści w strefie y=4..28 → wyśrodkowane pionowo
  // Bar1: niski, muted | Bar2: średni, primary green | Bar3: wysoki, ink dark
  // Dot: coral na szczycie Bar3
  const mark = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
      aria-hidden="true"
    >
      {/* Listek 1 – niski, szary */}
      <rect x="3.5" y="19" width="6" height="9" rx="3" className="fill-current opacity-30" />
      {/* Listek 2 – średni, zieleń akcentowa */}
      <rect x="13" y="12" width="6" height="16" rx="3" className="fill-primary" />
      {/* Listek 3 – wysoki, ciemny ink */}
      <rect x="22.5" y="5" width="6" height="23" rx="3" className="fill-current" />
      {/* Koralowy punkt na szczycie listka 3 */}
      <circle cx="25.5" cy="5.5" r="2.5" className="fill-coral" />
    </svg>
  );

  if (variant === "mark") {
    return (
      <div
        className={cn("inline-flex items-center text-foreground", className)}
        {...props}
      >
        {mark}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group inline-flex items-center text-foreground font-heading tracking-tight select-none",
        currentSize.gap,
        className
      )}
      {...props}
    >
      {mark}
      <div className={cn("flex items-baseline font-bold leading-none", currentSize.text)}>
        <span>Studio</span>{" "}
        <span className="text-accent-text ml-1">Wzrostu</span>
      </div>
    </div>
  );
}
