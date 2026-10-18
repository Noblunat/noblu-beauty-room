export const COOKIE_CONSENT_STORAGE_KEY = "noblu-cookie-consent";
export const COOKIE_CONSENT_CHANGE_EVENT = "noblu-cookie-consent-change";
export const COOKIE_CONSENT_OPEN_EVENT = "noblu-cookie-consent-open";
// Bump only when consent purposes, tools or disclosed processing materially change.
export const COOKIE_CONSENT_VERSION = 1;

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
      JSON.stringify({
        necessary: consent.necessary,
        analytics: consent.analytics,
        marketing: consent.marketing,
        external: consent.external,
        version: COOKIE_CONSENT_VERSION,
        decidedAt: new Date().toISOString(),
      })
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
    const consent = JSON.parse(storedConsent) as Partial<CookieConsent> & {
      version?: unknown;
      decidedAt?: unknown;
    };

    if (
      !consent ||
      typeof consent !== "object" ||
      consent.version !== COOKIE_CONSENT_VERSION ||
      typeof consent.decidedAt !== "string" ||
      consent.necessary !== true ||
      typeof consent.analytics !== "boolean" ||
      typeof consent.marketing !== "boolean" ||
      typeof consent.external !== "boolean"
    ) {
      return null;
    }

    const decidedAt = new Date(consent.decidedAt);
    if (!Number.isFinite(decidedAt.getTime()) ||
        decidedAt.toISOString() !== consent.decidedAt) return null;

    return {
      necessary: true,
      analytics: consent.analytics,
      marketing: consent.marketing,
      external: consent.external,
    };
  } catch {
    return null;
  }
}
