"use client";

import { useEffect } from "react";
import { readCookieConsent } from "../lib/cookieConsent";

const booksyConversionId = "AW-10795260361/w2THCKCZ0LYcEMmzypso";
const phoneConversionId = "AW-10795260361/IB8aCJvquLYcEMmzypso";

export default function ConversionEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");

      if (!link) return;

      const url = link.href;
      const isBooksyLink = url.includes("booksy.com");
      const isPhoneLink = url.startsWith("tel:");
      const consent = readCookieConsent();

      if (
        (!isBooksyLink && !isPhoneLink) ||
        !consent?.marketing ||
        typeof window.gtag !== "function"
      ) {
        return;
      }

      const conversionId = isPhoneLink
        ? phoneConversionId
        : booksyConversionId;
      const opensNewTab = link.target === "_blank";

      if (opensNewTab) {
        window.gtag("event", "conversion", {
          send_to: conversionId,
          value: 1.0,
          currency: "PLN",
          transport_type: "beacon",
        });
        return;
      }

      event.preventDefault();

      let redirected = false;
      const continueNavigation = () => {
        if (redirected) return;
        redirected = true;
        window.location.href = url;
      };

      window.gtag("event", "conversion", {
        send_to: conversionId,
        value: 1.0,
        currency: "PLN",
        event_callback: continueNavigation,
      });

      window.setTimeout(continueNavigation, 700);
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
