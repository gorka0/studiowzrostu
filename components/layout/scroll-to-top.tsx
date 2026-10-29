"use client";

import * as React from "react";

/**
 * ScrollToTopOnReload – Gwarantuje, że odświeżenie strony (F5 / Ctrl+R)
 * lub ponowne wejście zawsze rozpoczyna się od samego szczytu (0, 0),
 * eliminując domyślne przywracanie pozycji scrolla na sam dół strony przez przeglądarkę.
 */
export function ScrollToTopOnReload() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Jeśli brak kotwicy w URL, upewnij się, że jesteśmy na górze
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    const handleBeforeUnload = () => {
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return null;
}
