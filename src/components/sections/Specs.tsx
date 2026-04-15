"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, Ruler, Wind, HardHat, Truck, Layers, 
  FlameKindling, ChevronLeft, ChevronRight, Maximize 
} from "lucide-react";

// @ts-ignore
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const technicalSpecs = [
  { 
    icon: Ruler, 
    title: "Vertical Clearance", 
    value: "12-14M", 
    description: "Industrial shed on rent in Pune with 12m+ clear height for high-density FM Global racking systems.", 
    detail: "Clear Height" 
  },
  { 
    icon: Layers, 
    title: "SFRC Flooring", 
    value: "FM2", 
    description: "Heavy-duty laser-screed flooring with 8-ton/sqm capacity—ideal for industrial shed requirements.", 
    detail: "Floor Load" 
  },
  { 
    icon: FlameKindling, 
    title: "Fire Mitigation", 
    value: "ESFR", 
    description: "Ready-to-move warehouse space for rent equipped with NFPA-compliant suppression systems.", 
    detail: "Fire Safety" 
  },
  { 
    icon: Wind, 
    title: "Air Changes", 
    value: "6x/Hr", 
    description: "Passive ridge ventilation ensuring optimal temperature control in your warehouse space.", 
    detail: "Ventilation" 
  },
  { 
    icon: Truck, 
    title: "Docking Apron", 
    value: "16.5m", 
    description: "Ample docking space with precision hydraulic levelers designed for rapid logistics loading.", 
    detail: "Rapid Loading" 
  },
  { 
    icon: ShieldCheck, 
    title: "Security", 
    value: "AI 24/7", 
    description: "24/7 integrated surveillance providing a secure perimeter for high-value operations.", 
    detail: "Smart Perimeter" 
  },
];

export default function Specs() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="specs" className="py-12 md:py-32 bg-white relative overflow-hidden">
      {/* Structural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-5 md:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-24">
          <div className="max-w-3xl space-y-3">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#fd610d]" />
              <span className="text-[#fd610d] font-black uppercase tracking-[0.15em] text-[10px]">
                Performance Standards
              </span>
            </motion.div>
            
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-[0.85]">
              Technical <br /> 
              <span className="text-blue-600">Specs</span>
              <span className="text-blue-600">.</span>
            </h2>
            
            <p className="text-slate-600 font-medium text-sm md:text-lg leading-relaxed max-w-md">
              Engineered for efficiency. Global Grade-A standards for the most robust <strong>industrial shed on rent</strong> options.
            </p>
          </div>

          {/* Navigation - Hidden on very small screens, shown on md */}
          <div className="hidden md:flex items-center gap-3">
            <button className="swiper-prev-button group w-12 h-12 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-slate-950 hover:text-slate-950 transition-all active:scale-95">
              <ChevronLeft size={20} />
            </button>
            <button className="swiper-next-button group w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-white hover:bg-[#fd610d] transition-all active:scale-95">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-5 px-5 md:mx-0 md:px-0">
          {isMounted ? (
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              navigation={{ prevEl: '.swiper-prev-button', nextEl: '.swiper-next-button' }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: false },
                1024: { slidesPerView: 3, spaceBetween: 40, centeredSlides: true }
              }}
              className="!overflow-visible py-4"
            >
              {technicalSpecs.map((spec, index) => {
                const IconComponent = spec.icon;
                
                return (
                  <SwiperSlide key={index} className="h-auto">
                    {/* @ts-ignore */}
                    {({ isActive }: { isActive: boolean }) => (
                      <div className={`
                        bg-white p-6 md:p-10 rounded-[2rem] h-full flex flex-col justify-between 
                        transition-all duration-500 border
                        ${isActive 
                          ? 'border-slate-200 shadow-xl scale-100 z-20' 
                          : 'border-slate-100 opacity-40 scale-90 z-10'
                        }
                      `}>
                        <div className="space-y-5">
                          <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#fd610d] text-white shadow-lg shadow-[#fd610d]/30' : 'bg-slate-50 text-blue-600'}`}>
                            <IconComponent size={24} />
                          </div>
                          
                          <div>
                            <span className={`text-[9px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-[#fd610d]' : 'text-slate-400'}`}>
                              {spec.detail}
                            </span>
                            <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 mt-0.5">
                              {spec.title}
                            </h3>
                            <p className="text-slate-500 font-medium text-[13px] mt-3 leading-snug">
                              {spec.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xl md:text-3xl font-black text-slate-950 tracking-tighter">{spec.value}</span>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-transparent text-slate-200'}`}>
                            <Maximize size={14} />
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="flex gap-4 overflow-hidden">
              {[1, 2].map((i) => <div key={i} className="min-w-[80%] h-80 bg-slate-50 rounded-[2rem] animate-pulse" />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}