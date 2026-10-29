"use client";

import { useEffect, useState } from "react";

export default function StickyBooking() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home-hero");
    if (!hero || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <a
      href="/rezerwacja"
      data-sticky-booking
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-5 right-5 z-40 rounded-full bg-[#D4B483] py-5 text-center text-lg font-semibold text-black shadow-[0_20px_60px_rgba(212,180,131,0.35)] lg:hidden [body:has([data-cookie-banner])_&]:hidden [body:has(dialog[open])_&]:hidden"
    >
      Zapytaj o termin
    </a>
  );
}
