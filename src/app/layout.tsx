import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "@/context";
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Tickethic - Plateforme événementielle pour organisateurs et artistes",
  description: "Une plateforme Web3 qui garantit des paiements directs aux artistes et une transparence totale.",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body className="bg-gray-50">
        <ContextProvider>
          {children}
          {/* Scripts chargés après le rendu */}
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" strategy="beforeInteractive" />
          <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js" strategy="beforeInteractive" />
          <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
        </ContextProvider>
      </body>
    </html>
  );
}
