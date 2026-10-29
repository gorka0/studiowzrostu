"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/components/ui/cookie-banner";
import { Settings } from "lucide-react";

export function CookieSettingsTrigger() {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <Button
      type="button"
      onClick={openPreferencesModal}
      className="h-10 px-5 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer"
    >
      <Settings className="h-4 w-4" />
      <span>Zmień ustawienia cookies</span>
    </Button>
  );
}
