"use client";

import * as React from "react";
import { useCookieConsent } from "@/components/ui/cookie-banner";

interface CookieSettingsButtonProps {
  className?: string;
}

export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <button
      type="button"
      onClick={openPreferencesModal}
      className={
        className ||
        "hover:text-accent-text transition-colors text-left cursor-pointer inline-block py-0.5"
      }
    >
      Ustawienia cookies
    </button>
  );
}
