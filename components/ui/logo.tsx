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

  // Geometryczny znak wzrostu: 3 rosnące słupki z dynamiczną krzywą wznoszącą
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
      {/* Słupek 1 (początkowy) */}
      <rect
        x="4"
        y="18"
        width="6"
        height="10"
        rx="3"
        className="fill-current opacity-40 transition-colors"
      />
      {/* Słupek 2 (średni) */}
      <rect
        x="13"
        y="12"
        width="6"
        height="16"
        rx="3"
        className="fill-primary transition-colors"
      />
      {/* Słupek 3 (wzrost) + akcent wznoszący */}
      <rect
        x="22"
        y="5"
        width="6"
        height="23"
        rx="3"
        className="fill-current transition-colors"
      />
      {/* Dynamiczny punkt akcentowy na szczycie wzrostu */}
      <circle
        cx="25"
        cy="5"
        r="2"
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
