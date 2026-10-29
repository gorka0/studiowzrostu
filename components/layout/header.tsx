"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/projekty", label: "Projekty" },
  { href: "/blog", label: "Blog" },
  { href: "/o-nas", label: "O nas" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Zablokuj scrollowanie tła przy otwartym menu mobilnym
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-3 sm:top-4 z-40 w-full px-3 sm:px-6 transition-all duration-300">
      <div
        className={cn(
          "mx-auto max-w-5xl rounded-full border transition-all duration-300",
          "px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between",
          isScrolled
            ? "border-border/90 bg-background/90 shadow-sm backdrop-blur-md"
            : "border-border/60 bg-background/70 backdrop-blur-sm"
        )}
      >
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md py-0.5"
        >
          <Logo size="sm" />
        </Link>

        <nav
          className="hidden md:flex items-center gap-1 lg:gap-2"
          aria-label="Nawigacja główna"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-accent-text font-semibold bg-accent/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right action cluster */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle size="sm" />

          {/* Desktop CTA */}
          <Link
            href="/kontakt"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-4 font-semibold text-xs h-8 bg-accent-text text-white hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text transition-all shadow-xs"
          >
            <span>Wycena</span>
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-full border border-border bg-background text-foreground hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-18 z-50 md:hidden bg-background/95 backdrop-blur-xl border-t border-border px-6 py-8 flex flex-col justify-between animate-in fade-in-50 duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobilne"
        >
          <nav className="flex flex-col space-y-4" aria-label="Nawigacja mobilna">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "text-xl font-heading font-semibold py-2 px-3 rounded-xl transition-colors",
                    isActive
                      ? "bg-accent/10 text-accent-text"
                      : "text-foreground hover:bg-muted/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-border space-y-4">
            <Link
              href="/kontakt"
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-full py-3 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <span>Porozmawiajmy o projekcie</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
            <div className="text-center text-xs text-muted-foreground">
              Studio Wzrostu – Nowoczesne strony w Next.js
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
