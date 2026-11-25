"use client";

import * as React from "react";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = React.useState<string | null>(items[0]?.id ?? null);
  const prefersReducedMotion = useReducedMotion();
  const buttonRefs = React.useRef<Record<string, HTMLButtonElement | null>>({});
  const groupId = React.useId();

  const onButtonKeyDown = (e: React.KeyboardEvent, idx: number) => {
    let nextIdx = idx;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIdx = (idx + 1) % items.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIdx = (idx - 1 + items.length) % items.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIdx = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIdx = items.length - 1;
    }

    if (nextIdx !== idx) {
      const targetId = items[nextIdx]?.id;
      if (targetId) buttonRefs.current[targetId]?.focus();
    }
  };

  return (
    <LayoutGroup id={`accordion-${groupId}`}>
      <div className={cn("divide-y divide-border border-t border-b border-border", className)}>
        {items.map((item, idx) => {
          const isOpen = openId === item.id;
          const panelId = `acc-panel-${groupId}-${item.id}`;
          const btnId = `acc-btn-${groupId}-${item.id}`;

          return (
            <div key={item.id} className="relative py-1 pl-3">
              {isOpen && (
                <motion.div
                  layoutId={`acc-bar-${groupId}`}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 360, damping: 32 }
                  }
                  aria-hidden="true"
                  className="absolute left-0 top-3 bottom-3 w-[2.5px] rounded-full bg-accent"
                />
              )}

              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                ref={(el) => {
                  buttonRefs.current[item.id] = el;
                }}
                onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
                onKeyDown={(e) => onButtonKeyDown(e, idx)}
                className="flex w-full items-center justify-between py-3.5 sm:py-4 text-left font-heading text-lg sm:text-xl font-semibold text-foreground hover:text-accent-text transition-colors gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-lg px-2 -mx-2 cursor-pointer active:scale-[0.98]"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    isOpen && "rotate-180 text-accent-text"
                  )}
                />
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={btnId}
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] px-2",
                  isOpen ? "grid-rows-[1fr] opacity-100 pb-3.5" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-ink-muted text-sm sm:text-[15px] leading-[1.55] pt-0.5">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </LayoutGroup>
  );
}
