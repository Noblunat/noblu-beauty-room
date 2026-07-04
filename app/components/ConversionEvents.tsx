"use client";

import { useEffect } from "react";

const booksyConversionId = "AW-10795260361/w2THCKCZ0LYcEMmzypso";

export default function ConversionEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href*="booksy.com"]');

      if (!link || typeof window.gtag !== "function") return;

      const url = link.href;
      const opensNewTab = link.target === "_blank";

      if (opensNewTab) {
        window.gtag("event", "conversion", {
          send_to: booksyConversionId,
          value: 1.0,
          currency: "PLN",
          transport_type: "beacon",
        });
        return;
      }

      event.preventDefault();

      let redirected = false;
      const goToBooksy = () => {
        if (redirected) return;
        redirected = true;
        window.location.href = url;
      };

      window.gtag("event", "conversion", {
        send_to: booksyConversionId,
        value: 1.0,
        currency: "PLN",
        event_callback: goToBooksy,
      });

      window.setTimeout(goToBooksy, 700);
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
