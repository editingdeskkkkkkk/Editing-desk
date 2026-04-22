import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useTexture, MeshTransmissionMaterial, Stars, Sparkles } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Sparkles as LucideSparkles } from 'lucide-react';
import { HERO_CONTENT } from '../constants';
import * as THREE from 'three';

// ── INLINE 3D HERO BLACK HOLE ───────────────────────────────────────────────
const BlackHoleScene = () => {
  const accretionRef = useRef<THREE.Group>(null);
  const coreGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x * 0.5;
    const py = state.pointer.y * 0.5;

    if (accretionRef.current) {
      accretionRef.current.rotation.z = t * 0.3;
      accretionRef.current.rotation.x = 1.3 + py * 0.3;
      accretionRef.current.rotation.y = px * 0.3;
    }
    
    if (coreGroupRef.current) {
      coreGroupRef.current.position.x = px * 0.2;
      coreGroupRef.current.position.y = py * 0.2;
    }
  });

  return (
    <group>
      {/* Deep Space Background Stars - Optimized count */}
      <Stars radius={100} depth={50} count={800} factor={4} saturation={0.5} fade speed={1} />
      
      {/* The Black Hole System */}
      <group ref={coreGroupRef}>
        
        {/* The Event Horizon (Solid Pitch Black) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Photon Sphere / Event Horizon Glow */}
        <mesh position={[0, 0, -0.1]}>
          <sphereGeometry args={[1.7, 32, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh position={[0, 0, -0.2]}>
          <sphereGeometry args={[1.9, 32, 32]} />
          <meshBasicMaterial color="#ffeebb" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* Accretion Disk - Realistic Gold/White hue */}
        <group ref={accretionRef}>
          {/* Inner SUPERHEATED ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.8, 2.5, 64]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          
          {/* Mid Fiery Disk */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.5, 4.0, 64]} />
            <meshBasicMaterial color="#ffddaa" side={THREE.DoubleSide} transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          
          {/* Outer Cooler Dust Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[4.0, 6.0, 64]} />
            <meshBasicMaterial color="#c9a84c" side={THREE.DoubleSide} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>

          {/* Swirling glowing matter (Sparkles) - Optimized count */}
          <Sparkles count={200} scale={12} size={2.5} speed={0.8} opacity={0.8} color="#ffeebb" />
        </group>

      </group>
    </group>
  );
};

// ── LETTER-BY-LETTER REVEAL ──────────────────────────────────────────────────
const AnimatedWord = ({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -60 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * 0.025,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: 'inline-block', transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00a0' : char}
        </motion.span>
      ))}
    </span>
  );
};

// ── HERO COMPONENT ───────────────────────────────────────────────────────────
const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, 180]);
  const y2 = useTransform(scrollY, [0, 600], [0, -120]);
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);
  const scaleDown = useTransform(scrollY, [0, 400], [1, 0.9]);

  return (
    <section id="home" className="relative min-h-screen snap-start flex items-center justify-center overflow-hidden bg-transparent">

      {/* ── BACKGROUND LAYERS ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

        {/* Perspective grid */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.05]">
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

        {/* Gold orbs */}
        <motion.div style={{ y: y1 }} className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none" />
        <motion.div
          style={{ y: y1, background: 'radial-gradient(circle, rgba(201,168,76,0.08), transparent 60%)' }}
          className="absolute top-[-15%] right-[-10%] w-[700px] h-[700px] rounded-full pointer-events-none"
        />
        <motion.div
          style={{ y: y2, background: 'radial-gradient(circle, rgba(201,168,76,0.05), transparent 65%)' }}
          className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        />

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 4px)',
          backgroundSize: '100% 4px',
        }} />
      </div>

      {/* ── 3D HERO BLACK HOLE - FULL BACKGROUND ── */}
      <motion.div
        className="absolute inset-0 w-full h-full z-5 pointer-events-none"
        style={{ opacity, scale: scaleDown }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <Canvas
          camera={{ position: [0, 0, 12], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <BlackHoleScene />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* ── MAIN CONTENT ── */}
      <motion.div style={{ opacity, scale: scaleDown }} className="container mx-auto px-6 relative z-10 max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 bg-gold/8 border border-gold/20 rounded-full backdrop-blur-sm"
        >
          <LucideSparkles size={12} className="text-gold" />
          <span className="text-xs font-sans font-semibold tracking-[0.25em] uppercase text-gold/80">
            {HERO_CONTENT.badge}
          </span>
          <LucideSparkles size={12} className="text-gold" />
        </motion.div>

        {/* Headline — letter reveal */}
        <h1 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.0] mb-6 tracking-tight" style={{ perspective: '600px' }}>
          <div className="block text-white">
            <AnimatedWord text={HERO_CONTENT.titleLine1} delay={0.3} />
          </div>
          <div className="block text-white/50 font-light text-4xl md:text-5xl lg:text-6xl mt-3 mb-3">
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
          className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mb-8"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: 'easeOut' }}
          className="font-sans text-base md:text-lg text-white/35 max-w-2xl mb-12 leading-relaxed font-light"
        >
          {HERO_CONTENT.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <motion.a
            href="#work"
            whileHover={{ scale: 1.04, boxShadow: '0 0 50px rgba(201,168,76,0.45)' }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-3 px-8 py-4 bg-gold text-ink font-sans font-bold text-sm tracking-widest uppercase rounded-sm transition-all duration-300"
          >
            {HERO_CONTENT.ctaPrimary}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, borderColor: 'rgba(201,168,76,0.6)', backgroundColor: 'rgba(201,168,76,0.06)' }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-3 px-8 py-4 bg-transparent border border-gold/25 text-white font-sans font-medium text-sm tracking-widest uppercase rounded-sm transition-all duration-300"
          >
            {HERO_CONTENT.ctaSecondary}
          </motion.a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20 flex flex-wrap items-center gap-8 md:gap-14"
        >
          {[['150+', 'Projects'], ['50+', 'Clients'], ['12', 'Countries'], ['24h', 'Response']].map(([val, lbl], i) => (
            <motion.div
              key={lbl}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.1, duration: 0.6 }}
            >
              <div className="font-sans text-2xl font-extrabold text-shimmer">{val}</div>
              <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/25 mt-0.5">{lbl}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-14 bg-gradient-to-b from-gold/0 via-gold/40 to-gold/0 relative overflow-hidden">
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
