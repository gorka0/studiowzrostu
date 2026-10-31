"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { faqData } from "@/content/faq";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = React.useState<string | null>(faqData[0]?.id || null);
  const buttonRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % faqData.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + faqData.length) % faqData.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = faqData.length - 1;
    }

    if (nextIndex !== index) {
      const nextId = faqData[nextIndex]?.id;
      if (nextId) buttonRefs.current[nextId]?.focus();
    }
  };

  return (
    <Section spacing="default" id="faq" className="bg-background border-b border-line">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEWA KOLUMNA: Sticky (kol. 1–5) */}
          <div className="lg:col-span-5 text-left lg:sticky lg:top-24 space-y-4">
            <div className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-text">
              Najczęstsze pytania (FAQ)
            </div>

            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink tracking-tight">
              Wszystko, co warto wiedzieć przed startem
            </h2>

            <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
              Odpowiadamy na najczęstsze pytania właścicieli firm dotyczące procesu, technologii, terminów i kosztów wdrożenia nowej strony.
            </p>

            <div className="pt-4 border-t border-line/70">
              <div className="text-xs text-ink-muted mb-2 font-mono">
                Masz inne pytanie dotyczące Twojej branży?
              </div>
              <Link
                href="/kontakt"
                className="inline-flex items-center text-sm font-semibold text-accent-text hover:text-accent-text/80 transition-colors group"
              >
                <span>Napisz do nas lub zadzwoń</span>
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* PRAWA KOLUMNA: Akordeon (kol. 6–12) */}
          <div className="lg:col-span-7 w-full text-left divide-y divide-line border-t border-b border-line">
            {faqData.map((item, idx) => {
              const isOpen = openId === item.id;
              const contentId = `faq-content-${item.id}`;
              const buttonId = `faq-button-${item.id}`;

              return (
                <div key={item.id} className="py-2">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    ref={(el) => {
                      buttonRefs.current[item.id] = el;
                    }}
                    onClick={() => toggleItem(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    className="flex w-full items-center justify-between py-4 text-left font-heading font-bold text-base sm:text-lg text-ink hover:text-accent-text transition-colors gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-lg px-2 -mx-2 cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-ink-muted shrink-0 transition-transform duration-200",
                        isOpen ? "rotate-180 text-accent-text" : ""
                      )}
                    />
                  </button>

                  {/* Treść zawsze w DOM, animowana w CSS grid transition */}
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={buttonId}
                    className={cn(
                      "grid transition-all duration-200 ease-in-out px-2",
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-ink-muted leading-relaxed pt-1">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
