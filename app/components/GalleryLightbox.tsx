"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type Props = {
  item: { src: string; type: "image" | "video"; category: string; alt?: string }
  index: number
  total: number
  onPrevious: () => void
  onNext: () => void
  onClose: () => void
}

export default function GalleryLightbox({
  item, index, total, onPrevious, onNext, onClose,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = "hidden"
    return () => {
      dialog?.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus()
    }
  }, [])

  const controlClass = "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"

  return (
    <dialog
      ref={dialogRef}
      aria-label="Powiększenie realizacji Noblu"
      onCancel={onClose}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === "Tab" && item.type === "image") {
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>("button")
          const first = buttons[0]
          const last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault()
            last?.focus()
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault()
            first?.focus()
          }
        }
        if (event.target instanceof HTMLVideoElement) return
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault()
          if (event.key === "ArrowLeft") onPrevious()
          else onNext()
        }
      }}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-black/95 p-4 text-white backdrop:bg-black/80 sm:p-6"
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button type="button" onClick={onPrevious} className={controlClass} aria-label="Poprzednia realizacja" title="Poprzednia realizacja">
            <ChevronLeft aria-hidden="true" />
          </button>
          <p aria-live="polite" aria-atomic="true" className="min-w-16 text-center text-sm">{index + 1} / {total}</p>
          <button type="button" onClick={onNext} className={controlClass} aria-label="Następna realizacja" title="Następna realizacja">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
        <button type="button" onClick={onClose} className={controlClass} aria-label="Zamknij powiększenie" title="Zamknij powiększenie">
          <X aria-hidden="true" />
        </button>
      </div>
      <div className="relative mx-auto mt-4 h-[calc(100dvh-7rem)] max-w-6xl">
        {item.type === "video" ? (
          <video key={item.src} src={item.src} controls playsInline aria-label={item.alt ?? item.category} className="h-full w-full object-contain" />
        ) : (
          <Image src={item.src} alt={item.alt ?? `${item.category} w Noblu Beauty Room Kraków`} fill sizes="(min-width: 1280px) 1152px, calc(100vw - 2rem)" className="object-contain" />
        )}
      </div>
    </dialog>
  )
}
