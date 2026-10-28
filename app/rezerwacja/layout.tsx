
import { business } from "../lib/business";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const reservationUrl = `${business.url}/rezerwacja`;
const title = "Rezerwacja Noblu Kraków | Manicure, pedicure i rzęsy";
const description =
  `Wyślij prośbę o termin na manicure, pedicure, paznokcie hybrydowe lub stylizację rzęs w ${business.name} Kraków. Formularz online 24/7.`;
const socialImage = `${reservationUrl}/og-rezerwacja.jpg`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: reservationUrl,
  },
  openGraph: {
    title,
    description,
    url: reservationUrl,
    siteName: business.name,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: `Rezerwacja manicure pedicure i rzęs ${business.name} Kraków`,
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [socialImage],
  },
};

export default function ReservationLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
