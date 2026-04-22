import React, { useEffect } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { ReactLenis } from '@studio-freight/react-lenis';

import CustomCursor from './components/CustomCursor';
import PageIndicator from './components/PageIndicator';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Reviews from './components/Reviews';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AntiScamToast from './components/AntiScamToast';

const Background3D = React.lazy(() => import('./components/Background3D'));

const App: React.FC = () => {
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 's')) {
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

  return (
    <ErrorBoundary>
      <ReactLenis root options={{ lerp: 0.1, duration: 0.6, smoothWheel: true, wheelMultiplier: 1.4, touchMultiplier: 2.0 }}>
        <div className="min-h-screen flex flex-col select-none relative">
          <CustomCursor />
          <PageIndicator />
          <React.Suspense fallback={<div className="fixed inset-0 z-[-1] bg-ink pointer-events-none" />}>
            <Background3D />
          </React.Suspense>
          <Navbar />
          <main className="flex-grow z-10 relative">
            <Hero />
            <Services />
            <Portfolio />
            <Team />
            <Reviews />
            <About />
            <Contact />
          </main>
          <div className="z-10 relative">
            <Footer />
          </div>
          <AntiScamToast />
        </div>
      </ReactLenis>
    </ErrorBoundary>
  );
};

export default App;
