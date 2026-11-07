import React from 'react';
import { motion } from 'motion/react';
import SkewCards from '@/components/ui/gradient-card-showcase';

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-full min-h-screen py-24 bg-matte-black text-white relative overflow-hidden border-t border-white/5 flex flex-col justify-center"
    >
      {/* 
        Horizontal Looping Text Marquee
        Secondary ambient visual layer matching About section
      */}
      <div className="absolute top-12 left-0 right-0 overflow-hidden select-none pointer-events-none z-0 opacity-15">
        <div className="animate-marquee whitespace-nowrap flex text-[10vw] font-display font-extrabold uppercase tracking-tight text-white leading-none">
          <span>skills • skills • skills • skills • skills • skills • skills • skills •&nbsp;</span>
          <span>skills • skills • skills • skills • skills • skills • skills • skills •&nbsp;</span>
        </div>
      </div>

      {/* Editorial Grid Backing Deco */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.02]">
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Heading: Technical Skills */}
        <div className="mb-14 border-b border-white/5 pb-6 text-center flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white justify-center flex items-center gap-4 text-center font-bold"
          >
            Technical Skills
          </motion.h2>
        </div>

        {/* SkewCards Component */}
        <SkewCards />
      </div>
    </section>
  );
}
