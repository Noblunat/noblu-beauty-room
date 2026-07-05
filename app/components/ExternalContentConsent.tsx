"use client";

import type { ReactNode } from "react";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "../lib/cookieConsent";

type ExternalContentConsentProps = {
  title: string;
  description: string;
  buttonLabel: string;
  children: ReactNode;
  className?: string;
};

const getExternalContentConsent = () =>
  readCookieConsent()?.external === true;
const getServerExternalContentConsent = () => false;

const subscribeToExternalContentConsent = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);
  };
};

export default function ExternalContentConsent({
  title,
  description,
  buttonLabel,
  children,
  className = "",
}: ExternalContentConsentProps) {
  const externalContentAllowed = useSyncExternalStore(
    subscribeToExternalContentConsent,
    getExternalContentConsent,
    getServerExternalContentConsent
  );

  const enableExternalContent = () => {
    const currentConsent = readCookieConsent();

    saveCookieConsent({
      necessary: true,
      analytics: currentConsent?.analytics ?? false,
      marketing: currentConsent?.marketing ?? false,
      external: true,
    });
  };

  if (externalContentAllowed) {
    return children;
  }

  return (
    <div
      className={`flex min-h-64 flex-col items-center justify-center gap-4 bg-white/70 px-6 py-10 text-center ${className}`}
    >
      <div>
        <h3 className="text-2xl font-light text-[#1D1D1B]">{title}</h3>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#625B53]">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={enableExternalContent}
        className="rounded-full bg-[#D4B483] px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
      >
        {buttonLabel}
      </button>
      <Link
        href="/polityka-prywatnosci"
        className="text-xs font-medium text-[#8A6A3E] hover:text-[#1D1D1B]"
      >
        Informacje o prywatności
      </Link>
    </div>
  );
}
