"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface SpecCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  detail: string;
  index: number;
}

export const SpecCard = ({ icon, title, value, description, detail, index }: SpecCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white border border-slate-100 p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col justify-between"
    >
      {/* 1. Mobile-Friendly Arrow: Visible by default on mobile (low opacity) but high on hover */}
      <div className="absolute top-5 right-5 md:top-6 md:right-6 opacity-30 md:opacity-0 group-hover:opacity-100 transition-opacity text-primary">
        <ArrowUpRight size={20} className="md:w-8 md:h-8" />
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* 2. Icon Container: Balanced for smaller touch screens */}
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.25rem] md:rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
          {React.isValidElement(icon) && 
            React.cloneElement(icon as React.ReactElement<any>, { 
              className: "group-hover:text-white transition-colors w-5 h-5 md:w-7 md:h-7 text-slate-600",
            })
          }
        </div>
        
        <div className="space-y-2 md:space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 md:w-6 bg-primary/30" />
            <p className="text-[10px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">
              {title}
            </p>
          </div>
          {/* Responsive Header: Prevents long values from overflowing */}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-slate-950 tracking-tight leading-tight">
            {value}
          </h3>
        </div>

        <div className="space-y-4 md:space-y-6">
          {/* 3. Description: Removed line-clamp-2 to ensure technical details aren't cut off on mobile */}
          <p className="text-sm md:text-base text-slate-500 leading-relaxed font-medium">
            {description}
          </p>
          
          {/* 4. Footer: Increased touch target/spacing */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[9px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
              {detail}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-primary transition-colors animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};