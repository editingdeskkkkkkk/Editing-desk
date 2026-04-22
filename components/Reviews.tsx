import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Sarah Mitchell',
    role: 'Marketing Director',
    company: 'TechFlow Digital',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: "Editing Desk delivered beyond what I thought was possible in our timeline. Our brand video now gets consistent compliments from partners and investors. The color grading alone elevated the entire piece.",
    project: 'Brand Film',
    flag: '🇺🇸',
  },
  {
    name: 'Ahmed Al-Rashidi',
    role: 'Founder & CEO',
    company: 'Visionary Co.',
    avatar: 'https://i.pravatar.cc/150?img=68',
    rating: 5,
    text: "We had rough footage and a tight deadline. They turned it into a commercial that aired regionally and drove a 40% spike in inquiries. Professional, fast, and genuinely creative.",
    project: 'TV Commercial',
    flag: '🇦🇪',
  },
  {
    name: 'Emma Clarke',
    role: 'Content Creator',
    company: '2.1M Subscribers',
    avatar: 'https://i.pravatar.cc/150?img=9',
    rating: 5,
    text: "My YouTube retention went from 38% to 61% after switching to Editing Desk. They understand pacing, hooks, and storytelling in a way most editors just don't. Honestly changed my channel.",
    project: 'YouTube Production',
    flag: '🇬🇧',
  },
  {
    name: 'Marcus Thompson',
    role: 'Creative Lead',
    company: 'Apex Branding Group',
    avatar: 'https://i.pravatar.cc/150?img=51',
    rating: 5,
    text: "The animated logo package they delivered is stunning. Frame-perfect, smooth, and exactly on-brand. Every client we've shown it to asks who made it. We keep saying it's our secret weapon.",
    project: 'Animated Logo',
    flag: '🇨🇦',
  },
  {
    name: 'Priya Sharma',
    role: 'Brand Manager',
    company: 'Luxe Lifestyle Co.',
    avatar: 'https://i.pravatar.cc/150?img=44',
    rating: 5,
    text: "From concept to delivery in under a week. The Reels they produced for our launch campaign hit 800K views organically. Their short-form content instincts are razor sharp.",
    project: 'Social Media Campaign',
    flag: '🇮🇳',
  },
  {
    name: 'James Whitfield',
    role: 'Wedding Videographer',
    company: 'Whitfield Films',
    avatar: 'https://i.pravatar.cc/150?img=53',
    rating: 5,
    text: "I outsource all my wedding film edits to Editing Desk now. Consistent quality, incredible attention to emotional pacing, and they always nail the music sync. My couples love the results.",
    project: 'Wedding Films',
    flag: '🇦🇺',
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star
        key={i}
        size={12}
        className={i <= rating ? 'text-gold fill-gold' : 'text-white/15'}
        fill={i <= rating ? '#C9A84C' : 'none'}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, index }: { review: typeof REVIEWS[0]; index: number }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative bg-ink-2 border border-white/5 rounded-sm p-6 flex flex-col gap-4 group cursor-default card-hover"
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{ background: hovered ? 'linear-gradient(90deg, transparent, #C9A84C, transparent)' : 'linear-gradient(90deg, transparent, rgba(201,168,76,0), transparent)' }}
        transition={{ duration: 0.4 }}
      />

      {/* Quote icon */}
      <div className="absolute top-5 right-5 text-gold/8 group-hover:text-gold/15 transition-colors duration-500">
        <Quote size={48} strokeWidth={1} />
      </div>

      {/* Rating + project tag */}
      <div className="flex items-center justify-between">
        <StarRating rating={review.rating} />
        <span className="text-[9px] font-sans font-semibold tracking-[0.2em] uppercase text-gold/50 bg-gold/8 px-2 py-1 rounded-sm border border-gold/10">
          {review.project}
        </span>
      </div>

      {/* Review text */}
      <p className="font-sans text-sm text-white/50 leading-relaxed flex-grow group-hover:text-white/65 transition-colors duration-300">
        "{review.text}"
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/5 group-hover:bg-gold/10 transition-colors duration-300" />

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-gold/30 transition-colors duration-300 pointer-events-none"
          />
          <span className="absolute -bottom-0.5 -right-0.5 text-[10px] leading-none">{review.flag}</span>
        </div>
        <div>
          <p className="font-sans text-sm font-semibold text-white/80">{review.name}</p>
          <p className="font-sans text-[11px] text-white/35">
            {review.role}  <span className="text-gold/60">{review.company}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Auto-scrolling stat bar
const StatBar = () => {
  const stats = ["150+ Projects Delivered", '4.7 Average Rating', '50+ Happy Clients', '12 Countries Served', '100% On-Time Delivery', '24h Support Response'];
  return (
    <div className="relative overflow-hidden bg-gold/5 border-y border-gold/10 py-3 mb-16">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
            <span className="font-sans text-xs font-semibold uppercase tracking-widest text-gold/60">{stat}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Reviews: React.FC = () => {
  const avgRating = '4.7';

  return (
    <section id="reviews" className="py-28 min-h-screen snap-start flex flex-col justify-center bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute inset-0 dot-grid opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-gold/60" />
                <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/70">Client Stories</span>
              </div>
              <h2 className="font-sans text-4xl md:text-6xl font-bold text-white leading-tight">
                What Clients <span className="text-shimmer">Say</span>
              </h2>
              <p className="font-sans text-white/40 max-w-md mt-4 text-sm leading-relaxed">
                Real feedback from real brands. We let our work  and our clients  speak for us.
              </p>
            </div>

            {/* Overall rating block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-shrink-0 bg-ink-2 border border-gold/15 rounded-sm px-8 py-5 text-center"
            >
              <div className="font-sans text-5xl font-bold text-shimmer mb-1">{avgRating}</div>
              <div className="flex justify-center gap-0.5 mb-1">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} className="text-gold fill-gold" fill="#C9A84C" />)}
              </div>
              <p className="font-sans text-[11px] text-white/30 uppercase tracking-widest">
                25 Verified Reviews
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Scrolling stats bar */}
        <StatBar />

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, index) => (
            <ReviewCard key={review.name} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
