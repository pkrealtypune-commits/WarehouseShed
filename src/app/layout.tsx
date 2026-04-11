"use client";

import { useState, useEffect } from "react";
import { Inter, Archivo } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactFormPopup from "@/components/sections/ContactForm";
import FloatingContact from "@/components/FloatingContact";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => setIsPopupOpen(false);

  // Trigger on every mount (refresh)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 3000); // 3-second delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []); // Empty dependency array ensures this runs once per refresh

  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=AW-CONVERSION_ID`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-CONVERSION_ID');
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">
        <Navbar />
        
        <AnimatePresence mode="wait">
          {isPopupOpen && (
            <ContactFormPopup onClose={closePopup} />
          )}
        </AnimatePresence>

        <main className="flex-grow">
          {children}
        </main>

        <FloatingContact />
        <Footer />
      </body>
    </html>
  );
}