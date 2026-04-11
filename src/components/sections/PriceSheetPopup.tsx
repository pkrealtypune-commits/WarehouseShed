"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  MapPin, 
  Maximize2, 
  IndianRupee, 
  FileText, 
  Table as TableIcon,
  Send
} from "lucide-react";
import ContactFormPopup from "@/components/sections/ContactForm";

interface PriceSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const PriceSheetPopup = ({ isOpen, onClose }: PriceSheetProps) => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const inventoryData = [
    { loc: "Kesnand", area: "5,000", rent: "13/- per sqft (Carpet)" },
    { loc: "Kesnand", area: "7,000", rent: "14/- per sqft (Carpet)" },
    { loc: "Kesnand", area: "15,000", rent: "16/- per sqft (Carpet)" },
    { loc: "Kesnand", area: "20,000", rent: "25/- per sqft (Carpet)" },
    { loc: "Kesnand", area: "28,000", rent: "16/- per sqft (Carpet)" },
    { loc: "Kesnand", area: "5 Acre", rent: "Customize Warehouse" },
    { loc: "Kesnand", area: "8 Acre Plot", rent: "15-20 Cr" },
    { loc: "Koregaon Bhima", area: "35,000 (Shed 1)", rent: "18/- per sqft (Built-up)" },
    { loc: "Koregaon Bhima", area: "5,000 (Shed 2)", rent: "18/- per sqft (Built-up)" },
    { loc: "Lonikand", area: "10,000", rent: "20/- per sqft (6M Dep)" },
    { loc: "Lonikand Katkewadi", area: "8,000", rent: "18/- per sqft (6M Dep)" },
    { loc: "Lonikand Katkewadi", area: "(20,000), (30,000), (40,000)", rent: "25/- per sqft" },
    { loc: "Lonikand Katkewadi", area: "60,000", rent: "16/- to 18/- per sqft" },
    { loc: "Lonikand Theur", area: "20,000", rent: "25/- per sqft (Carpet)" },
    { loc: "Wagholi Warehouse", area: "15,600 to 90,000 Open Space", rent: "24/- & 10/- per sqft" },
    { loc: "Wagholi Bakori Road", area: "80,000 (Open Plot)", rent: "12/- per sqft" },
    { loc: "Wagholi Highway", area: "2,500 (Warehouse)", rent: "17/- per sqft (Built-up)" },
    { loc: "Wagholi Highway", area: "6,500 (Warehouse)", rent: "20/- per sqft (Built-up)" },
    { loc: "Wagholi Highway", area: "2,670 (Showroom)", rent: "40/- per sqft (Carpet)" },
    { loc: "Wagholi Highway", area: "25,000 Empty Land With Wall Compound", rent: "6/- to 7/- per sqft" },
    { loc: "Wagholi Katkewadi", area: "10,000", rent: "1.5 Lacs (6M Dep)" },
    { loc: "Wagholi Katkewadi", area: "10,500", rent: "1.4 Lacs (6M Dep)" },
    { loc: "Wagholi Katkewadi", area: "11,000", rent: "25/- per sqft (6M Dep)" },
    { loc: "Wagholi Katkewadi", area: "12,000", rent: "20/- per sqft (6M Dep)" },
    { loc: "Wagholi Katkewadi", area: "20,000", rent: "27/- per sqft (6M Dep)" },
    { loc: "Wagholi Katkewadi", area: "10-40 Guntha (Open Plot)", rent: "6/- to 10/- per sqft (6M Dep)" },
    { loc: "Wagholi Ubale Nagar", area: "40,000", rent: "30/- per sqft (6M Dep)" },
    { loc: "Wagholi Koregaon Bhima", area: "20,000", rent: "25/- per sqft (6M Dep)" },
  ].sort((a, b) => a.loc.localeCompare(b.loc));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-white border border-slate-200 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <TableIcon className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">
                      Inventory <span className="text-[#fd610d]">Price Sheet</span>
                    </h2>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Available Units - Pune Industrial</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Table Body */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm mb-20">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <div className="flex items-center gap-2"><MapPin size={12}/> Location</div>
                        </th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <div className="flex items-center gap-2"><Maximize2 size={12}/> Area (Sq.Ft)</div>
                        </th>
                        <th className="p-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <div className="flex items-center gap-2"><IndianRupee size={12}/> Asking Price</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {inventoryData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="p-4 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.loc}</td>
                          <td className="p-4 text-sm font-semibold text-slate-600">{item.area}</td>
                          <td className="p-4">
                            <span className="text-[10px] font-black text-[#fd610d] uppercase bg-orange-50 px-2 py-1 rounded-md border border-orange-100 whitespace-nowrap">
                              {item.rent}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ACTION BOTTOM BAR */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-md border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  © Realty Works Pune
                </p>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <a
                    href="/assets/PriceSheet.pdf"
                    download
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-900 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all active:scale-95"
                  >
                    <Download size={14} />
                    Download PDF
                  </a>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#fd610d] text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                  >
                    <Send size={14} />
                    Get Final Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Internal Contact Form Trigger */}
      <AnimatePresence>
        {isContactOpen && (
          <ContactFormPopup 
            onClose={() => setIsContactOpen(false)} 
            propertyTitle="Bulk Inventory Price Sheet Quote" 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PriceSheetPopup;