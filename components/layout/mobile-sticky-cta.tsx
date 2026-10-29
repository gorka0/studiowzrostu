"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useCookieConsent } from "@/components/ui/cookie-banner";
import { cn } from "@/lib/utils";

const EXCLUDED_ROUTES = ["/kontakt", "/polityka-prywatnosci", "/polityka-cookies"];

/**
 * MobileStickyCTA – Przyklejony pasek CTA na mobile (md:hidden).
 * Pojawia się po przewinięciu > 500px, chowa się automatycznie przy stopce/końcowym CTA,
 * wyłączony na /kontakt i stronach prawnych, bez kolizji z banerem Cookies.
 */
export function MobileStickyCTA() {
  const pathname = usePathname();
  const { consent } = useCookieConsent();
  const [isScrolledPastHero, setIsScrolledPastHero] = React.useState(false);
  const [isNearBottom, setIsNearBottom] = React.useState(false);

  // Sprawdzamy czy bieżąca trasa jest wykluczona
  const isExcludedRoute = EXCLUDED_ROUTES.includes(pathname);

  // 1. Scroll listener z flagą passive: true (> 500px)
  React.useEffect(() => {
    if (isExcludedRoute) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolledPastHero(scrollY > 500);
    };

    // Początkowe sprawdzenie
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExcludedRoute]);

  // 2. IntersectionObserver ukrywający pasek, gdy w viewport wchodzi stopka lub końcowe CTA
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

  // Jeśli trasa jest wykluczona, w ogóle nie renderujemy komponentu
  if (isExcludedRoute) {
    return null;
  }

  // Pasek widoczny, gdy: przewinięto > 500px, nie jesteśmy przy stopce i zaakceptowano lub zamknięto cookies
  const isCookieBannerVisible = consent === null;
  const isVisible = isScrolledPastHero && !isNearBottom && !isCookieBannerVisible;

  return (
    <aside
      aria-hidden={!isVisible}
      className={cn(
        "md:hidden fixed bottom-0 inset-x-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]",
        "bg-surface/90 backdrop-blur-md border-t border-line shadow-lg transition-all duration-300 ease-in-out",
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-mono text-ink-muted leading-tight">
            Masz pytania?
          </span>
          <span className="text-xs sm:text-sm font-bold font-heading text-ink leading-tight">
            Bezpłatna wycena w 24h
          </span>
        </div>

        <Link
          href="/kontakt"
          tabIndex={isVisible ? 0 : -1}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-text text-white text-xs font-semibold hover:bg-accent transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          <span>Porozmawiajmy</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
