"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { subscribeToCookieConsent } from "../lib/cookieConsent";
import { bookingClickDetails, serviceFromPath, trackAnalyticsEvent, trackGoogleAdsConversion } from "../lib/analytics";
import { servicePages } from "../lib/serviceCatalog";

const booksyConversionId = "AW-10795260361/w2THCKCZ0LYcEMmzypso";
const phoneConversionId = "AW-10795260361/IB8aCJvquLYcEMmzypso";

export default function ConversionEvents() {
  const pathname = usePathname();
  const serviceView = useRef({ pathname: "", sent: false });

  useEffect(() => {
    if (serviceView.current.pathname !== pathname) {
      serviceView.current = { pathname, sent: false };
    }

    const trackView = () => {
      const serviceName = serviceFromPath(pathname);
      if (!serviceName || serviceView.current.sent) return;
      serviceView.current.sent = trackAnalyticsEvent("view_service", { service_name: serviceName, service_category: servicePages[pathname]?.category });
    };

    trackView();
    return subscribeToCookieConsent(trackView);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>("a[href]");

      if (!link) return;

      const url = link.href;
      const booking = bookingClickDetails(url, window.location.href, link.dataset.serviceId);
      if (booking) {
        trackAnalyticsEvent("click_booking", {
          ...booking,
          service_name: link.dataset.serviceName || booking.service_name,
        });
      }
      const isBooksyLink = booking?.booking_channel === "booksy";
      const isPhoneLink = url.startsWith("tel:");
      if (isPhoneLink || isBooksyLink) {
        // Beacon delivery must never intercept the browser's native navigation.
        trackGoogleAdsConversion(isPhoneLink ? phoneConversionId : booksyConversionId);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
