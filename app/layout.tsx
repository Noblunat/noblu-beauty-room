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

export const metadata = {
  title: "Noblu Beauty Room Kraków | Manicure, paznokcie i beauty premium",
  description:
    "Noblu Beauty Room to salon beauty premium w Krakowie przy ul. Orzechowej 4/lok.1. Manicure, stylizacja paznokci, rzęsy i rezerwacja online przez Booksy.",
  keywords: [
    "Noblu Beauty Room",
    "manicure Kraków",
    "paznokcie Kraków",
    "salon beauty Kraków",
    "stylizacja paznokci Kraków",
    "beauty room Kraków",
  ],
  openGraph: {
    title: "Noblu Beauty Room Kraków",
    description:
      "Salon beauty premium w Krakowie. Zarezerwuj wizytę online przez Booksy.",
    url: "https://noblu.pl",
    siteName: "Noblu Beauty Room",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
