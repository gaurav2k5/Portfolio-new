import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gaurav Pratap Singh — Graphic Designer & Visual Creative",
  description:
    "Portfolio of Gaurav Pratap Singh — a graphic designer and visual creative specializing in poster design, brand identity, product advertising, and typographic experimentation.",
  keywords: ["graphic design", "poster design", "brand identity", "typography", "visual design", "Gaurav Pratap Singh"],
  authors: [{ name: "Gaurav Pratap Singh" }],
  creator: "Gaurav Pratap Singh",
  openGraph: {
    title: "Gaurav Pratap Singh — Graphic Designer",
    description: "Cinematic portfolio of graphic design, poster art, and visual identity.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gaurav Pratap Singh — Graphic Designer",
    description: "Cinematic portfolio of graphic design, poster art, and visual identity.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${cormorant.variable} ${manrope.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">
        {/* Film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
