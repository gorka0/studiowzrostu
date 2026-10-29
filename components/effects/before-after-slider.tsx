"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  beforeAlt: string;
  afterImage: string;
  afterAlt: string;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-[16/10]"
}

export function BeforeAfterSlider({
  beforeImage,
  beforeAlt,
  afterImage,
  afterAlt,
  className,
  aspectRatio = "aspect-[16/10]",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = React.useState<number>(50);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPosition(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPosition(100);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none bg-surface border border-line rounded-lg",
        aspectRatio,
        className
      )}
    >
      {/* Warstwa bazowa: PRZED (widoczna po lewej stronie do pozycji suwaka) */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          unoptimized
          className="object-cover object-top"
          priority={false}
          loading="lazy"
        />
        {/* Etykieta Przed (WCAG AA kontrast: biały tekst na ciemnym tle) */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold tracking-wide rounded bg-black/85 text-white border border-white/20 shadow-sm">
            Przed
          </span>
        </div>
      </div>

      {/* Warstwa nałożona: PO (przycięta do prawej strony suwaka) */}
      <div
        className="absolute inset-0 w-full h-full will-change-[clip-path]"
        style={{
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        <Image
          src={afterImage}
          alt={afterAlt}
          fill
          unoptimized
          className="object-cover object-top"
          priority={false}
          loading="lazy"
        />
        {/* Etykieta Po (WCAG AA kontrast: biały tekst na ciemnym tle) */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold tracking-wide rounded bg-black/85 text-white border border-white/20 shadow-sm">
            Po
          </span>
        </div>
      </div>

      {/* Pionowa linia podziału i uchwyt suwaka */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,0.6)] z-20 pointer-events-none -translate-x-1/2"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Uchwyt kółko z dwoma strzałkami ↔ */}
        <div
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-ink border-2 border-surface shadow-lg flex items-center justify-center transition-transform duration-100",
            isFocused && "ring-2 ring-accent-text ring-offset-2 ring-offset-background scale-110"
          )}
          aria-hidden="true"
        >
          <svg
            className="w-4 h-4 text-ink"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="8 7 3 12 8 17" />
            <polyline points="16 7 21 12 16 17" />
            <line x1="3" y1="12" x2="21" y2="12" />
          </svg>
        </div>
      </div>

      {/* Dostępny natywny suwak (pełna obsługa myszy, dotyku i klawiatury) */}
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={sliderPosition}
        onChange={(e) => setSliderPosition(Number(e.target.value))}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Porównanie: przed i po"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPosition}
        aria-valuetext={`Pozycja suwaka: ${sliderPosition}% (lewa strona: wersja przed, prawa strona: wersja po)`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 m-0 p-0 touch-none"
      />
    </div>
  );
}
