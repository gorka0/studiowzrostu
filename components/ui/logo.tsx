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

  // Trzy rosnące słupki z zaokrągloną tylko górą + koralowy punkt na szczycie
  // Geometria: słupki mają płaski dół przy yBaseline=30, zaokrąglona tylko góra (rx=2.5 top-only)
  // Słupek 1: niski, wyszarzony (szary/muted) – H=8, y=22
  // Słupek 2: średni, zieleń główna – H=15, y=15
  // Słupek 3: wysoki, ciemna zieleń – H=23, y=7
  // Kropka: koralowa, cx nad środkiem słupka 3
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
      {/* Słupek 1 – niski, szary/muted */}
      <path
        d="M4 30 L4 22 Q4 19.5 6.5 19.5 Q9 19.5 9 22 L9 30 Z"
        className="fill-current opacity-30 transition-colors"
      />
      {/* Słupek 2 – średni, zieleń akcentowa */}
      <path
        d="M12.5 30 L12.5 15 Q12.5 12.5 15 12.5 Q17.5 12.5 17.5 15 L17.5 30 Z"
        className="fill-primary transition-colors"
      />
      {/* Słupek 3 – wysoki, ciemna zieleń (ink/foreground) */}
      <path
        d="M21 30 L21 7 Q21 4.5 23.5 4.5 Q26 4.5 26 7 L26 30 Z"
        className="fill-current transition-colors"
      />
      {/* Koralowy akcent na szczycie słupka 3 */}
      <circle
        cx="23.5"
        cy="5"
        r="2.5"
        className="fill-coral"
      />
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
