import { readCookieConsent } from "./cookieConsent";

export const googleAnalyticsId = "G-BD9VRN0W6Q";

const servicePages = new Map([
  ["/manicure-krakow", "Manicure"],
  ["/pedicure-krakow", "Pedicure"],
  ["/stylizacja-rzes-krakow", "Stylizacja rzęs"],
  ["/przedluzanie-rzes-krakow", "Przedłużanie rzęs"],
]);

const bookingServices = new Map([
  ["manicure", "Manicure"],
  ["pedicure", "Pedicure"],
  ["hybryda", "Stylizacja hybrydowa"],
  ["rzesy", "Stylizacja rzęs"],
]);

export function serviceFromPath(pathname: string) {
  return servicePages.get(pathname.replace(/\/$/, ""));
}

export function bookingClickDetails(href: string, pageUrl: string) {
  const source = new URL(pageUrl);
  const target = new URL(href, source);
  const isBooksy = target.hostname === "booksy.com" || target.hostname.endsWith(".booksy.com");
  const isForm = target.origin === source.origin && target.pathname.replace(/\/$/, "") === "/rezerwacja";

  if (!isBooksy && !isForm) return null;

  return {
    service_name: bookingServices.get(target.searchParams.get("usluga") ?? "") ?? serviceFromPath(source.pathname) ?? "unspecified",
    source_page: source.pathname,
    booking_channel: isBooksy ? "booksy" : "reservation_form",
  };
}

type AnalyticsEvent = "view_service" | "click_booking" | "booking_start" | "booking_complete";

export function trackAnalyticsEvent(
  event: AnalyticsEvent,
  parameters: { service_name: string; source_page?: string; booking_channel?: string },
) {
  if (typeof window === "undefined") return false;

  try {
    if (!readCookieConsent()?.analytics || typeof window.gtag !== "function") return false;

    window.gtag("event", event, {
      ...parameters,
      // Query strings can contain private data; only send the page's clean URL.
      page_location: `${window.location.origin}${window.location.pathname}`,
      send_to: googleAnalyticsId,
      transport_type: "beacon",
    });
    return true;
  } catch {
    // Analytics must never interrupt navigation or submitting a request.
    return false;
  }
}
