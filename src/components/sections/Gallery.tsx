'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import ContactFormPopup from '@/components/sections/ContactForm';

const galleryImages = [
  { src: '/assets/hero-logistics.avif', title: 'Industrial Facility', category: 'Grade-A' },
  { src: '/assets/wagholi.avif', title: 'Wagholi Logistics Park', category: 'Shed' },
  { src: '/assets/chakan.avif', title: 'Chakan Industrial Hub', category: 'Manufacturing' },
  { src: '/assets/kesanand.avif', title: 'Kesanand Storage', category: 'Warehouse' },
  { src: '/assets/lonikand.avif', title: 'Lonikand Distribution', category: 'Logistics' },
  { src: '/assets/talegaon.avif', title: 'Talegaon Mega Center', category: 'Build-to-Suit' },
  { src: '/assets/lohegaon.avif', title: 'Lohegaon Inventory', category: 'Prime' },
];

const GallerySection = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10 md:mb-16">
          <div>
            <h2 className="text-[#fd610d] font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
              Project <span className="text-blue-500 italic">Showcase.</span>
            </h3>
          </div>
          
          {/* Mobile Arrows Only */}
          <div className="flex md:hidden gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-3 bg-slate-900 border border-white/10 rounded-full text-white active:bg-blue-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-3 bg-slate-900 border border-white/10 rounded-full text-white active:bg-blue-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Gallery Content */}
        {/* Mobile View: Horizontal Scroll */}
        <div 
          ref={scrollRef}
          className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-8 no-scrollbar"
        >
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="min-w-[85vw] snap-center relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900"
              onClick={() => setSelectedImg(img.src)}
            >
              <Image
                src={img.src}
                alt={img.title}
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent p-6 flex flex-col justify-end">
                <span className="text-[#fd610d] text-[10px] font-black uppercase tracking-widest mb-1">{img.category}</span>
                <h4 className="text-white text-xl font-black uppercase tracking-tighter">{img.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Masonry Grid */}
        <div className="hidden md:columns-2 lg:columns-3 gap-4 space-y-4 md:block">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group cursor-pointer overflow-hidden rounded-3xl bg-slate-900"
              onClick={() => setSelectedImg(img.src)}
            >
              <Image
                src={img.src}
                alt={img.title}
                width={800}
                height={600}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-[#fd610d] text-[10px] font-black uppercase tracking-widest mb-1">{img.category}</span>
                <h4 className="text-white text-xl font-black uppercase tracking-tighter">{img.title}</h4>
                <div className="mt-4 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <Maximize2 size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing CTA */}
        <div className="mt-12 md:mt-24 p-8 md:p-12 bg-white rounded-[2rem] md:rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-2xl md:text-3xl font-black text-slate-950 uppercase tracking-tighter leading-tight">Ready to see these <br className="md:hidden" /> in person?</h4>
            <p className="text-slate-500 font-bold uppercase text-[10px] md:text-xs tracking-widest mt-2">Schedule a site visit today for any location.</p>
          </div>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-[#fd610d] transition-all shadow-xl active:scale-95 group"
          >
            Book Site Visit
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button className="absolute top-6 right-6 text-white p-2">
              <X size={32} />
            </button>
            <div className="relative w-full max-w-5xl aspect-video">
              <Image src={selectedImg} alt="Enlarged view" fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFormOpen && (
          <ContactFormPopup 
            onClose={() => setIsFormOpen(false)} 
            propertyTitle="Site Visit Inquiry from Gallery" 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;