import React from 'react';
import { NAV_LINKS, COMPANY_INFO } from '../constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-gold/10 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex text-xl font-sans font-bold tracking-widest uppercase leading-none">
              <span className="text-white">EDITING</span>
              <span className="text-shimmer">DESK</span>
            </div>
            <span className="text-[0.55rem] uppercase tracking-[0.25em] font-sans text-gold/40 mt-1">
              Craft  Create  Captivate
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-xs tracking-widest uppercase text-white/30 hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-sans text-xs text-white/20">
            &copy; {new Date().getFullYear()} Editing Desk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
