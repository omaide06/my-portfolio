import React from 'react';
import { motion } from 'motion/react';

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-matte-black text-white relative overflow-hidden border-t border-white/5 min-h-[70vh] flex flex-col justify-center"
    >
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

        {/* Clean slate ready for fresh custom layout */}
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className="border border-dashed border-white/10 rounded-2xl p-8 max-w-lg w-full text-center">
            <span className="text-xs font-mono text-mustard uppercase tracking-widest block mb-2">
              // Ready to build
            </span>
            <p className="text-neutral-400 font-sans text-sm">
              Section cleared. We will now build the new Technical Skills layout from scratch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
