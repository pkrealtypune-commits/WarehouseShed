'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactFormPopup from '@/components/sections/ContactForm';

const navLinks = [
  { name: 'Home', href: '/#hero' },
  { name: 'Inventory', href: '/#inventory' },
  { name: 'About', href: '/#about' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Technical Specs', href: '/#specs' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.startsWith('/#');
    
    if (isAnchor && pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; 
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-500 ${
          scrolled 
            ? 'bg-black/90 backdrop-blur-md py-3 border-b border-white/10 shadow-xl' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* LOGO & COMPANY NAME */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group active:scale-95 transition-transform"
              onClick={(e) => handleNavClick(e, '/')}
            >
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/logo.avif"
                  alt="Warehouse Sheds Logo"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">
                <span className="text-[#fd610d]">Warehouse</span> <span className="text-blue-500">Sheds</span>
              </span>
            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2 text-gray-300 hover:text-white text-sm font-semibold transition-all rounded-full hover:bg-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <div className="ml-4 pl-4 border-l border-white/10">
                <button 
                  onClick={() => setIsFormOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 md:hidden"
            >
              <div className="p-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-xl font-bold text-gray-300 hover:text-white border-b border-white/5 pb-2"
                  >
                    {link.name}
                  </Link>
                ))}
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    setIsFormOpen(true);
                  }}
                  className="mt-4 w-full bg-blue-600 text-white py-4 rounded-xl font-black active:scale-[0.98] transition-transform"
                >
                  GET A QUOTE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* LEAD GEN POPUP */}
      <AnimatePresence>
        {isFormOpen && (
          <ContactFormPopup 
            onClose={() => setIsFormOpen(false)} 
            propertyTitle="Inquiry from Website" 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;