import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Camera, Sparkles } from 'lucide-react';

/**
 * About Component
 * Renders the "About me" section featuring a 2-column layout:
 * - Left: Overview, Bio, Focus/Status metadata
 * - Right: Dual-photo frame with smooth full-card B&W overlap on hover,
 *          along with right-to-left running "I'M THE GOAT" marquee
 *          and Photoshop "Ps" badge.
 */
export default function About() {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Photo 1: Default front photo (Color)
  // Photo 2: Smooth hover overlap photo (Monochrome / B&W)
  const photo1 = '/profile-1.jpg';
  const photo2 = '/profile-2.jpg';

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <section
      id="about"
      className="min-h-screen bg-black text-off-white py-24 relative overflow-hidden flex flex-col justify-center"
    >

      {/* 
        Horizontal Looping Text Marquee
        Secondary ambient visual layer
      */}
      <div className="absolute top-12 left-0 right-0 overflow-hidden select-none pointer-events-none z-0 opacity-15">
        <div className="animate-marquee whitespace-nowrap flex text-[10vw] font-display font-extrabold uppercase tracking-tight text-white leading-none">
          <span>about • about • about • about • about • about • about • about •&nbsp;</span>
          <span>about • about • about • about • about • about • about • about •&nbsp;</span>
        </div>
      </div>

      {/* Main content container with max-w-7xl matching Skills & Experience */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        {/* Section Title - Centered */}
        <div className="mb-14 border-b border-white/5 pb-6 text-center flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white justify-center flex items-center gap-4 text-center font-bold"
          >
            About me
          </motion.h2>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Overview and Bio Content */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center space-y-8 text-left"
          >
            {/* Section subtitle tagger */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest font-mono text-mustard">
                // overview
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight tracking-tight text-white">
                Hey there! I’m Om
              </h2>
            </div>

            {/* Core profile introduction paragraphs */}
            <div className="space-y-6 text-sm sm:text-base text-neutral-300 font-sans font-light leading-relaxed">
              <p>
                I am Om Aide, a dedicated student with a strong interest in learning and building new skills. I’m passionate about growing my knowledge and turning ideas into reality, exploring creative avenues and structural problem solving.
              </p>
              <p>
                By continuously learning and challenging myself with hands-on projects, I aim to create meaningful, efficient solutions. I enjoy analyzing mechanics, refining technical details, and crafting high-quality experiences.
              </p>
            </div>

            {/* Sub-details Section (Focus Area & Status) */}
            <div className="flex flex-wrap gap-8 items-center pt-6 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">FOCUS</span>
                <span className="text-sm font-semibold text-white tracking-wider">Learning & Development</span>
              </div>
              <div className="h-8 w-[1px] bg-white/20 hidden sm:block" />
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">STATUS</span>
                <span className="text-sm font-semibold text-white tracking-wider">Student Academic</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Dual-Photo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] group cursor-pointer">
              {/* Ambient Glow behind the photo */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-mustard/20 via-white/5 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-500" />

              {/* Decorative Corner Accent Borders */}
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-mustard rounded-tl-lg z-20 pointer-events-none" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-mustard rounded-br-lg z-20 pointer-events-none" />

              {/* Main Card with smooth hover styling */}
              <div className="relative h-full w-full rounded-2xl bg-[#121211] border border-white/10 overflow-hidden p-3 group-hover:border-mustard/40 transition-colors duration-500 shadow-2xl">
                <div
                  className="relative w-full h-full rounded-xl overflow-hidden bg-black/40"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {!imageError ? (
                    <>
                      {/* 1. FRONT PHOTO (Color) - Default Base Layer */}
                      <img
                        src={photo1}
                        alt="Om Aide (Color)"
                        onError={() => setImageError(true)}
                        className={`w-full h-full object-cover object-[center_20%] rounded-xl transition-transform duration-700 ease-out select-none pointer-events-none ${isHovered ? 'scale-105' : 'scale-100'}`}
                      />

                      {/* 2. OVERLAP PHOTO (B&W) - Overlaps smoothly on Hover across the whole photo */}
                      <img
                        src={photo2}
                        alt="Om Aide (Monochrome)"
                        className={`absolute inset-0 w-full h-full object-cover object-[center_20%] rounded-xl transition-all duration-700 ease-out select-none pointer-events-none ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
                      />

                      {/* 3. Photoshop "Ps" Badge in Top-Left Corner */}
                      <div
                        className={`absolute top-3 left-3 z-30 transition-all duration-300 pointer-events-none select-none ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#001E36] border border-[#00A8FF]/60 flex items-center justify-center shadow-lg shadow-[#001E36]/80">
                          <span className="text-[#00A8FF] font-black text-xs tracking-tight font-sans">Ps</span>
                        </div>
                      </div>

                      {/* 4. Animated Right-to-Left Running Marquee: "I'M THE GOAT" */}
                      <div
                        className={`absolute top-[38%] left-0 right-0 z-30 overflow-hidden pointer-events-none select-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <motion.div
                          animate={isHovered ? { x: ['0%', '-50%'] } : { x: '0%' }}
                          transition={{ repeat: Infinity, ease: 'linear', duration: 4.5 }}
                          className="flex w-max whitespace-nowrap"
                        >
                          <span className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] pr-8">
                            I'M THE GOAT • I'M THE GOAT • I'M THE GOAT •&nbsp;
                          </span>
                          <span className="text-2xl sm:text-3xl font-display font-black uppercase tracking-wider text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)] pr-8">
                            I'M THE GOAT • I'M THE GOAT • I'M THE GOAT •&nbsp;
                          </span>
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    /* Stylized Placeholder shown if photo file is not found */
                    <div className="h-full w-full rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-white/[0.02]">
                      <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-mustard/30 group-hover:bg-mustard/5 transition-all duration-300">
                        <User className="w-10 h-10 text-mustard" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-white font-display font-bold text-lg">
                          <span>Om Aide</span>
                          <Sparkles className="w-4 h-4 text-mustard" />
                        </div>
                        <p className="text-xs font-mono text-neutral-400">
                          Photos loaded from <span className="text-mustard">public/</span>
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-white/5 py-1 px-3 rounded-full border border-white/10 text-[10px] font-mono text-neutral-400">
                        <Camera className="w-3 h-3 text-mustard" />
                        <span>Dual Photo Slot</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
