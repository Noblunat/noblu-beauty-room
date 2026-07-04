export const COOKIE_CONSENT_STORAGE_KEY = "noblu-cookie-consent";
export const COOKIE_CONSENT_CHANGE_EVENT = "noblu-cookie-consent-change";

export type CookieConsent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

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
      typeof consent.marketing !== "boolean"
    ) {
      return null;
    }

    return consent as CookieConsent;
  } catch {
    return null;
  }
}
