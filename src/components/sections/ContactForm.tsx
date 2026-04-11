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
        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 100, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-[500px] rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl relative overflow-hidden z-10 max-h-[95vh] flex flex-col"
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mt-4 mb-2 sm:hidden" />

        {/* Quick Call Header Bar - Repositioned Close Button for Mobile */}
        <div className="bg-slate-900 px-6 sm:px-8 py-3 flex items-center justify-between relative">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Expert Online</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="tel:+919765464333" 
              className="flex items-center gap-2 text-[#fd610d] hover:text-white transition-colors group"
            >
              <PhoneCall size={14} className="group-hover:animate-bounce" />
              <span className="text-[11px] font-black tracking-tight">+91 97654 64333</span>
            </a>

            {/* Close button inside header for Mobile Only */}
            <button 
              onClick={onClose}
              className="sm:hidden p-1 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Desktop Close Button (hidden on mobile) */}
        <button
          type="button"
          onClick={onClose}
          className="hidden sm:flex absolute top-14 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all z-[120]"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10 overflow-y-auto custom-scrollbar">
          {status === "success" ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle2 className="text-emerald-500" size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Request Sent!</h3>
                <p className="text-slate-500 mt-2 font-medium">Our Pune logistics expert will share the quotation shortly.</p>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 leading-none">
                  Get <span className="text-[#fd610d]">Pricing</span>
                </h2>
                {propertyTitle ? (
                  <p className="mt-3 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg inline-block border border-blue-100 italic">
                    RE: {propertyTitle}
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-slate-500 font-medium italic">
                    Fill the form for Grade-A warehouse quotes.
                  </p>
                )}
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="website_url" className="hidden" tabIndex={-1} autoComplete="off" />

                <div className="grid grid-cols-1 gap-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d] transition-colors" size={18} />
                    <input
                      name="full_name"
                      required
                      type="text"
                      placeholder="Full Name *"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:border-[#fd610d]/20 focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d] transition-colors" size={18} />
                    <input
                      name="phone"
                      required
                      type="tel"
                      pattern="[0-9]{10}"
                      placeholder="10-Digit Phone Number *"
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:border-[#fd610d]/20 focus:bg-white transition-all outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d] transition-colors pointer-events-none" size={18} />
                    <select
                      required
                      name="location"
                      defaultValue="" 
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-10 text-sm font-bold text-slate-900 focus:border-[#fd610d]/20 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Industrial Zone *</option>
                      {warehouseLocations.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                  </div>

                  <div className="relative group">
                    <MessageSquare className="absolute left-4 top-4 text-slate-300 group-focus-within:text-[#fd610d] transition-colors" size={18} />
                    <textarea
                      name="message"
                      rows={3}
                      required
                      defaultValue={propertyTitle ? `I'm interested in ${propertyTitle}. Please provide the latest quotation.` : "I am looking for warehouse space in Pune."}
                      className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 focus:border-[#fd610d]/20 focus:bg-white transition-all outline-none resize-none"
                    />
                  </div>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-500 text-xs font-bold px-4">
                    <AlertCircle size={14} /> {errorMessage}
                  </div>
                )}

                <button
                  disabled={status === "loading"}
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-[#fd610d] hover:bg-[#e5560b] text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 shadow-xl shadow-orange-500/20 transition-all active:scale-95 disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Confirm & Send Inquiry
                      <Send size={16} />
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-tight px-4">
                  Direct Line: +91 97654 64333 • Realty Works Pune
                </p>
              </form>
            </>
          )}
        </div>

        <div className="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none rotate-12">
          <Building2 size={240} />
        </div>
      </motion.div>
    </div>
  );
}