"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { submitLead } from "@/app/actions/submit-lead";
import { 
  CheckCircle2, 
  Loader2, 
  User, 
  Phone, 
  X, 
  AlertCircle,
  MessageCircle,
  Mail,
  Maximize,
  MapPin
} from "lucide-react";

const warehouseLocations = ["Chakan", "Talegaon", "Wagholi", "Kesananda", "Lohegaon", "Lonikand", "Hinjewadi"];
const urgencyOptions = ["Immediate", "Within 30 Days", "1-3 Months", "Planning Stage"];

const WHATSAPP_NUMBER = "919765464333";

interface PopupProps {
  onClose: () => void;
  propertyTitle?: string;
  userIp?: string;
  initialIsSuccess?: boolean;
}

export default function ContactFormPopup({ 
  onClose, 
  propertyTitle, 
  userIp, 
  initialIsSuccess = false 
}: PopupProps) {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(initialIsSuccess);
  const [isDuplicate, setIsDuplicate] = useState(initialIsSuccess);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  // --- NEW: Capture UTM Tracking Data ---
  const [utmData, setUtmData] = useState({
    utm_source: '',
    utm_campaign: '',
    utm_term: '',
    gclid: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmData({
      utm_source: params.get('utm_source') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      gclid: params.get('gclid') || ''
    });
  }, []);
  // --------------------------------------

  async function handleSubmit(formData: FormData) {
    setErrorMessage("");
    const ua = navigator.userAgent;
    
    const areaValue = formData.get("area_sqft");
    if (!areaValue || areaValue === "") {
      formData.delete("area_sqft");
    }

    formData.append("user_agent", ua);
    formData.append("device_type", /Mobile|Android|iP(hone|od)/i.test(ua) ? "Mobile" : "Desktop");
    formData.append("os", /android/i.test(ua) ? "Android" : /iPhone|iPad|iPod/i.test(ua) ? "iOS" : /Win/i.test(ua) ? "Windows" : "Unknown");
    formData.append("page_url", window.location.href);
    formData.append("property_title", propertyTitle || "General Inquiry");
    
    // --- NEW: Append Tracking Data to Server Action ---
    formData.append("utm_source", utmData.utm_source);
    formData.append("utm_campaign", utmData.utm_campaign);
    formData.append("utm_term", utmData.utm_term);
    formData.append("gclid", utmData.gclid);
    // --------------------------------------------------
    
    if (userIp) {
      formData.append("ip_address", userIp);
    }

    startTransition(async () => {
      try {
        const result = await submitLead(formData);
        
        if (result.success) {
          if (result.duplicate) {
            setIsDuplicate(true);
            setIsSuccess(true);
          } else {
            // SUCCESS: Redirect to Thank You page for Gtag conversion firing
            onClose(); 
            router.push('/thank-you?success=true');
          }
        } else {
          setErrorMessage(result.error || "Submission failed.");
        }
      } catch (err) {
        setErrorMessage("Network error. Please try again.");
      }
    });
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />

      <motion.div 
        initial={{ y: 50, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="bg-white w-full max-w-[480px] rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Support Active
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors cursor-pointer"><X size={20} /></button>
        </div>

        <div className="p-8 sm:p-10">
          <AnimatePresence mode="wait">
            {isPending ? (
              <motion.div key="loader" className="py-16 flex flex-col items-center gap-4">
                <Loader2 className="animate-spin text-[#fd610d]" size={40} />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Verifying Connection...
                </p>
              </motion.div>
            ) : isSuccess && isDuplicate ? (
              <motion.div key="duplicate" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-500">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase text-slate-900 leading-tight">Already Registered</h3>
                <p className="text-slate-500 mt-3 font-bold text-sm leading-relaxed px-2">
                  We&apos;ve already received your inquiry. Our team will contact you shortly.
                </p>
                <div className="mt-8 space-y-3">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="w-full py-4 rounded-2xl bg-[#25D366] text-white font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                  <button onClick={onClose} className="text-[10px] font-bold text-slate-400 uppercase hover:text-slate-600 transition-colors cursor-pointer">Close Window</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="mb-6">
                  <h2 className="text-3xl font-black uppercase tracking-tighter text-slate-900 leading-none">Get <span className="text-[#fd610d]">Pricing</span></h2>
                  <p className="text-[10px] text-slate-400 font-black mt-2 uppercase tracking-widest">{propertyTitle || "Pune Warehouse Quotes"}</p>
                </div>

                <form action={handleSubmit} className="space-y-3">
                  <input type="text" name="website_url" className="hidden" aria-hidden="true" />
                  
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d]" size={16} />
                    <input name="full_name" required type="text" placeholder="Full Name *" className="w-full bg-slate-50 rounded-xl py-3.5 pl-11 font-bold text-sm outline-none border-2 border-transparent focus:border-[#fd610d]/10 focus:bg-white transition-all" />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d]" size={16} />
                    <input name="phone" required type="tel" pattern="[6-9][0-9]{9}" maxLength={10} placeholder="Phone Number *" className="w-full bg-slate-50 rounded-xl py-3.5 pl-11 font-bold text-sm outline-none border-2 border-transparent focus:border-[#fd610d]/10 focus:bg-white transition-all" />
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d]" size={16} />
                    <input name="email" type="email" placeholder="Email Address (Optional)" className="w-full bg-slate-50 rounded-xl py-3.5 pl-11 font-bold text-sm outline-none border-2 border-transparent focus:border-[#fd610d]/10 focus:bg-white transition-all" />
                  </div>

                  <div className="relative group">
                    <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d]" size={16} />
                    <input name="area_sqft" required type="number" placeholder="Required Area (Sq. Ft.) *" className="w-full bg-slate-50 rounded-xl py-3.5 pl-11 font-bold text-sm outline-none border-2 border-transparent focus:border-[#fd610d]/10 focus:bg-white transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative group">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#fd610d] pointer-events-none" size={14} />
                      <select name="location" required className="w-full bg-slate-50 rounded-xl py-3.5 pl-9 pr-2 font-bold text-[13px] outline-none appearance-none cursor-pointer border-2 border-transparent focus:border-[#fd610d]/10">
                        <option value="">Location Preference *</option>
                        {warehouseLocations.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>

                    <select name="urgency" required className="w-full bg-slate-50 rounded-xl py-3.5 px-4 font-bold text-[13px] outline-none appearance-none cursor-pointer border-2 border-transparent focus:border-[#fd610d]/10">
                      <option value="">Urgency *</option>
                      {urgencyOptions.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <textarea name="message" rows={2} required className="w-full bg-slate-50 rounded-xl py-3 px-4 font-bold text-sm outline-none resize-none focus:bg-white transition-all border-2 border-transparent focus:border-[#fd610d]/10" defaultValue={`I'm interested in ${propertyTitle || 'Grade-A Warehouse'}.`} />

                  {errorMessage && (
                    <div className="text-red-600 bg-red-50 p-3 rounded-xl text-[10px] font-bold flex items-center gap-2">
                      <AlertCircle size={14} /> {errorMessage}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full py-4.5 rounded-xl bg-[#fd610d] text-white font-black uppercase tracking-widest text-[11px] shadow-xl shadow-orange-500/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isPending ? "Connecting to Concierge..." : "Send Inquiry"}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}