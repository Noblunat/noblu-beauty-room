import type { Metadata } from "next";
import ConversionEvents from "./components/ConversionEvents";
import CookieBanner from "./components/CookieBanner";
import SiteFooter from "./components/SiteFooter";
import GoogleTag from "./components/GoogleTag";
import "./globals.css";

const siteUrl = "https://noblu.pl";
const homeTitle = "Noblu Beauty Room Kraków | Manicure, pedicure i rzęsy";
const reservationUrl = `${siteUrl}/rezerwacja`;

const salonJsonLd = {
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "LocalBusiness"],
  "@id": `${siteUrl}/#salon`,
  name: "Noblu Beauty Room",
  legalName: "Noblu Beauty Room Natalia Mądry",
  taxID: "6793222358",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "REGON",
    value: "389813411",
  },
  alternateName: "Noblu Beauty Room Kraków",
  description:
    "Kameralny salon beauty w Krakowie przy ul. Orzechowej 4/lok.1. Stylizacja rzęs, manicure, stylizacja paznokci i pedicure.",
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: [
    `${siteUrl}/logo.png`,
    `${siteUrl}/gallery/salon/salon1.webp`,
    `${siteUrl}/gallery/paznokcie/pedicure-hybrydowy-krakow-noblu.webp`,
  ],
  telephone: "+48662989534",
  email: "salon@noblu.pl",
  priceRange: "$$",
  paymentAccepted: "Gotówka, karta płatnicza",
  currenciesAccepted: "PLN",
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
    latitude: 50.0118355,
    longitude: 19.9252253,
  },
  hasMap:
    "https://www.google.com/maps?cid=6617500446211091555",
  publicAccess: true,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "10:00",
      closes: "19:30",
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
  knowsAbout: [
    "manicure",
    "pedicure",
    "stylizacja paznokci",
    "stylizacja rzęs",
    "przedłużanie rzęs",
    "salon beauty Kraków",
  ],
  sameAs: [
    "https://www.instagram.com/noblu_beauty_room/",
    "https://www.facebook.com/noblu.beautyroom/",
    "https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow",
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: reservationUrl,
      inLanguage: "pl-PL",
    },
    name: "Zapytaj o termin",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Przedłużanie rzęs",
        url: `${siteUrl}/przedluzanie-rzes-krakow`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Stylizacja rzęs",
        url: `${siteUrl}/stylizacja-rzes-krakow`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Manicure",
        url: `${siteUrl}/manicure-krakow`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Stylizacja paznokci",
        url: `${siteUrl}/manicure-krakow`,
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Pedicure",
        url: `${siteUrl}/pedicure-krakow`,
      },
    },
  ],
};

export const metadata: Metadata = {
  other: { "noblu-release": process.env.VERCEL_GIT_COMMIT_SHA || "local" },
  metadataBase: new URL(siteUrl),
  title: homeTitle,
  description:
    "Manicure, pedicure i stylizacja rzęs w Krakowie na Borku Fałęckim. Rezerwacja online 24/7, darmowy parking, ponad 240 opinii klientek.",
  alternates: {
  canonical: siteUrl,
},
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: homeTitle,
    description:
      "Manicure, pedicure i stylizacja rzęs w Krakowie na Borku Fałęckim. Rezerwacja online 24/7, darmowy parking i ponad 240 opinii.",
    url: siteUrl,
    siteName: "Noblu Beauty Room",
     images: [
    {
      url: "https://noblu.pl/og-noblu.jpg",
      width: 1200,
      height: 630,
      alt: "Salon beauty Noblu Beauty Room Kraków",
    },
  ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description:
      "Manicure, pedicure i stylizacja rzęs w Krakowie na Borku Fałęckim. Rezerwacja online 24/7, darmowy parking i ponad 240 opinii.",
    images: ["https://noblu.pl/og-noblu.jpg"],
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
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(salonJsonLd) }}
        />
        {children}
        <SiteFooter />
        <GoogleTag />
        <ConversionEvents />
        <CookieBanner />
      </body>
    </html>
  );
}
