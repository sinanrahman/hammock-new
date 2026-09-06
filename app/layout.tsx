import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "../public/brand-tokens.css";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import { ClientProvider } from "./components/ClientProvider";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "HAMMOCK Suites and Rooms",
  description: "A calm, contemporary stay with considered rooms, thoughtful comfort, a private gym, and space to meet.",
  metadataBase: new URL("https://hammocksuites.com"), // Placeholder domain
  openGraph: {
    title: "HAMMOCK Suites and Rooms",
    description: "A calm, contemporary stay with considered rooms, thoughtful comfort.",
    url: "/",
    siteName: "HAMMOCK Suites and Rooms",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <ClientProvider>
          {children}
          <FloatingWhatsApp />
        </ClientProvider>
      </body>
    </html>
  );
}
