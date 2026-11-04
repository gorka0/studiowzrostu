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
  const progressBarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const curY = window.scrollY;
        const nextScrolled = curY > 15;
        setIsScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));

        // Direct DOM update to eliminate 60-120 React re-renders per second
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0 ? Math.min(1, Math.max(0, curY / maxScroll)) : 0;
        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${progress})`;
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
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
    <header
      className="sticky top-3 sm:top-4 z-40 w-full px-4 sm:px-6 lg:px-8"
    >
      <div
        className={cn(
          "mx-auto max-w-[1240px] rounded-full border transition-colors duration-150 relative overflow-hidden",
          "px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between",
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
                prefetch={true}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[15px] font-medium transition-colors",
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
            prefetch={true}
            className="hidden sm:inline-flex items-center justify-center rounded-full px-4 font-semibold text-[14px] h-9 bg-accent-text text-white hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text transition-colors duration-150 shadow-xs active:scale-[0.98]"
          >
            <span>Wycena</span>
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 min-h-[44px] min-w-[44px] rounded-full border border-border bg-background text-foreground hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98] cursor-pointer"
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

        {/* B4 Pasek postępu przewijania pod nagłówkiem (transform: scaleX) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-4 right-4 h-[2px] bg-accent/20 rounded-full overflow-hidden pointer-events-none"
        >
          <div
            ref={progressBarRef}
            className="h-full bg-accent origin-left transition-transform duration-75 ease-out"
            style={{ transform: "scaleX(0)" }}
          />
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
                  prefetch={true}
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
              prefetch={true}
              onClick={closeMobileMenu}
              className="flex items-center justify-center w-full py-3 rounded-xl font-semibold bg-accent-text text-white hover:bg-accent transition-colors active:scale-[0.98] min-h-[44px]"
            >
              <span>Porozmawiajmy o projekcie</span>
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
            <div className="text-center text-[13px] text-muted-foreground">
              Studio Wzrostu – Nowoczesne strony w Next.js
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
