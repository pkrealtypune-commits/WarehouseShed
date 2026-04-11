"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, Gavel, AlertCircle, CheckCircle, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="bg-slate-950 min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Subtle Industrial Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-[#fd610d] transition-all mb-10 group">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Back to Hub</span>
        </Link>

        {/* Refined Small-to-Medium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 border-b border-white/5 pb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center">
              <Scale size={14} className="text-blue-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Legal Framework
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Terms of <span className="text-[#fd610d]">Service</span>
          </h1>
          
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Compliance Revision: WS-2026-V1
          </p>
        </motion.div>

        {/* Content Blocks */}
        <div className="space-y-4">
          {[
            {
              icon: <CheckCircle className="text-blue-600" size={20} />,
              title: "01. Usage Rights",
              content: "All proprietary inventory data is provided for the sole purpose of industrial facility evaluation. Unauthorized scraping or commercial redistribution of our warehouse listings is strictly prohibited."
            },
            {
              icon: <Gavel className="text-blue-600" size={20} />,
              title: "02. Listing Validity",
              content: "While we provide real-time updates for Pune and Indore zones, all listings remain subject to prior lease. Standard Base Rates do not include CAM or local industrial levies unless specified."
            },
            {
              icon: <AlertCircle className="text-blue-600" size={20} />,
              title: "03. Liability Limits",
              content: "Warehouse Sheds serves as a technical facilitator. Operational disruptions, structural fit-outs, or environmental clearances occurring post-lease signing remain the responsibility of the tenant."
            }
          ].map((item, idx) => (
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              key={idx}
              className="bg-slate-900/40 p-6 md:p-10 rounded-[1.5rem] border border-white/5 hover:border-blue-600/20 transition-all group"
            >
              <div className="flex items-center gap-5 mb-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#fd610d] transition-colors duration-500">
                  {item.icon}
                </div>
                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white">
                  {item.title}
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium text-sm md:text-base">
                {item.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Subtle Footer CTA */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link 
            href="/#inventory"
            className="flex items-center gap-2 text-blue-500 font-black uppercase tracking-widest text-[10px] hover:text-[#fd610d] transition-colors group"
          >
            Review Available Sheds <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">
            Website by lupa entertainment
          </p>
        </div>
      </div>
    </div>
  );
}