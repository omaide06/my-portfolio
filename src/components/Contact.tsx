// =========================================================================
// CONTACT COMPONENT: Centralised minimalist communication channels
// =========================================================================
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Copy, Check, Instagram, Linkedin, Github, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  // Flag tracking click and successful clipboard copy notification
  const [copied, setCopied] = useState(false);

  // Trigger quick clipboard action to cleanly store target main email address
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('omaide2006@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  // Static list configuration storing connection details and actions to perform
  const contactMethods = [
    {
      id: 'email',
      name: 'Direct Email',
      value: 'omaide2006@gmail.com',
      actionLabel: 'Send Email',
      actionUrl: 'mailto:omaide2006@gmail.com',
      icon: <Mail className="w-5 h-5 text-mustard" />,
      isEmail: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      value: '@ommmm___006',
      actionLabel: 'View Instagram',
      actionUrl: 'https://www.instagram.com/ommmm___006?igsh=ZTJub2s1bmk4dHps',
      icon: <Instagram className="w-5 h-5 text-mustard" />
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'Om Aide',
      actionLabel: 'View LinkedIn',
      actionUrl: 'https://www.linkedin.com/in/om-aide-1a2158337?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: <Linkedin className="w-5 h-5 text-mustard" />
    },
    {
      id: 'github',
      name: 'GitHub',
      value: '@omaide06',
      actionLabel: 'View GitHub',
      actionUrl: 'https://github.com/omaide06',
      icon: <Github className="w-5 h-5 text-mustard" />
    }
  ];

  // Motion variants configuration to handle responsive staggering transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.15
      } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section
      id="contact"
      className="min-h-full min-h-screen py-16 md:py-24 bg-black text-white relative overflow-hidden border-t border-white/5 flex flex-col justify-center"
    >
      {/* Repeating Background text marquee layout detail matching site theme */}
      <div className="absolute top-8 md:top-12 left-0 right-0 overflow-hidden select-none pointer-events-none z-0 opacity-15">
        <div className="animate-marquee whitespace-nowrap flex text-[10vw] font-display font-extrabold uppercase tracking-tight text-white leading-none">
          <span>connect • connect • connect • connect • connect • connect •&nbsp;</span>
          <span>connect • connect • connect • connect • connect • connect •&nbsp;</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10 w-full">
        
        {/* Section Heading: Get in touch (Centered, matching About, Skills & Academic) */}
        <div className="mb-10 md:mb-12 border-b border-white/5 pb-4 text-center flex justify-center">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl font-display font-black tracking-tighter uppercase text-white text-center font-bold"
          >
            Get in touch
          </motion.h2>
        </div>

        {/* Minimalist Classic 2x2 Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {contactMethods.map((method) => {
            const cardInner = (
              <>
                {/* Top Row: Icon badge + Action Arrow */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-mustard group-hover:scale-105 group-hover:border-mustard/40 group-hover:bg-mustard/10 transition-all duration-300">
                    {method.icon}
                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-mustard group-hover:border-mustard transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Bottom Row: Platform Name + Handle / Value */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                    {method.name}
                  </span>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base sm:text-lg font-display font-bold text-white group-hover:text-mustard transition-colors tracking-tight truncate">
                      {method.value}
                    </p>

                    {method.isEmail && (
                      <button
                        onClick={handleCopyEmail}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-mustard hover:text-black border border-white/10 text-xs font-mono text-neutral-300 hover:border-mustard flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                        title="Copy email to clipboard"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="flex items-center gap-1 text-[11px] text-green-400 font-semibold"
                            >
                              <Check className="w-3.5 h-3.5" /> Copied!
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="flex items-center gap-1 text-[11px]"
                            >
                              <Copy className="w-3.5 h-3.5" /> Copy
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </button>
                    )}
                  </div>
                </div>
              </>
            );

            return method.isEmail ? (
              <motion.div
                key={method.id}
                variants={cardVariants}
                onClick={() => {
                  window.location.href = method.actionUrl;
                }}
                className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-white/10 hover:border-mustard/40 hover:bg-neutral-900/60 transition-all duration-300 relative group flex flex-col justify-between cursor-pointer"
              >
                {cardInner}
              </motion.div>
            ) : (
              <motion.a
                key={method.id}
                variants={cardVariants}
                href={method.actionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-white/10 hover:border-mustard/40 hover:bg-neutral-900/60 transition-all duration-300 relative group flex flex-col justify-between cursor-pointer"
              >
                {cardInner}
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
