"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "noblu-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(STORAGE_KEY);
    setVisible(!savedConsent);
  }, []);

  const saveConsent = (consent: Consent) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100000] px-4 pb-4 sm:px-6">
      <div className="mx-auto max-w-5xl rounded-[1.5rem] border border-[#E8DED2] bg-white/95 p-5 text-[#1D1D1B] shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <h2 className="text-xl font-medium">Pliki cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#5F5B56]">
              Noblu Beauty Room korzysta z plików cookies i podobnych
              technologii, aby strona działała prawidłowo oraz aby wyświetlać
              treści zewnętrzne, takie jak mapa Google i Instagram. Możesz
              zaakceptować wszystkie zgody, odrzucić opcjonalne cookies albo
              dostosować ustawienia.
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
                      Marketing i treści zewnętrzne
                    </span>
                    <span className="block text-sm text-[#6D6B68]">
                      Dotyczy osadzonych treści, map i materiałów z serwisów
                      zewnętrznych.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(event) => setMarketing(event.target.checked)}
                    className="mt-1"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:w-56 lg:flex-col">
            <button
              type="button"
              onClick={() =>
                saveConsent({
                  necessary: true,
                  analytics: true,
                  marketing: true,
                })
              }
              className="rounded-full bg-[#D4B483] px-5 py-3 text-sm font-medium text-black transition-transform hover:scale-[1.02]"
            >
              Akceptuję wszystkie
            </button>
            <button
              type="button"
              onClick={() =>
                saveConsent({
                  necessary: true,
                  analytics: false,
                  marketing: false,
                })
              }
              className="rounded-full border border-[#E8DED2] px-5 py-3 text-sm font-medium transition-colors hover:border-[#D4B483]"
            >
              Odrzucam opcjonalne
            </button>
            {settingsOpen ? (
              <button
                type="button"
                onClick={() =>
                  saveConsent({
                    necessary: true,
                    analytics,
                    marketing,
                  })
                }
                className="rounded-full border border-[#E8DED2] px-5 py-3 text-sm font-medium transition-colors hover:border-[#D4B483]"
              >
                Zapisz wybór
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="rounded-full border border-[#E8DED2] px-5 py-3 text-sm font-medium transition-colors hover:border-[#D4B483]"
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
