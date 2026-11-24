import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import culturalImg from '../assets/clubs/cultural.jpg';
import techImg from '../assets/clubs/tech.jpg';
import sportsImg from '../assets/clubs/sports.jpg';
import literaryImg from '../assets/clubs/literary.jpg';
import outreachImg from '../assets/clubs/outreach.jpg';
import ieeeImg from '../assets/clubs/ieee.jpg';

gsap.registerPlugin(ScrollTrigger);

const CLUBS = [
  {
    id: 'sanskriti',
    shortName: 'Sanskriti',
    fullName: 'Sanskriti Cultural & Arts Forum',
    category: 'Cultural & Arts',
    tagline: 'Celebrating artistic heritage, musical expression, and dramatic arts.',
    description:
      'The premier student cultural collective coordinating annual cultural festivals, inter-collegiate dance battles, music recitals, and fine arts showcases.',
    activities: [
      'Flagship Annual Cultural Festival',
      'Classical & Contemporary Dance Recitals',
      'Stage Play & Theater Ensemble',
    ],
    image: culturalImg,
    facultyCoordination: 'Cultural Advisory Council',
  },
  {
    id: 'technothon',
    shortName: 'Technothon',
    fullName: 'Technothon Innovation & Coding',
    category: 'Technical & Coding',
    tagline: 'Practical problem solving, algorithmic challenges, and hands-on prototyping.',
    description:
      'A cross-departmental technical forum hosting 24-hour campus hackathons, autonomous robotics design sprints, and open-source software challenges.',
    activities: [
      '24-Hour Campus Hackathon',
      'Robotics & Hardware Prototyping',
      'Open-Source Code Sprints',
    ],
    image: techImg,
    facultyCoordination: 'Technical Forum Committee',
  },
  {
    id: 'kreeda',
    shortName: 'Kreeda',
    fullName: 'Kreeda Sports & Athletics Council',
    category: 'Sports & Athletics',
    tagline: 'Fostering athletic discipline, healthy competition, and teamwork.',
    description:
      'Fields competitive Dr. AIT athletic contingents at VTU tournaments and organizes annual inter-branch championships across track, field, and team sports.',
    activities: [
      'VTU Tournament Contingents',
      'Inter-Branch Sports Championships',
      'Badminton, Cricket & Athletics Meets',
    ],
    image: sportsImg,
    facultyCoordination: 'Dept. of Physical Education',
  },
  {
    id: 'sahitya',
    shortName: 'Sahitya',
    fullName: 'Sahitya Literary & Debating Society',
    category: 'Literary & Oratory',
    tagline: 'Cultivating articulate discourse and bilingual creative expression.',
    description:
      'A platform dedicated to critical thought, hosting parliamentary debates, poetry evenings, and bilingual literary events in Kannada and English.',
    activities: [
      'Bilingual Debates (Kannada & English)',
      'Creative Writing & Poetry Evenings',
      'Student Editorial Magazine Desk',
    ],
    image: literaryImg,
    facultyCoordination: 'Literary Affairs Committee',
  },
  {
    id: 'outreach',
    shortName: 'NSS Outreach',
    fullName: 'NSS & Social Outreach Wing',
    category: 'Community Service',
    tagline: 'Responsible community action, social welfare, and environmental stewardship.',
    description:
      'Coordinates voluntary blood donation drives, rural educational assistance, campus greening projects, and community health awareness.',
    activities: [
      'Annual Campus Blood Donation Drives',
      'Rural Educational Outreach Camps',
      'Greening & Tree Plantation Drives',
    ],
    image: outreachImg,
    facultyCoordination: 'NSS Program Officer',
  },
  {
    id: 'ieee-robotics',
    shortName: 'IEEE & Robotics',
    fullName: 'IEEE Student Branch & Robotics Forum',
    category: 'Engineering & Research',
    tagline: 'Autonomous robotics, research paper symposia, and embedded hardware sprints.',
    description:
      'The premier technical forum dedicated to advanced electronics, autonomous robotics prototyping, AI engineering, and national IEEE student paper publications.',
    activities: [
      'Autonomous Robotics Design Sprints',
      'National Student Research Symposia',
      'Embedded IoT & Microcontroller Bench',
    ],
    image: ieeeImg,
    facultyCoordination: 'Dept. of ECE & Electrical Engineering',
  },
];

export default function ClubsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);

  const selectedClub = CLUBS[activeIndex];

  // ScrollTrigger reveal for section header only
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.clubs-header-reveal', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleSelectClub = (index) => {
    setActiveIndex(index);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0.5, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      id="clubs"
      ref={containerRef}
      className="scroll-mt-32 pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 bg-[#FAF7F8] border-t border-lavender-border/60 relative overflow-hidden"
      aria-label="Student Clubs and Communities Showcase"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header (Clean Typography, No Pills, No Dots) */}
        <div className="max-w-3xl mb-12 sm:mb-16 clubs-header-reveal">
          <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold block mb-2">
            Student Life & Forums
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
            Communities That Shape Campus Life
          </h2>
          <p className="mt-4 text-charcoal-muted font-sans text-base sm:text-lg leading-relaxed">
            Student-governed societies spanning cultural arts, engineering challenges, athletic competition, and civic action.
          </p>
        </div>

        {/* Rounded Lavender Container Framing the 3x2 Grid */}
        <div className="bg-[#EADEEA] border border-lavender-border rounded-2xl sm:rounded-3xl p-5 sm:p-7 lg:p-8 shadow-editorial mb-10 sm:mb-12">
          {/* All Clubs Grid — 3 Above and 3 Below (Clean Photos, No Pills, No Icons) */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {CLUBS.map((club, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={club.id}
                  onClick={() => handleSelectClub(idx)}
                  className={`group relative rounded-xl transition-all duration-300 cursor-pointer flex flex-col ${
                    isActive
                      ? 'ring-3 ring-plum ring-offset-2 ring-offset-lavender shadow-editorial-lg scale-[1.02]'
                      : 'ring-1 ring-plum/20 hover:ring-plum/50 hover:shadow-editorial hover:-translate-y-1'
                  }`}
                >
                  {/* Clean Editorial Image Card */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-plum-deep border border-white/10 shadow-sm flex flex-col justify-end p-5 text-white">
                    <img
                      src={club.image}
                      alt={club.fullName}
                      className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[1.05] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    {/* Bottom Content on Card - Clean Typography Only */}
                    <div className="relative z-10 space-y-1">
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-lavender font-sans block">
                        {club.shortName}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug text-white drop-shadow-sm">
                        {club.fullName}
                      </h3>
                      <p className="text-xs text-white/90 font-sans line-clamp-2 leading-relaxed pt-0.5">
                        {club.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Club Detailed Content Panel (Clean Editorial, No Pills, No Icons) */}
        <div
          ref={detailsRef}
          className="p-8 sm:p-10 lg:p-12 rounded-2xl bg-white border border-lavender-border shadow-editorial transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-plum font-semibold block font-sans">
                {selectedClub.category} • Active Club Focus
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-medium">
                {selectedClub.fullName}
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans max-w-2xl">
                {selectedClub.description}
              </p>

              {/* Core Activities Tags */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {selectedClub.activities.map((act) => (
                  <span
                    key={act}
                    className="inline-block px-3 py-1 rounded-sm bg-ivory border border-lavender-border text-xs text-charcoal font-sans"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-lavender-border/60 md:pl-6 space-y-3">
              <div className="text-xs text-charcoal-muted font-sans">
                <span className="font-semibold text-charcoal">Coordination: </span>
                {selectedClub.facultyCoordination}
              </div>
              <a
                href="#contact"
                className="inline-block px-5 py-2.5 rounded-sm bg-plum text-ivory text-xs font-sans font-medium hover:bg-plum-deep shadow-xs transition-colors"
              >
                Inquiries & Joining
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}