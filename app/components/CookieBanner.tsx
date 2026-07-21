"use client";

import { useState, useSyncExternalStore } from "react";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  readCookieConsent,
  saveCookieConsent,
} from "../lib/cookieConsent";

const getCookieBannerVisible = () => readCookieConsent() === null;

const getServerCookieBannerVisible = () => true;

const subscribeToCookieConsent = (callback: () => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, callback);
  };
};

export default function CookieBanner() {
  const visible = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieBannerVisible,
    getServerCookieBannerVisible
  );
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [external, setExternal] = useState(false);

  if (!visible) {
    return null;
  }

  return (
    <div
      data-cookie-banner
      className="fixed inset-x-0 bottom-0 z-[100000] px-4 pb-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-[#E8DED2] bg-white/95 p-4 text-[#1D1D1B] shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <h2 className="text-lg font-medium sm:text-xl">Pliki cookies</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5F5B56] sm:mt-3">
              Używamy cookies do działania strony, analityki i treści
              zewnętrznych, takich jak mapa Google. Możesz zaakceptować zgody,
              odrzucić opcjonalne cookies albo dostosować ustawienia.
            </p>
            <a
              href="/polityka-prywatnosci"
              className="mt-3 inline-flex text-sm font-medium text-[#B08B57] hover:text-[#1D1D1B]"
            >
              Polityka prywatności
            </a>

            {settingsOpen && (
              <div className="mt-5 grid gap-3 rounded-2xl bg-[#F8F5F2] p-4">
                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-medium">
                      Niezbędne cookies
                    </span>
                    <span className="block text-sm text-[#6D6B68]">
                      Wymagane do działania strony i zapamiętania wyboru.
                    </span>
                  </span>
                  <input type="checkbox" checked readOnly className="mt-1" />
                </label>

                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-medium">
                      Analityczne cookies
                    </span>
                    <span className="block text-sm text-[#6D6B68]">
                      Pomagają sprawdzać, jak odwiedzający korzystają ze strony.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="mt-1"
                  />
                </label>

                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-medium">
                      Marketing
                    </span>
                    <span className="block text-sm text-[#6D6B68]">
                      Służy do pomiaru działań reklamowych Google Ads.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="mt-1"
                  />
                </label>

                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block font-medium">
                      Treści zewnętrzne
                    </span>
                    <span className="block text-sm text-[#6D6B68]">
                      Pozwala wyświetlić mapę Google.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={external}
                    onChange={(event) => setExternal(event.target.checked)}
                    className="mt-1"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-row sm:gap-3 lg:w-56 lg:flex-col">
            <button
              type="button"
              onClick={() =>
                saveCookieConsent({
                  necessary: true,
                  analytics: true,
                  marketing: true,
                  external: true,
                })
              }
              className="col-span-2 rounded-full bg-[#D4B483] px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] sm:col-auto sm:py-3"
            >
              Akceptuję wszystkie
            </button>
            <button
              type="button"
              onClick={() =>
                saveCookieConsent({
                  necessary: true,
                  analytics: false,
                  marketing: false,
                  external: false,
                })
              }
              className="rounded-full border border-[#E8DED2] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#D4B483] sm:px-5 sm:py-3"
            >
              Odrzucam opcjonalne
            </button>
            {settingsOpen ? (
              <button
                type="button"
                onClick={() =>
                  saveCookieConsent({
                    necessary: true,
                    analytics,
                    marketing,
                    external,
                  })
                }
                className="rounded-full border border-[#E8DED2] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#D4B483] sm:px-5 sm:py-3"
              >
                Zapisz wybór
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="rounded-full border border-[#E8DED2] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#D4B483] sm:px-5 sm:py-3"
              >
                Ustawienia
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
