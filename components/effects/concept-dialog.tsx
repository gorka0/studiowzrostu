"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Monitor, Smartphone, Info } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { BeforeAfterSlider } from "@/components/effects/before-after-slider";
import type { ConceptProject } from "@/content/projects";
import { cn } from "@/lib/utils";

interface ConceptDialogProps {
  project: ConceptProject;
  trigger: React.ReactNode;
}

export function ConceptDialog({ project, trigger }: ConceptDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"desktop" | "mobile">("desktop");
  const isSlider = Boolean(project.beforeImage && project.afterImage);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      {open && (
        <DialogContent closeLabel="Zamknij okno koncepcji" className="max-w-4xl">
        <DialogHeader>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-subtle text-accent-text border border-line">
              Koncepcja własna
            </span>
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded text-xs text-ink-muted bg-surface-subtle border border-line"
              >
                {tag}
              </span>
            ))}
          </div>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription className="text-ink-muted text-sm sm:text-base mt-2">
            {project.modalDescription}
          </DialogDescription>
        </DialogHeader>

        {/* Sekcja podglądu */}
        <div className="space-y-4 my-4">
          {/* Przełącznik widoków dla koncepcji ze zrzutami desktop/mobile */}
          {!isSlider && project.mobileImage && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-ink-muted mr-1 font-medium">Podgląd:</span>
              <button
                type="button"
                onClick={() => setActiveTab("desktop")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                  activeTab === "desktop"
                    ? "bg-accent-text text-white shadow-xs"
                    : "bg-surface-subtle text-ink-muted hover:text-ink border border-line"
                )}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Ekran komputera</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("mobile")}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text",
                  activeTab === "mobile"
                    ? "bg-accent-text text-white shadow-xs"
                    : "bg-surface-subtle text-ink-muted hover:text-ink border border-line"
                )}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Ekran telefonu</span>
              </button>
            </div>
          )}

          {/* Podgląd wizualny w ramce przeglądarki */}
          <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-md">
            {/* Pasek adresu przeglądarki */}
            <div className="bg-surface-subtle border-b border-line px-3.5 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-ink-muted px-2.5 py-0.5 rounded bg-surface border border-line">
                  koncepcja.example
                </span>
              </div>
              <span className="text-[11px] text-ink-muted">
                {isSlider ? "Interaktywne porównanie" : activeTab === "desktop" ? "1440 × 900 px" : "375 × 812 px"}
              </span>
            </div>

            {/* Obszar roboczy podglądu */}
            <div className="p-3 sm:p-4 bg-surface-subtle/50 flex justify-center">
              {isSlider && project.beforeImage && project.afterImage ? (
                <div className="w-full">
                  <BeforeAfterSlider
                    beforeImage={project.beforeImage}
                    beforeAlt={project.beforeAlt || "Wersja przed redesignem"}
                    afterImage={project.afterImage}
                    afterAlt={project.afterAlt || "Wersja po redesignie"}
                    aspectRatio="aspect-[16/10]"
                  />
                  <p className="text-xs text-ink-muted text-center mt-2">
                    Przeciągnij suwak lub użyj strzałek na klawiaturze (krok 5%), aby porównać układ przed i po modernizacji.
                  </p>
                </div>
              ) : activeTab === "desktop" ? (
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-line shadow-sm bg-surface">
                  <Image
                    src={project.desktopImage}
                    alt={project.desktopAlt}
                    fill
                    sizes="(max-width: 1024px) 95vw, 850px"
                    className="object-cover object-top"
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="relative w-[280px] sm:w-[320px] aspect-[9/19.5] rounded-2xl overflow-hidden border-2 border-line shadow-lg bg-surface">
                  {project.mobileImage && (
                    <Image
                      src={project.mobileImage}
                      alt={project.mobileAlt || project.desktopAlt}
                      fill
                      sizes="320px"
                      className="object-cover object-top"
                      loading="lazy"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Adnotacja prawno-koncepcyjna */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-subtle border border-line text-xs text-ink-muted">
            <Info className="h-4 w-4 shrink-0 text-accent-text" />
            <span>{project.disclaimer}</span>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-line text-xs font-semibold text-ink hover:bg-surface-subtle transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text"
          >
            Zamknij
          </DialogClose>

          <Link
            href={project.serviceUrl}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-accent-text text-white text-xs font-semibold hover:bg-accent-text/90 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-text focus-visible:ring-offset-2 underline decoration-white/40 underline-offset-4"
          >
            <span>Poznaj usługę: {project.serviceLabel}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </DialogFooter>
      </DialogContent>
      )}
    </Dialog>
  );
}
