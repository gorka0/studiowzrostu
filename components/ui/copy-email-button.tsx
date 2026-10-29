"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

export interface CopyEmailButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  email?: string;
  className?: string;
}

/**
 * CopyEmailButton – Przycisk kopiowania adresu e-mail z natychmiastowym feedbackiem.
 * Zero layout shift (zero CLS): układ gridowy nakłada stany tekstu na siebie, zachowując stałą szerokość.
 * Fallback dla starszych przeglądarek: textarea + execCommand.
 * A11y: aria-label + aria-live polite dla czytników ekranu.
 */
export function CopyEmailButton({
  email = siteConfig.contact.email,
  className,
  ...props
}: CopyEmailButtonProps) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle");
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Czyszczenie timera przy odmontowaniu
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    // Czyszczenie poprzedniego odliczania przy szybkim wielokrotnym klikaniu
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    let copiedSuccessfully = false;

    // 1. Próba z nowoczesnym Clipboard API
    if (typeof navigator !== "undefined" && navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        copiedSuccessfully = true;
      } catch {
        // Ignorujemy błąd (np. brak uprawnień w headless/iframe) i przechodzimy do fallbacku
      }
    }

    // 2. Fallback dla starszych przeglądarek lub braku uprawnień Clipboard API
    if (!copiedSuccessfully && typeof document !== "undefined") {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        copiedSuccessfully = document.execCommand("copy");
        document.body.removeChild(textarea);
      } catch {
        copiedSuccessfully = false;
      }
    }

    if (copiedSuccessfully) {
      setStatus("copied");
    } else {
      window.location.href = `mailto:${email}`;
      setStatus("idle");
      return;
    }

    // Reset statusu po 2000 ms
    timeoutRef.current = setTimeout(() => {
      setStatus("idle");
      timeoutRef.current = null;
    }, 2000);
  };

  const isCopied = status === "copied";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Skopiuj adres e-mail ${email} do schowka`}
      className={cn(
        "inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-line bg-surface text-ink text-xs sm:text-sm font-medium",
        "hover:border-accent hover:bg-surface-subtle transition-all duration-200 cursor-pointer select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        isCopied && "border-accent bg-accent/5",
        className
      )}
      {...props}
    >
      {/* Ikona ze skalowaniem i płynnym przejściem */}
      <span className="relative flex items-center justify-center shrink-0 w-4 h-4 text-ink-muted group-hover:text-accent-text transition-colors">
        {isCopied ? (
          <Check className="w-4 h-4 text-accent-text animate-in zoom-in-75 duration-200" />
        ) : (
          <Copy className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
        )}
      </span>

      {/* Nakładany grid zapobiegający zmianie szerokości przycisku po kliknięciu */}
      <span className="grid grid-cols-1 grid-rows-1 text-left">
        {/* Stan bazowy (idle) */}
        <span
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-200 whitespace-nowrap",
            isCopied ? "opacity-0 pointer-events-none select-none" : "opacity-100"
          )}
        >
          {email}
        </span>

        {/* Stan skopiowany (copied) */}
        <span
          className={cn(
            "col-start-1 row-start-1 text-accent-text font-semibold transition-opacity duration-200 whitespace-nowrap",
            isCopied ? "opacity-100" : "opacity-0 pointer-events-none select-none"
          )}
        >
          Skopiowano adres e-mail!
        </span>
      </span>

      {/* Komunikat na żywo dla czytników ekranowych (WCAG) */}
      <span role="status" aria-live="polite" className="sr-only">
        {isCopied ? "Skopiowano adres e-mail do schowka" : ""}
      </span>
    </button>
  );
}
