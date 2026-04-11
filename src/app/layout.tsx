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
import { checkExistingLead } from "@/app/actions/submit-lead"; // Ensure this is imported

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
  const [userIp, setUserIp] = useState("");

  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    async function handleAutoPopup() {
      try {
        // 1. Fetch current visitor IP
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();
        setUserIp(ip);

        // 2. Check if this IP already exists in the database
        const result = await checkExistingLead(ip);

        // 3. ONLY trigger the popup if the lead DOES NOT exist
        if (!result.exists) {
          const timer = setTimeout(() => {
            setIsPopupOpen(true);
          }, 3000); // 3-second delay

          return () => clearTimeout(timer);
        } else {
          console.log("Lead already registered. Auto-popup suppressed.");
        }
      } catch (err) {
        console.error("Popup logic error:", err);
      }
    }

    handleAutoPopup();
  }, []);

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
            <ContactFormPopup onClose={closePopup} userIp={userIp} />
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