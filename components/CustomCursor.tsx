import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map instantly without spring to completely remove physics lag
  const cursorX = mouseX;
  const cursorY = mouseY;
  
  const dotOffsetX = useTransform(mouseX, (val) => val + 13);
  const dotOffsetY = useTransform(mouseY, (val) => val + 13);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-interactive') ||
        target.closest('.cursor-interactive')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          border: '1.5px solid #C9A84C',
          backgroundColor: hovered ? '#C9A84C' : 'transparent',
          boxShadow: hovered ? '0 0 20px rgba(201,168,76,0.6)' : '0 0 10px rgba(201,168,76,0.2)',
        }}
        animate={{
          scale: clicked ? 0.8 : hovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      {/* Tiny center dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold rounded-full pointer-events-none z-[9999]"
        style={{
          x: dotOffsetX,
          y: dotOffsetY,
        }}
      />
    </>
  );
};

export default CustomCursor;
