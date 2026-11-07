import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  activeSection?: string;
  onSectionChange?: (target: string) => void;
}

/**
 * Header / Navigation Component
 * Provides responsive site header styling that switches background states when scrolled,
 * auto-hides after initial page load, and slides down on hover when cursor moves to the top edge.
 */
export default function Header({ activeSection: controlledActiveSection, onSectionChange }: HeaderProps) {
  const [internalScrolled, setInternalScrolled] = useState(false); // Header background light theme trigger on scroll
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Mobile responsive menu toggler state
  const [internalActiveSection, setInternalActiveSection] = useState('home'); // Tracks active visible viewport section
  const [copied, setCopied] = useState(false); // State to display "copied!" feedback when copying email

  // Auto-hide navigation bar states
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const isHoveredRef = useRef(false);

  // Combine controlled vs internal states for active sections and scrolled classes
  const activeSection = controlledActiveSection ?? internalActiveSection;
  const isHomePage = activeSection === 'home';
  const isScrolled = controlledActiveSection ? (controlledActiveSection !== 'home') : internalScrolled;

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  // Home page par navbar hamesha visible rahegi, doosre pages par initial delay ke baad auto-hide hogi
  useEffect(() => {
    if (isHomePage) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      if (!isHoveredRef.current) {
        setIsVisible(false);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, [isHomePage]);

  // Cursor window ke top (<= 60px) par aate hi wapas reveal hoga, aur cursor hatate hi hide ho jayega (except on Home page)
  useEffect(() => {
    let hideTimer: ReturnType<typeof setTimeout>;

    const handleMouseMove = (e: MouseEvent) => {
      if (isHomePage) {
        setIsVisible(true);
        return;
      }

      if (e.clientY <= 60) {
        clearTimeout(hideTimer);
        setIsVisible(true);
      } else if (!isHoveredRef.current && !mobileMenuOpen) {
        clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          if (!isHoveredRef.current) {
            setIsVisible(false);
          }
        }, 150);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(hideTimer);
    };
  }, [isHomePage, mobileMenuOpen]);

  // Mobile / Touch device support
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0] && e.touches[0].clientY <= 60) {
        setIsVisible(true);
      }
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  // Handles copying email to user's clipboard and opening native client mailto protocol
  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText('omaide2006@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // clear feedback label after 3 seconds
    });
    window.location.href = 'mailto:omaide2006@gmail.com';
  };

  useEffect(() => {
    if (controlledActiveSection) return;

    // Detect page scroll to switch header styling and highlight correct navigation options
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setInternalScrolled(true);
      } else {
        setInternalScrolled(false);
      }

      // Simple active link detection comparing current scroll window with elements coordinates
      const sections = ['home', 'about', 'skills', 'experience', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Highlight option if current section is centered around top viewport margin
          if (rect.top <= 120 && rect.bottom >= 120) {
            setInternalActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controlledActiveSection]);

  // Performs smooth scrolling calculation to snap to accurate elements positions
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false); // dismiss drawer
    if (onSectionChange) {
      onSectionChange(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80; // height buffer of fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Nav anchors layout mapping
  const navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'About', target: 'about' },
    { name: 'Skills', target: 'skills' },
    { name: 'Academic', target: 'experience' },
    { name: 'Contact', target: 'contact' },
  ];

  const showHeader = isHomePage || isVisible || isHovered || mobileMenuOpen;

  return (
    <>
      {/* Invisible top hover trigger area to detect mouse entering the top edge (active on subpages) */}
      {!isHomePage && (
        <div
          className="fixed top-0 left-0 right-0 h-4 z-40 pointer-events-auto"
          onMouseEnter={() => {
            setIsVisible(true);
          }}
        />
      )}

      <header
        id="navbar-site"
        onMouseEnter={() => {
          setIsHovered(true);
          isHoveredRef.current = true;
          setIsVisible(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          isHoveredRef.current = false;
          if (!isHomePage) {
            setIsVisible(false);
          }
        }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out ${
          showHeader
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled
            ? 'bg-off-white/80 backdrop-blur-md py-4 border-b border-[#EAEAEA] shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Custom Geometric Editorial Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
            id="nav-logo"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-black group-hover:bg-mustard transition-colors duration-300"></span>
              <div className="flex gap-0.5">
                <span className="w-[3px] h-5 bg-black rounded-full group-hover:bg-mustard transition-colors duration-300"></span>
                <span className="w-[3px] h-5 bg-black rounded-full group-hover:bg-mustard transition-colors duration-300"></span>
              </div>
              <span className="w-5 h-5 rounded-full bg-black group-hover:bg-mustard transition-colors duration-300"></span>
            </div>
            <span className="sr-only">OM Portfolio logo</span>
          </button>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-10 text-sm font-sans font-medium tracking-wide">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className={`relative py-1 cursor-pointer transition-colors duration-200 hover:text-black ${
                  activeSection === link.target ? 'text-black font-semibold' : 'text-medium-gray'
                }`}
              >
                {link.name}
                {/* Active marker background slide up using Framer Motion layoutId */}
                {activeSection === link.target && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-mustard"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Links - with end padding spacer */}
          <div className="hidden md:block w-4" />

          {/* Hamburger menu for Mobile */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-black hover:text-mustard focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-trigger"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Screen Overlay Menu for Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 bg-black pt-28 px-10 flex flex-col justify-between pb-12 text-white"
          >
            <div className="flex flex-col space-y-8 mt-6">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.target}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  onClick={() => scrollToSection(link.target)}
                  className="text-left py-1 text-4xl font-display font-bold tracking-tight hover:text-mustard transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-all text-mustard duration-300" />
                </motion.button>
              ))}
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono text-medium-gray">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center gap-1.5 hover:text-mustard text-left transition-colors cursor-pointer"
                >
                  <span className="text-mustard font-semibold uppercase tracking-wider">Connect with me →</span>
                </button>
                <span>2026 UTC</span>
              </div>
              <p className="text-xs text-medium-gray leading-relaxed font-sans font-light">
                © 2026 Om Aide. Editorial design.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating email copied notification toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -40, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -20, x: "-50%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed top-24 left-1/2 z-50 bg-matte-black text-white py-3 px-6 rounded-full shadow-2xl border border-mustard flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-150"
          >
            <span className="w-2 h-2 rounded-full bg-mustard animate-pulse" />
            <span className="text-xs font-mono tracking-wide">
              Selected <span className="text-mustard font-semibold">omaide2006@gmail.com</span>: Copied &amp; Mail App Opened
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
