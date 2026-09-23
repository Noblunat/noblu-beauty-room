import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Strona nie istnieje | Noblu Beauty Room",
  description:
    "Nie znaleziono wskazanej strony w serwisie Noblu Beauty Room.",
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
  },
}

const usefulLinks = [
  { href: "/manicure-krakow", label: "Manicure" },
  { href: "/pedicure-krakow", label: "Pedicure" },
  { href: "/stylizacja-rzes-krakow", label: "Stylizacja rzęs" },
  { href: "/cennik", label: "Cennik" },
]

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center bg-[linear-gradient(125deg,#fffdfb_0%,#f8f2eb_48%,#eadcc8_100%)] px-6 py-20 text-[#1D1D1B] sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[#7C6238]">
          Błąd 404
        </p>
        <h1 className="mt-6 text-5xl font-light leading-tight sm:text-6xl lg:text-7xl">
          Ta strona nie istnieje
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#625B53]">
          Adres mógł się zmienić albo zawiera błąd. Wróć na stronę główną lub
          przejdź bezpośrednio do jednej z naszych usług.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#D4B483] px-7 py-4 font-medium text-black transition-transform hover:scale-[1.02]"
          >
            Strona główna
          </Link>
          {usefulLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-[#D4B483] px-7 py-4 font-medium text-[#7C6238] transition-colors hover:bg-[#D4B483] hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
