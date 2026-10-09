export const COOKIE_CONSENT_STORAGE_KEY = "noblu-cookie-consent";
export const COOKIE_CONSENT_CHANGE_EVENT = "noblu-cookie-consent-change";
export const COOKIE_CONSENT_OPEN_EVENT = "noblu-cookie-consent-open";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  external: boolean;
};

let sessionConsent: CookieConsent | null = null;
let storageWriteFailed = false;

export function subscribeToCookieConsent(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.storageArea !== window.localStorage ||
        (event.key !== COOKIE_CONSENT_STORAGE_KEY && event.key !== null)) return;
    sessionConsent = null;
    storageWriteFailed = false;
    callback();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);
  };
}

export function saveCookieConsent(consent: CookieConsent) {
  sessionConsent = consent;
  try {
    window.localStorage.setItem(
      COOKIE_CONSENT_STORAGE_KEY,
      JSON.stringify(consent)
    );
    storageWriteFailed = false;
  } catch {
    // Keep the choice for this page when browser storage is unavailable.
    storageWriteFailed = true;
  }
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: consent })
  );
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  if (storageWriteFailed) return sessionConsent;

  let storedConsent: string | null;
  try {
    storedConsent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    return sessionConsent;
  }

  if (!storedConsent) return null;

  try {
    const consent = JSON.parse(storedConsent) as Partial<CookieConsent>;

    if (
      consent.necessary !== true ||
      typeof consent.analytics !== "boolean" ||
      typeof consent.marketing !== "boolean" ||
      (consent.external !== undefined &&
        typeof consent.external !== "boolean")
    ) {
      return null;
    }

    return {
      necessary: true,
      analytics: consent.analytics,
      marketing: consent.marketing,
      external: consent.external ?? consent.marketing,
    };
  } catch {
    return null;
  }
}
