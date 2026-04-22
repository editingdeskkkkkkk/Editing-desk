import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';

const AntiScamToast: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show protection notice 3 seconds after site loads
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-[100] max-w-[340px] bg-ink-2/95 backdrop-blur-md border border-gold/30 rounded-sm shadow-2xl p-5"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors cursor-interactive"
          >
            <X size={14} />
          </button>
          
          <div className="flex items-start gap-3 mb-2">
            <ShieldAlert size={18} className="text-gold mt-0.5 shrink-0" />
            <h4 className="font-sans font-bold text-sm text-gold tracking-wide uppercase">Client Protection</h4>
          </div>
          
          <div className="space-y-3 mt-3 text-[11px] font-sans text-white/70 leading-relaxed">
            <p>This website belongs exclusively to the official <strong>Editing Desk</strong> team.</p>
            <p>If anyone contacts you outside of our official channels claiming to be us, do not trust them unless they are one of our 4 official team members.</p>
            <p className="text-white/40 italic">Always verify and contact us directly through this portfolio to avoid scams or impersonators.</p>
          </div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="mt-4 w-full py-2 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/20 rounded-sm text-[10px] uppercase font-bold tracking-[0.2em] transition-all cursor-interactive"
          >
            I Understand
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AntiScamToast;
