import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics, GtmNoscript } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://woodsteel.sk"),
  title: "WS Wintergarten - Wintergärten, Pergolen und Terrassenverglasung",
  description:
    "Eigene Fertigung und Montage. Angebot binnen 24 Stunden, kostenloser Vor-Ort-Termin. 250+ Projekte, 5 Jahre Garantie.",
  openGraph: {
    title: "WS Wintergarten — Ein Außenbereich, den Sie das ganze Jahr lieben",
    description:
      "Pergolen, Wintergärten, Terrassenverglasung. Eigene Fertigung und Montage seit 2021.",
    type: "website",
    locale: "de_DE",
  },
  verification: {
    google: "YKEOg1-tX28Hj7soObmAi8-KitpGkoGqV4vRSvCZMDE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${inter.variable} ${manrope.variable} antialiased`}>
      <body className="bg-white text-charcoal min-h-screen flex flex-col">
        <GtmNoscript />
        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
