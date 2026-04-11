"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Send, 
  CheckCircle2, 
  Loader2, 
  User, 
  Phone, 
  MessageSquare, 
  Building2, 
  X, 
  MapPin, 
  ChevronDown,
  AlertCircle,
  PhoneCall
} from "lucide-react";

const warehouseLocations = [
  "Chakan", "Talegaon", "Wagholi", "Kesananda", "Lohegaon", "Lonikand",
];

interface ContactFormProps {
  onClose: () => void;
  propertyTitle?: string;
}

export default function ContactFormPopup({ onClose, propertyTitle }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (formData.get("website_url")) return; 

    setStatus("loading");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus("success");
      setTimeout(() => onClose(), 2500);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
      />

      {/* Form Modal */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="bg-white w-full max-w-[480px] rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl relative overflow-hidden z-10 max-h-[92vh] flex flex-col"
      >
        {/* Mobile Drag Handle */}
        <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

        {/* Premium Header Bar */}
        <div className="bg-slate-900 px-5 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black text-white/70 uppercase tracking-[0.2em]">Consultant Online</span>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href="tel:+919765464333" 
              className="flex items-center gap-1.5 text-[#fd610d] hover:text-white transition-colors"
            >
              <PhoneCall size={12} />
              <span className="text-[10px] md:text-[11px] font-bold tracking-tight">+91 97654 64333</span>
            </a>
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-lg"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center flex flex-col items-center gap-5"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-emerald-500" size={32} />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">Inquiry Received</h3>
                <p className="text-xs text-slate-500 mt-2 font-medium">An expert will contact you shortly.</p>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                  Get <span className="text-[#fd610d]">Pricing</span>
                </h2>
                {propertyTitle ? (
                  <p className="mt-2 text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md inline-block border border-blue-100">
                    UNIT: {propertyTitle}
                  </p>
                ) : (
                  <p className="mt-2 text-[11px] text-slate-500 font-medium italic">
                    Fill the form for Grade-A warehouse quotes.
                  </p>
                )}
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 gap-3 md:gap-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d] transition-colors" size={16} />
                    <input
                      name="full_name"
                      required
                      type="text"
                      placeholder="Your Name *"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 md:py-4 pl-11 pr-4 text-[13px] md:text-sm font-bold text-slate-900 focus:border-[#fd610d] focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d] transition-colors" size={16} />
                    <input
                      name="phone"
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="Phone Number *"
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 md:py-4 pl-11 pr-4 text-[13px] md:text-sm font-bold text-slate-900 focus:border-[#fd610d] focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d] transition-colors pointer-events-none" size={16} />
                    <select
                      required
                      name="location"
                      defaultValue="" 
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 md:py-4 pl-11 pr-10 text-[13px] md:text-sm font-bold text-slate-900 focus:border-[#fd610d] focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Industrial Zone *</option>
                      {warehouseLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                  </div>

                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-slate-300 group-focus-within:text-[#fd610d] transition-colors" size={16} />
                    <textarea
                      name="message"
                      rows={2}
                      required
                      defaultValue={propertyTitle ? `Interested in ${propertyTitle}. Send quote.` : "I am looking for warehouse space in Pune."}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 md:py-4 pl-11 pr-4 text-[13px] md:text-sm font-bold text-slate-900 focus:border-[#fd610d] focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-[11px] font-bold px-1">
                    <AlertCircle size={14} /> {errorMessage}
                  </div>
                )}

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#fd610d] hover:bg-[#e5560b] text-white font-black uppercase tracking-[0.15em] text-[11px] flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-70 mt-2"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <>
                      Send Inquiry
                      <Send size={14} />
                    </>
                  )}
                </button>
                <div className="pt-2">
                  <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                    © Realty Works Pune • Official Inquiry Portal
                  </p>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Subtle Background Icon */}
        <div className="absolute -bottom-6 -right-6 opacity-[0.02] pointer-events-none">
          <Building2 size={180} />
        </div>
      </motion.div>
    </div>
  );
}