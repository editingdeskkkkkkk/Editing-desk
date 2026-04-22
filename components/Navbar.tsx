import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const MotionDiv = motion.div as any;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-ink-1/95 backdrop-blur-xl border-b border-gold/10 shadow-[0_4px_40px_rgba(0,0,0,0.6)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" className="flex items-center group">
          <div className="flex flex-col">
            <div className="flex text-xl font-sans font-bold tracking-widest leading-none uppercase">
              <span className="text-white group-hover:text-white/80 transition-colors">EDITING</span>
              <span className="text-shimmer ml-0.5">DESK</span>
            </div>
            <span className="text-[0.55rem] uppercase tracking-[0.25em] font-sans font-medium mt-1 text-gold/50">
              Craft  Create  Captivate
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-xs font-sans font-medium tracking-widest uppercase text-white/60 hover:text-gold transition-colors duration-300 group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2.5 text-xs font-sans font-semibold tracking-widest uppercase text-ink bg-gold hover:bg-gold-light transition-colors duration-300 rounded-sm"
          >
            Let's Talk
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gold border border-gold/30 p-2 rounded-sm"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ink-2 border-t border-gold/10"
          >
            <div className="flex flex-col p-6 space-y-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-sans font-medium uppercase tracking-widest text-white/70 hover:text-gold transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
