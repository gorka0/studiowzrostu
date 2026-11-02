"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
  id?: string;
}

/**
 * Reveal – komponent fade-up 12px, stagger dzieci 60ms, threshold 0.2,
 * respektujący prefers-reduced-motion i brak JS (klasa .js na <html>).
 */
export function Reveal({
  children,
  delay = 0,
  stagger = 0.06,
  className,
  id,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        ease: [0.2, 0.7, 0.2, 1],
        delay,
        staggerChildren: stagger,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * LineReveal – wjeżdżanie nagłówków liniami z maski (overflow: hidden),
 * nie rozbijając tekstu na litery i eliminując jakiekolwiek ryzyko CLS.
 */
export function LineReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("overflow-hidden line-mask", className)}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.45,
          ease: [0.2, 0.7, 0.2, 1],
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
