export const COOKIE_CONSENT_STORAGE_KEY = "noblu-cookie-consent";
export const COOKIE_CONSENT_CHANGE_EVENT = "noblu-cookie-consent-change";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  external: boolean;
};

export function saveCookieConsent(consent: CookieConsent) {
  window.localStorage.setItem(
    COOKIE_CONSENT_STORAGE_KEY,
    JSON.stringify(consent)
  );
  document.documentElement.dataset.cookieConsent = "saved";
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: consent })
  );
}

export function readCookieConsent(): CookieConsent | null {
  const storedConsent = window.localStorage.getItem(
    COOKIE_CONSENT_STORAGE_KEY
  );

  if (!storedConsent) {
    return null;
  }

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
