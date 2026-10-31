"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl font-medium text-sm text-surface bg-accent hover:bg-accent/90 border border-accent/20 shadow-xs transition-colors duration-150 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text cursor-pointer select-none",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 shrink-0" />
    </button>
  );
}
