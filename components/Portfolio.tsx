import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Lock, Eye, ThumbsUp, Youtube, RefreshCw, AlertCircle } from 'lucide-react';
import { useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useYouTubeVideos, YouTubeVideo } from '../hooks/useYouTubeVideos';

const isMobile = typeof window !== 'undefined' && (window.innerWidth <= 768 || navigator.maxTouchPoints > 0);

// ── Unified item type that works for both static + YouTube items ─────────────
interface PortfolioItem {
  videoId?: string;
  videoUrl: string;
  title?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  category: string;
  featured?: boolean;
  allowed?: boolean;
}

// ── Logo Fallback Thumbnail ──────────────────────────────────────────────────
const LogoThumbnail = ({ isHovered = false }: { isHovered?: boolean }) => (
  <div className="w-full h-full bg-ink-2 flex flex-col items-center justify-center p-8 select-none overflow-hidden relative">
    <div
      className="absolute inset-0 opacity-10 transition-transform duration-500"
      style={{
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
      }}
    />
    <div className="flex text-3xl font-sans font-bold tracking-tighter leading-none relative">
      <span className="text-white">EDITING</span>
      <span className="text-shimmer">DESK</span>
    </div>
    <span className="text-xs uppercase tracking-[0.2em] text-white/30 font-sans mt-2">Craft  Create  Captivate</span>
  </div>
);

// ── Skeleton Loading Card ────────────────────────────────────────────────────
const SkeletonCard = ({ index }: { index: number }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: index * 0.05 }}
    className="rounded-sm bg-ink-2 border border-white/5 overflow-hidden"
  >
    <div className="aspect-video w-full bg-ink-3 animate-pulse relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
    <div className="p-5 space-y-3">
      <div className="h-2 w-16 bg-white/8 rounded-full animate-pulse" />
      <div className="h-4 w-3/4 bg-white/5 rounded-full animate-pulse" />
    </div>
  </motion.div>
);

// ── Holographic Portfolio Card ───────────────────────────────────────────────
const PortfolioCard = ({ item, index, setSelectedItem, hoveredId, setHoveredId }: {
  item: PortfolioItem;
  index: number;
  setSelectedItem: (item: PortfolioItem) => void;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const thumb = item.thumbnail || item.image;
  const isHovered = hoveredId === index;

  return (
    <motion.div
      layout
      className="group relative rounded-sm cursor-interactive bg-ink-2 border border-white/5 overflow-hidden cursor-pointer"
      onClick={() => setSelectedItem(item)}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={() => { if (!isMobile) { x.set(0); y.set(0); } setHoveredId(null); }}
      onMouseEnter={() => setHoveredId(index)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      {/* Thumbnail */}
      <div className="aspect-video w-full relative overflow-hidden bg-ink-3">
        {thumb ? (
          <motion.img
            src={thumb}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover pointer-events-none"
            animate={isHovered ? { scale: 1.06, opacity: 0.6 } : { scale: 1, opacity: 0.85 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <LogoThumbnail isHovered={isHovered} />
        )}

        {/* Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />

        {/* Play button */}
        <motion.div className="absolute inset-0 flex items-center justify-center z-10" animate={isHovered ? { opacity: 1 } : { opacity: 0 }}>
          <div className="w-14 h-14 bg-gold rounded-full flex items-center justify-center glow-gold pointer-events-none">
            <Play fill="currentColor" size={20} className="text-ink ml-0.5" />
          </div>
        </motion.div>

      </div>

      {/* Info */}
      <div className="p-5 relative z-20 pointer-events-none" style={{ transform: "translateZ(20px)" }}>
        <p className="text-[10px] font-sans font-semibold text-gold/70 uppercase tracking-[0.2em] mb-2">
          {item.category}
        </p>
        <h3 className="font-sans text-base font-semibold text-white/85 group-hover:text-white transition-colors duration-300 leading-tight line-clamp-2">
          {item.title || 'Loading...'}
        </h3>
        {item.likeCount && item.likeCount > 0 ? (
          <div className="mt-2 flex items-center gap-1 text-white/25 text-[10px] font-sans">
            <ThumbsUp size={9} />
            {item.likeCount >= 1000 ? `${(item.likeCount / 1000).toFixed(1)}K` : item.likeCount}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

// ── YouTube Status Banner ─────────────────────────────────────────────────────
const YouTubeBanner = ({ isConfigured, loading, error, videoCount, onRetry }: {
  isConfigured: boolean;
  loading: boolean;
  error: string | null;
  videoCount: number;
  onRetry?: () => void;
}) => {
  if (isConfigured && !loading && !error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-2 px-4 py-2.5 bg-green-500/8 border border-green-500/20 rounded-sm w-fit"
      >
        <Youtube size={13} className="text-green-400" />
        <span className="text-xs font-sans text-green-400/80 tracking-wide">
          Auto-synced {videoCount} videos from YouTube channel
        </span>
      </motion.div>
    );
  }

  if (!isConfigured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-start gap-3 px-4 py-3 bg-gold/5 border border-gold/20 rounded-sm max-w-xl"
      >
        <AlertCircle size={14} className="text-gold/70 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-sans font-semibold text-gold/80 mb-1">YouTube Auto-Sync Ready</p>
          <p className="text-[11px] font-sans text-white/35 leading-relaxed">
            Edit <code className="text-gold/60 bg-white/5 px-1 py-0.5 rounded text-[10px]">youtube.config.ts</code> and add your Channel ID + API key to automatically pull all your videos.
          </p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-start gap-3 px-4 py-3 bg-red-500/8 border border-red-500/20 rounded-sm max-w-2xl"
      >
        <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
        <div className="flex-1">
          <p className="text-xs font-sans font-semibold text-red-400 mb-1">YouTube Sync Error</p>
          <p className="text-[11px] font-sans text-white/40 leading-relaxed">{error}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-sans font-semibold tracking-widest uppercase border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all rounded-sm shrink-0 cursor-interactive"
          >
            <RefreshCw size={10} /> Retry
          </button>
        )}
      </motion.div>
    );
  }

  return null;
};

// ── Main Portfolio Component ──────────────────────────────────────────────────
const Portfolio: React.FC = () => {
  const { videos: ytVideos, loading: ytLoading, error: ytError, isConfigured, retry } = useYouTubeVideos();

  // Static fallback items (your existing hardcoded portfolio)
  const [staticItems, setStaticItems] = useState(PORTFOLIO_ITEMS);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('Selected Works');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const MotionButton = motion.button as any;

  // Hydrate static items with thumbnails
  const getYouTubeId = (url: string) => {
    if (!url) return null;
    if (url.includes('youtu.be/')) return url.split('youtu.be/')[1];
    if (url.includes('shorts/')) return url.split('shorts/')[1]?.split('?')[0];
    if (url.includes('v=')) return url.split('v=')[1].split('&')[0];
    return null;
  };

  useEffect(() => {
    const hydrate = async () => {
      const updated = await Promise.all(
        staticItems.map(async (item) => {
          const videoId = getYouTubeId(item.videoUrl);
          if (!videoId) return item;
          const image = item.image || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
          let title = item.title;
          if (!title) {
            try {
              const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
              const data = await res.json();
              title = data.title || 'Untitled Project';
            } catch { title = 'Untitled Project'; }
          }
          return { ...item, title, image };
        })
      );
      setStaticItems(updated as any);
    };
    if (!isConfigured) hydrate();
  }, [isConfigured]);

  // Decide which items to show
  const processTitle = (title: string | undefined) => {
    if (!title) return title;
    const lower = title.toLowerCase();
    if (lower.includes("entertainmet content") || lower.includes("entertainment content")) {
      return 'Entertainment Content Research & Video Editing';
    }
    if (lower.includes("high retention educational")) {
      return 'High Retention Educational Content Edit "ASCII Art"';
    }
    return title;
  };

  const allItems: PortfolioItem[] = isConfigured
    ? ytVideos.map((v: YouTubeVideo) => ({
        videoId: v.videoId,
        videoUrl: v.videoUrl,
        title: processTitle(v.title),
        description: v.description,
        image: v.thumbnail,
        thumbnail: v.thumbnail,
        category: v.category,
        featured: v.featured,
        allowed: v.allowed,
      }))
    : staticItems.map(item => ({
        ...item,
        title: processTitle(item.title),
        image: item.image,
        thumbnail: item.image,
      }));

  const uniqueCategories = Array.from(new Set(allItems.filter(i => i.allowed !== false).map(i => i.category)));
  const categories = ['Selected Works', 'All', ...uniqueCategories];
  
  let filteredItems = allItems.filter(item => item.allowed !== false);
  
  if (activeCategory === 'Selected Works') {
    const manualVideo1: PortfolioItem = allItems.find(i => i.videoId === '4r0soC9m7zw' || i.videoUrl.includes('4r0soC9m7zw')) || {
      videoId: '4r0soC9m7zw',
      videoUrl: 'https://www.youtube.com/shorts/4r0soC9m7zw',
      title: 'SEF spark student event highlight',
      category: 'Short-Form Reels',
      image: `https://img.youtube.com/vi/4r0soC9m7zw/maxresdefault.jpg`,
      thumbnail: `https://img.youtube.com/vi/4r0soC9m7zw/maxresdefault.jpg`
    };
    
    const manualVideo2: PortfolioItem = allItems.find(i => i.videoId === 'eR2RpWOkEpU' || i.videoUrl.includes('eR2RpWOkEpU')) || {
      videoId: 'eR2RpWOkEpU',
      videoUrl: 'https://www.youtube.com/watch?v=eR2RpWOkEpU',
      title: 'pengu promotion 3d animtion',
      category: 'Animation',
      image: `https://img.youtube.com/vi/eR2RpWOkEpU/maxresdefault.jpg`,
      thumbnail: `https://img.youtube.com/vi/eR2RpWOkEpU/maxresdefault.jpg`
    };

    let selected = filteredItems.filter(item => {
      const lower = item.title?.toLowerCase() || '';
      // Exclude the old ones from Selected items
      if (lower.includes('entertainment content research')) return false;
      if (lower.includes('high retention educational')) return false;
      // Exclude the new ones from the remaining pool so we don't duplicate them
      if (item.videoId === '4r0soC9m7zw' || item.videoUrl.includes('4r0soC9m7zw')) return false;
      if (item.videoId === 'eR2RpWOkEpU' || item.videoUrl.includes('eR2RpWOkEpU')) return false;
      return true;
    });

    filteredItems = [manualVideo1, manualVideo2, ...selected.slice(0, 4)];
  } else if (activeCategory !== 'All') {
    filteredItems = filteredItems.filter(item => item.category === activeCategory);
  }

  useEffect(() => {
    if (selectedItem) { document.body.style.overflow = 'hidden'; setIsPlaying(false); }
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedItem]);

  const getEmbedUrl = (url: string) => {
    if (url?.includes('youtube') || url?.includes('youtu.be')) {
      const id = getYouTubeId(url);
      // disablekb=1 disables keyboard shortcuts (prevents Ctrl+U etc)
      // rel=0 hides related videos from other channels
      // modestbranding=1 hides YouTube logo
      // iv_load_policy=3 hides annotations
      // cc_load_policy=0 hides captions
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&fs=0&playsinline=1`;
    }
    if (url?.includes('drive.google.com')) return url.replace(/\/view.*/, '/preview');
    return url;
  };

  return (
    <section id="work" className="py-20 flex flex-col justify-center bg-transparent relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gold/60" />
              <span className="text-xs font-sans font-semibold tracking-[0.3em] uppercase text-gold/70 flex items-center gap-1.5">
                {isConfigured
                  ? <><Youtube size={11} className="text-gold/70" /> Auto-Synced from YouTube</>
                  : 'Portfolio'}
              </span>
            </div>
            <h2 className="font-sans text-4xl md:text-6xl font-bold text-white">
              Selected <span className="text-shimmer">Works</span>
            </h2>
            <p className="font-sans text-white/40 max-w-md mt-4 text-sm leading-relaxed">
              {isConfigured
                ? 'Every video auto-pulled from YouTube — sorted by views, categorised by content type.'
                : 'A curated selection of our finest video production, branding, and creative projects.'}
            </p>
          </div>
          <a href="#contact" className="hidden md:flex items-center gap-2 text-gold font-sans text-sm font-medium hover:gap-3 transition-all duration-300 cursor-interactive">
            Start a Project <span className="text-gold">→</span>
          </a>
        </motion.div>

        {/* YouTube status banner */}
        <YouTubeBanner
          isConfigured={isConfigured}
          loading={ytLoading}
          error={ytError}
          videoCount={ytVideos.length}
        />

        {/* Loading indicator when API is fetching */}
        {ytLoading && isConfigured && (
          <div className="flex items-center gap-3 mb-10 text-white/30 text-sm font-sans">
            <RefreshCw size={14} className="animate-spin text-gold/50" />
            Fetching your YouTube channel...
          </div>
        )}

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <MotionButton
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-xs font-sans font-medium tracking-widest uppercase transition-all duration-300 border rounded-sm relative overflow-hidden cursor-interactive ${
                activeCategory === cat
                  ? 'text-ink border-gold'
                  : 'text-white/40 border-white/10 hover:border-gold/30 hover:text-white/60'
              }`}
              whileTap={{ scale: 0.97 }}
            >
              {activeCategory === cat && (
                <motion.div layoutId="activeCat" className="absolute inset-0 bg-gold" initial={false} transition={{ type: 'spring', stiffness: 300, damping: 30 }} />
              )}
              <span className="relative z-10">{cat}</span>
            </MotionButton>
          ))}
        </div>

        {/* Grid — skeletons while loading */}
        {ytLoading && isConfigured ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} index={i} />)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <PortfolioCard
                  key={item.videoId || item.videoUrl || index}
                  item={item}
                  index={index}
                  setSelectedItem={setSelectedItem}
                  hoveredId={hoveredId}
                  setHoveredId={setHoveredId}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!ytLoading && filteredItems.length === 0 && (
          <div className="text-center py-16 text-white/25 font-sans text-sm">No projects found in this category.</div>
        )}
      </div>

      {/* ── VIDEO MODAL ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-ink-2 border border-gold/15 rounded-sm overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.97 }}
              transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/40 z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/40 z-20 pointer-events-none" />

              <div
                className="relative aspect-video bg-black shrink-0"
                onContextMenu={(e) => e.preventDefault()}
              >
                {isPlaying ? (
                  <div className="relative w-full h-full">
                    <iframe
                      src={getEmbedUrl(selectedItem.videoUrl)}
                      title="Project Showcase"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                      sandbox="allow-scripts allow-same-origin allow-presentation"
                    />
                    {/*
                      ── PROTECTION OVERLAY ──────────────────────────────────
                      This transparent div sits on top of the iframe's title bar
                      area (top ~50px) where YouTube shows the clickable video
                      title and channel name. Blocking pointer events on that
                      zone prevents clicking through to YouTube.
                      The bottom controls area is left clear so Play/Pause still work.
                    */}
                    <div
                      className="absolute top-0 left-0 right-0 z-10"
                      style={{ height: '52px', cursor: 'default' }}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {/* Block the bottom-right YouTube logo/watch-on-youtube link */}
                    <div
                      className="absolute bottom-0 right-0 z-10 bg-transparent"
                      style={{ width: '180px', height: '40px', cursor: 'default' }}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                  </div>
                ) : (
                  <>
                    {(selectedItem.thumbnail || selectedItem.image) ? (
                      <img
                        src={selectedItem.thumbnail || selectedItem.image}
                        alt="Project Showcase"
                        className="w-full h-full object-cover opacity-70 pointer-events-none"
                        draggable={false}
                        onContextMenu={(e) => e.preventDefault()}
                      />
                    ) : (
                      <LogoThumbnail />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="w-20 h-20 bg-gold rounded-full flex items-center justify-center glow-gold hover:scale-105 transition-transform cursor-interactive"
                      >
                        <Play size={32} fill="currentColor" className="text-ink ml-1" />
                      </button>
                    </div>
                  </>
                )}
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/80 text-white/80 hover:text-white rounded-full flex items-center justify-center transition-colors z-30 backdrop-blur-sm border border-white/10 cursor-interactive"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto" ref={modalScrollRef}>
                <div className="mb-6 pb-6 border-b border-white/5">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-gold/70 mb-2 block">{selectedItem.category}</span>
                  <h2 className="font-sans text-2xl md:text-3xl font-bold text-white">{selectedItem.title}</h2>
                  {/* Stats row */}
                  {selectedItem.likeCount ? (
                    <div className="flex items-center gap-5 mt-3">
                      <div className="flex items-center gap-1.5 text-white/35 text-xs font-sans">
                        <ThumbsUp size={11} />
                        {selectedItem.likeCount.toLocaleString()} likes
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h4 className="font-sans text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Project Overview</h4>
                    <p className="font-sans text-white/40 leading-relaxed text-sm">{selectedItem.description || 'Project details available upon request.'}</p>
                  </div>
                  <div className="bg-ink-3 border border-white/5 p-5 rounded-sm">
                    <div className="flex items-center gap-2 mb-4 text-gold/60">
                      <Lock size={12} strokeWidth={1.5} />
                      <span className="text-[10px] font-sans font-bold uppercase tracking-widest">Details</span>
                    </div>
                    <ul className="space-y-3 text-xs font-sans text-white/35">
                      <li className="flex justify-between">
                        <span>Client</span>
                        <span className="font-medium text-white/60">Confidential</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Category</span>
                        <span className="font-medium text-white/60">{selectedItem.category}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;
