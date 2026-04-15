'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ContactFormPopup from '@/components/sections/ContactForm';

const HeroSection: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] },
    },
  };

  const bulletPoints = [
    'Industrial Shed for Rent in Chakan MIDC',
    'Warehouse on Rent in Pune & Wagholi',
    'Industrial Land for Sale in Talegaon',
  ];

  return (
    // min-h-screen ensures 100% height. 
    // pt-20 (80px) or pt-24 (96px) pushes content below your navbar.
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-gray-950 pt-20 md:pt-24">
      
      {/* Background Image Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Image
          src="/assets/hero-logistics.avif"
          alt="Industrial Shed for Rent in Chakan Pune"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/65 md:bg-black/60" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="lg:col-span-10 xl:col-span-9 text-center lg:text-left">
            
            {/* H1: Adjusted size slightly to keep 100vh balance */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Premium <span className="text-blue-400">Industrial Sheds for Rent</span> & Industrial Plots for Sale in Pune
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto lg:mx-0 font-medium"
            >
              Strategic <span className="text-white font-semibold">Warehouse Space and MIDC Plots</span> in Chakan & Talegaon designed for high-growth manufacturing.
            </motion.p>

            <motion.ul
              variants={itemVariants}
              className="mt-8 space-y-3 inline-block text-left"
            >
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-base md:text-lg text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <button
                onClick={() => setIsFormOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                Get Pricing & Details
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="flex flex-col text-left border-l border-white/20 pl-6 hidden sm:flex">
                <span className="text-gray-400 text-xs uppercase tracking-widest font-bold">Trusted in MIDC Zones</span>
                <span className="text-white font-semibold italic">Ready-to-move Options Available</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Visual Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent z-10" />

      <AnimatePresence>
        {isFormOpen && (
          <ContactFormPopup 
            onClose={() => setIsFormOpen(false)} 
            propertyTitle="Inquiry from Ads Hero Section"
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;