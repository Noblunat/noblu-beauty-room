import { parsePhoneNumberFromString } from "libphonenumber-js/min";

export const phoneErrorMessage =
  "Podaj prawidłowy numer telefonu. Dla numeru zagranicznego dodaj kod kraju, np. +44.";

export function normalizePhoneNumber(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 40) return null;
  const input = value.trim();
  if (!input || !/^[+\d\s().-]+$/.test(input)) return null;
  const parsed = parsePhoneNumberFromString(input, {
    defaultCountry: "PL",
    extract: false,
  });
  return parsed?.isPossible() ? parsed.number : null;
}
