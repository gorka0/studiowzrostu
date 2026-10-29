import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "growth" | "coral" | "neutral";
  withDot?: boolean;
}

export function Eyebrow({
  children,
  variant = "growth",
  withDot = true,
  className,
  ...props
}: EyebrowProps) {
  const variantStyles = {
    growth: "border-accent/25 bg-accent/10 text-accent-text dark:bg-accent/15",
    coral: "border-coral/35 bg-coral/10 text-coral-text",
    neutral: "border-border bg-secondary/60 text-muted-foreground",
  };

  const dotColors = {
    growth: "bg-accent",
    coral: "bg-coral",
    neutral: "bg-muted-foreground",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide uppercase select-none transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className={cn("h-1.5 w-1.5 rounded-full animate-pulse", dotColors[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </div>
  );
}
