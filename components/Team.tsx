import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Instagram, Linkedin } from 'lucide-react';

const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || navigator.maxTouchPoints > 0);

const TEAM = [
  {
    name: 'Oron Besin',
    role: 'Founder & Executive Editor',
    specialty: 'Creative Vision',
    bio: 'The mind behind Editing Desk. Oron leads every major production with an obsessive eye for detail  from story structure to the final color pass. A decade of high-end editorial work shaped into one agency.',
    avatar: 'https://imglink.cc/cdn/NmF-oDpsb1.png',
    socials: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'Camila Adam',
    role: 'Creative Director',
    specialty: 'Direction & Strategy',
    bio: 'Camila shapes the creative direction of every campaign. From concept through execution, she ensures every frame serves the brand story  with the precision of a seasoned director.',
    avatar: 'https://imglink.cc/cdn/QgANFjG8gk.png',
    socials: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'Camila Adam',
    role: 'Head of Design & Post Production',
    specialty: 'Design & Editing',
    bio: 'Dual force on the floor  leading both graphic design and video editing operations. From brand identity systems to complex multi-layer edits, she keeps the creative floor running at its peak.',
    avatar: 'https://imglink.cc/cdn/pQIF4K5glt.png',
    socials: { instagram: '#', linkedin: '#' },
  },
  {
    name: 'Burhan Sheikh',
    role: 'Head of Client Relations & Project Operations',
    specialty: 'Client Success',
    bio: 'Burhan is the bridge between our clients and the creative team. He manages every project pipeline, ensures timelines are met, and makes certain every client feels heard, valued, and delivered for.',
    avatar: 'https://imglink.cc/cdn/bW3zewY38u.png',
    socials: { instagram: '#', linkedin: '#' },
  },
];

const TiltCard = ({ member, index }: { member: typeof TEAM[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const resetTilt = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={isMobile ? {} : { perspective: 1000 }}
    >
      <motion.div
        style={isMobile ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={isMobile ? undefined : handleMouse}
        onMouseEnter={isMobile ? undefined : () => setHovered(true)}
        onMouseLeave={isMobile ? undefined : resetTilt}
        className="relative bg-ink-2 border border-white/5 rounded-sm overflow-hidden group cursor-default"
      >
        {/* Gold top border on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-10"
          animate={{ background: hovered ? 'linear-gradient(90deg, transparent, #C9A84C, transparent)' : 'linear-gradient(90deg, transparent, transparent, transparent)' }}
          transition={{ duration: 0.4 }}
        />

        {/* Avatar area */}
        <div className="relative h-64 overflow-hidden bg-ink-3">
          <motion.img
            src={member.avatar}
            alt={member.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover pointer-events-none"
            animate={{ scale: hovered ? 1.05 : 1, filter: hovered ? 'brightness(0.7)' : 'brightness(0.6) saturate(0.8)' }}
            transition={{ duration: 0.4 }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink-2 via-ink-2/30 to-transparent" />

          {/* Specialty badge - floats up on hover */}
          <motion.div
            className="absolute bottom-4 left-4 z-10"
            animate={{ y: hovered ? -4 : 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block px-3 py-1 bg-gold/15 border border-gold/30 text-gold text-[10px] font-semibold tracking-widest uppercase rounded-sm backdrop-blur-sm">
              {member.specialty}
            </span>
          </motion.div>

          {/* Social icons  slide in on hover */}
          <motion.div
            className="absolute top-4 right-4 flex flex-col gap-2 z-10"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 10 }}
            transition={{ duration: 0.3 }}
          >
            {member.socials.instagram && (
              <a href={member.socials.instagram} className="w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-colors">
                <Instagram size={13} />
              </a>
            )}
            {member.socials.linkedin && (
              <a href={member.socials.linkedin} className="w-8 h-8 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-colors">
                <Linkedin size={13} />
              </a>
            )}
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="font-sans font-bold text-white text-lg mb-0.5 group-hover:text-gold transition-colors duration-300">
            {member.name}
          </h3>
          <p className="font-sans text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
            {member.role}
          </p>
          <p className="font-sans text-sm text-white/35 leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-gold/0 group-hover:border-gold/25 transition-all duration-500 rounded-tl-sm" />
      </motion.div>
    </motion.div>
  );
};

const Team: React.FC = () => {
  return (
    <section id="team" className="py-20 flex flex-col justify-center bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-25" />

      {/* Floating 3D shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-gold/5 rounded-sm pointer-events-none" style={{ transform: 'rotate(20deg)' }} />
      <div className="absolute bottom-20 left-10 w-20 h-20 border border-gold/5 rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-gold/60" />
            <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/70">The People</span>
          </div>
          <h2 className="font-sans text-4xl md:text-6xl font-bold text-white leading-tight">
            Meet Our <span className="text-shimmer">Team</span>
          </h2>
          <p className="font-sans text-white/40 max-w-xl mt-4 text-sm leading-relaxed">
            A tight-knit crew of creatives, editors, and strategists united by one obsession  making brands impossible to ignore.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TEAM.map((member, index) => (
            <TiltCard key={member.name} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
