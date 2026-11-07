import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface AnimatedCatProps {
  greetingTime?: string;
}

export default function AnimatedCat({ greetingTime = 'Hello' }: AnimatedCatProps) {
  // Eye pupil offset tracking mouse position
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPet, setIsPet] = useState(false);
  const eyeLeftRef = useRef<SVGEllipseElement | null>(null);
  const isDraggingRef = useRef(false);

  // Dynamic greetings that cycle on click
  const greetingsList = [
    `Meow! ${greetingTime}, visitor! 🐾`,
    "Welcome to Om's portfolio!",
    "Stay weird and curious! ✨",
    "Drag me anywhere you like! 🐾",
    "I'm Om's coding companion 🐱",
    "Scroll down to see my human's skills!",
    "Purrr... glad you stopped by! ❤️",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  // Natural eye blinking loop every ~4 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3800);

    return () => clearInterval(blinkInterval);
  }, []);

  // Track global cursor coordinates to make cat's eyes follow the mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeLeftRef.current) return;
      const rect = eyeLeftRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      // Limit eye travel distance to maximum 5.5px
      const distance = Math.min(Math.hypot(dx, dy) / 35, 5.5);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click on cat or speech bubble to cycle playful cat greeting
  const handleCatInteraction = () => {
    if (isDraggingRef.current) return;
    setIsPet(true);
    setMessageIndex((prev) => (prev + 1) % greetingsList.length);
    setTimeout(() => setIsPet(false), 600);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.1}
      onDragStart={() => {
        isDraggingRef.current = true;
      }}
      onDragEnd={() => {
        setTimeout(() => {
          isDraggingRef.current = false;
        }, 150);
      }}
      whileDrag={{ scale: 1.06, zIndex: 100 }}
      whileHover={{ cursor: 'grab' }}
      className="relative flex flex-col items-center justify-center select-none cursor-grab active:cursor-grabbing z-30"
      title="Drag me anywhere or click to pet!"
    >
      {/* Interactive Speech Bubble Greeting */}
      <div className="relative mb-3 z-20 pointer-events-auto">
        <AnimatePresence mode="wait">
          <motion.button
            key={messageIndex}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -10 }}
            transition={{ duration: 0.25 }}
            onClick={handleCatInteraction}
            className="relative bg-white text-black px-4 py-2 rounded-2xl shadow-xl border border-black/10 font-mono text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer hover:border-mustard hover:shadow-mustard/15 transition-all active:scale-95"
          >
            <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
            <span>{greetingsList[messageIndex]}</span>
            <Sparkles className="w-3.5 h-3.5 text-mustard" />

            {/* Speech bubble downward pointing arrow tip */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Floating heart on petting/click */}
      <AnimatePresence>
        {isPet && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.5 }}
            animate={{ opacity: 1, y: -35, scale: 1.2 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute top-10 pointer-events-none z-30 text-rose-500"
          >
            <Heart className="w-6 h-6 fill-rose-500" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Animated Cat Illustration */}
      <motion.div
        animate={isPet ? { scale: [1, 1.08, 0.98, 1], y: [0, -8, 2, 0] } : { y: [0, -5, 0] }}
        transition={
          isPet
            ? { duration: 0.45, ease: 'easeOut' }
            : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
        }
        onClick={handleCatInteraction}
        className="relative"
      >
        <svg
          viewBox="0 0 220 280"
          className="w-56 h-72 sm:w-64 sm:h-80 drop-shadow-2xl pointer-events-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* 1. WAGGING TAIL (Left arched tail like reference) */}
          <motion.path
            d="M 68 220 C 35 210 12 170 18 135 C 22 115 42 120 38 138 C 30 162 48 198 74 212 Z"
            fill="#121211"
            animate={{ rotate: [-6, 8, -6] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{ transformOrigin: '72px 220px' }}
          />

          {/* 2. CAT BODY SILHOUETTE (Sitting upright posture) */}
          {/* Main Body */}
          <path
            d="M 72 135 C 62 165 52 205 60 238 C 65 248 155 248 160 238 C 168 205 158 165 148 135 Z"
            fill="#121211"
          />

          {/* Body Depth / Highlights Texture (Subtle sketch details) */}
          <path
            d="M 85 240 C 95 243 125 243 135 240 C 130 220 128 175 125 150 C 120 150 100 150 95 150 C 92 175 90 220 85 240 Z"
            fill="#181817"
            opacity="0.6"
          />

          {/* Front Paws */}
          <ellipse cx="92" cy="246" rx="11" ry="6" fill="#0D0D0C" />
          <ellipse cx="128" cy="246" rx="11" ry="6" fill="#0D0D0C" />
          <circle cx="88" cy="248" r="1.5" fill="#2A2A28" />
          <circle cx="92" cy="249" r="1.5" fill="#2A2A28" />
          <circle cx="96" cy="248" r="1.5" fill="#2A2A28" />
          <circle cx="124" cy="248" r="1.5" fill="#2A2A28" />
          <circle cx="128" cy="249" r="1.5" fill="#2A2A28" />
          <circle cx="132" cy="248" r="1.5" fill="#2A2A28" />

          {/* 3. HEAD & EARS */}
          {/* Left Ear */}
          <motion.path
            d="M 64 88 L 44 26 C 43 23 48 22 51 24 L 88 65 Z"
            fill="#121211"
            animate={isPet ? { rotate: [-10, 5, 0] } : { rotate: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            style={{ transformOrigin: '70px 85px' }}
          />
          {/* Inner Left Ear */}
          <path d="M 62 82 L 49 38 L 80 68 Z" fill="#252523" />

          {/* Right Ear */}
          <motion.path
            d="M 156 88 L 176 26 C 177 23 172 22 169 24 L 132 65 Z"
            fill="#121211"
            animate={isPet ? { rotate: [10, -5, 0] } : { rotate: [0, 3, 0] }}
            transition={{ duration: 2.1, repeat: Infinity }}
            style={{ transformOrigin: '150px 85px' }}
          />
          {/* Inner Right Ear */}
          <path d="M 158 82 L 171 38 L 140 68 Z" fill="#252523" />

          {/* Head Shape */}
          <ellipse cx="110" cy="98" rx="52" ry="44" fill="#121211" />

          {/* 4. WHISKERS (Delicate, high-contrast expressive whiskers) */}
          {/* Left Whiskers */}
          <path d="M 65 106 C 40 102 20 100 8 104" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 63 112 C 38 112 18 114 5 119" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 65 118 C 42 122 22 128 12 136" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />

          {/* Right Whiskers */}
          <path d="M 155 106 C 180 102 200 100 212 104" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 157 112 C 182 112 202 114 215 119" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 155 118 C 178 122 198 128 208 136" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />

          {/* 5. BIG EXPRESSIVE EYES (Jiji style with pupil tracking!) */}
          <g>
            {/* Left Eye White */}
            <motion.ellipse
              ref={eyeLeftRef}
              cx="86"
              cy="98"
              rx="16"
              ry="19"
              fill="#FFFFFF"
              animate={{ scaleY: isBlinking ? 0.08 : 1 }}
              transition={{ duration: 0.12 }}
              style={{ transformOrigin: '86px 98px' }}
            />
            {/* Left Pupil (Tracks cursor!) */}
            {!isBlinking && (
              <g>
                <circle
                  cx={86 + pupilOffset.x}
                  cy={98 + pupilOffset.y}
                  r="8.5"
                  fill="#0D0D0C"
                />
                {/* White Glint reflection */}
                <circle
                  cx={84 + pupilOffset.x}
                  cy={95 + pupilOffset.y}
                  r="2.8"
                  fill="#FFFFFF"
                />
              </g>
            )}

            {/* Right Eye White */}
            <motion.ellipse
              cx="134"
              cy="98"
              rx="16"
              ry="19"
              fill="#FFFFFF"
              animate={{ scaleY: isBlinking ? 0.08 : 1 }}
              transition={{ duration: 0.12 }}
              style={{ transformOrigin: '134px 98px' }}
            />
            {/* Right Pupil (Tracks cursor!) */}
            {!isBlinking && (
              <g>
                <circle
                  cx={134 + pupilOffset.x}
                  cy={98 + pupilOffset.y}
                  r="8.5"
                  fill="#0D0D0C"
                />
                {/* White Glint reflection */}
                <circle
                  cx={132 + pupilOffset.x}
                  cy={95 + pupilOffset.y}
                  r="2.8"
                  fill="#FFFFFF"
                />
              </g>
            )}
          </g>

          {/* 6. NOSE & MOUTH */}
          {/* Cute Tiny Nose */}
          <path d="M 108 116 L 112 116 L 110 119 Z" fill="#222220" />
          {/* Subtle Cat Mouth */}
          <path
            d="M 104 121 Q 110 124 110 122 Q 110 124 116 121"
            stroke="#222220"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
