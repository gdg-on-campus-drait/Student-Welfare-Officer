import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Compass } from 'lucide-react';
import heroCampusImg from '../assets/hero-campus.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const imageFrameRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // Cinematic entrance matching institutional banner reference
      tl.from(imageFrameRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: 'power3.out',
      }, 0.1)
        .from(headingRef.current, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: 'power4.out',
        }, 0.2)
        .from(taglineRef.current, {
          opacity: 0,
          y: 18,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.35)
        .from(descRef.current, {
          opacity: 0,
          y: 16,
          duration: 0.6,
          ease: 'power3.out',
        }, 0.45)
        .from(ctaRef.current, {
          opacity: 0,
          y: 14,
          duration: 0.5,
          ease: 'power3.out',
        }, 0.55);
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-screen pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#270E26] via-[#471C44] to-[#210920] text-white"
      aria-label="Student Welfare Office Homepage Hero"
    >
      {/* Background Architectural Ambience Glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[700px] h-[700px] bg-plum/30 rounded-full blur-[140px] -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-150px] w-[600px] h-[600px] bg-lavender/15 rounded-full blur-[140px] -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 w-full">
        {/* Main University Institutional Banner (Inspired by Reference) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Left Column: Prominent University Students (5 cols desktop) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center">
            <div
              ref={imageFrameRef}
              className="relative w-full max-w-lg lg:max-w-none aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-plum-deep"
            >
              <img
                src={heroCampusImg}
                alt="Dr. AIT university students on campus"
                className="w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.03]"
                loading="eager"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1F091E]/80 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Right Column: Institutional Identity & Monumental Typography (7 cols desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            {/* University Crest & Name */}
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/25 flex items-center justify-center font-serif font-bold text-lg text-white shadow-sm shrink-0">
                SWO
              </div>
              <div>
                <span className="block font-serif font-bold tracking-wider text-white uppercase text-sm sm:text-base lg:text-lg">
                  Dr. Ambedkar Institute of Technology
                </span>
                <span className="block text-xs font-sans text-lavender/85 tracking-widest uppercase">
                  Bengaluru, Karnataka • Autonomous • Estd. 1980
                </span>
              </div>
            </div>

            {/* Monumental Title: STUDENT WELFARE OFFICE */}
            <div ref={headingRef}>
              <h1 className="font-serif tracking-tight leading-[0.98] mb-6">
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] font-bold uppercase text-white tracking-tight">
                  Student
                </span>
                <span className="block text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] xl:text-[5.5rem] font-bold uppercase text-lavender tracking-tight">
                  Welfare Office
                </span>
              </h1>
            </div>

            {/* Tagline */}
            <p
              ref={taglineRef}
              className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-medium italic mb-4"
            >
              More Than Academics. A Community to Grow.
            </p>

            {/* Supporting Description */}
            <p
              ref={descRef}
              className="text-lavender/90 text-base sm:text-lg lg:text-xl font-sans font-normal leading-relaxed max-w-2xl text-balance"
            >
              The Student Welfare Office brings students, communities and opportunities
              together to create a richer campus experience.
            </p>

            {/* Navigation Shortcuts */}
            <div
              ref={ctaRef}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-plum font-sans font-semibold text-sm hover:bg-lavender transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Office Overview & Mandate</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#clubs"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white border border-white/25 font-sans font-medium text-sm hover:bg-white/20 transition-all duration-200 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-lavender" />
                <span>Explore Student Clubs</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
