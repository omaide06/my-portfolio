import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Hand } from 'lucide-react';

/**
 * FooterCat Component
 * A delightful, interactive animated cat for the Footer section.
 * - Smoothly wanders / patrols horizontally across the screen
 * - Automatically cycles warm "Thank you" & "Goodbye/Best Wishes" messages
 * - Interactive: click to pet, hearts pop, eye pupil tracks mouse
 * - Flips walking direction naturally without mirroring the speech bubble
 */
export default function FooterCat() {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPet, setIsPet] = useState(false);
  const [walkingDir, setWalkingDir] = useState<1 | -1>(1); // 1 = right, -1 = left
  const [messageIndex, setMessageIndex] = useState(0);

  const eyeLeftRef = useRef<SVGEllipseElement | null>(null);
  const isDraggingRef = useRef(false);

  // Farewell, thank you & best wishes messages
  const wishesList = [
    "Thank you so much for visiting! 🐾",
    "Wishing you an amazing day ahead! ✨",
    "Bye bye! Hope to connect with you soon 👋",
    "Keep creating and stay curious! 🚀",
    "Thanks for checking out Om's work! ❤️",
    "Have a great journey ahead! 🌟",
    "Purrr... farewell friend, until next time! 🐱",
  ];

  // Auto-cycle wishes every 4.5 seconds
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % wishesList.length);
    }, 4500);

    return () => clearInterval(cycleInterval);
  }, [wishesList.length]);

  // Natural eye blinking loop every ~3.5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3600);

    return () => clearInterval(blinkInterval);
  }, []);

  // Track global cursor coordinates to make eyes follow mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeLeftRef.current) return;
      const rect = eyeLeftRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - eyeCenterX;
      const dy = e.clientY - eyeCenterY;
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 35, 5);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click on cat or speech bubble to pet and cycle next wish
  const handleCatInteraction = () => {
    if (isDraggingRef.current) return;
    setIsPet(true);
    setMessageIndex((prev) => (prev + 1) % wishesList.length);
    setTimeout(() => setIsPet(false), 600);
  };

  return (
    <div className="w-full relative py-6 flex justify-center items-center overflow-visible select-none pointer-events-none">
      {/* 
        Horizontal Moving Patrol Controller:
        Moves smoothly across the screen [-24vw to 24vw] back and forth
      */}
      <motion.div
        animate={{
          x: ['-22vw', '22vw', '22vw', '-22vw', '-22vw'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.48, 0.50, 0.98, 1],
        }}
        onUpdate={(latest) => {
          // Detect moving direction to flip cat sprite
          if (typeof latest.x === 'string') {
            const val = parseFloat(latest.x);
            // If heading right
            if (val > -21 && val < 21) {
              // Handled by keyframes orientation
            }
          }
        }}
        drag="x"
        dragConstraints={{ left: -300, right: 300 }}
        dragElastic={0.08}
        onDragStart={() => {
          isDraggingRef.current = true;
        }}
        onDragEnd={() => {
          setTimeout(() => {
            isDraggingRef.current = false;
          }, 150);
        }}
        className="relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto z-20"
        title="Click to pet me or drag me around!"
      >
        {/* Interactive Speech Bubble with Thank you & Bye wishes */}
        <div className="relative mb-2 z-30 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.button
              key={messageIndex}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={handleCatInteraction}
              className="relative bg-white text-black px-4 py-2.5 rounded-2xl shadow-xl border border-black/10 font-mono text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer hover:border-mustard hover:shadow-mustard/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
              <span>{wishesList[messageIndex]}</span>
              <Sparkles className="w-3.5 h-3.5 text-mustard" />

              {/* Speech bubble downward arrow pointer */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
            </motion.button>
          </AnimatePresence>
        </div>

        {/* Floating Heart reaction upon click / pet */}
        <AnimatePresence>
          {isPet && (
            <motion.div
              initial={{ opacity: 0, y: 0, scale: 0.5 }}
              animate={{ opacity: 1, y: -35, scale: 1.2 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute top-10 pointer-events-none z-40 text-rose-500"
            >
              <Heart className="w-6 h-6 fill-rose-500" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 
          Cat Illustration Sprite:
          Flips horizontally based on travel direction [scaleX: 1 to -1]
          Bobbing walking motion [y: 0, -4, 0]
        */}
        <motion.div
          animate={{
            scaleX: [1, 1, -1, -1, 1],
            y: [0, -5, 0, -5, 0],
          }}
          transition={{
            scaleX: { duration: 18, repeat: Infinity, times: [0, 0.48, 0.50, 0.98, 1], ease: 'linear' },
            y: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' },
          }}
          onClick={handleCatInteraction}
          className="relative cursor-pointer"
        >
          <svg
            viewBox="0 0 220 250"
            className="w-40 h-48 sm:w-48 sm:h-56 drop-shadow-xl pointer-events-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. WAGGING TAIL */}
            <motion.path
              d="M 68 190 C 35 180 12 140 18 105 C 22 85 42 90 38 108 C 30 132 48 168 74 182 Z"
              fill="#121211"
              animate={{ rotate: [-8, 12, -8] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              style={{ transformOrigin: '72px 190px' }}
            />

            {/* 2. CAT BODY */}
            <path
              d="M 72 105 C 62 135 52 175 60 208 C 65 218 155 218 160 208 C 168 175 158 135 148 105 Z"
              fill="#121211"
            />

            {/* Body Chest highlight */}
            <path
              d="M 85 210 C 95 213 125 213 135 210 C 130 190 128 145 125 120 C 120 120 100 120 95 120 C 92 145 90 190 85 210 Z"
              fill="#181817"
              opacity="0.6"
            />

            {/* Front Paws with cute stepping animation */}
            <motion.g
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ellipse cx="92" cy="216" rx="10" ry="5" fill="#0D0D0C" />
              <circle cx="88" cy="218" r="1.5" fill="#2A2A28" />
              <circle cx="92" cy="219" r="1.5" fill="#2A2A28" />
              <circle cx="96" cy="218" r="1.5" fill="#2A2A28" />
            </motion.g>

            {/* Right Waving Paw (Waving goodbye / bye-bye!) */}
            <motion.g
              animate={{ rotate: [0, 18, -6, 18, 0], y: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '128px 190px' }}
            >
              {/* Paw Arm */}
              <path d="M 125 180 C 132 170 142 165 146 172 C 148 178 138 195 130 205 Z" fill="#121211" />
              {/* Paw Pad */}
              <ellipse cx="145" cy="170" rx="9" ry="7" fill="#0D0D0C" />
              <circle cx="145" cy="170" r="3.5" fill="#F4A623" />
              <circle cx="139" cy="165" r="1.4" fill="#F4A623" />
              <circle cx="144" cy="162" r="1.4" fill="#F4A623" />
              <circle cx="149" cy="164" r="1.4" fill="#F4A623" />
            </motion.g>

            {/* 3. CAT HEAD & EARS */}
            {/* Left Ear */}
            <motion.path
              d="M 64 68 L 44 6 C 43 3 48 2 51 4 L 88 45 Z"
              fill="#121211"
              animate={isPet ? { rotate: [-10, 5, 0] } : { rotate: [0, -4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ transformOrigin: '70px 65px' }}
            />
            <path d="M 62 62 L 49 18 L 80 48 Z" fill="#252523" />

            {/* Right Ear */}
            <motion.path
              d="M 156 68 L 176 6 C 177 3 172 2 169 4 L 132 45 Z"
              fill="#121211"
              animate={isPet ? { rotate: [10, -5, 0] } : { rotate: [0, 4, 0] }}
              transition={{ duration: 1.9, repeat: Infinity }}
              style={{ transformOrigin: '150px 65px' }}
            />
            <path d="M 158 62 L 171 18 L 140 48 Z" fill="#252523" />

            {/* Head Shape */}
            <ellipse cx="110" cy="78" rx="52" ry="44" fill="#121211" />

            {/* Whiskers */}
            <path d="M 65 86 C 40 82 20 80 8 84" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 63 92 C 38 92 18 94 5 99" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 65 98 C 42 102 22 108 12 116" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />

            <path d="M 155 86 C 180 82 200 80 212 84" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 157 92 C 182 92 202 94 215 99" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 155 98 C 178 102 198 108 208 116" stroke="#121211" strokeWidth="1.8" strokeLinecap="round" />

            {/* 4. BIG EXPRESSIVE EYES with pupil tracking */}
            <g>
              {/* Left Eye */}
              <motion.ellipse
                ref={eyeLeftRef}
                cx="86"
                cy="78"
                rx="15"
                ry="18"
                fill="#FFFFFF"
                animate={{ scaleY: isBlinking ? 0.08 : 1 }}
                transition={{ duration: 0.12 }}
                style={{ transformOrigin: '86px 78px' }}
              />
              {!isBlinking && (
                <g>
                  <circle
                    cx={86 + pupilOffset.x}
                    cy={78 + pupilOffset.y}
                    r="8"
                    fill="#0D0D0C"
                  />
                  <circle
                    cx={84 + pupilOffset.x}
                    cy={75 + pupilOffset.y}
                    r="2.6"
                    fill="#FFFFFF"
                  />
                </g>
              )}

              {/* Right Eye */}
              <motion.ellipse
                cx="134"
                cy="78"
                rx="15"
                ry="18"
                fill="#FFFFFF"
                animate={{ scaleY: isBlinking ? 0.08 : 1 }}
                transition={{ duration: 0.12 }}
                style={{ transformOrigin: '134px 78px' }}
              />
              {!isBlinking && (
                <g>
                  <circle
                    cx={134 + pupilOffset.x}
                    cy={78 + pupilOffset.y}
                    r="8"
                    fill="#0D0D0C"
                  />
                  <circle
                    cx={132 + pupilOffset.x}
                    cy={75 + pupilOffset.y}
                    r="2.6"
                    fill="#FFFFFF"
                  />
                </g>
              )}
            </g>

            {/* 5. NOSE & MOUTH */}
            <path d="M 108 96 L 112 96 L 110 99 Z" fill="#222220" />
            <path
              d="M 104 101 Q 110 104 110 102 Q 110 104 116 101"
              stroke="#222220"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
