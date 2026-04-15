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

// ✅ REAL CONVERSION ID UPDATED
const GA_MEASUREMENT_ID = "AW-18093608462"; 

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
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const { ip } = await ipRes.json();
        setUserIp(ip);

        const result = await checkExistingLead(ip);

        if (result.exists) {
          setShouldSuppress(true);
        } else {
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
        <link rel="preconnect" href="https://www.google.com" />
        
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
            
            // Initializing with Enhanced Conversions for better B2B lead matching
            gtag('config', '${GA_MEASUREMENT_ID}', {
              'send_page_view': true,
              'allow_enhanced_conversions': true
            });

            // ✅ Helper function for your components to call
            window.captureLead = function() {
              gtag('event', 'conversion', {
                'send_to': '${GA_MEASUREMENT_ID}/CxdnCJqU8pwcEI6c2rND',
                'value': 1.0,
                'currency': 'INR'
              });
            }
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