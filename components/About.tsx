import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Users, Globe, Zap, CheckCircle2 } from 'lucide-react';
import { ABOUT_CONTENT, COMPANY_INFO } from '../constants';

const StatCard = ({ icon: Icon, value, label, index }: { icon: any, value: string, label: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.6 }}
    whileHover={{ y: -4 }}
    className="group relative bg-ink-2 border border-gold/10 p-6 rounded-sm card-hover text-center"
    style={{ transformStyle: 'preserve-3d' }}
  >
    <div className="w-10 h-10 mx-auto mb-4 bg-gold/10 rounded-sm flex items-center justify-center group-hover:bg-gold/15 transition-colors">
      <Icon className="text-gold" size={18} strokeWidth={1.5} />
    </div>
    <h3 className="font-sans text-4xl font-bold text-white mb-1 text-glow-gold">{value}</h3>
    <p className="font-sans text-[11px] text-white/35 uppercase tracking-widest font-medium">{label}</p>
  </motion.div>
);

const About: React.FC = () => {
  const MotionDiv = motion.div as any;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const yBg1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const icons = [Award, Users, Globe, Zap];

  return (
    <section ref={containerRef} id="about" className="py-20 flex flex-col justify-center bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* Background decoration */}
      <motion.div style={{ y: yBg1, background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent 70%)' }} className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none" />
      <motion.div style={{ y: yBg2, background: 'radial-gradient(circle, rgba(201,168,76,0.03), transparent 70%)' }} className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none" />

      {/* Geometric corner shapes */}
      <div className="absolute top-16 left-8 w-20 h-20 border border-gold/8 rounded-sm" style={{ transform: 'rotate(15deg)' }} />
      <div className="absolute bottom-20 right-8 w-16 h-16 border border-gold/8 rounded-full" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold/60" />
            <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/70">
              Our Story
            </span>
          </div>
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-white leading-tight">
            {ABOUT_CONTENT.title.split(' ').slice(0, 2).join(' ')}{' '}
            <span className="text-shimmer">{ABOUT_CONTENT.title.split(' ').slice(2).join(' ')}</span>
          </h2>
        </motion.div>

        {/* Story + Stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Text Column */}
          <MotionDiv
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6 font-sans text-white/45 leading-relaxed text-base mb-10">
              <p>{ABOUT_CONTENT.paragraph1}</p>
              <p>{ABOUT_CONTENT.paragraph2}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {ABOUT_CONTENT.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                  <span className="font-sans text-sm text-white/60 font-medium group-hover:text-gold transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </MotionDiv>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {ABOUT_CONTENT.stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={icons[index] || Award}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-ink-2 border border-gold/15 rounded-sm p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Animated shine */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 5, ease: 'linear', repeatDelay: 8 }}
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.06), transparent)', width: '50%' }}
          />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-gold/40" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gold/40" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-gold/40" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/40" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/60 mb-6 block">
              {ABOUT_CONTENT.missionTitle}
            </span>
            <p className="font-sans text-2xl md:text-4xl font-light italic text-white/85 leading-relaxed">
              {ABOUT_CONTENT.missionStatement}
            </p>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default About;
