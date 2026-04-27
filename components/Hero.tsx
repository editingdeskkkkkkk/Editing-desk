import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Sparkles as LucideSparkles } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

// ── DETECT MOBILE ────────────────────────────────────────────────────────────
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.innerWidth <= 768 || navigator.maxTouchPoints > 0);



// ── CSS BLACK HOLE ────────────────────────────────────────────────────────────
const CSSBlackHole: React.FC<{ mobile: boolean }> = ({ mobile }) => {
  const size = mobile ? 'clamp(180px, 65vw, 280px)' : 'clamp(340px, 35vw, 500px)';

  return (
    <div
      style={{
        position: 'absolute',
        right: mobile ? 'auto' : 'clamp(2%, 6%, 8%)',
        left: mobile ? '50%' : 'auto',
        top: '50%',
        transform: mobile ? 'translate(-50%, -50%)' : 'translateY(-50%)',
        width: size,
        height: size,
        pointerEvents: 'none',
        opacity: mobile ? 0.22 : 1,
      }}
    >
      {/* ── Outer ambient aura ── */}
      <div style={{
        position: 'absolute',
        inset: '-35%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 60%)',
        animation: 'bh-pulse 5s ease-in-out infinite',
      }} />

      {/* ── Perspective wrapper ── */}
      <div style={{ position: 'absolute', inset: 0, perspective: '700px', perspectiveOrigin: '50% 50%' }}>

        {/* RING 1 — outer cool dust haze */}
        <div style={{ position: 'absolute', inset: '-8%', transform: 'rotateX(72deg)', transformStyle: 'preserve-3d' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(110,80,20,0.18) 12%, rgba(201,168,76,0.14) 26%, transparent 40%, transparent 68%, rgba(110,80,20,0.10) 84%, transparent 100%)',
            animation: 'bh-spinZ 28s linear infinite',
            willChange: 'transform',
          }} />
        </div>

        {/* RING 2 — mid gold disk */}
        <div style={{ position: 'absolute', inset: '10%', transform: 'rotateX(72deg)', transformStyle: 'preserve-3d' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 30deg, transparent 0%, rgba(201,168,76,0.08) 6%, rgba(201,168,76,0.6) 22%, rgba(245,217,122,0.75) 36%, rgba(201,168,76,0.5) 50%, transparent 64%, transparent 82%, rgba(201,168,76,0.22) 92%, transparent 100%)',
            animation: 'bh-spinZ 15s linear infinite',
            willChange: 'transform',
          }} />
        </div>

        {/* RING 3 — inner superheated ring (spins opposite) */}
        <div style={{ position: 'absolute', inset: '24%', transform: 'rotateX(72deg)', transformStyle: 'preserve-3d' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 200deg, transparent 0%, rgba(255,255,255,0.05) 6%, rgba(255,240,180,0.95) 22%, rgba(255,255,255,1) 32%, rgba(255,220,110,0.85) 46%, rgba(201,168,76,0.55) 56%, transparent 70%, transparent 100%)',
            animation: 'bh-spinZ-rev 8s linear infinite',
            willChange: 'transform',
          }} />
        </div>

        {/* RING 4 — ultra-bright inner flash (very thin, fast) */}
        <div style={{ position: 'absolute', inset: '33%', transform: 'rotateX(72deg)', transformStyle: 'preserve-3d' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'conic-gradient(from 90deg, transparent 0%, rgba(255,255,255,0.0) 8%, rgba(255,255,255,0.6) 18%, rgba(255,255,255,0.9) 25%, transparent 35%, transparent 100%)',
            animation: 'bh-spinZ 5s linear infinite',
            willChange: 'transform',
          }} />
        </div>
      </div>

      {/* ── Photon sphere / gravitational lensing ring ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '37%', height: '37%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        boxShadow: '0 0 0 2px rgba(255,255,255,0.7), 0 0 25px 8px rgba(255,255,255,0.2), 0 0 50px 15px rgba(201,168,76,0.15)',
        animation: 'bh-glow 3.5s ease-in-out infinite',
        willChange: 'opacity, transform',
        zIndex: 8,
      }} />

      {/* ── Lensing distortion halo ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '42%', height: '42%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, transparent 55%, rgba(255,255,255,0.08) 68%, transparent 82%)',
        zIndex: 7,
      }} />

      {/* ── Event horizon (pitch black core) ── */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        width: '31%', height: '31%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #000 70%, #080808 100%)',
        zIndex: 10,
      }} />

      {/* ── Relativistic jet — top ── */}
      {!mobile && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '3px', height: '42%',
          background: 'linear-gradient(to top, rgba(201,168,76,0.7), rgba(255,255,255,0.4), transparent)',
          filter: 'blur(2.5px)',
          animation: 'bh-jet 4.5s ease-in-out infinite',
          zIndex: 9,
        }} />
      )}

      {/* ── Relativistic jet — bottom ── */}
      {!mobile && (
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: '3px', height: '42%',
          background: 'linear-gradient(to bottom, rgba(201,168,76,0.7), rgba(255,255,255,0.4), transparent)',
          filter: 'blur(2.5px)',
          animation: 'bh-jet-down 4.5s ease-in-out infinite 0.6s',
          zIndex: 9,
        }} />
      )}
    </div>
  );
};

// ── LETTER-BY-LETTER REVEAL ──────────────────────────────────────────────────
const AnimatedWord = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => (
  <span className={`inline-flex flex-wrap ${className}`}>
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 30, rotateX: -50 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: delay + i * 0.022, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ display: 'inline-block', transformOrigin: 'bottom' }}
      >
        {char === ' ' ? '\u00a0' : char}
      </motion.span>
    ))}
  </span>
);

// ── HERO COMPONENT ───────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const mobile = isTouchDevice();
  const { scrollY } = useScroll();

  // Only apply parallax on desktop — skip on touch to avoid scroll jank
  const opacity  = useTransform(scrollY, [0, 350], [1, 0]);
  const scaleDown = useTransform(scrollY, [0, 400], [1, 0.92]);
  const y1 = useTransform(scrollY, [0, 600], [0, mobile ? 0 : 160]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent"
    >

      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Perspective grid */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.045]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
              transform: 'perspective(600px) rotateX(55deg) scale(2.5) translateY(20%)',
              transformOrigin: '50% 100%',
            }}
          />
        </div>

        {/* Radial fade over grid */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 100%, transparent 0%, #080808 70%)'
        }} />

        {/* Gold orbs (desktop only — parallax) */}
        {!mobile && (
          <>
            <motion.div
              style={{ y: y1, background: 'radial-gradient(circle, rgba(201,168,76,0.07), transparent 60%)' }}
              className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
            />
            <motion.div
              style={{ y: y1, background: 'radial-gradient(circle, rgba(201,168,76,0.04), transparent 65%)' }}
              className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
            />
          </>
        )}

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
          backgroundSize: '100% 4px',
        }} />
      </div>

      {/* ── PREMIUM CSS BLACK HOLE ── */}
      <CSSBlackHole mobile={mobile} />

      {/* ── MAIN CONTENT ── */}
      <motion.div
        style={mobile ? {} : { opacity, scale: scaleDown }}
        className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 mb-8 sm:mb-10 px-4 py-2 bg-gold/8 border border-gold/20 rounded-full backdrop-blur-sm"
        >
          <LucideSparkles size={11} className="text-gold" />
          <span className="text-[10px] sm:text-xs font-sans font-semibold tracking-[0.25em] uppercase text-gold/80">
            {HERO_CONTENT.badge}
          </span>
          <LucideSparkles size={11} className="text-gold" />
        </motion.div>

        {/* Headline — letter reveal */}
        <h1
          className="font-sans font-extrabold leading-[1.0] mb-6 tracking-tight"
          style={{
            fontSize: 'clamp(1.75rem, 7.5vw, 5.5rem)',
            perspective: '600px',
            wordBreak: 'keep-all',
            overflowWrap: 'normal',
            hyphens: 'none',
          }}
        >
          <div className="block text-white">
            <AnimatedWord text={HERO_CONTENT.titleLine1} delay={0.3} />
          </div>
          <div className="block text-white/50 font-light" style={{ fontSize: 'clamp(1.4rem, 5.5vw, 3.75rem)', marginTop: '0.15em', marginBottom: '0.15em' }}>
            <AnimatedWord text={HERO_CONTENT.titleLine2} delay={0.55} />
          </div>
          <div className="block text-shimmer text-glow-gold">
            <AnimatedWord text={HERO_CONTENT.titleHighlight} delay={0.75} />
          </div>
        </h1>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-6 sm:mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
          className="font-sans text-sm sm:text-base md:text-lg text-white/35 max-w-xl mb-10 sm:mb-12 leading-relaxed font-light"
        >
          {HERO_CONTENT.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4"
        >
          <motion.a
            href="#work"
            whileHover={mobile ? {} : { scale: 1.04, boxShadow: '0 0 50px rgba(201,168,76,0.45)' }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gold text-ink font-sans font-bold text-xs sm:text-sm tracking-widest uppercase rounded-sm transition-all duration-300"
          >
            {HERO_CONTENT.ctaPrimary}
            <ChevronRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={mobile ? {} : { scale: 1.04, borderColor: 'rgba(201,168,76,0.6)', backgroundColor: 'rgba(201,168,76,0.06)' }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-gold/25 text-white font-sans font-medium text-xs sm:text-sm tracking-widest uppercase rounded-sm transition-all duration-300"
          >
            {HERO_CONTENT.ctaSecondary}
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-14 sm:mt-20 flex flex-wrap items-center gap-6 sm:gap-10 md:gap-14"
        >
          {[['150+', 'Projects'], ['50+', 'Clients'], ['12', 'Countries'], ['24h', 'Response']].map(([val, lbl], i) => (
            <motion.div
              key={lbl}
              className="text-center group min-w-[55px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
            >
              <div className="font-sans text-xl sm:text-2xl font-extrabold text-shimmer">{val}</div>
              <div className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-white/25 mt-0.5">{lbl}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 sm:h-14 bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gold"
            style={{ height: '40%' }}
            animate={{ y: ['0%', '170%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-white/20">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
