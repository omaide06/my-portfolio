import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

/**
 * FooterCat Component
 * Interactive animated cat for the Footer section:
 * 1. Autonomous random wandering across the footer area (moves to random spots, walks, turns).
 * 2. Full mouse drag support: user can pick up and place the cat anywhere with mouse cursor!
 * 3. Real-time pupil tracking following user cursor.
 * 4. Automatic cycling speech bubble with Thank You & Goodbye / Best Wishes.
 * 5. Interactive petting with floating hearts and happy reactions.
 */
export default function FooterCat() {
  // Motion values for smooth unified dragging + autonomous wandering
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Animation controller and timer references
  const wanderAnimXRef = useRef<ReturnType<typeof animate> | null>(null);
  const wanderAnimYRef = useRef<ReturnType<typeof animate> | null>(null);
  const wanderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDraggingRef = useRef(false);

  // Visual states
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPet, setIsPet] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [isWalking, setIsWalking] = useState(false);
  const [isUserDragging, setIsUserDragging] = useState(false);

  // Dynamic wishes list
  const wishesList = [
    "Thank you so much for visiting! 🐾",
    "Wishing you an amazing day ahead! ✨",
    "Bye bye! Hope to connect with you soon 👋",
    "Keep creating and stay curious! 🚀",
    "Thanks for checking out Om's work! ❤️",
    "Have a great journey ahead! 🌟",
    "Purrr... farewell friend, until next time! 🐱",
  ];
  const [messageIndex, setMessageIndex] = useState(0);

  const eyeLeftRef = useRef<SVGEllipseElement | null>(null);

  // Auto-cycle wishes every 4.2 seconds
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % wishesList.length);
    }, 4200);
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
      const distance = Math.min(Math.hypot(dx, dy) / 35, 5);

      setPupilOffset({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Petting interaction: shows heart and cycles to next wish
  const triggerPet = useCallback(() => {
    setIsPet(true);
    setMessageIndex((prev) => (prev + 1) % wishesList.length);
    setTimeout(() => setIsPet(false), 600);
  }, [wishesList.length]);

  // Autonomous wandering animation to a target coordinate
  const wanderTo = useCallback((targetX: number, targetY: number) => {
    if (isDraggingRef.current) return;

    const currentX = x.get();
    const currentY = y.get();

    // Orient facing direction towards destination
    if (targetX > currentX + 6) {
      setFacingRight(true);
    } else if (targetX < currentX - 6) {
      setFacingRight(false);
    }

    const distance = Math.hypot(targetX - currentX, targetY - currentY);
    // Natural walking speed (~100px - 140px per second)
    const duration = Math.max(1.8, Math.min(3.8, distance / 110));

    setIsWalking(true);

    wanderAnimXRef.current?.stop();
    wanderAnimYRef.current?.stop();

    wanderAnimXRef.current = animate(x, targetX, {
      duration,
      ease: [0.35, 0, 0.25, 1],
      onComplete: () => {
        setIsWalking(false);
      },
    });

    wanderAnimYRef.current = animate(y, targetY, {
      duration,
      ease: [0.35, 0, 0.25, 1],
    });
  }, [x, y]);

  const scheduleNextWanderRef = useRef<((delayMs?: number) => void) | null>(null);

  // Schedules the next random wander across the footer area
  const scheduleNextWander = useCallback((delayMs: number = 2000) => {
    if (wanderTimeoutRef.current) clearTimeout(wanderTimeoutRef.current);

    wanderTimeoutRef.current = setTimeout(() => {
      if (isDraggingRef.current) return;

      const currentX = x.get();
      const currentY = y.get();
      const maxX = Math.min(typeof window !== 'undefined' ? window.innerWidth * 0.35 : 320, 360);

      let targetX: number;
      // If user dragged cat far away from center, wander back smoothly
      if (Math.abs(currentX) > maxX * 1.1) {
        targetX = Math.round((Math.random() * 2 - 1) * maxX * 0.5);
      } else {
        // Wander to a new random spot in comfortable footer bounds
        const deltaX = (Math.random() * 2 - 1) * 200;
        targetX = Math.round(Math.max(-maxX, Math.min(maxX, currentX + deltaX)));
      }

      // Gentle vertical wander
      const deltaY = (Math.random() * 2 - 1) * 35;
      const targetY = Math.round(Math.max(-35, Math.min(35, currentY + deltaY)));

      wanderTo(targetX, targetY);

      // Schedule next random wandering in 4 to 6.5 seconds
      const nextDelay = Math.random() * 2500 + 4000;
      scheduleNextWanderRef.current?.(nextDelay);
    }, delayMs);
  }, [wanderTo, x, y]);

  useEffect(() => {
    scheduleNextWanderRef.current = scheduleNextWander;
  }, [scheduleNextWander]);

  // Start autonomous wander cycle when component mounts
  useEffect(() => {
    scheduleNextWander(1800);

    return () => {
      if (wanderTimeoutRef.current) clearTimeout(wanderTimeoutRef.current);
      wanderAnimXRef.current?.stop();
      wanderAnimYRef.current?.stop();
    };
  }, [scheduleNextWander]);

  // Drag handlers
  const handleDragStart = () => {
    isDraggingRef.current = true;
    setIsUserDragging(true);
    setIsWalking(false);

    // Cancel active wandering animations immediately
    wanderAnimXRef.current?.stop();
    wanderAnimYRef.current?.stop();
    if (wanderTimeoutRef.current) clearTimeout(wanderTimeoutRef.current);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: { delta: { x: number; y: number } }) => {
    // Face the direction user is currently moving the mouse
    if (info.delta.x > 1.2) {
      setFacingRight(true);
    } else if (info.delta.x < -1.2) {
      setFacingRight(false);
    }
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: { offset: { x: number; y: number } }) => {
    isDraggingRef.current = false;
    setIsUserDragging(false);

    // If mouse barely moved (< 5px), treat it as an affectionate click/pet
    const draggedDist = Math.hypot(info.offset.x, info.offset.y);
    if (draggedDist < 5) {
      triggerPet();
    }

    // Cat stays where user dropped it, then resumes wandering after a brief rest
    scheduleNextWander(3800);
  };

  return (
    <div className="w-full relative py-4 flex justify-center items-center overflow-visible select-none">
      {/* 
        Single Unified Motion Controller:
        - Handled directly by MotionValues x & y
        - Can be dragged anywhere by mouse/touch
        - Wanders autonomously across the screen when left alone
      */}
      <motion.div
        style={{ x, y }}
        drag
        dragMomentum={false}
        dragElastic={0.08}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileDrag={{ scale: 1.07 }}
        className="relative flex flex-col items-center justify-center cursor-grab active:cursor-grabbing z-20 touch-none"
        title="Move me anywhere with your mouse or click to pet!"
      >
        {/* Interactive Speech Bubble with Thank you & Bye wishes (Always upright, never mirrored) */}
        <div className="relative mb-2 z-30 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.button
              key={messageIndex}
              initial={{ opacity: 0, scale: 0.85, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -8 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => {
                e.stopPropagation();
                triggerPet();
              }}
              className="relative bg-white text-black px-4 py-2 rounded-2xl shadow-xl border border-black/10 font-mono text-xs font-semibold tracking-wide flex items-center gap-2 cursor-pointer hover:border-mustard hover:shadow-mustard/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
              <span>{wishesList[messageIndex]}</span>
              <Sparkles className="w-3.5 h-3.5 text-mustard" />

              {/* Speech bubble pointer tip */}
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
          Cat Graphic Container:
          - Flips to face direction of movement (facingRight ? 1 : -1)
          - Bobs rhythmically while walking or when petted
        */}
        <motion.div
          animate={{
            scaleX: facingRight ? 1 : -1,
            y: isWalking ? [0, -6, 0, -6, 0] : isPet ? [0, -8, 2, 0] : [0, -4, 0],
          }}
          transition={{
            scaleX: { duration: 0.3, ease: 'easeOut' },
            y: isWalking
              ? { duration: 0.5, repeat: Infinity, ease: 'easeInOut' }
              : isPet
              ? { duration: 0.45, ease: 'easeOut' }
              : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="relative"
        >
          <svg
            viewBox="0 0 220 250"
            className="w-40 h-48 sm:w-48 sm:h-56 drop-shadow-xl pointer-events-none select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. WAGGING TAIL */}
            <motion.path
              d="M 68 190 C 35 180 12 140 18 105 C 22 85 42 90 38 108 C 30 132 48 168 74 182 Z"
              fill="#121211"
              animate={{ rotate: isWalking ? [-14, 18, -14] : isUserDragging ? [15, -15, 15] : [-8, 10, -8] }}
              transition={{ repeat: Infinity, duration: isWalking ? 1.0 : isUserDragging ? 0.8 : 2.0, ease: 'easeInOut' }}
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

            {/* Left Front Paw (Trotting animation while walking) */}
            <motion.g
              animate={isWalking ? { y: [0, -4, 0] } : { y: 0 }}
              transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0, ease: 'easeInOut' }}
            >
              <ellipse cx="92" cy="216" rx="10" ry="5" fill="#0D0D0C" />
              <circle cx="88" cy="218" r="1.5" fill="#2A2A28" />
              <circle cx="92" cy="219" r="1.5" fill="#2A2A28" />
              <circle cx="96" cy="218" r="1.5" fill="#2A2A28" />
            </motion.g>

            {/* Right Waving Paw (Waves goodbye with mustard paw-pads!) */}
            <motion.g
              animate={{ rotate: [0, 18, -6, 18, 0], y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
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

            {/* 4. BIG EXPRESSIVE EYES with real-time pupil tracking */}
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
