import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Users2, 
  GraduationCap, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CHARTER_PILLARS = [
  {
    id: 'mentorship',
    icon: HeartHandshake,
    title: 'Mentorship & Counseling',
    summary: 'Confidential personal guidance, mental wellness desks, and peer support circles.',
    details: [
      'Accessible faculty mentorship and confidential student counseling.',
      'Wellness workshops, stress relief seminars, and first-year orientation.',
    ],
  },
  {
    id: 'safety',
    icon: ShieldCheck,
    title: 'Campus Safety & Anti-Ragging',
    summary: 'Zero-tolerance compliance guaranteeing a welcoming, secure campus for all.',
    details: [
      'Statutory compliance monitoring and 24x7 anti-ragging squad.',
      'Confidential reporting channels with prompt administrative support.',
    ],
  },
  {
    id: 'representation',
    icon: Users2,
    title: 'Student Voice & Clubs',
    summary: 'Bridging student perspectives with administration to power campus life.',
    details: [
      'Liaison for elected student council convenors and club leads.',
      'Transparent grievance redressal and leadership development forums.',
    ],
  },
  {
    id: 'inclusion',
    icon: GraduationCap,
    title: 'Scholarships & Welfare',
    summary: 'Assisting scholars with merit scholarships, equal access, and resources.',
    details: [
      'Guidance on state, central, and trust-sponsored fee concessions.',
      'Equal Opportunity Cell ensuring barrier-free campus accessibility.',
    ],
  },
];

export default function AboutSection() {
  const [activePillarId, setActivePillarId] = useState('mentorship');
  const containerRef = useRef(null);
  const credoRef = useRef(null);
  const charterRef = useRef(null);
  const detailsPanelRef = useRef(null);

  const activePillar = CHARTER_PILLARS.find((p) => p.id === activePillarId) || CHARTER_PILLARS[0];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // ScrollTrigger reveal for Credo
      gsap.from(credoRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: credoRef.current,
          start: 'top 85%',
        },
      });

      // ScrollTrigger reveal for Charter container
      gsap.from(charterRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: charterRef.current,
          start: 'top 82%',
        },
      });
    },
    { scope: containerRef }
  );

  // Animate details on pillar tab change
  const handlePillarChange = (id) => {
    setActivePillarId(id);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !detailsPanelRef.current) return;

    gsap.fromTo(
      detailsPanelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
    );
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="scroll-mt-24 py-16 sm:py-24 lg:py-28 bg-[#FAF7F8] border-t border-lavender-border/60 relative overflow-hidden"
      aria-label="About the Student Welfare Office"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Editorial Pullquote: Full-Width Open Statement (No Boxy Notebook Look) */}
        <div
          ref={credoRef}
          className="mb-14 sm:mb-20 py-8 sm:py-12 border-b border-lavender-border/80 relative"
        >
          <div className="max-w-5xl">
            <span className="text-xs font-sans uppercase tracking-widest text-plum font-semibold block mb-3">
              Institutional Credo
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-normal italic leading-relaxed">
              "Ensuring every learner at Dr. AIT discovers not only an engineering degree, 
              but an environment fostering empathy, leadership, and resilient character."
            </blockquote>
          </div>
        </div>

        {/* Interactive Student Welfare Charter: Expansive Split Showcase */}
        <div
          ref={charterRef}
          className="w-full"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-lavender-border/80">
            <div>
              <span className="text-xs font-sans uppercase tracking-widest text-plum font-semibold block mb-1">
                Institutional Support Pillars
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-medium">
                The Student Welfare Charter
              </h3>
            </div>
            <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold px-3 py-1 rounded-full bg-lilac border border-lavender-border self-start sm:self-auto">
              4 Dedicated Support Desks
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
            {/* Left: Pillar Navigation Selector */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {CHARTER_PILLARS.map((pillar, index) => {
                const isSelected = pillar.id === activePillarId;
                const Icon = pillar.icon;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => handlePillarChange(pillar.id)}
                    className={`text-left p-4 sm:p-5 rounded-sm transition-all duration-300 border flex items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum ${
                      isSelected
                        ? 'bg-lilac border-plum/50 shadow-editorial'
                        : 'bg-white hover:bg-lilac/40 border-lavender-border/70 hover:border-plum/30'
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-sm shrink-0 flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-plum text-ivory' : 'bg-ivory text-plum border border-lavender-border'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-grow">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-charcoal-subtle block">
                        Support Area 0{index + 1}
                      </span>
                      <h4
                        className={`font-serif text-base sm:text-lg font-medium leading-snug ${
                          isSelected ? 'text-plum font-semibold' : 'text-charcoal'
                        }`}
                      >
                        {pillar.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Active Pillar Detailed Content */}
            <div
              ref={detailsPanelRef}
              className="lg:col-span-7 bg-white p-7 sm:p-10 lg:p-12 rounded-sm border border-lavender-border shadow-editorial flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-plum" />
                <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-plum">
                  Focus Area
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-charcoal font-medium mb-2">
                {activePillar.title}
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans mb-5">
                {activePillar.summary}
              </p>

              <div className="space-y-2.5 mb-6">
                {activePillar.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-plum shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-charcoal/90 font-sans leading-snug">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-lavender-border/70 flex items-center justify-between text-xs font-sans">
                <span className="text-charcoal-subtle text-[11px]">
                  Dean of Student Welfare Office
                </span>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1 text-plum font-medium hover:text-plum-deep transition-colors"
                >
                  <span>Support Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
