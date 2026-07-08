import React from 'react';
import { motion } from 'motion/react';

/**
 * About Component
 * Renders the "About me" section featuring a horizontal looping text marquee,
 * custom typography transitions, and a clean biography block showcasing academic details.
 */
export default function About() {
  return (
    <section
      id="about"
      className="min-h-screen bg-black text-off-white py-24 relative overflow-hidden flex flex-col justify-center"
    >
      
      {/* 
        Horizontal Looping Text Marquee
        Created with Tailwind custom animation (animate-marquee) for secondary visual layer.
        Its absolute positioning and low opacity ensure it serves as background decoration only.
      */}
      <div className="absolute top-12 left-0 right-0 overflow-hidden select-none pointer-events-none z-0 opacity-15">
        <div className="animate-marquee whitespace-nowrap flex text-[10vw] font-display font-extrabold uppercase tracking-tight text-white leading-none">
          <span>about • about • about • about • about • about • about • about •&nbsp;</span>
          <span>about • about • about • about • about • about • about • about •&nbsp;</span>
        </div>
      </div>

      {/* Main content container with max width constraint */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* 
          Section Title
          Animate header text sliding up smoothly using motion.h2 once the viewport registers it.
        */}
        <div className="mb-14 border-b border-white/5 pb-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white justify-center flex items-center gap-4"
          >
            About me
          </motion.h2>
        </div>

        {/* 
          Biography and Overview Panel
          A high-contrast clean typography card containing general background info.
        */}
        <div className="flex flex-col justify-center space-y-8 text-center max-w-2xl mx-auto">
          
          {/* Section subtitle tagger */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest font-mono text-mustard">
              // overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold leading-tight tracking-tight text-white">
              Hey there! I’m Om
            </h2>
          </div>

          {/* Core profile introduction paragraph */}
          <div className="space-y-6 text-sm sm:text-base text-medium-gray font-sans font-light leading-relaxed">
            <p>
              I am Om Aide, a dedicated student with a strong interest in learning and building new skills. I’m passionate about growing my knowledge and turning ideas into reality, exploring creative avenues and structural problem solving.
            </p>
            <p>
              By continuously learning and challenging myself with hands-on projects, I aim to create meaningful, efficient solutions. I enjoy analyzing mechanics, refining technical details, and crafting high-quality experiences.
            </p>
          </div>

          {/* 
            Sub-details Section (Focus Area & Student Status)
            Visually separated using a thin high-contrast line.
          */}
          <div className="flex gap-8 justify-center items-center pt-6">
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest font-mono text-white/40">FOCUS</span>
              <span className="text-sm font-semibold text-white tracking-wider">Learning & Development</span>
            </div>
            <div className="h-8 w-[1px] bg-white/20" />
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest font-mono text-white/40">STATUS</span>
              <span className="text-sm font-semibold text-white tracking-wider">Student Academic</span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
