export interface CookieConsentPreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

export const COOKIE_CONSENT_KEY = "sw_cookie_consent";
export const COOKIE_MAX_AGE_DAYS = 365;

let cachedConsent: CookieConsentPreferences | null = null;
let isInitialized = false;

export function getStoredConsent(): CookieConsentPreferences | null {
  if (typeof document === "undefined") return null;

  try {
    const cookies = document.cookie.split("; ");
    const consentCookie = cookies.find((row) =>
      row.startsWith(`${COOKIE_CONSENT_KEY}=`)
    );

    if (!consentCookie) return null;

    const rawValue = consentCookie.split("=")[1];
    const decoded = decodeURIComponent(rawValue);
    const parsed = JSON.parse(decoded) as CookieConsentPreferences;

    // Sprawdź poprawność struktury
    if (parsed && typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function subscribeToConsent(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => {
    cachedConsent = getStoredConsent();
    callback();
  };
  window.addEventListener("sw:consent-updated", handler);
  return () => window.removeEventListener("sw:consent-updated", handler);
}

export function getConsentSnapshot(): CookieConsentPreferences | null {
  if (typeof window === "undefined") return null;
  if (!isInitialized) {
    cachedConsent = getStoredConsent();
    isInitialized = true;
  }
  return cachedConsent;
}

export function getConsentServerSnapshot(): CookieConsentPreferences | null {
  return null;
}

export function saveConsent(preferences: {
  analytics: boolean;
  marketing: boolean;
  version: string;
}): CookieConsentPreferences {
  const data: CookieConsentPreferences = {
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    timestamp: Date.now(),
    version: preferences.version,
  };

  if (typeof document !== "undefined") {
    const maxAgeSeconds = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
    const isSecure = window.location.protocol === "https:";
    const secureFlag = isSecure ? "; Secure" : "";
    const cookieString = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(
      JSON.stringify(data)
    )}; max-age=${maxAgeSeconds}; path=/; SameSite=Lax${secureFlag}`;

    document.cookie = cookieString;
    cachedConsent = data;

    // Aktualizacja Google Consent Mode v2 w oknie przeglądarki
    updateGoogleConsentMode(data.analytics, data.marketing);

    // Wyemituj zdarzenie dla komponentów nasłuchujących w React
    window.dispatchEvent(new CustomEvent("sw:consent-updated", { detail: data }));
  }

  return data;
}

export function updateGoogleConsentMode(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined") return;

  const w = window as unknown as { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: marketing ? "granted" : "denied",
      ad_user_data: marketing ? "granted" : "denied",
      ad_personalization: marketing ? "granted" : "denied",
    });
  }
}
