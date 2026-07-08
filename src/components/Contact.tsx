// =========================================================================
// CONTACT COMPONENT: Centralised high-end communication cards portal
// =========================================================================
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Copy, Check, Instagram, Linkedin, Github, ExternalLink, Send } from 'lucide-react';

export default function Contact() {
  // Flag tracking click and successful clipboard copy notification
  const [copied, setCopied] = useState(false);

  // Trigger quick clipboard action to cleanly store target main email address
  const handleCopyEmail = () => {
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
      actionLabel: 'Send Mail',
      actionUrl: 'mailto:omaide2006@gmail.com',
      icon: <Mail className="w-6 h-6 text-mustard" />,
      description: 'The best way to reach me for professional work, collaborations, or questions.',
      isEmail: true
    },
    {
      id: 'instagram',
      name: 'Instagram',
      value: '@ommmm___006',
      actionLabel: 'Follow Profile',
      actionUrl: 'https://www.instagram.com/ommmm___006?igsh=ZTJub2s1bmk4dHps',
      icon: <Instagram className="w-6 h-6 text-mustard" />,
      description: 'Check out my personal stories, updates, and direct-messaging hub.'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      value: 'Om Aide',
      actionLabel: 'Let\'s Connect',
      actionUrl: 'https://www.linkedin.com/in/om-aide-1a2158337?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: <Linkedin className="w-6 h-6 text-mustard" />,
      description: 'Connect with me for professional updates, networking, and technical discussions.'
    },
    {
      id: 'github',
      name: 'GitHub',
      value: '@omaide06',
      actionLabel: 'Explore Repos',
      actionUrl: 'https://github.com/omaide06',
      icon: <Github className="w-6 h-6 text-mustard" />,
      description: 'Explore my repositories, open-source commits, and active development prototypes.'
    }
  ];

  // Motion variants configuration to handle responsive staggering transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.2
      } 
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    }
  };

  return (
    <section
      id="contact"
      className="py-32 bg-[#080808] text-white relative overflow-hidden border-t border-white/5 flex flex-col justify-center min-h-screen"
    >
      {/* Background radial soft light-glow guidelines */}
      <div className="absolute left-10 top-1/4 w-80 h-80 rounded-full bg-white/5 filter blur-[120px] select-none pointer-events-none z-0" />
      <div className="absolute right-10 bottom-1/4 w-96 h-96 rounded-full bg-mustard/[0.03] filter blur-[130px] select-none pointer-events-none z-0" />

      {/* Repeating Background text marquee layout detail */}
      <div className="absolute top-12 left-0 right-0 overflow-hidden select-none pointer-events-none z-0 opacity-[0.03]">
        <div className="animate-marquee whitespace-nowrap flex text-[12vw] font-display font-extrabold uppercase tracking-tight text-white leading-none">
          <span>connect • connect • connect • connect • connect • connect •&nbsp;</span>
          <span>connect • connect • connect • connect • connect • connect •&nbsp;</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        {/* SEC_04 Title tag block */}
        <div className="mb-14 border-b border-white/5 pb-6">
          <motion.h2
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl font-display font-black tracking-tighter uppercase text-white flex items-center gap-4 text-left font-bold"
          >
            Get in touch
          </motion.h2>
        </div>

        {/* Dynamic header summary & active user prompt message */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-mono text-mustard">// Hub</span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold leading-tight tracking-tight text-white">
              Let's build something phenomenal together.
            </h2>
            <p className="text-sm font-sans font-light text-neutral-400 leading-relaxed">
              If you have any opportunities, ideas, or simply want to say hello — feel free to drop a message! All my official communication links are centralized here.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 py-1.5 px-3.5 rounded-full border border-white/10 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
            <span>Response turnaround time within 12 - 24 hours</span>
          </div>
        </div>

        {/* Premium Grid rendering contact and social connection channels */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        >
          {contactMethods.map((method) => (
            <motion.div 
              key={method.id}
              variants={cardVariants}
              className="bg-[#121211] rounded-3xl p-6 sm:p-8 border border-white/5 flex flex-col justify-between hover:border-mustard/30 hover:shadow-2xl hover:shadow-mustard/[0.02] transition-colors duration-300 relative group"
            >
              <div>
                {/* Visual icon representation and card context labels */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-mustard/20 group-hover:bg-mustard/5 transition-all duration-300">
                    {method.icon}
                  </div>
                  
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                    {method.name === 'Direct Email' ? 'Primary' : 'Social Connection'}
                  </span>
                </div>

                {/* Main description + dynamic CTA action */}
                <div className="space-y-2">
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-mustard transition-colors duration-300">
                    {method.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-base sm:text-lg font-mono text-neutral-200 select-all font-medium break-all">
                      {method.value}
                    </p>
                    {method.isEmail && (
                      <button
                        onClick={handleCopyEmail}
                        className="p-1 px-2.5 rounded-lg bg-white/5 hover:bg-mustard hover:text-black border border-white/10 text-xs font-mono text-neutral-400 hover:border-mustard flex items-center gap-1.5 transition-all cursor-pointer"
                        title="Copy email to clipboard"
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="check"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="flex items-center gap-1 text-[11px] text-green-400 font-semibold uppercase"
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
                  <p className="text-xs sm:text-sm font-sans font-light text-neutral-400 leading-relaxed pt-2">
                    {method.description}
                  </p>
                </div>
              </div>

              {/* Bottom actionable link pointing directly to destination endpoints */}
              <div className="mt-8 pt-4 border-t border-white/5">
                <a
                  href={method.actionUrl}
                  target={method.name === 'Direct Email' ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-mustard hover:text-white transition-colors duration-200 group-hover:translate-x-1 transition-transform"
                >
                  <span>{method.actionLabel}</span>
                  {method.name === 'Direct Email' ? (
                    <Send className="w-3.5 h-3.5" />
                  ) : (
                    <ExternalLink className="w-3.5 h-3.5" />
                  )}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
