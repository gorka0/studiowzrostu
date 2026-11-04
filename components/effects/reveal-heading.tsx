"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RevealHeadingProps {
  text: string;
  as?: "h2" | "h3";
  className?: string;
}

/**
 * RevealHeading – wjeżdżanie nagłówka całą linią z maski (overflow: hidden),
 * nie rozbijając tekstu na litery i eliminując jakiekolwiek ryzyko CLS.
 * Zoptymalizowany pod GPU (transform3d, opacity) bez konieczności ładowania biblioteki motion.
 */
export function RevealHeading({
  text,
  as: Tag = "h2",
  className,
}: RevealHeadingProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // prefers-reduced-motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden line-mask">
      <div
        className={cn(
          "transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] will-change-[transform,opacity]",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0"
        )}
      >
        <Tag className={cn("relative font-heading", className)}>
          {text}
        </Tag>
      </div>
    </div>
  );
}
