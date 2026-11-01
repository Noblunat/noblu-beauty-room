"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import GalleryLightbox from "../GalleryLightbox";
import { galleryItems } from "../../lib/homeGallery";

export default function HomeGallery() {
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<
    number | null
  >(null);
  const [galleryPaused, setGalleryPaused] = useState(false);
  const [galleryHasFocus, setGalleryHasFocus] = useState(false);
  const [galleryStart, setGalleryStart] = useState(0);
  const visibleGalleryItems = Array.from(
    { length: 6 },
    (_, index) => galleryItems[(galleryStart + index) % galleryItems.length],
  );

  useEffect(() => {
    if (galleryPaused || galleryHasFocus || selectedGalleryIndex !== null)
      return;
    const interval = setInterval(() => {
      setGalleryStart((start) => (start + 6) % galleryItems.length);
    }, 16000);

    return () => clearInterval(interval);
  }, [galleryPaused, galleryHasFocus, selectedGalleryIndex]);

  return (
    <>
      <section id="realizacje-salonu" className="scroll-mt-28 py-28 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-4xl lg:text-6xl font-light leading-tight text-[#111111]">
              Galeria
            </h2>
            <button
              type="button"
              aria-label={
                galleryPaused
                  ? "Wznów automatyczną zmianę zdjęć"
                  : "Zatrzymaj automatyczną zmianę zdjęć"
              }
              title={
                galleryPaused
                  ? "Wznów automatyczną zmianę zdjęć"
                  : "Zatrzymaj automatyczną zmianę zdjęć"
              }
              aria-pressed={galleryPaused}
              onClick={() => setGalleryPaused((paused) => !paused)}
              className="inline-flex min-h-11 items-center gap-2 px-3 text-sm font-medium text-[#1D1D1B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C6238]"
            >
              {galleryPaused ? (
                <Play size={20} aria-hidden="true" />
              ) : (
                <Pause size={20} aria-hidden="true" />
              )}
              {galleryPaused ? "Wznów" : "Pauza"}
            </button>
          </div>

          <div
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto"
            onFocusCapture={() => setGalleryHasFocus(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget))
                setGalleryHasFocus(false);
            }}
          >
            {visibleGalleryItems.map((item, index) => (
              <button
                type="button"
                key={`gallery-slot-${index}`}
                aria-label={`Otwórz realizację: ${item.alt ?? item.category}`}
                onClick={() => {
                  setSelectedGalleryIndex(
                    (galleryStart + index) % galleryItems.length,
                  );
                }}
                onKeyDown={(event) => {
                  if (
                    ![
                      "ArrowLeft",
                      "ArrowRight",
                      "ArrowUp",
                      "ArrowDown",
                    ].includes(event.key)
                  )
                    return;
                  event.preventDefault();
                  const buttons =
                    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(
                      "button",
                    );
                  if (!buttons) return;
                  const step =
                    event.key === "ArrowLeft" || event.key === "ArrowUp"
                      ? -1
                      : 1;
                  buttons[
                    (index + step + buttons.length) % buttons.length
                  ]?.focus();
                }}
                className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-[1.6rem] bg-[#E8D6BE]/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]"
              >
                <>
                  {item.type === "video" ? (
                    <div key={item.src} className="absolute inset-0">
                      <Image
                        src={item.poster ?? "/logo.png"}
                        alt={
                          item.alt ??
                          `${item.category} w Noblu Beauty Room Kraków`
                        }
                        fill
                        sizes="(min-width: 1280px) 334px, (min-width: 1024px) 30vw, calc(50vw - 1.875rem)"
                        quality={70}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-all duration-700 group-hover:bg-black/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/85 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-105">
                          <span className="ml-1 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#7C6238]" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div key={item.src} className="absolute inset-0">
                      <Image
                        src={item.src}
                        alt={
                          item.alt ??
                          `${item.category} w Noblu Beauty Room Kraków`
                        }
                        fill
                        sizes="(min-width: 1280px) 334px, (min-width: 1024px) 30vw, calc(50vw - 1.875rem)"
                        quality={72}
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                </>

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700"></div>
              </button>
            ))}
          </div>
        </div>
      </section>
      {selectedGalleryIndex !== null && (
        <GalleryLightbox
          item={galleryItems[selectedGalleryIndex]}
          index={selectedGalleryIndex}
          total={galleryItems.length}
          onPrevious={() =>
            setSelectedGalleryIndex((index) =>
              index === null
                ? null
                : (index - 1 + galleryItems.length) % galleryItems.length,
            )
          }
          onNext={() =>
            setSelectedGalleryIndex((index) =>
              index === null ? null : (index + 1) % galleryItems.length,
            )
          }
          onClose={() => setSelectedGalleryIndex(null)}
        />
      )}
    </>
  );
}
