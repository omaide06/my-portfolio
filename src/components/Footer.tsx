import React from 'react';
import FooterCat from './FooterCat';

interface FooterProps {
  onSectionChange?: (target: string) => void;
}

export default function Footer({ onSectionChange }: FooterProps) {
  const scrollToSection = (id: string) => {
    if (onSectionChange) {
      onSectionChange(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
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

  const footerLinks = [
    { name: 'Home', target: 'home' },
    { name: 'About', target: 'about' },
    { name: 'Skills', target: 'skills' },
    { name: 'Academic', target: 'experience' },
    { name: 'Contact', target: 'contact' },
  ];

  return (
    <footer className="min-h-full min-h-screen bg-off-white text-black py-16 md:py-20 border-t border-black/5 relative overflow-hidden select-none flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Segment containing Logo and Navigation Links */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-12 border-b border-black/10">
          
          {/* Logo element identical to header logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-black group-hover:bg-mustard transition-colors duration-300"></span>
              <div className="flex gap-0.5">
                <span className="w-[3px] h-5 bg-black rounded-full group-hover:bg-mustard transition-colors duration-300"></span>
                <span className="w-[3px] h-5 bg-black rounded-full group-hover:bg-mustard transition-colors duration-300"></span>
              </div>
              <span className="w-5 h-5 rounded-full bg-black group-hover:bg-mustard transition-colors duration-300"></span>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex items-center flex-wrap justify-center gap-x-8 gap-y-3 text-xs font-sans font-semibold tracking-widest uppercase text-medium-gray">
            {footerLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => scrollToSection(link.target)}
                className="hover:text-black transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

        </div>

        {/* Dynamic Interactive Walking Footer Cat with Thank You & Bye Wishes */}
        <div className="py-8 md:py-12 flex justify-center items-center overflow-visible">
          <FooterCat />
        </div>

        {/* Bottom Metadata & Giant Typography Stamp */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-medium-gray">
          <p>© 2026 Om Aide. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>STUDENT PORTFOLIO</span>
            <span>•</span>
            <span>LEARNING & GROWING</span>
          </div>
        </div>

      </div>

      {/* Modern, bold massive repeated bottom typographic watermark "OM AIDE" */}
      <div className="w-full text-center mt-8 -mb-16 md:-mb-24 pointer-events-none select-none z-0">
        <h2 className="text-[14vw] font-display font-extrabold text-black/9 leading-none uppercase tracking-tighter">
          OM AIDE
        </h2>
      </div>

    </footer>
  );
}
