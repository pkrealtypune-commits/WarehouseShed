'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ContactFormPopup from '@/components/sections/ContactForm';

const HeroSection: React.FC = () => {
  // State to manage the lead form popup
  const [isFormOpen, setIsFormOpen] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20 },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] },
    },
  };

  const bulletPoints = [
    'Industrial Sheds',
    'Warehouse Land',
    'Built-to-Suit Solutions',
  ];

  return (
    <section id="hero" className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Background Image Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <Image
          src="/assets/hero-logistics.avif"
          alt="Modern warehouse facility in Pune representing logistics solutions"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
      </motion.div>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="lg:col-span-8 xl:col-span-7 text-center lg:text-left">
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight md:leading-tight"
            >
              Warehouses That Fits Your Business <span className="text-blue-400">Perfectly</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto lg:mx-0"
            >
              Find ready-to-move or custom-built warehouse spaces in Pune -{' '}
              <span className="font-semibold text-white">fast, simple, and reliable.</span>
            </motion.p>

            <motion.ul
              variants={itemVariants}
              className="mt-10 space-y-4 inline-block text-left"
            >
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-lg md:text-xl text-white">
                  <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </motion.ul>

            {/* CTA Button - Reverted to Original Blue */}
            <motion.div variants={itemVariants} className="mt-12">
              <button
                onClick={() => setIsFormOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 group"
              >
                Talk to Our Team Today
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent z-10" />

      {/* Popup Trigger */}
      <AnimatePresence>
        {isFormOpen && (
          <ContactFormPopup 
            onClose={() => setIsFormOpen(false)} 
            propertyTitle="Inquiry from Hero CTA"
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;