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
import { checkExistingLead } from "@/app/actions/submit-lead";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-display" });

// Replace this with your actual Google Ads ID (e.g., AW-123456789)
const GA_MEASUREMENT_ID = "AW-CONVERSION_ID"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userIp, setUserIp] = useState("");
  const [shouldSuppress, setShouldSuppress] = useState(false);

  const closePopup = () => setIsPopupOpen(false);

  useEffect(() => {
    async function initializePopupLogic() {
      try {
        // 1. Get User IP
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();
        setUserIp(ip);

        // 2. Check if lead exists for this IP
        const result = await checkExistingLead(ip);

        if (result.exists) {
          setShouldSuppress(true);
          console.log("Existing lead detected. Popup will not show.");
        } else {
          // 3. Only set timer if user is NEW
          const timer = setTimeout(() => {
            setIsPopupOpen(true);
          }, 3000);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    }

    initializePopupLogic();
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} h-full antialiased scroll-smooth`}>
      <head>
        {/* 1. Global Base Tag - Loads on every page */}
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">
        <Navbar />
        
        <AnimatePresence mode="wait">
          {isPopupOpen && !shouldSuppress && (
            <ContactFormPopup 
              onClose={closePopup} 
              userIp={userIp} 
              initialIsSuccess={shouldSuppress} 
            />
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