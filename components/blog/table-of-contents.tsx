"use client";

import * as React from "react";
import { List, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  heading: string;
}

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id || "");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
      window.history.pushState(null, "", `#${id}`);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Spis treści artykułu"
      className={cn(
        "rounded-2xl border border-line bg-surface p-5 sm:p-6 shadow-xs",
        className
      )}
    >
      <div className="flex items-center gap-2 text-xs font-mono font-medium text-ink mb-4 pb-3 border-b border-line">
        <List className="h-4 w-4 text-accent-text" />
        <span>Spis treści</span>
      </div>

      <ul className="space-y-2.5 text-xs sm:text-sm">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  "group flex items-start gap-2 transition-colors py-1 rounded",
                  isActive
                    ? "text-accent-text font-semibold"
                    : "text-ink-muted hover:text-ink"
                )}
              >
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 shrink-0 mt-0.5 transition-transform",
                    isActive
                      ? "text-accent-text translate-x-0.5"
                      : "text-line group-hover:text-ink-muted"
                  )}
                />
                <span className="leading-snug">
                  {index + 1}. {item.heading}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
