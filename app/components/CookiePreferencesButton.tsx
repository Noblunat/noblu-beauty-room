"use client";

import { COOKIE_CONSENT_OPEN_EVENT } from "../lib/cookieConsent";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT))}
      className="text-left underline underline-offset-4 hover:text-[#7C6238]"
    >
      Edytuj preferencje plików cookie
    </button>
  );
}
