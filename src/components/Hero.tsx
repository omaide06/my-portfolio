import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import AnimatedCat from './AnimatedCat';

interface HeroProps {
  onSectionChange?: (target: string) => void;
}

export default function Hero({ onSectionChange }: HeroProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [greeting, setGreeting] = useState('Hello');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon');
    } else if (hour >= 17 && hour < 22) {
      setGreeting('Good Evening');
    } else {
      setGreeting('Good Night');
    }
  }, []);

  useEffect(() => {
    const container = document.getElementById('scroll-container-home');
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop > 15) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    // Run an initial check in case of browser autofill scroll
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollClick = () => {
    if (onSectionChange) {
      onSectionChange('about');
      return;
    }
    const nextBtn = document.querySelector('button[title="Go to about"]');
    if (nextBtn) {
      (nextBtn as HTMLButtonElement).click();
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 flex items-center bg-off-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* 2-Column Responsive Layout: Content Left, Animated Cat Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Side Content Block */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-10">
            <div className="space-y-6 flex flex-col items-start w-full">
              <motion.h1
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                 className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-display font-extrabold text-black leading-[0.85] tracking-tighter select-none w-full"
              >
                <span className="block whitespace-nowrap">
                  {"STAY".split("").map((char, idx) => (
                    <motion.span
                      key={`stay-${idx}`}
                      className="inline-block origin-bottom cursor-pointer hover:text-mustard transition-colors duration-150"
                      whileHover={{
                        scale: 1.18,
                        y: -14,
                        rotate: idx % 2 === 0 ? -7 : 7,
                        color: "#f1c40f",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 14 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="block whitespace-nowrap">
                  {"WEIRD".split("").map((char, idx) => (
                    <motion.span
                      key={`weird-${idx}`}
                      className="inline-block origin-bottom cursor-pointer hover:text-mustard transition-colors duration-150"
                      whileHover={{
                        scale: 1.18,
                        y: -14,
                        rotate: idx % 2 === 0 ? 7 : -7,
                        color: "#f1c40f",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 14 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-xl text-base sm:text-lg text-black font-sans leading-relaxed text-left md:ml-12 font-light"
              >
                Welcome to my portfolio! I’m a dedicated student with a strong interest in learning and building new skills. I’m passionate about growing my knowledge and turning ideas into reality
              </motion.p>
            </div>
          </div>

          {/* Right Side: Interactive Animated Cat with Greeting Bubble */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 flex justify-center items-center py-4"
          >
            <AnimatedCat greetingTime={greeting} />
          </motion.div>

        </div>

      </div>

      {/* Interactive, bouncing Scroll Down indicator */}
      <AnimatePresence>
        {!hasScrolled && (
          <motion.button
            key="scroll-down-indicator"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
            onClick={handleScrollClick}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 focus:outline-none cursor-pointer z-25 group"
            title="Scroll Down to About Section"
          >
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-black/50 group-hover:text-mustard group-hover:tracking-[0.3em] transition-all duration-300">
              Scroll Down
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-black/35 group-hover:border-mustard flex justify-center p-1.5 transition-colors duration-300">
              <motion.div 
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 bg-black/60 group-hover:bg-mustard rounded-full transition-colors duration-300"
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
