"use client";

import * as React from "react";
import Script from "next/script";
import { getStoredConsent, updateGoogleConsentMode } from "@/lib/cookie-consent";

export function ConsentManager() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  React.useEffect(() => {
    // Sprawdź czy użytkownik ma już zapisany wybór cookies
    const stored = getStoredConsent();
    if (stored) {
      updateGoogleConsentMode(stored.analytics, stored.marketing);
    }
  }, []);

  return (
    <>
      {/* Inicjalizacja Google Consent Mode v2 (domyślnie denied dla wszystkich kategorii) */}
      <script
        id="google-consent-mode-v2"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'analytics_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'wait_for_update': 500
            });
          `,
        }}
      />

      {/* Skrypt GA4 wstrzykiwany WYŁĄCZNIE, gdy zdefiniowano identyfikator NEXT_PUBLIC_GA_ID */}
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      ) : null}
    </>
  );
}
