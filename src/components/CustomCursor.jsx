import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default', 'pointer', 'drag', 'hidden'
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    setIsVisible(true);

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const dragElem = target.closest('[data-cursor="drag"]');
      const pointerElem = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor="pointer"]');

      if (dragElem) {
        setCursorState('drag');
      } else if (pointerElem) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeaveWindow = () => {
      setCursorState('hidden');
    };

    const handleMouseEnterWindow = () => {
      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
    };
  }, []);

  if (!isVisible) return null;

  const isDrag = cursorState === 'drag';
  const isPointer = cursorState === 'pointer';
  const isHidden = cursorState === 'hidden';

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] transition-opacity duration-200 hidden md:flex items-center justify-center rounded-full ${
        isHidden ? 'opacity-0' : 'opacity-100'
      } ${
        isDrag
          ? 'w-16 h-16 bg-plum text-ivory text-[10px] font-sans font-semibold tracking-widest uppercase shadow-editorial scale-100'
          : isPointer
          ? 'w-10 h-10 border border-plum/60 bg-lilac/40 scale-110 backdrop-blur-[1px]'
          : 'w-4 h-4 border border-plum/50 bg-plum/20'
      }`}
      style={{ willChange: 'transform' }}
    >
      {isDrag ? (
        <span ref={cursorTextRef} className="select-none animate-in fade-in duration-150">
          DRAG
        </span>
      ) : (
        <div
          className={`w-1 h-1 rounded-full bg-plum transition-transform ${
            isPointer ? 'scale-0' : 'scale-100'
          }`}
        />
      )}
    </div>
  );
}
