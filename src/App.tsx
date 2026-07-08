/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ==========================================
// IMPORT DECLARATIONS & SYSTEM RESOURCES
// ==========================================
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import BackToTop from './components/BackToTop';
import Preloader from './components/Preloader';

// Array list defining all sequential content sections in this portfolio
const SECTIONS = ['home', 'about', 'skills', 'experience', 'contact'];

export default function App() {
  // ==========================================
  // APPLICATION HOOKS & COMPONENT STATES
  // ==========================================
  const [isLoading, setIsLoading] = useState(true); // Loading screen animation state
  const [activeSection, setActiveSection] = useState('home'); // Current active visual viewport/section
  const isTransitioningRef = useRef(false); // Throttle flag to prevent rapid concurrent section jumps
  const touchStartYRef = useRef(0); // Tracks initial touch point coordinates on mobile devices

  // ==========================================
  // SECTION TRANSITION THROTTLING CONTROLLER
  // ==========================================
  // Triggers smooth page transition and prevents micro-flicker or overlapping scroll calls
  const handleSectionTransition = (targetSection: string) => {
    if (isTransitioningRef.current || targetSection === activeSection) return;
    
    isTransitioningRef.current = true;
    setActiveSection(targetSection);
    
    // Cooldown matches transition animation duration
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 1000);
  };

  // ==========================================
  // SCROLL & GESTURE NAVIGATION SYSTEM
  // ==========================================
  useEffect(() => {
    if (isLoading) return;

    // Detect mouse wheel ticks to trigger transition-bound transitions
    const handleGlobalWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;

      const container = document.getElementById(`scroll-container-${activeSection}`);
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // Track scroll boundaries inside the active overflow viewport
      const isAtTop = scrollTop <= 8;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 8;

      const currentIndex = SECTIONS.indexOf(activeSection);

      // Scroll Down (deltaY > 0) -> Transition to next section if boundary reached
      if (e.deltaY > 20) {
        if (isAtBottom && currentIndex < SECTIONS.length - 1) {
          e.preventDefault();
          handleSectionTransition(SECTIONS[currentIndex + 1]);
        }
      } 
      // Scroll Up (deltaY < 0) -> Transition to previous section if boundary reached
      else if (e.deltaY < -20) {
        if (isAtTop && currentIndex > 0) {
          e.preventDefault();
          handleSectionTransition(SECTIONS[currentIndex - 1]);
        }
      }
    };

    // Detect keyboard arrows for accessible boundary navigation
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (isTransitioningRef.current) return;

      const container = document.getElementById(`scroll-container-${activeSection}`);
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      const isAtTop = scrollTop <= 8;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 8;

      const currentIndex = SECTIONS.indexOf(activeSection);

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (isAtBottom && currentIndex < SECTIONS.length - 1) {
          e.preventDefault();
          handleSectionTransition(SECTIONS[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (isAtTop && currentIndex > 0) {
          e.preventDefault();
          handleSectionTransition(SECTIONS[currentIndex - 1]);
        }
      }
    };

    // Detect touch gestures for elegant mobile swipes
    const handleGlobalTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleGlobalTouchEnd = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;

      const container = document.getElementById(`scroll-container-${activeSection}`);
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      const isAtTop = scrollTop <= 8;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 8;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndY; // positive if swipe up (scrolling down)
      const currentIndex = SECTIONS.indexOf(activeSection);

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && isAtBottom && currentIndex < SECTIONS.length - 1) {
          handleSectionTransition(SECTIONS[currentIndex + 1]);
        } else if (deltaY < 0 && isAtTop && currentIndex > 0) {
          handleSectionTransition(SECTIONS[currentIndex - 1]);
        }
      }
    };

    // Connect window-level listeners to drive seamless multi-viewport structure
    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    window.addEventListener('keydown', handleGlobalKeyDown);
    window.addEventListener('touchstart', handleGlobalTouchStart, { passive: true });
    window.addEventListener('touchend', handleGlobalTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('keydown', handleGlobalKeyDown);
      window.removeEventListener('touchstart', handleGlobalTouchStart);
      window.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isLoading, activeSection]);

  // ==========================================
  // MAIN VIEW RENDERER (JSX LAYOUT)
  // ==========================================
  return (
    <div className="bg-off-white h-screen w-screen overflow-hidden text-black antialiased relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* [1] INTIAL BRAND PRELOADER DISPLAY */
          <Preloader key="preloader" onComplete={() => setIsLoading(false)} />
        ) : (
          /* [2] MAIN PORTFOLIO DESKTOP-CENTRIC APPLICATION ENVIRONMENT */
          <motion.div
            key="portfolio-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full w-full relative flex flex-col"
          >
            {/* Custom interactive magnetic/fluid circular cursor */}
            <CustomCursor />
 
            {/* PREMIUM VISUAL ELEMENT: Horizontal global loading progress tracker bar */}
            <div className="fixed top-0 left-0 right-0 h-[3px] bg-neutral-200/40 z-50 overflow-hidden">
              <motion.div
                className="h-full bg-mustard"
                animate={{
                  width: `${((SECTIONS.indexOf(activeSection) + 1) / SECTIONS.length) * 100}%`
                }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
 
 
            {/* Quick floating "Return to Home/Top" visual helper button */}
            <BackToTop activeSection={activeSection} onReset={() => handleSectionTransition('home')} />
 
            {/* Top architectural menu container (Header passing status info) */}
            <Header activeSection={activeSection} onSectionChange={handleSectionTransition} />
 
            {/* Dynamic Viewport swapping using Framer Motion animations */}
            <main className="flex-1 h-full w-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  id={`scroll-container-${activeSection}`}
                  className="w-full h-full overflow-y-auto overflow-x-hidden bg-transparent scroll-smooth select-none"
                >
                  {/* Mount and transition individual view modules strictly based on selection */}
                  {activeSection === 'home' && <Hero />}
                  {activeSection === 'about' && <About />}
                  {activeSection === 'skills' && <Skills />}
                  {activeSection === 'experience' && <Experience />}
                  {activeSection === 'contact' && (
                    <div className="flex flex-col min-h-full">
                      <div className="flex-1">
                        <Contact />
                      </div>
                      <Footer onSectionChange={handleSectionTransition} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
