import React from 'react';
import { motion } from 'motion/react';

export default function Experience() {
  return (
    <section
      id="experience"
      className="min-h-full min-h-screen py-24 bg-[#080808] text-white relative overflow-hidden border-t border-white/5 flex flex-col justify-center"
    >
      {/* Background Graphic Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-mustard/5 filter blur-[150px] select-none pointer-events-none z-0" />
      <div className="absolute right-10 bottom-10 w-80 h-80 rounded-full bg-white/5 filter blur-[120px] select-none pointer-events-none z-0" />

      {/* Grid overlay deco */}
      <div className="absolute inset-0 grid grid-cols-12 pointer-events-none opacity-[0.02]">
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 border-r border-white h-full" />
        <div className="col-span-3 h-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        {/* Section Heading: Academic Background */}
        <div className="mb-14 border-b border-white/5 pb-6 text-center flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white justify-center flex items-center gap-4 text-center font-bold"
          >
            Academic Background
          </motion.h2>
        </div>

        {/* Clean slate placeholder ready for new Academic Background details */}
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="border border-dashed border-white/10 rounded-2xl p-8 max-w-lg w-full text-center">
            <span className="text-xs font-mono text-mustard uppercase tracking-widest block mb-2">
              // Ready to update
            </span>
            <p className="text-neutral-400 font-sans text-sm">
              Section cleared. Ready to add your Academic Background details here.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
