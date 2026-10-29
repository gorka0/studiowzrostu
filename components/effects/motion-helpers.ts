"use client";

import { useReducedMotion } from "motion/react";

export function useSafeMotion() {
  const shouldReduceMotion = useReducedMotion();
  return {
    shouldReduceMotion: !!shouldReduceMotion,
  };
}

export const safeTransitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 30,
  },
  smooth: {
    duration: 0.25,
    ease: [0.16, 1, 0.3, 1], // expo out
  },
  instant: {
    duration: 0,
  },
};

export const safeFadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
};

export const safeSlideUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
};
