"use client";

import * as React from "react";
import Link from "next/link";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "motion/react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { servicesList } from "@/content/services";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  Search,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * 4 autorskie makiety Micro-UI z choreografią akcji dla prawej kolumny sekcji usług.
 */
function ServicePreview({ slug }: { slug: string }) {
  const prefersReducedMotion = useReducedMotion();
  const [beat, setBeat] = React.useState(0);

  // Cykliczna choreografia pokazująca zachowanie interfejsu w krótkich taktach
  React.useEffect(() => {
    setBeat(0);
    if (prefersReducedMotion) {
      setBeat(2);
      return;
    }

    const timers: number[] = [];
    const scheduleCycle = () => {
      setBeat(0);
      timers.push(window.setTimeout(() => setBeat(1), 650));
      timers.push(window.setTimeout(() => setBeat(2), 1450));
    };

    scheduleCycle();
    const interval = window.setInterval(scheduleCycle, 5200);

    return () => {
      timers.forEach((id) => window.clearTimeout(id));
      window.clearInterval(interval);
    };
  }, [slug, prefersReducedMotion]);

  if (slug === "strony-internetowe") {
    const mobileActive = beat >= 1;
    const callHighlighted = beat >= 2;

    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs">
        <div className="relative pt-1 pb-2">
          <div className="rounded-xl border border-line bg-surface/80 p-3 sm:p-3.5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between pb-2 border-b border-line/70">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
                <span className="w-2.5 h-2.5 rounded-full bg-line" />
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-background border border-line/80 text-[11px] font-sans text-ink-muted">
                twojafirma.pl
              </div>
              <div className="w-8" />
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-line/40">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-accent" />
                <div className="h-2 w-12 rounded-full bg-ink/70" />
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-6 rounded-full bg-line" />
                <div className="h-1.5 w-8 rounded-full bg-line" />
                <div className="h-1.5 w-6 rounded-full bg-line" />
              </div>
              <div className="h-4 px-2 rounded-md bg-accent-text text-[9px] font-bold text-white dark:bg-accent dark:text-accent-foreground flex items-center">
                Kontakt
              </div>
            </div>

            <div className="grid grid-cols-12 gap-3 items-center py-0.5">
              <div className="col-span-7 space-y-2">
                <div className="text-[13px] sm:text-[14px] font-bold font-heading text-ink leading-tight">
                  Twoja oferta, która budzi zaufanie
                </div>
                <div className="space-y-1">
                  <div className="h-1.5 w-3/4 rounded-full bg-line/80" />
                  <div className="h-1.5 w-1/2 rounded-full bg-line/60" />
                </div>
                <div className="pt-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent-text text-white dark:bg-accent dark:text-accent-foreground text-[11px] font-semibold">
                    <span>Sprawdź ofertę</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>

              <div className="col-span-5">
                <div className="rounded-lg border border-line bg-background/90 p-2 sm:p-2.5 space-y-1.5 shadow-xs">
                  <div className="flex items-center gap-1.5 pb-1 border-b border-line/50">
                    <Building2 className="h-3.5 w-3.5 text-accent shrink-0" />
                    <div className="h-2 w-10 sm:w-12 rounded-full bg-ink/60" />
                  </div>
                  {[1, 2, 3].map((row, idx) => (
                    <motion.div
                      key={row}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : {
                              opacity: mobileActive ? 1 : 0.65,
                              x: mobileActive ? 0 : -2,
                            }
                      }
                      transition={{ duration: 0.25, delay: idx * 0.08 }}
                      className="flex items-center gap-1.5"
                    >
                      <Check className="h-2.5 w-2.5 text-accent shrink-0" />
                      <div className="h-1.5 w-12 rounded-full bg-line" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: mobileActive ? 0 : 8,
                    scale: callHighlighted ? 1.03 : 1,
                  }
            }
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="absolute -bottom-2 -right-1 sm:right-2 w-[106px] sm:w-[118px] rounded-xl border-2 border-surface bg-background shadow-elevated p-1.5 flex flex-col gap-1 z-20 will-change-transform"
          >
            <div className="w-5 h-1 mx-auto rounded-full bg-line" />
            <div className="space-y-1 pt-0.5">
              <div className="h-2 w-12 rounded-xs bg-ink/80" />
              <div className="h-1 w-14 rounded-full bg-line" />
              <div className="h-1 w-9 rounded-full bg-line/70" />
            </div>
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: callHighlighted ? 0.96 : 1 }
              }
              transition={{ duration: 0.18 }}
              className="mt-0.5 py-1 px-1.5 rounded-md bg-accent-text text-white dark:bg-accent dark:text-accent-foreground text-[9px] font-bold flex items-center justify-center gap-1"
            >
              <Phone className="h-2.5 w-2.5" />
              <span>Zadzwoń</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="text-[12px] text-ink-muted text-center pt-3 font-medium">
          Przejrzysty układ dopasowany do komputerów i telefonów
        </div>
      </div>
    );
  }

  if (slug === "landing-page") {
    const buttonPressed = beat === 1;
    const toastShown = beat >= 2;

    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-line">
          <div className="text-[13px] sm:text-[14px] font-bold font-heading text-ink whitespace-nowrap">
            Jedna usługa. Jeden cel.
          </div>
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-subtle border border-line text-[10px] text-ink-muted font-medium shrink-0">
            <span className="line-through opacity-40">Menu</span>
            <span className="text-accent-text font-semibold whitespace-nowrap">Brak rozpraszaczy</span>
          </div>
        </div>

        <div className="my-auto py-2">
          <div className="rounded-xl border border-line bg-surface/70 p-3 sm:p-3.5 space-y-2.5 max-w-[340px] mx-auto shadow-xs">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-line bg-background text-[12px]">
              <User className="h-3.5 w-3.5 text-accent-text shrink-0" />
              <span className="font-medium text-ink">Jan Kowalski</span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-line bg-background text-[12px]">
              <Phone className="h-3.5 w-3.5 text-accent-text shrink-0" />
              <span className="text-ink-muted font-medium">500 ••• •••</span>
            </div>

            <motion.button
              type="button"
              onClick={() => setBeat(2)}
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: buttonPressed ? 0.96 : 1 }
              }
              transition={{ type: "spring", stiffness: 450, damping: 25 }}
              className="w-full py-2 px-3 rounded-lg bg-accent-text text-white dark:bg-accent dark:text-accent-foreground text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{toastShown ? "Wysłano zapytanie ✓" : "Wyślij zapytanie"}</span>
            </motion.button>
          </div>
        </div>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  opacity: toastShown ? 1 : 0.45,
                  y: toastShown ? 0 : 8,
                  scale: toastShown ? 1 : 0.98,
                }
          }
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className={cn(
            "rounded-xl border bg-surface shadow-elevated p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3 will-change-transform",
            toastShown ? "border-accent/60" : "border-line"
          )}
        >
          <div className="w-8 h-8 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
            <Mail className="h-4 w-4" />
          </div>
          <div className="space-y-0.5 text-left flex-1 min-w-0">
            <div className="text-[12px] sm:text-[13px] font-bold text-ink leading-none">
              Nowe zapytanie z formularza
            </div>
            <div className="text-[11px] text-ink-muted leading-tight truncate">
              Klient prosi o wycenę usługi • przed chwilą
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (slug === "seo-techniczne") {
    const rankedFirst = beat >= 1;

    return (
      <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs space-y-3">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-line bg-surface text-[12px] text-ink shadow-xs">
          <Search className="h-3.5 w-3.5 text-accent shrink-0" />
          <span className="font-medium text-ink truncate">&quot;Twoja branża + Twoje miasto&quot;</span>
        </div>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  y: rankedFirst ? 0 : 38,
                  scale: rankedFirst ? 1 : 0.97,
                }
          }
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative z-10 rounded-xl border-2 border-accent/45 bg-accent/5 p-3 sm:p-3.5 space-y-1.5 will-change-transform"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-[9px] font-bold">
                W
              </div>
              <span className="text-[11px] font-medium text-ink">twojafirma.pl › oferta</span>
            </div>
            <motion.span
              animate={
                prefersReducedMotion
                  ? undefined
                  : { scale: rankedFirst ? 1 : 0.85, opacity: rankedFirst ? 1 : 0.4 }
              }
              transition={{ type: "spring", stiffness: 360, damping: 24 }}
              className="px-2 py-0.5 rounded-md bg-accent-text text-white dark:bg-accent dark:text-accent-foreground text-[10px] font-bold"
            >
              #1 w wynikach
            </motion.span>
          </div>

          <div className="text-[13px] sm:text-[14px] font-bold text-accent-text leading-snug">
            Twoja Firma – Sprawdzone usługi w Twoim regionie
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {["Cennik", "Realizacje", "Szybki kontakt"].map((linkLabel, idx) => (
              <motion.span
                key={linkLabel}
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: beat >= 2 ? 1 : 0.55, y: beat >= 2 ? 0 : 3 }
                }
                transition={{ duration: 0.2, delay: idx * 0.08 }}
                className="px-2 py-0.5 rounded-md bg-surface border border-line text-[11px] font-medium text-ink"
              >
                {linkLabel}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { y: rankedFirst ? 0 : -24, opacity: rankedFirst ? 0.35 : 0.65 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
          className="space-y-1.5 select-none will-change-transform"
        >
          <div className="p-2 rounded-lg border border-line bg-surface space-y-1">
            <div className="h-1.5 w-24 rounded-full bg-ink-muted/50" />
            <div className="h-2 w-44 rounded-full bg-ink/70" />
          </div>
          <div className="p-2 rounded-lg border border-line bg-surface space-y-1">
            <div className="h-1.5 w-20 rounded-full bg-ink-muted/50" />
            <div className="h-2 w-36 rounded-full bg-ink/70" />
          </div>
        </motion.div>

        <div className="text-[12px] text-ink-muted text-center pt-1 font-medium">
          Bezbłędna semantyka i kod, który wyszukiwarki stawiają na szczycie
        </div>
      </div>
    );
  }

  const rebuiltReady = beat >= 1;
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-background rounded-2xl border border-line text-left font-sans select-none shadow-xs space-y-3">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
        <div className="rounded-xl border border-line bg-surface/50 p-2.5 sm:p-3 space-y-2 opacity-75 flex flex-col justify-between">
          <div className="flex items-center justify-between pb-1.5 border-b border-line text-[11px] font-bold text-ink-muted">
            <span>Stara strona</span>
            <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
          </div>

          <div className="space-y-2 py-1">
            <div className="flex items-center gap-1.5 text-destructive/90 text-[10px] font-medium">
              <Loader2 className="h-3 w-3 animate-spin motion-reduce:animate-none shrink-0" />
              <span>Długie ładowanie...</span>
            </div>

            <div className="space-y-1">
              <div className="h-1.5 w-full rounded-xs bg-ink-muted/30 rotate-[-1deg]" />
              <div className="h-1.5 w-4/5 rounded-xs bg-ink-muted/25 rotate-[0.5deg]" />
              <div className="h-1.5 w-3/5 rounded-xs bg-ink-muted/20" />
            </div>
          </div>

          <div className="text-[10px] text-destructive/90 font-medium pt-1 border-t border-line/40">
            Nieczytelna na telefonie
          </div>
        </div>

        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { scale: rebuiltReady ? 1.02 : 1 }
          }
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="rounded-xl border-2 border-accent/45 bg-accent/5 p-2.5 sm:p-3 space-y-2 flex flex-col justify-between will-change-transform"
        >
          <div className="flex items-center justify-between pb-1.5 border-b border-accent/20 text-[11px] font-bold text-accent-text">
            <span>Po przebudowie</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          </div>

          <div className="space-y-2 py-1">
            <div className="flex items-center gap-1.5 text-accent-text text-[10px] font-bold">
              <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
              <span>Błyskawiczny start</span>
            </div>

            <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? { scaleX: 1 }
                    : { scaleX: rebuiltReady ? 1 : 0.25 }
                }
                transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                className="h-full w-full bg-accent origin-left"
              />
            </div>
          </div>

          <div className="py-1 px-2 rounded-md bg-accent-text text-white dark:bg-accent dark:text-accent-foreground text-[10px] font-bold text-center">
            Czytelna oferta
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={
          prefersReducedMotion
            ? undefined
            : { borderColor: beat >= 2 ? "var(--accent)" : "var(--border)" }
        }
        transition={{ duration: 0.3 }}
        className="p-2.5 rounded-xl border bg-surface flex items-center gap-2 text-left"
      >
        <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
        <span className="text-[12px] font-medium text-ink">
          Zachowujemy Twoje dotychczasowe adresy i pozycje w Google
        </span>
      </motion.div>
    </div>
  );
}

export function ServicesBento() {
  const [hoveredIdx, setHoveredIdx] = React.useState(0);
  const [openMobileIdx, setOpenMobileIdx] = React.useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  const activeService = servicesList[hoveredIdx] || servicesList[0];

  return (
    <Section spacing="none" id="uslugi" className="border-b border-line bg-background py-6 sm:py-10 lg:py-16 text-[15px]">
      <Container>
        <SectionHeader
          title="Jak możemy pomóc Twojej firmie urosnąć"
          description="Tworzymy nowe strony i porządkujemy obecne – z naciskiem na czytelność oferty i pozyskiwanie klientów."
          align="left"
        />

        {/* Widok mobilny / tablet (<1024px): akordeon z czytelną listą wdrożenia */}
        <div className="lg:hidden border-t border-line divide-y divide-line text-left mt-5 sm:mt-8">
          {servicesList.map((service, idx) => {
            const indexNumber = String(idx + 1).padStart(2, "0");
            const isOpen = openMobileIdx === idx;

            return (
              <div
                key={service.slug}
                className={cn(
                  "transition-colors duration-150 rounded-xl",
                  isOpen && "bg-surface/50"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenMobileIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.slug}`}
                  className={cn(
                    "w-full flex items-center justify-between gap-3 px-3 py-2.5 sm:p-5 min-h-[48px] text-left cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text rounded-xl",
                    "[@media(hover:hover)]:hover:bg-surface/40 active:scale-[0.98]"
                  )}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="font-sans text-[13px] font-bold text-accent-text shrink-0">
                      {indexNumber}
                    </span>
                    <h3 className="text-[20px] font-bold font-heading text-ink leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  <div className="shrink-0 p-1 text-ink-muted">
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        isOpen && "rotate-180 text-accent-text"
                      )}
                    />
                  </div>
                </button>

                <div
                  id={`service-panel-${service.slug}`}
                  className={cn("accordion-grid overflow-hidden", isOpen ? "open" : "invisible h-0")}
                >
                  <div className="accordion-inner min-h-0 overflow-hidden">
                    <div className="px-3 pb-3 sm:px-5 sm:pb-4 pt-1 space-y-3">
                      <p className="text-[15px] text-ink/80 leading-[1.5]">
                        {service.shortDescription}
                      </p>

                      <ul className="space-y-1.5 text-[14px] text-ink-muted list-none p-0 m-0 pt-0.5">
                        {service.solution.deliverables.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" aria-hidden="true" />
                            <span className="text-ink/80">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-1">
                        <Link
                          href={`/uslugi/${service.slug}`}
                          className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent-text hover:underline transition-colors min-h-[44px] py-2 px-1 cursor-pointer active:scale-[0.98]"
                        >
                          <span>Szczegóły usługi</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Widok desktopowy (>=1024px): układ 7:5 z płynnym przejściem layoutId i choreografią Micro-UI */}
        <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 items-start mt-8">
          <LayoutGroup id="services-bento-list">
            <div className="lg:col-span-7 space-y-3 text-left">
              {servicesList.map((service, idx) => {
                const indexNumber = String(idx + 1).padStart(2, "0");
                const isSelected = hoveredIdx === idx;

                return (
                  <div
                    key={service.slug}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onClick={() => setHoveredIdx(idx)}
                    onFocus={() => setHoveredIdx(idx)}
                    tabIndex={0}
                    className={cn(
                      "relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                      isSelected
                        ? "border-transparent"
                        : "border-line/70 bg-surface/30 hover:bg-surface/70 hover:border-line hover:-translate-y-0.5"
                    )}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="service-card-active-bg"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 360, damping: 32 }
                        }
                        className="absolute inset-0 rounded-2xl border border-accent bg-surface shadow-xs ring-1 ring-accent/25 z-0 pointer-events-none"
                      />
                    )}

                    <div className="relative z-10 flex items-start gap-4">
                      <span
                        className={cn(
                          "font-sans text-[12px] font-bold px-2.5 py-0.5 rounded-md shrink-0 transition-colors tabular-nums",
                          isSelected
                            ? "bg-accent-text text-white dark:bg-accent dark:text-accent-foreground"
                            : "bg-surface-subtle text-ink border border-line/60"
                        )}
                      >
                        {indexNumber}
                      </span>

                      <div className="space-y-1.5 flex-1">
                        <h3
                          className={cn(
                            "text-[19px] font-bold font-heading leading-tight transition-colors",
                            isSelected ? "text-ink" : "text-ink/90"
                          )}
                        >
                          {service.title}
                        </h3>

                        <p className="text-[14px] sm:text-[15px] text-ink-muted leading-relaxed">
                          {service.shortDescription}
                        </p>

                        <div className="pt-1">
                          <Link
                            href={`/uslugi/${service.slug}`}
                            className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-accent-text hover:underline transition-colors py-0.5"
                          >
                            <span>Poznaj wdrożenie i proces</span>
                            <ArrowUpRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </LayoutGroup>

          <div className="lg:col-span-5 lg:sticky lg:top-24 w-full">
            <div className="rounded-2xl border border-line bg-surface p-3.5 sm:p-4 shadow-card min-h-[440px] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full max-w-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.slug}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
                    className="w-full h-full"
                  >
                    <ServicePreview slug={activeService.slug} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[13px] text-ink-muted text-left">
          <Link
            href="/uslugi"
            className="text-accent-text hover:underline font-semibold inline-flex items-center gap-1 shrink-0 min-h-[44px] py-1"
          >
            Pełny przegląd oferty i technologii
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}
