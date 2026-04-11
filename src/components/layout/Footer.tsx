"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, ShieldCheck } from 'lucide-react';
// Using React-Icons for Brand Logos
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

const navLinks = [
  { name: 'Home', href: '/#hero' },
  { name: 'Inventory', href: '/#inventory' },
  { name: 'About', href: '/#about' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Technical Specs', href: '/#specs' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10 overflow-hidden relative border-t border-white/5">
      {/* Structural Accent - Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, 
          backgroundSize: '40px 40px' 
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Column */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform">
              <div className="relative w-10 h-10">
                <Image src="/logo.avif" alt="Logo" fill className="object-contain" />
              </div>
              <span className="font-black text-2xl uppercase tracking-tighter">
                <span className="text-[#fd610d]">Warehouse</span> <span className="text-blue-500">Sheds</span>
              </span>
            </Link>
            <p className="text-slate-400 font-medium leading-relaxed max-w-xs">
              Specializing in Grade-A industrial infrastructure and warehouse logistics solutions across Pune, Chakan, Talegaon and Ranjangaon since 2018.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: FaInstagram, href: "#" },
                { Icon: FaFacebookF, href: "#" },
                { Icon: FaLinkedinIn, href: "#" },
                { Icon: FaWhatsapp, href: "https://wa.me/919765464333" }
              ].map((item, i) => (
                <a 
                  key={i} 
                  href={item.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:bg-[#fd610d] hover:border-[#fd610d] hover:text-white transition-all duration-300 active:scale-90"
                >
                  <item.Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-slate-500">Navigation</h4>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-slate-300 hover:text-[#fd610d] font-bold transition-all flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-[#fd610d] transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-slate-500">Contact Detail</h4>
              <ul className="space-y-6">
                <li>
                  <a href="tel:+919765464333" className="group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
                      <Phone size={18} className="text-blue-500 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Direct Line</p>
                      <p className="font-bold text-slate-200 group-hover:text-blue-500 transition-colors">+91 97654 64333</p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      <MapPin size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-0.5">Operations</p>
                      <p className="font-bold text-slate-200">Pune, Chakan, Talegaon & Ranjangaon Industrial Zones</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Realty Works Management Section - Minimalist 1:1 Aspect */}
          <div className="flex flex-col items-center justify-center lg:items-start lg:pl-8">
            <div className="flex items-center gap-2 mb-4">
               <ShieldCheck size={12} className="text-emerald-500" />
               <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-500">Managed By</span>
            </div>

            {/* 1:1 Aspect Ratio Container - No Bg, No Border */}
            <div className="relative w-32 h-32 aspect-square">
              <Image 
                src="/realty.avif" 
                alt="Realty Works" 
                fill 
                className="object-contain" 
              />
            </div>
            
            <p className="mt-4 text-[10px] font-bold text-slate-400 tracking-tight leading-tight text-center lg:text-left">
              Operational Excellence <br /> via Realty Works
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-8 gap-y-2">
            <p className="opacity-50">© {currentYear} Warehouse Sheds</p>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          
          <div className="flex items-center gap-2 group cursor-default">
            <span className="opacity-50">Website by</span>
            <span className="text-slate-400 group-hover:text-[#fd610d] transition-colors tracking-normal lowercase italic font-black text-sm">
              lupa entertainment
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;