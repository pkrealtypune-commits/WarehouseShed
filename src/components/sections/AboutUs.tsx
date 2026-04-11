'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  CheckCircle2, 
  ArrowRight, 
  Warehouse, 
  Map, 
  Construction, 
  ClipboardCheck, 
  Search, 
  Truck, 
  FileText 
} from 'lucide-react';
import ContactFormPopup from '@/components/sections/ContactForm';

const AboutSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const services = [
    {
      title: "Warehouse Rentals",
      desc: "Ready-to-use spaces so you can start operations quickly.",
      icon: <Warehouse className="text-blue-600" size={22} />,
      image: "/assets/warehouserentals1.avif"
    },
    {
      title: "Land for Development",
      desc: "Find the right land if you want to build your own facility.",
      icon: <Map className="text-blue-600" size={22} />,
      image: "/assets/Developement1.avif"
    },
    {
      title: "Built-to-Suit",
      desc: "We help you design and develop a warehouse based on your needs.",
      icon: <Construction className="text-blue-600" size={22} />,
      image: "/assets/Built1.avif"
    }
  ];

  const steps = [
    { title: "Tell us your requirement", icon: <ClipboardCheck size={20} /> },
    { title: "We shortlist options", icon: <Search size={20} /> },
    { title: "Site visits & comparison", icon: <Truck size={20} /> },
    { title: "Final deal & paperwork", icon: <FileText size={20} /> }
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* --- WHO WE ARE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start mb-20 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[#fd610d] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3">Who We Are</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-[1] mb-6">
              Find Your Space <br className="hidden md:block" /> 
              <span className="text-blue-600">Without Confusion.</span>
            </h3>
            <div className="space-y-4 text-slate-600 font-medium text-base md:text-lg leading-relaxed mb-10">
              <p>
                Warehouseshed helps businesses find the right warehouse space without the headache. 
                Since 2018, we’ve matched companies with properties that fit their 
                location, size, and budget perfectly.
              </p>
            </div>

            {/* --- REALTY WORKS MANAGEMENT BADGE (Borderless, No Bg, 1:1 Aspect) --- */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 p-5 rounded-2xl flex items-center gap-5"
            >
              {/* Logo Container - aspect-square, transparent bg */}
              <div className="w-16 h-16 aspect-square flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                <Image 
                  src="/realty.avif" 
                  alt="Realty Works Management" 
                  fill 
                  className="object-contain" 
                />
              </div>

              {/* Subtle vertical separator */}
              <div className="h-10 w-[1px] bg-slate-200" />

              {/* Text Context */}
              <div className="flex-grow">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Asset Management Partner</p>
                <h5 className="text-lg font-black text-slate-950 uppercase tracking-tight">Exclusively Managed by</h5>
              </div>
            </motion.div>
          </motion.div>

          {/* Trust Panel (Remains the same) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10">
              <h4 className="text-xl md:text-2xl font-black uppercase mb-6 tracking-tight">Why Businesses Trust Us</h4>
              <ul className="space-y-4 md:space-y-6">
                {[
                  "We understand your exact requirement",
                  "We save your time with filtered options",
                  "We keep everything transparent",
                  "We support you from start to finish"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-emerald-400 mt-1 flex-shrink-0" size={18} />
                    <span className="font-bold text-gray-200 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 pt-6 border-t border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#fd610d]">
                No false promises. Just the right property.
              </p>
            </div>
            <Warehouse className="absolute -bottom-10 -right-10 text-white/5" size={240} />
          </motion.div>
        </div>

        {/* --- WHAT WE DO --- */}
        <div className="mb-20 md:mb-28">
          <div className="mb-10 md:mb-12">
            <h2 className="text-[#fd610d] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-2">Our Solutions</h2>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Core Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 p-6 md:p-8 rounded-2xl md:rounded-3xl hover:border-blue-200 transition-all group overflow-hidden flex flex-col">
                
                {/* 1:1 Aspect Ratio Image */}
                <div className="relative aspect-square w-full mb-6 rounded-2xl overflow-hidden shadow-sm">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                      {service.icon}
                    </div>
                    <h4 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-tight leading-tight">{service.title}</h4>
                </div>
                
                <p className="text-slate-500 font-medium text-sm md:text-base leading-relaxed flex-grow">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- PROCESS SECTION --- */}
        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-16 text-center">
          <h2 className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3">How It Works</h2>
          <h3 className="text-2xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter mb-10 md:mb-14">Simple. Fast. <span className="text-blue-600">Hassle-free.</span></h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-blue-600 p-6 rounded-2xl flex flex-col items-center gap-4 shadow-lg shadow-blue-900/10">
                <div className="w-9 h-9 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center font-black text-sm border border-white/30">
                  0{idx + 1}
                </div>
                <p className="font-bold text-white text-sm md:text-base uppercase tracking-tighter leading-tight">
                  {step.title}
                </p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsFormOpen(true)}
            className="mt-10 md:mt-14 inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-[#fd610d] text-white rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs hover:bg-[#e5560b] transition-all shadow-xl active:scale-95 group"
          >
            Start Your Search
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <ContactFormPopup 
            onClose={() => setIsFormOpen(false)} 
            propertyTitle="Inquiry from About Section" 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AboutSection;