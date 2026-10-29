"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export interface RevealHeadingProps {
  text: string;
  as?: "h2" | "h3";
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/**
 * RevealHeading – Sekwencyjne odsłanianie nagłówków (h2/h3) słowo po słowie przy scrollowaniu.
 * Czysty DOM i A11y: Tekst występuje dokładnie raz z jawnymi spacjami {" "}, bez ucinania polskich znaków (pb-[0.14em]).
 * prefers-reduced-motion: zwraca statyczny czysty tag bez animacji.
 */
export function RevealHeading({
  text,
  as: Tag = "h2",
  className,
}: RevealHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  // Jeśli użytkownik ma włączone prefers-reduced-motion, renderujemy czysty tag bez narzutu
  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(" ");

  return (
    <Tag className={cn("relative font-heading", className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -60px 0px" }}
        className="inline-block"
      >
        {words.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            <span className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
            {index < words.length - 1 && " "}
          </React.Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}
