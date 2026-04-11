"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingCart, 
  Cpu, 
  Settings, 
  Sun, 
  FlaskConical, 
  Package,
  ArrowRight
} from "lucide-react";
import ContactFormPopup from '@/components/sections/ContactForm';

const sectors = [
  {
    title: "FMCG",
    icon: <Package className="w-6 h-6 md:w-8 md:h-8" />,
    description: "High-throughput floor plates optimized for rapid turnaround and logistics.",
    tag: "High Volume"
  },
  {
    title: "Electronics",
    icon: <Cpu className="w-6 h-6 md:w-8 md:h-8" />,
    description: "ESD-protected environments and high-security zones for sensitive technology.",
    tag: "Tech Ready"
  },
  {
    title: "Machinery",
    icon: <Settings className="w-6 h-6 md:w-8 md:h-8" />,
    description: "Heavy-duty SFRC flooring designed for massive point loads and vibration.",
    tag: "Heavy Load"
  },
  {
    title: "Retail",
    icon: <ShoppingCart className="w-6 h-6 md:w-8 md:h-8" />,
    description: "B2C-ready hubs with mezzanine support and efficient pick-pack configurations.",
    tag: "E-commerce"
  },
  {
    title: "Energy",
    icon: <Sun className="w-6 h-6 md:w-8 md:h-8" />,
    description: "Expansive storage solutions for large-scale renewable energy components.",
    tag: "Scale"
  },
  {
    title: "Chemicals",
    icon: <FlaskConical className="w-6 h-6 md:w-8 md:h-8" />,
    description: "Safety-first facilities equipped with specialized containment systems.",
    tag: "Compliance"
  }
];

export default function IndustriesSection() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="industries" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-20">
          <div className="max-w-2xl">
            <h2 className="text-[#fd610d] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3">Industries We Serve</h2>
            <h3 className="text-3xl md:text-6xl font-black text-slate-950 uppercase tracking-tighter leading-[0.9]">
              Specialized Solutions for <br /> 
              <span className="text-blue-600">Diverse Sectors.</span>
            </h3>
          </div>
          <p className="max-w-xs text-slate-400 text-[11px] md:text-sm font-bold uppercase tracking-widest leading-relaxed">
            Tailored infrastructure designed to meet the unique demands of global industry leaders.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:border-blue-100 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="text-blue-600 group-hover:text-[#fd610d] transition-colors duration-500">
                    {sector.icon}
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                    {sector.tag}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-slate-950 group-hover:text-blue-600 transition-colors">
                    {sector.title}
                  </h4>
                  <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
                    {sector.description}
                  </p>
                </div>
              </div>

              {/* Decorative Numbering */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Vertical.0{index + 1}</span>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing conversion hook */}
        <div className="mt-16 text-center">
          <button 
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center gap-4 px-8 py-4 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-blue-600 transition-all shadow-xl active:scale-95"
          >
            Request Industry-Specific Specs
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* LEAD GEN POPUP */}
      <AnimatePresence>
        {isFormOpen && (
          <ContactFormPopup 
            onClose={() => setIsFormOpen(false)} 
            propertyTitle="Industry-Specific Inquiry" 
          />
        )}
      </AnimatePresence>
    </section>
  );
}