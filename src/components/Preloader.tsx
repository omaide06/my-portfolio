import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

// Define the component properties interface
interface PreloaderProps {
  onComplete: () => void; // Callback fired once progress reaches 100%
  key?: string;
}

/**
 * Preloader Component
 * A stylized cybernetic entry screen that renders a sleek circular loading sequence.
 * Uses Framer Motion to slide up out of view when complete.
 */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0); // State for progress number (0 to 100)
  const [statusText, setStatusText] = useState('BOOTING PORTFOLIO CORE...'); // Telemetry status message

  useEffect(() => {
    // Elegant fast-ticking progress counter from 0 to 100
    // spanning exactly 3.2 seconds
    const duration = 3200; // total animation time in milliseconds
    const intervalTime = 30; // update speed interval in milliseconds
    const steps = duration / intervalTime; // total step counts
    let currentStep = 0;

    // Set up timer to tick progress and update simulated system status
    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      // System simulation phase status text changes based on current loaded progress
      if (currentProgress < 20) {
        setStatusText('INITIALIZING MATRIX LAYER...');
      } else if (currentProgress < 45) {
        setStatusText('PARSING PORTFOLIO PORTRAITS...');
      } else if (currentProgress < 75) {
        setStatusText('GENERATING SPATIAL CURVES...');
      } else if (currentProgress < 95) {
        setStatusText('INTERFACING SECTIONS...');
      } else {
        setStatusText('REVEALING EXPERIENCE WORKSPACE...');
      }

      // If we reach completion step, clear timer and trigger complete callback
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete(); // Fire callback to unmount or slide the preloader
        }, 300); // short final buffer for smooth visual transition
      }
    }, intervalTime);

    // Clean up timer on unmount
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%', // Slide up off the top of the screen when exiting
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 z-50 bg-[#080808] flex flex-col justify-between p-8 sm:p-12 select-none overflow-hidden"
    >
      {/* Top watermark metadata */}
      <div className="flex justify-between items-start text-[10px] sm:text-xs font-mono text-neutral-500 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          {/* Pulsing indicator light */}
          <span className="w-1.5 h-1.5 rounded-full bg-mustard animate-pulse" />
          <span>OM AIDE // SYSTEM_PROT.V2</span>
        </div>
        <div>SYS_CLK.{(new Date()).getFullYear()}</div>
      </div>

      {/* Main concentric visual load core */}
      <div className="flex flex-col items-center justify-center my-auto space-y-12">
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Circular progress loop using an SVG circle with strokeDashoffset */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background track circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-neutral-800 fill-none"
              strokeWidth="1.5"
            />
            {/* Animated progress track circle. Radius 44 -> Circumference = 2 * PI * 44 ≈ 276.4 */}
            <motion.circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-mustard fill-none"
              strokeWidth="2.5"
              strokeDasharray="276"
              strokeDashoffset={276 - (276 * progress) / 100}
              strokeLinecap="round"
              transition={{ ease: 'easeOut' }}
            />
          </svg>

          {/* Large dynamic centered counter percentage inside the circular track */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <span className="text-4xl font-display font-black tracking-tighter">
              {progress}%
            </span>
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase mt-1">
              SYS_LOAD
            </span>
          </div>
        </div>

        {/* Ticking metadata & Status indicator text */}
        <div className="space-y-3 text-center max-w-sm">
          <motion.div 
            key={statusText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono text-mustard tracking-[0.2em] font-semibold uppercase"
          >
            {statusText}
          </motion.div>
          <div className="text-[10px] font-mono text-neutral-600 tracking-wider">
            Sagar Institute CSE Academic Standard Profile // Ready
          </div>
        </div>
      </div>

      {/* Bottom watermark giant footer design offset */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-neutral-500 tracking-widest uppercase">
        <div>PORTFOLIO DEVELOPMENT RUNTIME</div>
        <div className="flex gap-4">
          <span>COGNITIVE DEV</span>
          <span>•</span>
          <span>BHO_IND_2026</span>
        </div>
      </div>
    </motion.div>
  );
}
