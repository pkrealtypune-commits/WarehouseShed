'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { X, MapPin, Warehouse, Truck, Ruler, Layers, ArrowUpRight } from 'lucide-react';
import { Property } from '@/data/inventory';

interface ModalProps {
  property: Property;
  onClose: () => void;
  onInquiry: () => void; // New prop to trigger the contact form
}

const PropertyModal: React.FC<ModalProps> = ({ property, onClose, onInquiry }) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const sheetVariants: Variants = {
    hidden: { y: '100%', opacity: 1 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', damping: 28, stiffness: 220, delay: 0.05 } 
    },
    exit: { 
      y: '100%', 
      opacity: 1, 
      transition: { ease: 'easeInOut', duration: 0.3 } 
    },
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-end md:items-center justify-center p-0 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      <motion.div
        variants={sheetVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative bg-white w-full max-w-3xl rounded-t-[2.5rem] md:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] md:max-h-[80vh]"
      >
        {/* Mobile Handle */}
        <div className="md:hidden w-full flex justify-center pt-3 pb-1 bg-white shrink-0">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-5 bg-white border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0 rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
              <Image
                src={property.image}
                alt={property.title}
                fill
                priority
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-blue-600 mb-0.5">
                <MapPin size={12} strokeWidth={3} />
                <span className="font-black uppercase tracking-widest text-[9px]">
                  {property.location}, PUNE
                </span>
              </div>
              <h2 className="text-xl font-black text-gray-950 leading-tight">
                {property.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 md:p-8 overflow-y-auto bg-white flex-grow custom-scrollbar">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-medium">
            {property.description}
          </p>

          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            <SpecCard icon={Warehouse} label="Area" value={property.area} />
            <SpecCard icon={Ruler} label="Height" value={property.height} />
            <SpecCard icon={Layers} label="Floor" value={property.flooring} />
            <SpecCard icon={Truck} label="Docks" value={property.docks} />
          </div>

          <div>
            <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border border-blue-100">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              {property.status}
            </span>
          </div>
        </div>

        {/* UPDATED CTA: Triggers the Contact Form */}
        <div className="px-6 py-5 bg-gray-50 border-t border-gray-100 shrink-0">
          <button
            onClick={onInquiry} // Triggers the popup
            className="flex items-center justify-center gap-3 w-full bg-[#fd610d] hover:bg-[#e5560b] text-white py-4 rounded-2xl font-black text-base transition-all active:scale-95 shadow-lg shadow-orange-500/20"
          >
            GET QUOTATION
            <ArrowUpRight size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const SpecCard: React.FC<SpecCardProps> = ({ icon: Icon, label, value }) => (
  <div className="bg-gray-50 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-3">
    <div className="p-2 bg-white rounded-lg border border-gray-100 shrink-0 shadow-sm">
      <Icon size={18} className="text-[#fd610d]" />
    </div>
    <div className="overflow-hidden">
      <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 block">{label}</span>
      <p className="font-bold text-gray-950 text-xs md:text-sm truncate">{value}</p>
    </div>
  </div>
);

interface SpecCardProps { icon: React.ElementType; label: string; value: string; }

export default PropertyModal;