import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: "primary" | "darkband";
}

export function InteractiveHoverButton({
  children,
  className,
  variant = "primary",
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(
        "group relative overflow-hidden inline-flex items-center justify-center gap-2.5 h-11 px-6 rounded-xl font-semibold text-[15px]",
        variant === "darkband"
          ? "bg-darkband-accent text-darkband-bg border border-darkband-accent/40 hover:opacity-95"
          : "bg-accent-text text-white dark:bg-accent dark:text-accent-foreground border border-accent-text/25 dark:border-accent/30",
        "shadow-xs transition-[transform,box-shadow,background-color,opacity] duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        "hover:shadow-md active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2",
        "cursor-pointer select-none",
        className
      )}
      {...props}
    >
      {/* Subtelne przejście światła po najechaniu (tylko GPU transform) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-full motion-reduce:hidden"
      />

      <span className="relative z-10 flex items-center gap-2">
        <span>{children}</span>
        {/* Podwójna strzałka tworząca ciągły ruch bez zmiany szerokości przycisku */}
        <span className="relative inline-flex h-4 w-4 overflow-hidden shrink-0" aria-hidden="true">
          <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-4 motion-reduce:group-hover:translate-x-0" />
          <ArrowRight className="absolute inset-0 h-4 w-4 -translate-x-4 transition-transform duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-x-0 motion-reduce:hidden" />
        </span>
      </span>
    </button>
  );
}
