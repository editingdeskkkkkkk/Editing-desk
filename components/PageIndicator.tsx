import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const pages = [
  { id: 'home', label: 'HERO' },
  { id: 'services', label: 'EXPERTISE' },
  { id: 'work', label: 'PORTFOLIO' },
  { id: 'team', label: 'TEAM' },
  { id: 'reviews', label: 'REVIEWS' },
  { id: 'about', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
];

const PageIndicator: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Find the closest section to center viewport
      let closest = 0;
      let minDiff = Infinity;
      const centerY = window.scrollY + window.innerHeight / 2;

      pages.forEach((page, index) => {
        const el = document.getElementById(page.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + window.scrollY + rect.height / 2;
          const diff = Math.abs(centerY - elCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closest = index;
          }
        }
      });
      if (closest !== activeIndex) {
        setActiveIndex(closest);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[1000] hidden lg:flex flex-col items-center gap-4">
      {pages.map((page, idx) => (
        <a
          key={page.id}
          href={`#${page.id}`}
          className={`relative group w-2 h-16 flex justify-center items-center cursor-interactive transition-all duration-500`}
        >
          {/* Label that appears on hover/active */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: activeIndex === idx ? 1 : 0, x: activeIndex === idx ? 0 : 5 }}
            className={`absolute right-6 text-[9px] font-sans font-bold tracking-[0.2em] whitespace-nowrap 
              ${activeIndex === idx ? 'text-gold' : 'text-white/30 group-hover:text-white/60 group-hover:opacity-100'}`}
          >
            0{idx + 1} — {page.label}
          </motion.div>
          
          {/* Animated Bar */}
          <div 
            className={`w-0.5 rounded-full transition-all duration-500 ${
              activeIndex === idx ? 'bg-gold h-full shadow-[0_0_10px_rgba(201,168,76,0.6)]' : 'bg-white/10 h-6 group-hover:h-10 group-hover:bg-white/30'
            }`} 
          />
        </a>
      ))}
    </div>
  );
};

export default PageIndicator;
