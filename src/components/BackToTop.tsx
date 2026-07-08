import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  activeSection?: string;
  onReset?: () => void;
}

export default function BackToTop({ activeSection, onReset }: BackToTopProps) {
  const [internalVisible, setInternalVisible] = useState(false);

  const isVisible = activeSection ? (activeSection !== 'home') : internalVisible;

  useEffect(() => {
    if (activeSection) return;

    const toggleVisibility = () => {
      const heroElement = document.getElementById('home');
      const threshold = heroElement ? heroElement.offsetHeight : 500;
      
      if (window.scrollY > threshold - 100) {
        setInternalVisible(true);
      } else {
        setInternalVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [activeSection]);

  const scrollToTop = () => {
    if (onReset) {
      onReset();
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-[#121211] border border-mustard text-mustard cursor-pointer group flex items-center justify-center hover:bg-mustard hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-mustard/15"
          style={{ mixBlendMode: 'normal' }}
          aria-label="Back to Top"
        >
          {/* Subtle spinning accent badge circle on hover */}
          <div className="absolute inset-0 rounded-full border border-mustard/30 scale-110 group-hover:scale-125 group-hover:rotate-180 transition-all duration-500 pointer-events-none" />
          
          <ArrowUp className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
