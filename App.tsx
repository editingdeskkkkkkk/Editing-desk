import React, { useEffect, useRef, useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { ReactLenis } from '@studio-freight/react-lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AntiScamToast from './components/AntiScamToast';

// ALL below-fold sections are lazy-loaded — only bundled/rendered when needed
import Background from './components/Background';
const CustomCursor  = React.lazy(() => import('./components/CustomCursor'));
const PageIndicator = React.lazy(() => import('./components/PageIndicator'));
const Services  = React.lazy(() => import('./components/Services'));
const Portfolio = React.lazy(() => import('./components/Portfolio'));
const Team      = React.lazy(() => import('./components/Team'));
const Reviews   = React.lazy(() => import('./components/Reviews'));
const About     = React.lazy(() => import('./components/About'));
const Contact   = React.lazy(() => import('./components/Contact'));
const Footer    = React.lazy(() => import('./components/Footer'));

// Reveals a section only once it's near the viewport
const LazySection: React.FC<{ children: React.ReactNode; id?: string; fallback?: React.ReactNode }> = ({ children, id, fallback }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }   // start loading 200px before entering view
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} id={id}>
      {visible
        ? <React.Suspense fallback={fallback ?? <div style={{ minHeight: '4rem' }} />}>{children}</React.Suspense>
        : (fallback ?? <div style={{ minHeight: '4rem' }} />)
      }
    </div>
  );
};

const App: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 768 || navigator.maxTouchPoints > 0);
    };
    check();
    setMounted(true);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 's')
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Lenis options:
  // — Desktop: smooth wheel scrolling with lerp
  // — Mobile:  native scroll (smoothWheel off, low multipliers) to avoid jank
  const lenisOptions = isMobile
    ? {
        smoothWheel: false,
        touchMultiplier: 1.0,
        duration: 0,
      }
    : {
        lerp: 0.1,
        duration: 0.65,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 1.0,
      };

  return (
    <ErrorBoundary>
      <ReactLenis root options={lenisOptions}>
        <div className="min-h-screen flex flex-col select-none relative">

          {/* Custom cursor — desktop only */}
          {mounted && !isMobile && (
            <React.Suspense fallback={null}>
              <CustomCursor />
            </React.Suspense>
          )}

          {/* Page nav dots — desktop only */}
          {!isMobile && (
            <React.Suspense fallback={null}>
              <PageIndicator />
            </React.Suspense>
          )}

          <Background />

          <Navbar />

          <main className="flex-grow z-10 relative">
            {/* Hero loads immediately */}
            <Hero />

            {/* Everything below only mounts when scrolled near */}
            <LazySection>
              <Services />
            </LazySection>

            <LazySection>
              <Portfolio />
            </LazySection>

            <LazySection>
              <Team />
            </LazySection>

            <LazySection>
              <Reviews />
            </LazySection>

            <LazySection>
              <About />
            </LazySection>

            <LazySection>
              <Contact />
            </LazySection>
          </main>

          <LazySection>
            <Footer />
          </LazySection>

          <AntiScamToast />
        </div>
      </ReactLenis>
    </ErrorBoundary>
  );
};

export default App;

