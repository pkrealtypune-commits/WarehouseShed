"use client";

import React from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FloatingContact() {
  const displayMobile = "9765464333";
  const whatsappNumber = "919765464333"; 
  
  const whatsappText = encodeURIComponent("Hi! I'm interested in your warehouse properties. Could you please share more details?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
  const callUrl = `tel:+91${displayMobile}`;

  return (
    <div className="fixed bottom-6 right-5 md:right-8 z-[150] flex flex-col items-end gap-4 pointer-events-none">
      
      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.5, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-2xl border-4 border-white transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={32} />
      </motion.a>

      {/* Calling Button */}
      <motion.a
        href={callUrl}
        initial={{ opacity: 0, scale: 0.5, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative pointer-events-auto flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#fd610d] text-white rounded-full shadow-2xl border-4 border-white transition-transform"
        aria-label="Call Us"
      >
        {/* Subtle Radar/Ping Effect for Attention */}
        <span className="absolute inset-0 rounded-full bg-[#fd610d] animate-ping opacity-25" />
        
        <FaPhoneAlt size={22} className="relative z-10" />
      </motion.a>
    </div>
  );
}