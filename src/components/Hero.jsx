import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MapPin } from 'lucide-react';
import heroCampusImg from '../assets/hero-campus.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const headingLine1Ref = useRef(null);
  const headingLine2Ref = useRef(null);
  const descRef = useRef(null);
  const imageFrameRef = useRef(null);
  const imageRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      // 1. Cinematic Hero Entrance Timeline
      // Staggered Line-by-Line Heading Mask Reveal (Gravelle du Parc style)
      tl.from(
        [headingLine1Ref.current, headingLine2Ref.current],
        {
          yPercent: 115,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power4.out',
        },
        0.1
      )
        // Supporting paragraph reveal
        .from(
          descRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.65,
            ease: 'power3.out',
          },
          0.35
        )
        // Hero Image: Smooth Clip-path & Scale-down Reveal
        .fromTo(
          imageFrameRef.current,
          {
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            opacity: 0.8,
          },
          {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            opacity: 1,
            duration: 1.15,
            ease: 'power4.inOut',
          },
          0.2
        )
        .fromTo(
          imageRef.current,
          {
            scale: 1.16,
          },
          {
            scale: 1,
            duration: 1.3,
            ease: 'power3.out',
          },
          0.2
        )
        // Scroll Indicator Entrance
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.5,
          },
          0.75
        );

      // Subtle scroll indicator continuous bounce
      gsap.to('.scroll-dot', {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.3,
        ease: 'sine.inOut',
      });

      // Subtle Parallax on Hero Image when scrolling
      if (imageRef.current && containerRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    },
    { scope: containerRef }
  );

  const handleScrollToContent = (e) => {
    e.preventDefault();
    const target = document.getElementById('clubs') || document.getElementById('about');
    if (target) {
      if (window.__lenis) {
        window.__lenis.scrollTo(target, { offset: -70 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 flex flex-col justify-between overflow-hidden bg-ivory"
      aria-label="Student Welfare Office Homepage Hero"
    >
      {/* Decorative Lavender Ambience Elements */}
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[650px] h-[650px] bg-lavender/35 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-150px] w-[550px] h-[550px] bg-lilac/50 rounded-full blur-3xl -z-10"
        aria-hidden="true"
      />

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 w-full flex-grow flex flex-col justify-center">
        {/* Main Editorial Grid: Balanced Full-Width 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
          {/* Left Column: Editorial Content (7 cols desktop) */}
          <div className="lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
            {/* Main Editorial Headline with Line-by-Line Masking */}
            <h1 className="font-serif text-charcoal tracking-tightest leading-[1.05] mb-6 sm:mb-8">
              <span className="block overflow-hidden py-1">
                <span
                  ref={headingLine1Ref}
                  className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] 2xl:text-[6.25rem] font-normal"
                >
                  More Than Academics.
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span
                  ref={headingLine2Ref}
                  className="block text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] xl:text-[5.5rem] 2xl:text-[6.25rem] font-medium text-plum italic"
                >
                  A Community to Grow.
                </span>
              </span>
            </h1>

            {/* Mobile-Only Prominent Photograph */}
            <div className="block lg:hidden my-6">
              <div className="relative w-full max-w-md mx-auto aspect-[4/3] overflow-hidden rounded-sm bg-lilac shadow-editorial border border-lavender-border/80">
                <img
                  src={heroCampusImg}
                  alt="Dr. AIT university students collaborating on campus"
                  className="w-full h-full object-cover object-center filter saturate-[0.96]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/65 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-sm bg-white/95 backdrop-blur-md border border-lavender-border text-charcoal">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-serif font-semibold text-charcoal">
                      Bengaluru Campus Community
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-plum font-semibold px-2 py-0.5 rounded bg-lilac">
                      Student Life
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supporting Description */}
            <p
              ref={descRef}
              className="text-charcoal-muted text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed max-w-2xl text-balance font-sans"
            >
              The Student Welfare Office brings students, communities and opportunities
              together to create a richer campus experience.
            </p>
          </div>

          {/* Right Column: Expansive, Immersive Campus Photograph (Desktop 5 cols) */}
          <div className="hidden lg:flex lg:col-span-5 relative justify-center items-center">
            {/* Main Image Frame Container with GSAP Reveal Mask */}
            <div
              ref={imageFrameRef}
              className="relative w-full max-w-xl aspect-[4/5] 2xl:aspect-[3/4] overflow-hidden rounded-sm bg-lilac shadow-editorial-lg border border-lavender-border"
            >
              <img
                ref={imageRef}
                src={heroCampusImg}
                alt="Dr. AIT university students collaborating and sharing ideas in an authentic campus community space"
                className="w-full h-full object-cover object-center filter saturate-[0.98] contrast-[1.02]"
                loading="eager"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Floating Editorial Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-sm bg-white/95 backdrop-blur-md border border-lavender-border/80 shadow-editorial text-charcoal">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-plum animate-pulse" />
                    <span className="text-sm font-serif font-semibold text-charcoal tracking-wide">
                      Bengaluru Campus
                    </span>
                  </div>
                  <span className="text-[11px] uppercase font-sans tracking-widest text-plum font-semibold px-2.5 py-0.5 rounded bg-lilac">
                    Active Hub
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-muted mt-2 font-sans leading-relaxed">
                  Where student ideas, cultural celebrations, and social initiatives find institutional backing.
                </p>
              </div>

              {/* Location Pin */}
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ivory/95 backdrop-blur-sm text-xs font-sans text-charcoal border border-lavender-border shadow-xs">
                <MapPin className="w-3.5 h-3.5 text-plum" />
                <span>Dr. AIT Main Campus</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Discover SWO Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="w-full pt-8 sm:pt-10 flex flex-col items-center justify-center text-center"
      >
        <a
          href="#about"
          onClick={handleScrollToContent}
          className="group inline-flex flex-col items-center gap-2 text-charcoal-subtle hover:text-plum transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum rounded-sm py-1"
          aria-label="Discover SWO, scroll to student clubs showcase"
        >
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-widest font-medium">
            Discover SWO
          </span>
          <div className="w-5 h-8 sm:h-9 rounded-full border border-charcoal-subtle/40 group-hover:border-plum flex items-start justify-center p-1 transition-colors">
            <span className="scroll-dot w-1.5 h-1.5 rounded-full bg-plum" />
          </div>
        </a>
      </div>
    </section>
  );
}
