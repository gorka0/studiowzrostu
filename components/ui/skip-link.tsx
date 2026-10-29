import * as React from "react";
import { cn } from "@/lib/utils";

export function SkipLink({ className }: { className?: string }) {
  return (
    <a
      href="#main-content"
      className={cn(
        "sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50",
        "focus:px-4 focus:py-2.5 focus:rounded-lg focus:bg-accent-text focus:text-white",
        "focus:font-medium focus:text-sm focus:shadow-md focus:outline-none focus:ring-2 focus:ring-accent-text focus:ring-offset-2",
        "transition-transform",
        className
      )}
    >
      Przejdź do treści głównej
    </a>
  );
}
