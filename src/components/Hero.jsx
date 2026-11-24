import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroBannerImg from '../assets/hero-banner.jpg';

export default function Hero() {
  const containerRef = useRef(null);
  const bannerRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(bannerRef.current, {
        opacity: 0,
        scale: 0.99,
        duration: 0.7,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full pt-14 sm:pt-16 bg-[#011C44] overflow-hidden"
      aria-label="Student Welfare Office Homepage Hero"
    >
      <h1 className="sr-only">
        Student Welfare Office - Dr. Ambedkar Institute of Technology - Shaping well-being on the Campus
      </h1>

      <div className="w-full max-w-[1920px] mx-auto">
        <div ref={bannerRef} className="relative w-full overflow-hidden shadow-2xl">
          <img
            src={heroBannerImg}
            alt="Dr. Ambedkar Institute of Technology - Student Welfare Office - Shaping well-being on the Campus"
            className="w-full h-auto block object-cover"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}