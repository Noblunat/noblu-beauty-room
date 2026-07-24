import type { Metadata } from "next";
import type { ReactNode } from "react";

const reservationUrl = "https://noblu.pl/rezerwacja";
const title = "Rezerwacja Noblu Kraków | Manicure, pedicure i rzęsy";
const description =
  "Wyślij prośbę o termin na manicure, pedicure, paznokcie hybrydowe lub stylizację rzęs w Noblu Beauty Room Kraków. Formularz online 24/7.";
const socialImage = `${reservationUrl}/rezerwacja-hero.jpg`;

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
    siteName: "Noblu Beauty Room",
    images: [
      {
        url: socialImage,
        width: 6828,
        height: 5122,
        alt: "Stylizacja paznokci w Noblu Beauty Room Kraków",
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
