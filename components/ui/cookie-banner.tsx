"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/site.config";
import {
  saveConsent,
  subscribeToConsent,
  getConsentSnapshot,
  getConsentServerSnapshot,
  CookieConsentPreferences,
} from "@/lib/cookie-consent";
import { Button } from "@/components/ui/button";
import { Shield, Settings, X, Check, Cookie } from "lucide-react";

// Kontekst do wywoływania okna preferencji z dowolnego miejsca w aplikacji (np. ze stopki)
interface CookieConsentContextType {
  openPreferencesModal: () => void;
  consent: CookieConsentPreferences | null;
}

const CookieConsentContext = React.createContext<CookieConsentContextType>({
  openPreferencesModal: () => {},
  consent: null,
});

export const useCookieConsent = () => React.useContext(CookieConsentContext);

const emptySubscribe = () => () => {};

export function CookieConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const consent = React.useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [analyticsChecked, setAnalyticsChecked] = React.useState(false);
  const [marketingChecked, setMarketingChecked] = React.useState(false);

  // Focus trap refs
  const modalRef = React.useRef<HTMLDivElement>(null);

  // Nasłuchiwanie na zewnętrzne zdarzenie otwarcia modala (np. ze stopki)
  React.useEffect(() => {
    const handleOpenModal = () => {
      setAnalyticsChecked(consent?.analytics ?? false);
      setMarketingChecked(consent?.marketing ?? false);
      setIsModalOpen(true);
    };

    window.addEventListener("sw:open-cookie-modal", handleOpenModal);
    return () => window.removeEventListener("sw:open-cookie-modal", handleOpenModal);
  }, [consent]);

  // Obsługa klawisza Escape i Focus Trap
  React.useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const handleAcceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      version: siteConfig.policyVersion,
    });
    setIsModalOpen(false);
  };

  const handleRejectAll = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      version: siteConfig.policyVersion,
    });
    setIsModalOpen(false);
  };

  const handleSaveCustom = () => {
    saveConsent({
      analytics: analyticsChecked,
      marketing: marketingChecked,
      version: siteConfig.policyVersion,
    });
    setIsModalOpen(false);
  };

  const openPreferencesModal = () => {
    setAnalyticsChecked(consent?.analytics ?? false);
    setMarketingChecked(consent?.marketing ?? false);
    setIsModalOpen(true);
  };

  const showBanner = mounted && consent === null;

  return (
    <CookieConsentContext.Provider value={{ openPreferencesModal, consent }}>
      {children}

      {/* 1. Baner zgody (pływający pasek na dole, bez wpływu na layout/LCP) */}
      {showBanner && (
        <aside
          role="dialog"
          aria-label="Powiadomienie o plikach cookies"
          className="fixed bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-50 mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-border/90 bg-background/95 backdrop-blur-md p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-start gap-3 max-w-2xl">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                <Cookie className="h-4 w-4" />
              </div>
              <div className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                <span>
                  Szanujemy Twoją prywatność. Wykorzystujemy niezbędne pliki cookies do prawidłowego działania strony oraz – za Twoją zgodą – opcjonalne pliki analityczne i marketingowe. Szczegóły znajdziesz w{" "}
                </span>
                <Link
                  href="/polityka-cookies"
                  className="font-medium text-foreground underline underline-offset-2 hover:text-primary transition-colors"
                >
                  Polityce Cookies
                </Link>
                .
              </div>
            </div>

            {/* Równorzędne przyciski decyzyjne (brak dark patterns) */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <Button
                type="button"
                onClick={handleRejectAll}
                className="flex-1 md:flex-initial h-9 px-4 text-xs font-semibold rounded-xl border border-border bg-background text-foreground hover:bg-muted/80 transition-colors"
              >
                Odrzuć wszystkie
              </Button>

              <Button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 md:flex-initial h-9 px-4 text-xs font-semibold rounded-xl border border-border bg-background text-foreground hover:bg-muted/80 transition-colors"
              >
                Akceptuj wszystkie
              </Button>

              <Button
                type="button"
                onClick={openPreferencesModal}
                className="w-full sm:w-auto h-9 px-3 text-xs font-semibold rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Dostosuj</span>
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. Okno modalne szczegółowych preferencji (Focus Trap, WCAG) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto"
          >
            {/* Nagłówek modala */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <h2
                  id="cookie-modal-title"
                  className="font-heading font-bold text-lg sm:text-xl text-foreground"
                >
                  Ustawienia prywatności i cookies
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Zamknij okno preferencji"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Dostosuj, na jakie kategorie plików cookies wyrażasz zgodę. Twoja decyzja zostanie zapisana na okres maksymalnie 12 miesięcy. Możesz ją zmienić w dowolnym momencie, klikając link w stopce.
            </p>

            {/* Lista kategorii */}
            <div className="space-y-4">
              {/* Kategoria 1: Niezbędne */}
              <div className="p-4 rounded-2xl border border-border/80 bg-background space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-heading font-bold text-sm text-foreground">
                    Niezbędne pliki techniczne
                  </div>
                  <span className="text-[11px] font-semibold font-mono text-primary px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                    Wymagane
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Umożliwiają prawidłowe działanie strony, zapamiętanie wybranego motywu (jasny/ciemny), zabezpieczenie formularzy tokenem antyspamowym oraz rejestrację Twojego wyboru cookies.
                </p>
              </div>

              {/* Kategoria 2: Analityczne */}
              <div className="p-4 rounded-2xl border border-border/80 bg-background space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cookies-analytics"
                    className="font-heading font-bold text-sm text-foreground cursor-pointer"
                  >
                    Analityka i statystyki
                  </label>
                  <input
                    id="cookies-analytics"
                    type="checkbox"
                    checked={analyticsChecked}
                    onChange={(e) => setAnalyticsChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-ring accent-primary cursor-pointer"
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pomagają nam zrozumieć, które sekcje serwisu są najbardziej przydatne dla odwiedzających. Dane są zbierane anonimowo za pośrednictwem Google Analytics 4 z aktywnym trybem Consent Mode v2.
                </p>
              </div>

              {/* Kategoria 3: Marketingowe */}
              <div className="p-4 rounded-2xl border border-border/80 bg-background space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="cookies-marketing"
                    className="font-heading font-bold text-sm text-foreground cursor-pointer"
                  >
                    Marketing i reklama
                  </label>
                  <input
                    id="cookies-marketing"
                    type="checkbox"
                    checked={marketingChecked}
                    onChange={(e) => setMarketingChecked(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-ring accent-primary cursor-pointer"
                  />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Używane do mierzenia skuteczności kampanii reklamowych w wyszukiwarce Google oraz zapobiegania wielokrotnemu wyświetlaniu tych samych reklam.
                </p>
              </div>
            </div>

            {/* Przyciski akcji modala */}
            <div className="pt-3 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
              <Button
                type="button"
                onClick={handleRejectAll}
                className="w-full sm:w-auto h-10 px-4 text-xs font-semibold rounded-xl border border-border bg-background text-foreground hover:bg-muted/80 transition-colors"
              >
                Odrzuć opcjonalne
              </Button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <Button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full sm:w-auto h-10 px-5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center justify-center gap-1.5"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Zapisz preferencje</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </CookieConsentContext.Provider>
  );
}
