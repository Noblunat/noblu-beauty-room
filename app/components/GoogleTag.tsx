"use client";

import { useEffect } from "react";
import { googleAnalyticsId } from "../lib/analytics";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  type CookieConsent,
  readCookieConsent,
} from "../lib/cookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const googleTagId = "GT-TW5DT9Q4";
const googleTagScriptId = "noblu-google-tag";

function getConsentSettings(consent: CookieConsent) {
  return {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  };
}

function initializeGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // gtag.js expects an Arguments object, not an Array, in the data layer.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
}

function applyGoogleConsent(consent: CookieConsent) {
  const googleTagLoaded = Boolean(
    document.getElementById(googleTagScriptId)
  );

  if (!consent.analytics && !consent.marketing) {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", getConsentSettings(consent));
    }
    return;
  }

  initializeGtag();

  if (googleTagLoaded) {
    window.gtag?.("consent", "update", getConsentSettings(consent));
    return;
  }

  window.gtag?.("consent", "default", getConsentSettings(consent));
  window.gtag?.("js", new Date());
  window.gtag?.("config", googleTagId);
  window.gtag?.("config", googleAnalyticsId);

  const script = document.createElement("script");
  script.id = googleTagScriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleTagId}`;
  document.head.appendChild(script);
}

export default function GoogleTag() {
  useEffect(() => {
    const storedConsent = readCookieConsent();

    if (storedConsent) {
      applyGoogleConsent(storedConsent);
    }

    const handleConsentChange = (event: Event) => {
      const consent =
        event instanceof CustomEvent
          ? (event.detail as CookieConsent)
          : readCookieConsent();

      if (!consent) {
        return;
      }

      applyGoogleConsent(consent);
    };

    window.addEventListener(
      COOKIE_CONSENT_CHANGE_EVENT,
      handleConsentChange
    );

    return () =>
      window.removeEventListener(
        COOKIE_CONSENT_CHANGE_EVENT,
        handleConsentChange
      );
  }, []);

  return null;
}
