"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormData,
  PROJECT_TYPES,
  PROJECT_TYPE_LABELS,
  BUDGET_RANGES,
  BUDGET_RANGE_LABELS,
} from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { siteConfig } from "@/site.config";
import { Phone, Clock, MapPin, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  compact?: boolean;
  className?: string;
}

export function ContactForm({ compact = false, className }: ContactFormProps) {
  const [submitStatus, setSubmitStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = React.useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "nowa-strona",
      budget: "do-ustalenia",
      message: "",
      consent: false,
      honeypot: "",
      timeToken: "",
    },
  });

  // Pobranie tokenu czasu z backendu na starcie formularza
  const fetchFreshToken = React.useCallback(() => {
    fetch("/api/contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.timeToken) {
          setValue("timeToken", data.timeToken);
        }
      })
      .catch((err) => {
        console.warn("Błąd pobierania tokenu antyspamowego:", err);
      });
  }, [setValue]);

  React.useEffect(() => {
    fetchFreshToken();
  }, [fetchFreshToken]);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus("submitting");
    setStatusMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        setSubmitStatus("error");
        setStatusMessage(
          result.error || "Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie."
        );
        return;
      }

      setSubmitStatus("success");
      setStatusMessage(
        result.message ||
          "Dziękujemy za wiadomość! Odpowiemy na Twoje zapytanie w ciągu 24 godzin."
      );
      reset();
      fetchFreshToken();
    } catch {
      setSubmitStatus("error");
      setStatusMessage(
        "Błąd połączenia z serwerem. Sprawdź połączenie internetowe i spróbuj ponownie."
      );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Komunikat o stanie dla czytników ekranu i użytkownika */}
      <div
        aria-live="polite"
        role="status"
        className={cn(
          "mb-6 p-4 rounded-xl text-sm transition-all",
          submitStatus === "success" && "bg-accent/10 border border-accent/30 text-accent-text flex items-start gap-3",
          submitStatus === "error" && "bg-destructive/10 border border-destructive/30 text-destructive flex items-start gap-3",
          submitStatus === "idle" && "hidden",
          submitStatus === "submitting" && "hidden"
        )}
      >
        {submitStatus === "success" && (
          <>
            <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Wiadomość została wysłana!</div>
              <div className="text-xs sm:text-sm mt-0.5">{statusMessage}</div>
            </div>
          </>
        )}
        {submitStatus === "error" && (
          <>
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">Nie udało się wysłać formularza</div>
              <div className="text-xs sm:text-sm mt-0.5">{statusMessage}</div>
            </div>
          </>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Pole honeypot (ukryte przed ludźmi) */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          {...register("honeypot")}
        />

        {/* Ukryty podpisany token czasu */}
        <input type="hidden" {...register("timeToken")} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Imię */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-semibold text-foreground">
              Imię i nazwisko <span className="text-coral-text">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="np. Jan Kowalski"
              disabled={submitStatus === "submitting"}
              className={cn(
                "w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                errors.name ? "border-destructive focus-visible:ring-destructive" : "border-border"
              )}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* E-mail */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-foreground">
              E-mail <span className="text-coral">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="np. jan@twojafirma.pl"
              disabled={submitStatus === "submitting"}
              className={cn(
                "w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                errors.email ? "border-destructive focus-visible:ring-destructive" : "border-border"
              )}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>
        </div>

        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Telefon */}
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-xs font-semibold text-foreground">
                Numer telefonu <span className="text-xs text-muted-foreground font-normal">(opcjonalnie)</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+48 ..."
                disabled={submitStatus === "submitting"}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Rodzaj projektu */}
            <div className="space-y-1.5">
              <label htmlFor="projectType" className="text-xs font-semibold text-foreground">
                Czego potrzebujesz? <span className="text-coral">*</span>
              </label>
              <select
                id="projectType"
                disabled={submitStatus === "submitting"}
                className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                {...register("projectType")}
              >
                {PROJECT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {PROJECT_TYPE_LABELS[type]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {!compact && (
          /* Orientacyjny budżet */
          <div className="space-y-1.5">
            <label htmlFor="budget" className="text-xs font-semibold text-foreground">
              Orientacyjny budżet <span className="text-xs text-muted-foreground font-normal">(opcjonalnie)</span>
            </label>
            <select
              id="budget"
              disabled={submitStatus === "submitting"}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              {...register("budget")}
            >
              {BUDGET_RANGES.map((range) => (
                <option key={range} value={range}>
                  {BUDGET_RANGE_LABELS[range]}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Wiadomość */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="text-xs font-semibold text-foreground">
            W czym możemy pomóc? <span className="text-coral">*</span>
          </label>
          <textarea
            id="message"
            rows={compact ? 3 : 4}
            placeholder="Opisz krótko swoją firmę, obecną stronę lub oczekiwania co do nowego projektu..."
            disabled={submitStatus === "submitting"}
            className={cn(
              "w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y",
              errors.message ? "border-destructive focus-visible:ring-destructive" : "border-border"
            )}
            {...register("message")}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message.message}</p>
          )}
        </div>

        {/* Checkbox zgody RODO (NIEZAZNACZONY domyślnie) */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 rounded border-border text-accent-text focus:ring-accent-text accent-accent cursor-pointer shrink-0"
              {...register("consent")}
            />
            <span className="text-xs text-muted-foreground leading-snug select-none">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na przesłane zapytanie. Szczegóły znajdują się w{" "}
              <Link
                href="/polityka-prywatnosci"
                className="text-foreground underline underline-offset-2 hover:text-accent-text transition-colors"
              >
                Polityce Prywatności
              </Link>
              . <span className="text-coral-text">*</span>
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-destructive mt-1.5">{errors.consent.message}</p>
          )}
        </div>

        {/* Przycisk wysyłki - wysoki kontrast tła akcentu tekstowego z białym tekstem (6.54:1) */}
        <div className="pt-3">
          <Button
            type="submit"
            disabled={submitStatus === "submitting"}
            className="w-full sm:w-auto min-w-[200px] h-11 px-8 rounded-xl font-semibold bg-accent-text text-white hover:bg-accent transition-all cursor-pointer shadow-xs"
          >
            {submitStatus === "submitting" ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Wysyłanie zapytania...</span>
              </span>
            ) : (
              <span>Wyślij zapytanie</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export function ContactInfoBlock() {
  return (
    <div className="space-y-6 p-6 sm:p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-xs">
      <div>
        <h2 className="font-heading font-bold text-xl text-foreground">
          Bezpośredni kontakt
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
          Wolisz porozmawiać telefonicznie lub napisać bezpośrednio? Jesteśmy do Twojej dyspozycji.
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <CopyEmailButton variant="card" />

        <a
          href={`tel:${siteConfig.contact.phone.replace(/\s+/g, "")}`}
          className="flex items-center gap-3 p-3 rounded-xl border border-border/80 bg-background hover:border-accent transition-colors group"
        >
          <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent-text group-hover:scale-105 transition-transform">
            <Phone className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Telefon</div>
            <div className="font-medium text-foreground">{siteConfig.contact.phone}</div>
          </div>
        </a>

        <div className="flex items-center gap-3 p-3 rounded-xl border border-border/80 bg-background">
          <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent-text shrink-0">
            <Clock className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Czas odpowiedzi</div>
            <div className="font-medium text-foreground">Maksymalnie 24 godziny</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 rounded-xl border border-border/80 bg-background">
          <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent-text shrink-0">
            <MapPin className="h-4 w-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Obszar działania</div>
            <div className="text-xs text-foreground font-medium leading-relaxed mt-0.5">
              Współpraca w 100% zdalna: Cała Polska
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-border text-xs text-muted-foreground">
        Założyciel i główny inżynier: <strong className="text-foreground">{siteConfig.owner}</strong>
      </div>
    </div>
  );
}
