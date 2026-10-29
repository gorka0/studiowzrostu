import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { BreadcrumbListJsonLd } from "@/components/seo/json-ld";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHomeIcon?: boolean;
}

export function Breadcrumbs({
  items,
  className,
  showHomeIcon = true,
}: BreadcrumbsProps) {
  return (
    <>
      <BreadcrumbListJsonLd items={items} />
      <nav
        aria-label="Ścieżka nawigacyjna (breadcrumbs)"
        className={cn("flex items-center text-xs sm:text-sm text-muted-foreground", className)}
      >
        <ol className="flex items-center space-x-1.5 sm:space-x-2">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              {showHomeIcon && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
              <span>Start</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <li aria-hidden="true" className="text-muted-foreground/60">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  {isLast || !item.href ? (
                    <span
                      className="font-medium text-foreground select-none"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
