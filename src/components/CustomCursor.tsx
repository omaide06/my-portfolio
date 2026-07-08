import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isHiddenByElement, setIsHiddenByElement] = useState(false);

  // Smooth spring custom animations for buttery fluid movement
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if the device matches fine pointer input (not a typical touch screen phone)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    setIsMobile(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(!e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Tracks overall document mouse hover to alter custom cursor state
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hideTarget = target.closest('[data-hide-cursor="true"]');
      setIsHiddenByElement(!!hideTarget);

      const interactive = target.closest(
        'button, a, input, textarea, [role="button"], .cursor-pointer, .group'
      );
      setIsHovered(!!interactive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.addEventListener('mouseleave', handleMouseLeave);
      document.body.addEventListener('mouseenter', handleMouseEnter);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Dynamic Cursor Outer Glow Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-mustard pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHiddenByElement ? 0 : isClicked ? 0.75 : isHovered ? 2.2 : 1,
          opacity: isHiddenByElement ? 0 : 1,
          backgroundColor: isHovered && !isHiddenByElement ? 'rgba(244, 166, 35, 0.45)' : 'rgba(244, 166, 35, 0)',
          borderColor: '#F4A623',
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 28 }}
      />

      {/* Dynamic Cursor Inner Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-mustard pointer-events-none z-50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHiddenByElement ? 0 : isClicked ? 0.5 : isHovered ? 0 : 1,
          opacity: isHiddenByElement ? 0 : isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      />
    </>
  );
}
