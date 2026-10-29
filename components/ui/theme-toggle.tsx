"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  size?: "sm" | "default";
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className, size = "default" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  // Idiomatyczne i wolne od kaskadowych renderów sprawdzanie montowania na kliencie w React 19
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const sizeClasses = {
    sm: "h-8 w-8 rounded-full",
    default: "h-9 w-9 rounded-full",
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center border border-border bg-background text-muted-foreground opacity-60 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          sizeClasses[size],
          className
        )}
        aria-label="Przełącz motyw graficzny"
        disabled
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "relative inline-flex items-center justify-center border border-border bg-background/80 text-foreground hover:bg-muted/80 hover:text-foreground cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        sizeClasses[size],
        className
      )}
      aria-label={isDark ? "Przełącz na motyw jasny" : "Przełącz na motyw ciemny"}
      title={isDark ? "Motyw jasny" : "Motyw ciemny"}
    >
      <Sun
        className={cn(
          "h-4 w-4 transition-all duration-300",
          isDark ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100 text-foreground"
        )}
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100 text-foreground" : "scale-0 -rotate-90 opacity-0"
        )}
      />
    </button>
  );
}
