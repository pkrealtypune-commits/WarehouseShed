"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import { Inter, Archivo } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactFormPopup from "@/components/sections/ContactForm";
import FloatingContact from "@/components/FloatingContact";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const archivo = Archivo({ subsets: ["latin"], variable: "--font-display" });

// ✅ VERIFIED: Real Conversion ID for WarehouseShed Pune
const GA_MEASUREMENT_ID = "AW-18093608462"; 

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userIp, setUserIp] = useState("");

  /**
   * ✅ Close logic: 
   * Sets a session flag so the popup stays closed during refreshes.
   * Session storage clears when the tab/browser is closed.
   */
  const closePopup = () => {
    sessionStorage.setItem("popup_dismissed", "true");
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const initializePopup = async () => {
      // 1. Check if user already dismissed it in this session (Tab)
      const isDismissed = sessionStorage.getItem("popup_dismissed");
      if (isDismissed) return;

      try {
        // 2. Fetch IP silently for lead tracking
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();
        setUserIp(ip);
      } catch (err) {
        console.error("IP Fetch Error:", err);
      }

      // 3. Trigger popup after a small delay (3s) once site is loaded
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 3000);

      return () => clearTimeout(timer);
    };

    // Ensure logic runs only after "Complete Loading"
    if (document.readyState === "complete") {
      initializePopup();
    } else {
      window.addEventListener("load", initializePopup);
      return () => window.removeEventListener("load", initializePopup);
    }
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} h-full antialiased scroll-smooth`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        
        {/* Global Google Tag */}
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} 
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'send_page_view': true,
              'allow_enhanced_conversions': true
            });

            window.captureLead = function() {
              if (typeof gtag === 'function') {
                gtag('event', 'conversion', {
                  'send_to': '${GA_MEASUREMENT_ID}/CxdnCJqU8pwcEI6c2rND',
                  'value': 1.0,
                  'currency': 'INR'
                });
                console.log("Google Ads Lead Captured Successfully");
              }
            }
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary selection:text-white">
        <Navbar />
        
        <AnimatePresence mode="wait">
          {isPopupOpen && (
            <ContactFormPopup 
              onClose={closePopup} 
              userIp={userIp} 
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