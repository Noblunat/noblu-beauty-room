import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://noblu.pl"),
  title: "Noblu Beauty Room Kraków | Manicure, paznokcie i beauty premium",
  description:
    "Noblu Beauty Room to salon beauty premium w Krakowie przy ul. Orzechowej 4/lok.1. Manicure, stylizacja paznokci, rzęsy i rezerwacja online przez Booksy.",
  alternates: {
  canonical: "https://noblu.pl",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
