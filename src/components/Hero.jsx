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
        duration: 0.6,
        ease: 'power3.out',
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full pt-14 sm:pt-16 bg-[#011C44] overflow-hidden flex flex-col items-center justify-center"
      aria-label="Student Welfare Office Homepage Hero"
    >
      <h1 className="sr-only">
        Student Welfare Office - Dr. Ambedkar Institute of Technology - Shaping well-being on the Campus
      </h1>

      <div className="w-full max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5">
        <div
          ref={bannerRef}
          className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#011C44]"
        >
          <img
            src={heroBannerImg}
            alt="Dr. Ambedkar Institute of Technology - Student Welfare Office - Shaping well-being on the Campus"
            className="w-full h-auto max-h-[420px] sm:max-h-[480px] lg:max-h-[500px] object-contain mx-auto block"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}