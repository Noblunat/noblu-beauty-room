import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CookieBanner from "./components/CookieBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const booksyUrl =
  "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow";

const salonJsonLd = {
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "LocalBusiness"],
  "@id": "https://noblu.pl/#salon",
  name: "Noblu Beauty Room",
  description:
    "Kameralny salon beauty w Krakowie przy ul. Orzechowej 4/lok.1. Stylizacja rzęs, manicure, stylizacja paznokci i pedicure.",
  url: "https://noblu.pl",
  logo: "https://noblu.pl/logo.png",
  image: [
    "https://noblu.pl/logo.png",
    "https://noblu.pl/gallery/salon/salon1.webp",
    "https://noblu.pl/gallery/rzesy/IMG_9092.webp",
  ],
  telephone: "+48662989534",
  email: "noblu.beautyroom@gmail.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Orzechowa 4/lok.1",
    addressLocality: "Kraków",
    addressRegion: "małopolskie",
    postalCode: "30-422",
    addressCountry: "PL",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.0059,
    longitude: 19.9367,
  },
  hasMap:
    "https://maps.google.com/maps?q=Noblu%20Beauty%20Room%20Krak%C3%B3w",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  areaServed: [
    "Kraków",
    "Borek Fałęcki",
    "Łagiewniki",
    "Ruczaj",
    "Kurdwanów",
    "Podgórze",
    "Podgórze Duchackie",
    "Wola Duchacka",
    "Swoszowice",
  ],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Darmowy parking pod salonem",
      value: true,
    },
  ],
  sameAs: [
    "https://www.instagram.com/noblu_beauty_room/",
    booksyUrl,
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: booksyUrl,
    name: "Rezerwacja wizyty online",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Przedłużanie rzęs",
        url: "https://noblu.pl/przedluzanie-rzes-krakow",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Stylizacja rzęs",
        url: "https://noblu.pl/stylizacja-rzes-krakow",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Manicure",
        url: "https://noblu.pl/manicure-krakow",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Stylizacja paznokci",
        url: "https://noblu.pl/stylizacja-hybrydowa-krakow",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Pedicure",
        url: "https://noblu.pl/pedicure-krakow",
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://noblu.pl"),
  title: "Noblu Beauty Room Kraków | Manicure, paznokcie i beauty premium",
  description:
    "Noblu Beauty Room to salon beauty premium w Krakowie przy ul. Orzechowej 4/lok.1. Manicure, stylizacja paznokci, rzęsy i rezerwacja online przez Booksy.",
  alternates: {
  canonical: "https://noblu.pl",
},
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Noblu Beauty Room Kraków",
    description:
      "Salon beauty premium w Krakowie. Zarezerwuj wizytę online przez Booksy.",
    url: "https://noblu.pl",
    siteName: "Noblu Beauty Room",
     images: [
    {
      url: "https://noblu.pl/logo.png",
      width: 1200,
      height: 630,
      alt: "Noblu Beauty Room Kraków",
    },
  ],
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(salonJsonLd) }}
        />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
