"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { X } from "lucide-react";
import {
  subscribeToCookieConsent,
  COOKIE_CONSENT_OPEN_EVENT,
  type CookieConsent,
  readCookieConsent,
  saveCookieConsent,
} from "../lib/cookieConsent";

const getCookieBannerVisible = () => readCookieConsent() === null;

const getServerCookieBannerVisible = () => true;

const consentActionClassName = "min-h-11 rounded-full bg-[#D4B483] px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-[#C9A571] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C6238]";

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
  const [editing, setEditing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (settingsOpen) {
      const dialog = dialogRef.current;
      if (dialog && !dialog.open) dialog.showModal();
      headingRef.current?.focus({ preventScroll: true });
      return () => { if (dialog?.open) dialog.close(); };
    }
    const opener = returnFocusRef.current;
    if (opener) {
      // The first-layer settings button is recreated after leaving the dialog.
      (opener.isConnected ? opener : settingsButtonRef.current)?.focus({ preventScroll: true });
      returnFocusRef.current = null;
    }
  }, [settingsOpen]);

  useEffect(() => {
    const syncPreferences = () => {
      const consent = readCookieConsent();
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
      setExternal(consent?.external ?? false);
    };
    const openPreferences = () => {
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      syncPreferences();
      setSettingsOpen(true);
      setEditing(true);
    };
    const unsubscribe = subscribeToCookieConsent(syncPreferences);
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, openPreferences);
    return () => {
      unsubscribe();
      window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, openPreferences);
    };
  }, []);

  const save = (consent: CookieConsent) => {
    saveCookieConsent(consent);
    setEditing(false);
    setSettingsOpen(false);
  };

  const closePreferences = () => {
    setEditing(false);
    setSettingsOpen(false);
  };

  if (!visible && !editing) {
    return null;
  }

  const content = (
      <div className="relative mx-auto max-h-[85dvh] max-w-5xl overflow-y-auto rounded-[1.5rem] border border-[#E8DED2] bg-white/95 p-4 text-[#1D1D1B] shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6">
        {settingsOpen && <button
          type="button"
          aria-label="Zamknij ustawienia cookies"
          title="Zamknij ustawienia cookies"
          onClick={closePreferences}
          className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-[#1D1D1B] hover:bg-[#F8F5F2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C6238] sm:right-3 sm:top-3"
        ><X size={20} aria-hidden="true" /></button>}
        <div className={`grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start${settingsOpen ? " pt-12" : ""}`}>
          <div>
            <h2 ref={headingRef} id="cookie-preferences-title" tabIndex={settingsOpen ? -1 : undefined} className="pr-10 text-lg font-medium outline-none sm:text-xl">{settingsOpen ? "Preferencje plików cookie" : "Pliki cookies"}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5F5B56] sm:mt-3">
              Używamy cookies i podobnych technologii do działania strony,
              analityki, marketingu (pomiaru i personalizacji reklam Google Ads)
              oraz treści zewnętrznych, takich jak mapa Google. Możesz zaakceptować zgody,
              odrzucić opcjonalne cookies albo dostosować ustawienia.
            </p>
            <a
              href="/polityka-prywatnosci"
              className="mt-3 inline-flex text-sm font-medium text-[#7C6238] hover:text-[#1D1D1B]"
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
                  <input type="checkbox" checked disabled className="mt-1" />
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
                      Pozwala mierzyć skuteczność i personalizować reklamy Google Ads.
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

          <div className={`grid gap-2 sm:flex sm:flex-row sm:gap-3 lg:w-56 lg:flex-col${settingsOpen ? "" : " grid-cols-2"}`}>
            <button
              type="button"
              onClick={() =>
                save({
                  necessary: true,
                  analytics: true,
                  marketing: true,
                  external: true,
                })
              }
              className={consentActionClassName}
            >
              Akceptuję wszystkie
            </button>
            <button
              type="button"
              onClick={() =>
                save({
                  necessary: true,
                  analytics: false,
                  marketing: false,
                  external: false,
                })
              }
              className={consentActionClassName}
            >
              Odrzucam opcjonalne
            </button>
            {settingsOpen ? (
              <button
                type="button"
                onClick={() =>
                  save({
                    necessary: true,
                    analytics,
                    marketing,
                    external,
                  })
                }
                className="col-span-2 rounded-full border border-[#E8DED2] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#D4B483] sm:px-5 sm:py-3"
              >
                Zapisz wybór
              </button>
            ) : (
              <button
                type="button"
                ref={settingsButtonRef}
                onClick={(event) => {
                  returnFocusRef.current = event.currentTarget;
                  setEditing(true);
                  setSettingsOpen(true);
                }}
                className="col-span-2 rounded-full border border-[#E8DED2] px-4 py-2.5 text-sm font-medium transition-colors hover:border-[#D4B483] sm:px-5 sm:py-3"
              >
                Ustawienia
              </button>
            )}
          </div>
        </div>
      </div>
  );

  return settingsOpen ? (
    <dialog
      ref={dialogRef}
      data-cookie-banner
      aria-labelledby="cookie-preferences-title"
      aria-modal="true"
      onCancel={(event) => { event.preventDefault(); closePreferences(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled])");
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === headingRef.current)) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-5xl overflow-visible border-0 bg-transparent p-0 backdrop:bg-black/30"
    >{content}</dialog>
  ) : (
    <div data-cookie-banner role="region" aria-label="Preferencje plików cookie" className="fixed inset-x-0 bottom-0 z-[100000] px-4 pb-4 sm:px-6">
      {content}
    </div>
  );
}
