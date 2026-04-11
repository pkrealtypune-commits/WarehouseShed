'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize2, ArrowUpRight, FileSpreadsheet, PhoneCall, Sparkles } from 'lucide-react';
import { inventoryData, Property } from '@/data/inventory';
import PropertyModal from '@/components/sections/PropertyModal';
import ContactFormPopup from '@/components/sections/ContactForm';
import PriceSheetPopup from '@/components/sections/PriceSheetPopup';

const InventorySection = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [isPriceSheetOpen, setIsPriceSheetOpen] = useState(false);
  const [inquiryPropertyTitle, setInquiryPropertyTitle] = useState("");

  const handleInquiryTrigger = (title: string) => {
    setInquiryPropertyTitle(title);
    setSelectedProperty(null); 
    setTimeout(() => setIsInquiryOpen(true), 300);
  };

  return (
    <section id="inventory" className="py-24 bg-gray-50 text-gray-950 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Remains same) */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#fd610d] font-bold tracking-widest uppercase text-[10px] bg-orange-50 px-4 py-2 rounded-full inline-block mb-4"
          >
            Premium Logistics Inventory
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-none"
          >
            Available Warehouses in <span className="text-blue-600">Pune</span>
          </motion.h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Grade-A industrial spaces with high-load flooring and prime connectivity in the industrial corridors.
          </p>
        </div>

        {/* Property Grid (Remains same) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {inventoryData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedProperty(item)}
              className="group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 cursor-pointer flex flex-col"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-5 left-5">
                  <span className="bg-[#fd610d] text-white text-[10px] font-black px-4 py-2 rounded-full shadow-xl uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-blue-600 mb-3">
                  <MapPin size={14} strokeWidth={3} />
                  <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.location}</span>
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#fd610d] transition-colors leading-tight uppercase tracking-tighter">
                  {item.title}
                </h3>
                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total Area</span>
                    <div className="flex items-center gap-2 text-slate-900">
                      <Maximize2 size={16} className="text-blue-600" />
                      <span className="text-lg font-black">{item.area}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#fd610d] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BOTTOM ACTION SECTION */}
        <div className="pt-16 border-t border-gray-200 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center mb-10"
          >
            <motion.div 
               animate={{ opacity: [1, 0.4, 1] }} 
               transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
               className="flex items-center gap-3 bg-blue-50 text-blue-600 px-6 py-2 rounded-full border border-blue-100 mb-4"
            >
              <Sparkles size={16} className="fill-blue-600" />
              <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">Direct Deal Opportunity</h4>
            </motion.div>
            
            <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none text-slate-900">
              Call & Unlock <span className="text-[#fd610d]">The Best Deal</span> Today
            </h3>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-6"
          >
            {/* Price Sheet & Floor Plan Button */}
            <button 
              onClick={() => setIsPriceSheetOpen(true)}
              className="w-full lg:w-auto h-[70px] flex items-center justify-center gap-4 bg-slate-950 text-white px-12 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-blue-600 transition-all shadow-2xl active:scale-95 group border-b-4 border-slate-800 hover:border-blue-700"
            >
              <FileSpreadsheet size={22} className="text-[#fd610d] group-hover:text-white transition-colors" />
              <span>Get Price Sheet & Floor Plan</span>
            </button>

            {/* Pulsing Call Button - Constant Slate 950 Text */}
            <motion.a
              href="tel:+919765464333"
              animate={{ 
                backgroundColor: ["#fff7ed", "#fd610d", "#fff7ed"],
                borderColor: ["#fd610d", "#fd610d", "#fd610d"]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 2, 
                ease: "easeInOut" 
              }}
              className="w-full lg:w-auto h-[70px] flex items-center justify-center gap-6 border-2 px-12 rounded-2xl font-black uppercase tracking-widest text-slate-950 shadow-xl active:scale-95 group relative overflow-hidden"
            >
              <div className="flex items-center gap-4 relative z-10">
                <PhoneCall size={24} className="animate-bounce" />
                <span className="text-xl md:text-2xl tracking-tighter leading-none">+91 97654 64333</span>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* POPUPS (Remains same) */}
      <PriceSheetPopup isOpen={isPriceSheetOpen} onClose={() => setIsPriceSheetOpen(false)} />
      
      <AnimatePresence mode="wait">
        {selectedProperty && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(null)}
            onInquiry={() => handleInquiryTrigger(selectedProperty.title)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInquiryOpen && (
          <ContactFormPopup 
            onClose={() => setIsInquiryOpen(false)}
            propertyTitle={inquiryPropertyTitle}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default InventorySection;