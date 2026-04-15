'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Script from 'next/script';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, MessageSquare } from 'lucide-react';

const GA_MEASUREMENT_ID = "AW-CONVERSION_ID"; 
const GA_CONVERSION_LABEL = "YOUR_SPECIFIC_LABEL";

export default function ThankYouPage() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // 1. Protection Logic: Check if the user came from your domain/form
    // We check the 'referrer'. If it's empty or doesn't include your site, redirect.
    const referrer = document.referrer;
    const isFromOwnSite = referrer.includes(window.location.hostname);

    if (!isFromOwnSite) {
      router.replace('/'); // Silently redirect to home if accessed manually
    } else {
      setIsVerified(true);
    }
  }, [router]);

  // Don't render anything (or show a loader) until verification is complete
  if (!isVerified) return <div className="min-h-screen bg-slate-950" />;

  return (
    <>
      <head>
        <title>Thank You | Inquiry Received</title>
        <meta name="robots" content="noindex, nofollow" />
      </head>

      {/* 2. Google Ads Conversion Tracking Script - ONLY fires for verified leads */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          if (typeof gtag === 'function') {
            gtag('event', 'conversion', {
              'send_to': '${GA_MEASUREMENT_ID}/${GA_CONVERSION_LABEL}',
              'value': 1.0,
              'currency': 'INR'
            });
          }
        `}
      </Script>

      <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-2xl w-full bg-white/(0.03) backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-[3rem] text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-600/40"
          >
            <CheckCircle2 size={40} className="text-white" />
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Inquiry <span className="text-blue-500 italic">Received.</span>
          </h1>
          
          <p className="text-slate-400 text-lg font-medium mb-12 max-w-md mx-auto">
            Our logistics expert will contact you within 24 hours to discuss your 
            <strong> Industrial Shed</strong> requirements.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all active:scale-95"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            
            <a 
              href="https://wa.me/919765464333" 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fd610d] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#fd610d]/80 transition-all active:scale-95 shadow-lg shadow-[#fd610d]/20"
            >
              <MessageSquare size={16} /> WhatsApp Us Now
            </a>
          </div>
        </motion.div>
      </main>
    </>
  );
}