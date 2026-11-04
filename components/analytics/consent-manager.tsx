"use client";

import * as React from "react";
import Script from "next/script";
import {
  subscribeToConsent,
  getConsentSnapshot,
  getConsentServerSnapshot,
  updateGoogleConsentMode,
} from "@/lib/cookie-consent";

export function ConsentManager() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  const consent = React.useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getConsentServerSnapshot
  );

  React.useEffect(() => {
    if (!gaId) return;
    if (consent) {
      updateGoogleConsentMode(consent.analytics, consent.marketing);
    }
  }, [gaId, consent]);

  if (!gaId) {
    return null;
  }

  const isAnalyticsAllowed = Boolean(consent?.analytics);

  return (
    <>
      {/* Inicjalizacja Google Consent Mode v2 (domyślnie denied) */}
      <Script
        id="google-consent-mode-v2"
        strategy="afterInteractive"
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

      {/* Skrypt GA4 ładowany WYŁĄCZNIE po uzyskaniu zgody analitycznej (RODO / ePrivacy) */}
      {isAnalyticsAllowed && (
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
      )}
    </>
  );
}
