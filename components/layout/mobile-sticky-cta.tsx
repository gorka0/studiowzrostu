"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCookieConsent } from "@/components/ui/cookie-banner";
import { cn } from "@/lib/utils";

const EXCLUDED_ROUTES = ["/polityka-prywatnosci", "/polityka-cookies", "/kontakt"];

/**
 * MobileStickyCTA – Przyklejony pasek CTA na mobile (md:hidden).
 * Pojawia się po przewinięciu poza hero (> 480px),
 * chowa się w sekcji kontaktu i przy aktywnym polu formularza (klawiaturze),
 * uwzględnia safe-area i prefers-reduced-motion.
 */
export function MobileStickyCTA() {
  const pathname = usePathname();
  const { consent } = useCookieConsent();
  const [isScrolledPastHero, setIsScrolledPastHero] = React.useState(false);
  const [isNearBottom, setIsNearBottom] = React.useState(false);
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  const isExcludedRoute = EXCLUDED_ROUTES.includes(pathname);

  // 1. Scroll listener (> 480px, RAF-guarded)
  React.useEffect(() => {
    if (isExcludedRoute) return;

    let rafId: number | null = null;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const next = window.scrollY > 480;
        setIsScrolledPastHero((prev) => (prev !== next ? next : prev));
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isExcludedRoute]);

  // 2. IntersectionObserver ukrywający pasek w sekcji kontaktu / stopce
  React.useEffect(() => {
    if (isExcludedRoute) return;

    const targets = document.querySelectorAll("footer, #kontakt-cta, [data-section='cta']");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyIntersecting = entries.some((entry) => entry.isIntersecting);
        setIsNearBottom(isAnyIntersecting);
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.1,
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isExcludedRoute, pathname]);

  // 3. Ukrywanie przy aktywnej klawiaturze / focusie formularza
  React.useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        setIsInputFocused(true);
      }
    };

    const handleFocusOut = () => {
      setIsInputFocused(false);
    };

    window.addEventListener("focusin", handleFocusIn);
    window.addEventListener("focusout", handleFocusOut);
    return () => {
      window.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  if (isExcludedRoute) {
    return null;
  }

  const isCookieBannerVisible = consent === null;
  const isVisible =
    isScrolledPastHero && !isNearBottom && !isInputFocused && !isCookieBannerVisible;

  return (
    <aside
      aria-hidden={!isVisible}
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]",
        "bg-surface/95 backdrop-blur-md border-t border-line shadow-lg transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col text-left">
          <span className="text-[13px] text-ink-muted leading-tight">
            Nowa strona firmowa
          </span>
          <span className="text-[15px] font-bold font-heading text-ink leading-tight">
            Projekt w tydzień
          </span>
        </div>

        <Link
          href={pathname === "/" ? "#kontakt-cta" : "/kontakt"}
          tabIndex={isVisible ? 0 : -1}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent-text text-white dark:bg-accent dark:text-neutral-950 dark:hover:bg-accent/90 text-[14px] font-semibold hover:bg-accent transition-colors shadow-xs shrink-0 cursor-pointer min-h-[44px] active:scale-[0.98]"
        >
          <span>Zamów wycenę</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
