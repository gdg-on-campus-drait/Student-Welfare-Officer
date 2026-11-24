import React, { useRef } from 'react';
import heroBannerImg from '../assets/hero-banner.jpg';

export default function Hero() {
  const containerRef = useRef(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full pt-14 sm:pt-16 bg-white overflow-hidden"
      aria-label="Student Welfare Office Homepage Hero"
    >
      <h1 className="sr-only">
        Student Welfare Office - Dr. Ambedkar Institute of Technology - Shaping well-being on the Campus
      </h1>

      {/* Full-Bleed Edge-to-Edge Hero Banner matching Reference */}
      <div className="w-full">
        <img
          src={heroBannerImg}
          alt="Dr. Ambedkar Institute of Technology - Student Welfare Office - Shaping well-being on the Campus"
          className="w-full h-auto block"
          loading="eager"
        />
      </div>
    </section>
  );
}