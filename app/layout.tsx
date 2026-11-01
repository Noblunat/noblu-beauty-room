
import { business, businessPostalAddress } from "./lib/business";
import type { Metadata } from "next";
import ConversionEvents from "./components/ConversionEvents";
import CookieBanner from "./components/CookieBanner";
import SiteFooter from "./components/SiteFooter";
import GoogleTag from "./components/GoogleTag";
import "./globals.css";

const siteUrl = business.url;
const homeTitle = `${business.name} Kraków | Manicure, pedicure i rzęsy`;
const reservationUrl = `${siteUrl}/rezerwacja`;

const salonJsonLd = {
  "@context": "https://schema.org",
  "@type": ["BeautySalon", "LocalBusiness"],
  "@id": `${siteUrl}/#salon`,
  name: business.name,
  legalName: business.legalName,
  taxID: business.taxId,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "REGON",
    value: business.regon,
  },
  alternateName: `${business.name} Kraków`,
  description:
    `Kameralny salon beauty w Krakowie przy ul. ${business.address.streetLocative}. Stylizacja rzęs, manicure, stylizacja paznokci i pedicure.`,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: [
    `${siteUrl}/logo.png`,
    `${siteUrl}/gallery/salon/salon1.webp`,
    `${siteUrl}/gallery/paznokcie/pedicure-hybrydowy-krakow-noblu.webp`,
  ],
  telephone: business.phone.e164,
  email: business.email,
  priceRange: "$$",
  paymentAccepted: "Gotówka, karta płatnicza",
  currenciesAccepted: "PLN",
  address: businessPostalAddress,
  geo: {
    "@type": "GeoCoordinates",
    ...business.geo,
  },
  hasMap:
    business.links.map,
  publicAccess: true,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: business.hours.days,
      opens: business.hours.opens,
      closes: business.hours.closes,
    },
  ],
  areaServed: business.areas,
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
    business.links.instagram,
    business.links.facebook,
    business.links.booksyProfile,
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
    `Manicure, pedicure i stylizacja rzęs w Krakowie na Borku Fałęckim. Rezerwacja online 24/7, darmowy parking, ponad ${business.reviews.minimum} opinii klientek w Booksy.`,
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
      `Manicure, pedicure i stylizacja rzęs w Krakowie na Borku Fałęckim. Rezerwacja online 24/7, darmowy parking i ponad ${business.reviews.minimum} opinii w Booksy.`,
    url: siteUrl,
    siteName: business.name,
     images: [
    {
      url: `${business.url}/og-noblu.jpg`,
      width: 1200,
      height: 630,
      alt: `Salon beauty ${business.name} Kraków`,
    },
  ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description:
      `Manicure, pedicure i stylizacja rzęs w Krakowie na Borku Fałęckim. Rezerwacja online 24/7, darmowy parking i ponad ${business.reviews.minimum} opinii w Booksy.`,
    images: [`${business.url}/og-noblu.jpg`],
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
        {process.env.NOBLU_LOCAL_PREVIEW !== "1" && <GoogleTag />}
        {process.env.NOBLU_LOCAL_PREVIEW !== "1" && <ConversionEvents />}
        <CookieBanner />
      </body>
    </html>
  );
}
