import React from 'react';
import { SERVICES } from '../constants';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || navigator.maxTouchPoints > 0);

const HolographicCard = ({ service, index }: { service: any, index: number }) => {
  const Icon = service.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const backgroundGlare = useTransform(
    [mouseXSpring, mouseYSpring],
    ([x, y]: any[]) => `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(201,168,76,0.15) 0%, transparent 60%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      style={isMobile ? {} : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-ink-2 p-8 cursor-interactive transition-all duration-300 rounded-sm border border-gold/10 hover:border-gold/30 hover:bg-ink-1"
    >
      {/* Glare effect */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none rounded-sm"
        style={{ background: backgroundGlare }}
      />

      <div style={{ transform: "translateZ(30px)" }}>
        {/* Icon */}
        <div className="relative w-12 h-12 mb-6 pointer-events-none">
          <div className="absolute inset-0 bg-gold/10 rounded-sm group-hover:bg-gold/15 transition-colors duration-300" />
          <div className="relative w-full h-full flex items-center justify-center">
            <Icon className="text-gold w-5 h-5 drop-shadow-[0_0_10px_rgba(201,168,76,0.6)]" strokeWidth={1.5} />
          </div>
        </div>

        <h3 className="font-sans text-xl font-semibold text-white mb-3 group-hover:text-gold transition-colors duration-300 pointer-events-none">
          {service.title}
        </h3>
        <p className="font-sans text-sm text-white/35 leading-relaxed group-hover:text-white/50 transition-colors duration-300 pointer-events-none">
          {service.description}
        </p>

        {/* Arrow on hover */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="mt-6 flex items-center gap-2 text-gold text-xs font-sans font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <span>Learn More</span>
          <div className="w-8 h-px bg-gold" />
        </motion.div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 flex flex-col justify-center bg-transparent relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" style={{ perspective: '1500px' }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 pointer-events-none"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold/60" />
            <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/70">
              What We Do
            </span>
          </div>
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
            Our <span className="text-shimmer">Expertise</span>
          </h2>
          <p className="font-sans text-white/40 max-w-xl mt-4 leading-relaxed text-base">
            Comprehensive creative solutions tailored to elevate your brand presence in the digital landscape.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 relative z-20">
          {SERVICES.map((service, index) => (
            <HolographicCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
