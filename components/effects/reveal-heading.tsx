"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface RevealHeadingProps {
  text: string;
  as?: "h2" | "h3";
  className?: string;
}

/**
 * RevealHeading – wjeżdżanie nagłówka całą linią z maski (overflow: hidden),
 * nie rozbijając tekstu na litery i eliminując jakiekolwiek ryzyko CLS.
 */
export function RevealHeading({
  text,
  as: Tag = "h2",
  className,
}: RevealHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <div className="overflow-hidden line-mask">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.45,
          ease: [0.2, 0.7, 0.2, 1],
        }}
      >
        <Tag className={cn("relative font-heading", className)}>
          {text}
        </Tag>
      </motion.div>
    </div>
  );
}
