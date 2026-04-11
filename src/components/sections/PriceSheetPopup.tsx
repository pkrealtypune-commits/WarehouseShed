"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  Download, 
  MapPin, 
  Maximize2, 
  IndianRupee, 
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
    { loc: "Kesnand", area: "5,000", rent: "13/- sqft" },
    { loc: "Kesnand", area: "7,000", rent: "14/- sqft" },
    { loc: "Kesnand", area: "15,000", rent: "16/- sqft" },
    { loc: "Kesnand", area: "20,000", rent: "25/- sqft" },
    { loc: "Kesnand", area: "28,000", rent: "16/- sqft" },
    { loc: "Kesnand", area: "5 Acre", rent: "Custom" },
    { loc: "Kesnand", area: "8 Acre Plot", rent: "15-20 Cr" },
    { loc: "Koregaon Bhima", area: "35,000 (S1)", rent: "18/- sqft" },
    { loc: "Koregaon Bhima", area: "5,000 (S2)", rent: "18/- sqft" },
    { loc: "Lonikand", area: "10,000", rent: "20/- sqft" },
    { loc: "Lonikand Katkewadi", area: "8,000", rent: "18/- sqft" },
    { loc: "Lonikand Katkewadi", area: "20k-40k", rent: "25/- sqft" },
    { loc: "Lonikand Katkewadi", area: "60,000", rent: "16-18/- sqft" },
    { loc: "Lonikand Theur", area: "20,000", rent: "25/- sqft" },
    { loc: "Wagholi Warehouse", area: "15k-90k", rent: "24/- & 10/-" },
    { loc: "Wagholi Bakori Road", area: "80,000", rent: "12/- sqft" },
    { loc: "Wagholi Highway", area: "2,500", rent: "17/- sqft" },
    { loc: "Wagholi Highway", area: "6,500", rent: "20/- sqft" },
    { loc: "Wagholi Highway", area: "2,670 (S/R)", rent: "40/- sqft" },
    { loc: "Wagholi Highway", area: "25,000 (Land)", rent: "6/- to 7/-" },
    { loc: "Wagholi Katkewadi", area: "10,000", rent: "1.5 Lacs" },
    { loc: "Wagholi Katkewadi", area: "10,500", rent: "1.4 Lacs" },
    { loc: "Wagholi Katkewadi", area: "11,000", rent: "25/- sqft" },
    { loc: "Wagholi Katkewadi", area: "12,000", rent: "20/- sqft" },
    { loc: "Wagholi Katkewadi", area: "20,000", rent: "27/- sqft" },
    { loc: "Wagholi Katkewadi", area: "10-40 Guntha", rent: "6/- to 10/-" },
    { loc: "Wagholi Ubale Nagar", area: "40,000", rent: "30/- sqft" },
    { loc: "Wagholi Koregaon Bhima", area: "20,000", rent: "25/- sqft" },
  ].sort((a, b) => a.loc.localeCompare(b.loc));

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
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
              className="relative w-full max-w-5xl max-h-[95vh] bg-white border border-slate-200 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Header - Optimized for Mobile */}
              <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg">
                    <TableIcon className="text-white" size={16} />
                  </div>
                  <div>
                    <h2 className="text-sm md:text-lg font-black uppercase tracking-tight text-slate-900 leading-tight">
                      Inventory <span className="text-[#fd610d]">Price Sheet</span>
                    </h2>
                    <p className="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pune Industrial</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Table Body - Narrower paddings for Mobile */}
              <div className="flex-1 overflow-y-auto p-2 md:p-8 custom-scrollbar">
                <div className="rounded-xl md:rounded-2xl border border-slate-100 overflow-hidden shadow-sm mb-24 md:mb-20">
                  <table className="w-full text-left border-collapse table-fixed md:table-auto">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 sticky top-0 z-10">
                        <th className="w-[35%] md:w-auto p-2 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <div className="flex items-center gap-1 md:gap-2"><MapPin size={10}/> Loc</div>
                        </th>
                        <th className="w-[30%] md:w-auto p-2 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <div className="flex items-center gap-1 md:gap-2"><Maximize2 size={10}/> Area</div>
                        </th>
                        <th className="w-[35%] md:w-auto p-2 md:p-4 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <div className="flex items-center gap-1 md:gap-2"><IndianRupee size={10}/> Rent</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {inventoryData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                          <td className="p-2 md:p-4 text-[11px] md:text-sm font-bold text-slate-900 break-words leading-tight">
                            {item.loc}
                          </td>
                          <td className="p-2 md:p-4 text-[10px] md:text-sm font-semibold text-slate-600">
                            {item.area}
                          </td>
                          <td className="p-2 md:p-4">
                            <span className="text-[9px] md:text-[10px] font-black text-[#fd610d] uppercase bg-orange-50 px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-orange-100 block text-center md:inline-block">
                              {item.rent}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ACTION BOTTOM BAR - Stacked on Mobile */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-white/90 backdrop-blur-md border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3">
                <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  © Realty Works Pune
                </p>
                
                <div className="grid grid-cols-2 md:flex items-center gap-2 w-full md:w-auto">
                  <a
                    href="/assets/PriceSheet.pdf"
                    download
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 text-slate-900 rounded-lg md:rounded-xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-slate-200 transition-all active:scale-95"
                  >
                    <Download size={12} />
                    PDF
                  </a>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-[#fd610d] text-white rounded-lg md:rounded-xl font-black uppercase tracking-widest text-[9px] md:text-[10px] hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
                  >
                    <Send size={12} />
                    Quote
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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