"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Scroll-linked parallax dla krzywej wzrostu w tle sekcji Hero.
 * Izolowane w komponencie klienckim, aby nagłówek H1 renderował się natychmiast po stronie serwera.
 */
export function HeroCurveBg() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const curveOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.7, 0.35]);

  return (
    <div
      ref={containerRef}
      className="hidden lg:block pointer-events-none absolute inset-0 z-0 h-full w-full select-none overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { y: yOffset, opacity: curveOpacity }
        }
        className="h-full w-full will-change-transform"
      >
        <svg
          viewBox="0 0 1440 680"
          preserveAspectRatio="none"
          className="h-full w-full overflow-visible"
        >
          <defs>
            <linearGradient
              id="hero-bg-curve-area-grad"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.10" />
              <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.03" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          <path
            d="M 0 620 C 360 580, 680 460, 960 300 C 1140 190, 1240 140, 1310 100 L 1310 680 L 0 680 Z"
            fill="url(#hero-bg-curve-area-grad)"
            className="hero-bg-area"
          />

          <motion.path
            d="M 0 620 C 360 580, 680 460, 960 300 C 1140 190, 1240 140, 1310 100"
            fill="none"
            stroke="var(--accent)"
            strokeOpacity="0.45"
            strokeWidth="3"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={prefersReducedMotion ? false : { pathLength: 0.72, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="hero-bg-curve"
          />
        </svg>
      </motion.div>
    </div>
  );
}
