"use client";

import * as React from "react";
import { Copy, Check, Mail } from "lucide-react";
import { siteConfig } from "@/site.config";
import { cn } from "@/lib/utils";

export interface CopyEmailButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  email?: string;
  variant?: "card" | "inline" | "text" | "button";
  className?: string;
}

/**
 * CopyEmailButton – Inteligentny komponent kopiowania adresu e-mail do schowka.
 * Obsługuje 3 warianty prezentacji:
 * - card: pełny kontener kontaktowy z ikoną, etykietą i podglądem stanu (np. w bloku kontaktu)
 * - inline: zwarty element z ikoną Mail/Check (np. w sekcji CTA)
 * - text: minimalistyczny link tekstowy (np. w stopce)
 * - button: klasyczny przycisk akcji
 */
export function CopyEmailButton({
  email = siteConfig.contact.email,
  variant = "card",
  className,
  ...props
}: CopyEmailButtonProps) {
  const [status, setStatus] = React.useState<"idle" | "copied" | "error">("idle");
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    let copiedSuccessfully = false;

    // 1. Nowoczesne Clipboard API
    if (typeof navigator !== "undefined" && navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        copiedSuccessfully = true;
      } catch {
        // Fallback w razie odmowy uprawnień
      }
    }

    // 2. Fallback dla starszych przeglądarek / iFrame
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

    timeoutRef.current = setTimeout(() => {
      setStatus("idle");
      timeoutRef.current = null;
    }, 2000);
  };

  const isCopied = status === "copied";

  // Wariant 1: Pełny kontener kontaktowy (karta z ikoną i nagłówkiem)
  if (variant === "card") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Kliknij, aby skopiować adres e-mail do schowka"
        aria-label={`Skopiuj adres e-mail ${email} do schowka`}
        className={cn(
          "w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 group text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          isCopied
            ? "border-accent bg-accent/5 ring-1 ring-accent/30"
            : "border-border/80 bg-background hover:border-accent hover:bg-surface-subtle",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "h-9 w-9 rounded-lg flex items-center justify-center transition-all duration-200 shrink-0",
            isCopied
              ? "bg-accent text-accent-foreground scale-105"
              : "bg-accent/10 text-accent-text group-hover:scale-105"
          )}
        >
          {isCopied ? (
            <Check className="h-4 w-4 animate-in zoom-in-75 duration-200" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              E-mail
            </span>
            <span
              className={cn(
                "text-[11px] font-mono transition-opacity duration-200",
                isCopied
                  ? "text-accent-text font-semibold opacity-100"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
              )}
            >
              {isCopied ? "Skopiowano do schowka!" : "Kliknij, aby skopiować"}
            </span>
          </div>
          <div className="font-medium text-foreground truncate">{email}</div>
        </div>
        <div className="shrink-0 text-muted-foreground group-hover:text-accent-text transition-colors">
          {isCopied ? (
            <Check className="h-4 w-4 text-accent-text" />
          ) : (
            <Copy className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
        <span role="status" aria-live="polite" className="sr-only">
          {isCopied ? "Skopiowano adres e-mail do schowka" : ""}
        </span>
      </button>
    );
  }

  // Wariant 2: Zwarty element w sekcji CTA
  if (variant === "inline") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Kliknij, aby skopiować adres e-mail"
        aria-label={`Skopiuj adres e-mail ${email} do schowka`}
        className={cn(
          "inline-flex items-center gap-2 font-medium text-ink hover:text-accent-text transition-colors cursor-pointer select-none group text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md",
          className
        )}
        {...props}
      >
        <span className="flex items-center justify-center shrink-0 w-4 h-4 text-accent-text transition-transform group-hover:scale-110">
          {isCopied ? (
            <Check className="h-4 w-4 text-accent-text animate-in zoom-in-75 duration-200" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
        </span>
        <span className="group-hover:underline">{email}</span>
        <span
          className={cn(
            "text-[10px] font-mono px-2 py-0.5 rounded bg-accent/10 text-accent-text border border-accent/20 transition-all duration-200",
            isCopied ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          Skopiowano!
        </span>
        <span role="status" aria-live="polite" className="sr-only">
          {isCopied ? "Skopiowano adres e-mail do schowka" : ""}
        </span>
      </button>
    );
  }

  // Wariant 3: Dyskretny link w stopce
  if (variant === "text") {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title="Kliknij, aby skopiować adres e-mail"
        aria-label={`Skopiuj adres e-mail ${email} do schowka`}
        className={cn(
          "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent-text transition-colors cursor-pointer select-none text-left focus-visible:outline-none focus-visible:underline",
          className
        )}
        {...props}
      >
        <span>{email}</span>
        {isCopied && (
          <span className="text-[11px] font-mono text-accent-text animate-in fade-in duration-200">
            (Skopiowano!)
          </span>
        )}
        <span role="status" aria-live="polite" className="sr-only">
          {isCopied ? "Skopiowano adres e-mail do schowka" : ""}
        </span>
      </button>
    );
  }

  // Wariant 4: Klasyczny przycisk (fallback)
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
      <span className="relative flex items-center justify-center shrink-0 w-4 h-4 text-ink-muted group-hover:text-accent-text transition-colors">
        {isCopied ? (
          <Check className="w-4 h-4 text-accent-text animate-in zoom-in-75 duration-200" />
        ) : (
          <Copy className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
        )}
      </span>
      <span className="grid grid-cols-1 grid-rows-1 text-left">
        <span
          className={cn(
            "col-start-1 row-start-1 transition-opacity duration-200 whitespace-nowrap",
            isCopied ? "opacity-0 pointer-events-none select-none" : "opacity-100"
          )}
        >
          {email}
        </span>
        <span
          className={cn(
            "col-start-1 row-start-1 text-accent-text font-semibold transition-opacity duration-200 whitespace-nowrap",
            isCopied ? "opacity-100" : "opacity-0 pointer-events-none select-none"
          )}
        >
          Skopiowano adres e-mail!
        </span>
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {isCopied ? "Skopiowano adres e-mail do schowka" : ""}
      </span>
    </button>
  );
}
