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
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-border bg-card px-6 py-2.5 text-center font-medium text-sm text-foreground shadow-xs transition-all duration-300 hover:shadow-md hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-accent transition-all duration-300 group-hover:scale-[100] group-hover:opacity-100" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 font-semibold">
          {children}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 font-semibold text-accent-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
      >
        <span className="select-none">{children}</span>
        <ArrowRight className="h-4 w-4" />
      </div>
    </button>
  );
}
