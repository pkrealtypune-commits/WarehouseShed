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
  { icon: Ruler, title: "Vertical Clearance", value: "12 - 14 Meters", description: "Maximum clear height for high-density FM Global racking systems.", detail: "Clear Height" },
  { icon: Layers, title: "SFRC Flooring", value: "FM2 Compliant", description: "Laser-screed flooring with 8-ton/sqm point load capacity for heavy machinery.", detail: "Floor Load" },
  { icon: FlameKindling, title: "Fire Mitigation", value: "ESFR Sprinklers", description: "NFPA-compliant suppression systems with high-velocity smoke vents.", detail: "Fire Safety" },
  { icon: Wind, title: "Air Changes", value: "6x Per Hour", description: "Passive ridge ventilation ensuring optimal ambient temperature control.", detail: "Ventilation" },
  { icon: Truck, title: "Docking Apron", value: "16.5m Depth", description: "Precision hydraulic dock levelers with 45-degree concrete apron space.", detail: "Rapid Loading" },
  { icon: ShieldCheck, title: "Security", value: "AI Monitoring", description: "24/7 integrated surveillance with motion-sensor peripheral alerts.", detail: "Smart Perimeter" },
];

export default function Specs() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="specs" className="py-16 md:py-32 bg-white relative overflow-hidden">
      {/* Structural Grid Pattern - Aligned with About Section background style */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, 
          backgroundSize: '50px 50px' 
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section - Matches AboutSection exactly */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 md:mb-24">
          <div className="max-w-3xl space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-[#fd610d]" />
              <span className="text-[#fd610d] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs">
                Performance Standards
              </span>
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-[0.9]">
              Technical <br /> 
              <span className="relative inline-block">
                <span className="text-blue-600">Specifications</span>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-1 left-0 h-1 bg-blue-600/10" 
                />
              </span>
              <span className="text-blue-600">.</span>
            </h2>
            
            <p className="text-slate-600 font-medium text-base md:text-lg leading-relaxed max-w-xl">
              Engineered for efficiency. Our facilities are built to global Grade-A 
              standards, ensuring high-load capacity and rapid operations.
            </p>
          </div>

          {/* Navigation - Styled to match About Section's industrial buttons */}
          <div className="flex items-center gap-3">
            <button className="swiper-prev-button group w-12 h-12 md:w-14 md:h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:border-slate-950 hover:text-slate-950 transition-all shadow-sm active:scale-95">
              <ChevronLeft size={24} />
            </button>
            <button className="swiper-next-button group w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-950 flex items-center justify-center text-white hover:bg-[#fd610d] transition-all shadow-xl active:scale-95">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {isMounted ? (
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              navigation={{ prevEl: '.swiper-prev-button', nextEl: '.swiper-next-button' }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 30, centeredSlides: false },
                1024: { slidesPerView: 3, spaceBetween: 40, centeredSlides: true }
              }}
              className="!overflow-visible py-10"
            >
              {technicalSpecs.map((spec, index) => {
                const IconComponent = spec.icon;
                
                return (
                  <SwiperSlide key={index} className="h-auto">
                    {/* @ts-ignore */}
                    {({ isActive }: { isActive: boolean }) => (
                      <div className={`
                        bg-white p-8 md:p-10 rounded-[2rem] h-full flex flex-col justify-between 
                        transition-all duration-700 border
                        ${isActive 
                          ? 'border-slate-200 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] scale-105 z-20' 
                          : 'border-slate-100 shadow-sm scale-95 opacity-50 md:opacity-100 z-10'
                        }
                      `}>
                        <div className="space-y-6">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#fd610d] text-white shadow-lg shadow-[#fd610d]/30' : 'bg-slate-50 text-blue-600'}`}>
                            <IconComponent size={28} />
                          </div>
                          
                          <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-[#fd610d]' : 'text-slate-400'}`}>
                              {spec.detail}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-900 mt-1">
                              {spec.title}
                            </h3>
                            <p className="text-slate-500 font-medium text-sm mt-4 leading-relaxed">
                              {spec.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-2xl md:text-3xl font-black text-slate-950 tracking-tighter">{spec.value}</span>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'bg-transparent text-slate-200'}`}>
                            <Maximize size={16} />
                          </div>
                        </div>
                      </div>
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => <div key={i} className="h-96 bg-slate-50 rounded-[2.5rem] animate-pulse" />)}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}