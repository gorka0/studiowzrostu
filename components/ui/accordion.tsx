"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-border py-4 transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-heading text-lg sm:text-xl font-semibold text-foreground hover:text-accent-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-lg py-1"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ml-4",
            isOpen && "rotate-180 text-accent-text"
          )}
        />
      </button>
      {isOpen && (
        <div className="pt-3 pb-2 text-ink-muted text-sm sm:text-base leading-relaxed">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: { id: string; question: string; answer: string }[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={cn("divide-y divide-border border-t border-border", className)}>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          defaultOpen={idx === 0}
        />
      ))}
    </div>
  );
}
