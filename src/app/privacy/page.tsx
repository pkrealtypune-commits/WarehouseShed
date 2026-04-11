"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Eye, FileText, ChevronLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-950 min-h-screen pt-32 pb-20 relative overflow-hidden">
      {/* Subtle Industrial Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
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
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck size={14} className="text-emerald-500" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Data Security Protocol
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
            Privacy <span className="text-blue-600">Policy</span><span className="text-[#fd610d]">.</span>
          </h1>
          
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Last Updated: April 10, 2026
          </p>
        </motion.div>

        {/* Policy Content Blocks */}
        <div className="space-y-4">
          {[
            {
              icon: <Eye className="text-blue-600" size={20} />,
              title: "01. Data Acquisition",
              content: "We collect business identity and warehouse specifications exclusively to facilitate logistics solutions in Pune and Indore industrial zones. We do not engage in unauthorized data harvesting."
            },
            {
              icon: <Lock className="text-blue-600" size={20} />,
              title: "02. Encryption & Safety",
              content: "Client expansion plans are processed through high-level encrypted channels. Our zero-leak policy ensures your strategic business moves remain secure from industrial competition."
            },
            {
              icon: <FileText className="text-blue-600" size={20} />,
              title: "03. Third-Party Clause",
              content: "Your information is shared with vetted logistics partners only upon your explicit request for site inspections. We never sell contact lists to external marketing firms."
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
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:bg-[#fd610d] transition-colors duration-500 shadow-lg">
                  {item.icon}
                </div>
                <h2 className="text-lg md:text-xl font-black uppercase tracking-tight text-white group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h2>
              </div>
              <p className="text-slate-400 leading-relaxed font-medium text-sm md:text-base">
                {item.content}
              </p>
            </motion.section>
          ))}
        </div>

        {/* Refined Footer Footer CTA */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link 
            href="/#contact"
            className="flex items-center gap-2 text-emerald-500 font-black uppercase tracking-widest text-[10px] hover:text-[#fd610d] transition-colors group"
          >
            Request Data Access <CheckCircle2 size={14} className="group-hover:scale-110 transition-transform" />
          </Link>
          
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-[0.2em]">
            Website by lupa entertainment
          </p>
        </div>
      </div>
    </div>
  );
}