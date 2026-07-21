import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ConversionEvents from "./components/ConversionEvents";
import CookieBanner from "./components/CookieBanner";
import GoogleTag from "./components/GoogleTag";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cookieConsentBootstrap = `try{const value=localStorage.getItem("noblu-cookie-consent");if(value){const consent=JSON.parse(value);if(consent.necessary===true&&typeof consent.analytics==="boolean"&&typeof consent.marketing==="boolean"&&(consent.external===undefined||typeof consent.external==="boolean")){document.documentElement.dataset.cookieConsent="saved"}}}catch{}`;

const siteUrl = "https://noblu.pl";
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
    `${siteUrl}/gallery/paznokcie/pedicure-spa-img-7870.webp`,
  ],
  telephone: "+48662989534",
  email: "noblu.beautyroom@gmail.com",
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
    latitude: 50.0059,
    longitude: 19.9367,
  },
  hasMap:
    "https://maps.google.com/maps?q=Noblu%20Beauty%20Room%20Krak%C3%B3w",
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
  ],
  potentialAction: {
    "@type": "ReserveAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: reservationUrl,
      inLanguage: "pl-PL",
    },
    name: "Zapytaj o termin wizyty",
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
        url: `${siteUrl}/stylizacja-hybrydowa-krakow`,
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
  metadataBase: new URL(siteUrl),
  title: "Noblu Beauty Room Kraków | Manicure, paznokcie i beauty premium",
  description:
    "Noblu Beauty Room to salon beauty premium w Krakowie przy ul. Orzechowej 4/lok.1. Manicure, stylizacja paznokci, rzęsy, pedicure i zapytanie o termin online.",
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
    title: "Noblu Beauty Room Kraków",
    description:
      "Salon beauty premium w Krakowie. Zapytaj o termin wizyty online.",
    url: siteUrl,
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
        <script dangerouslySetInnerHTML={{ __html: cookieConsentBootstrap }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(salonJsonLd) }}
        />
        {children}
        <GoogleTag />
        <ConversionEvents />
        <CookieBanner />
      </body>
    </html>
  );
}
