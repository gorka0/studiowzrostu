"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  glowColorLight?: string;
  glowColorDark?: string;
}

/**
 * SpotlightCard – Karta z subtelnym podświetleniem tła i krawędzi podążającym za kursorem.
 * Zero re-renderów Reacta: pozycja kursora aktualizuje bezpośrednio zmienne CSS (--mouse-x, --mouse-y) na elemencie DOM.
 * Dostępność: wyłącza śledzenie na urządzeniach dotykowych i przy prefers-reduced-motion.
 */
export const SpotlightCard = React.forwardRef<HTMLElement, SpotlightCardProps>(
  (
    {
      as: Component = "div",
      children,
      className,
      glowColorLight = "rgba(31, 157, 107, 0.08)",
      glowColorDark = "rgba(74, 222, 156, 0.10)",
      onMouseMove,
      ...props
    },
    forwardedRef
  ) => {
    const localRef = React.useRef<HTMLElement>(null);
    const containerRef = (forwardedRef as React.RefObject<HTMLElement>) || localRef;

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        if (!containerRef.current) return;

        // prefers-reduced-motion guard
        if (
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
          return;
        }

        // Pointer accuracy guard (urządzenia dotykowe)
        if (
          typeof window !== "undefined" &&
          !window.matchMedia("(pointer: fine)").matches
        ) {
          return;
        }

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        containerRef.current.style.setProperty("--mouse-x", `${x}px`);
        containerRef.current.style.setProperty("--mouse-y", `${y}px`);

        if (onMouseMove) {
          onMouseMove(e);
        }
      },
      [containerRef, onMouseMove]
    );

    return (
      <Component
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-200",
          className
        )}
        style={
          {
            "--mouse-x": "0px",
            "--mouse-y": "0px",
            "--spotlight-light": glowColorLight,
            "--spotlight-dark": glowColorDark,
          } as React.CSSProperties
        }
        {...props}
      >
        {/* Warstwa poświaty tła (Radial Gradient spotlight) - absolutna, bez marginesów */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px !m-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100 bg-[radial-gradient(500px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),var(--spotlight-light),transparent_40%)] dark:bg-[radial-gradient(500px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),var(--spotlight-dark),transparent_40%)]"
          style={{ margin: 0 }}
        />

        {/* Zawartość karty */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </Component>
    );
  }
);

SpotlightCard.displayName = "SpotlightCard";
