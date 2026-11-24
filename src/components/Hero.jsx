import React, { useRef } from 'react';
import heroBannerImg from '../assets/hero-banner.jpg';

export default function Hero() {
  const containerRef = useRef(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full pt-14 sm:pt-16 bg-[#001738] overflow-hidden"
      aria-label="Student Welfare Office Homepage Hero"
    >
      <h1 className="sr-only">
        Student Welfare Office - Dr. Ambedkar Institute of Technology - Shaping well-being on the Campus
      </h1>

      {/* Hero Banner with decreased responsive height */}
      <div className="w-full flex items-center justify-center bg-[#001738] overflow-hidden">
        <img
          src={heroBannerImg}
          alt="Dr. Ambedkar Institute of Technology - Student Welfare Office - Shaping well-being on the Campus"
          className="w-full h-auto max-h-[50vh] sm:max-h-[56vh] md:max-h-[62vh] lg:max-h-[66vh] xl:max-h-[520px] 2xl:max-h-[560px] object-contain block mx-auto"
          loading="eager"
        />
      </div>
    </section>
  );
}