'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Users, CheckCircle, Trophy, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Properties Managed', value: '120+', icon: CheckCircle, sub: 'Grade-A Infrastructure' },
  { label: 'Happy Clients', value: '450+', icon: Users, sub: 'Across 12+ Industries' },
  { label: 'Square Feet Delivered', value: '2.5M+', icon: TrendingUp, sub: 'Premium Warehouse Space' },
  { label: 'Industry Awards', value: '15+', icon: Trophy, sub: 'Service Excellence' },
];

const StatsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-stretch">
          
          {/* --- Rating Card --- */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-center"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="fill-blue-600 text-blue-600" />
              ))}
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none mb-4">
              4.9/5 <br />
              <span className="text-blue-600">Top Rated.</span>
            </h3>
            <p className="text-slate-500 font-bold uppercase text-[10px] md:text-xs tracking-widest leading-relaxed">
              Based on 450+ verified business <br className="hidden md:block" /> 
              reviews across Google & Industry Portals.
            </p>
            
            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
                  +400
                </div>
              </div>
              <p className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-tight">Trusted by logistics heads nationwide</p>
            </div>
          </motion.div>

          {/* --- Stats Grid --- */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] text-white relative overflow-hidden group hover:bg-blue-600 transition-colors duration-500"
              >
                <div className="relative z-10">
                  <stat.icon className="text-[#fd610d] group-hover:text-white mb-6 transition-colors" size={32} />
                  <p className="text-4xl md:text-5xl font-black tracking-tighter mb-2">{stat.value}</p>
                  <p className="text-sm font-black uppercase tracking-widest text-white/90">{stat.label}</p>
                  <p className="text-[10px] font-bold uppercase tracking-tight text-white/40 group-hover:text-white/70 mt-1">{stat.sub}</p>
                </div>
                {/* Background Accent */}
                <stat.icon className="absolute -bottom-8 -right-8 text-white/5 group-hover:text-white/10 transition-colors" size={180} />
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;