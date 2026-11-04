"use client";

import * as React from "react";

export function HeroReflector() {
  const reflectorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Reflektor podążający za kursorem tylko przy pointer: fine (myszka desktop)
    if (
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const parent = reflectorRef.current?.parentElement;
    if (!parent) return;

    let rafId: number | null = null;
    let targetX = -1000;
    let targetY = -1000;

    const onPointerMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          parent.style.setProperty("--mouse-x", `${targetX}px`);
          parent.style.setProperty("--mouse-y", `${targetY}px`);
          rafId = null;
        });
      }
    };

    const onPointerLeave = () => {
      parent.style.setProperty("--mouse-x", "-1000px");
      parent.style.setProperty("--mouse-y", "-1000px");
    };

    parent.addEventListener("pointermove", onPointerMove, { passive: true });
    parent.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={reflectorRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 [@media(pointer:fine)]:opacity-100"
      style={{
        background:
          "radial-gradient(600px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%)",
      }}
      aria-hidden="true"
    />
  );
}
