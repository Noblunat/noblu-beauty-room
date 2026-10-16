"use client";

import { useEffect, useRef } from "react";
import { googleAnalyticsId } from "../lib/analytics";
import {
  subscribeToCookieConsent,
  type CookieConsent,
  readCookieConsent,
} from "../lib/cookieConsent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

const googleAdsId = "AW-10795260361";
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

function applyGoogleConsent(consent: CookieConsent, configuredTags: Set<string>) {
  // Consent Mode alone can allow cookieless GA4 pings; opt out of collection too.
  window[`ga-disable-${googleAnalyticsId}`] = !consent.analytics;
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
  } else {
    window.gtag?.("consent", "default", getConsentSettings(consent));
    window.gtag?.("js", new Date());
  }

  let referrer = "";
  try {
    const url = new URL(document.referrer);
    referrer = `${url.origin}${url.pathname}`;
  } catch {
    // Direct visits have no referrer.
  }
  const page = {
    page_location: `${window.location.origin}${window.location.pathname}`,
    page_referrer: referrer,
  };
  window.gtag?.("set", {
    ...page,
    allow_google_signals: consent.marketing,
    allow_ad_personalization_signals: consent.marketing,
    ads_data_redaction: !consent.marketing,
  });

  for (const [id, allowed] of [
    [googleAnalyticsId, consent.analytics],
    [googleAdsId, consent.marketing],
  ] as const) {
    if (!allowed || configuredTags.has(id)) continue;
    window.gtag?.("config", id, page);
    configuredTags.add(id);
  }

  if (!googleTagLoaded) {
    const script = document.createElement("script");
    script.id = googleTagScriptId;
    script.async = true;
    const id = consent.analytics ? googleAnalyticsId : googleAdsId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  }
}

export default function GoogleTag() {
  const configuredTags = useRef(new Set<string>());
  useEffect(() => {
    const handleConsentChange = () => {
      const consent = readCookieConsent() ?? {
        necessary: true,
        analytics: false,
        marketing: false,
        external: false,
      } as const;
      try {
        applyGoogleConsent(consent, configuredTags.current);
      } catch {
        // A blocked third-party tag must not interrupt consent controls.
      }
    };
    handleConsentChange();
    return subscribeToCookieConsent(handleConsentChange);
  }, []);

  return null;
}
