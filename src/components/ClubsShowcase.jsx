import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  CheckCircle2,
  Calendar,
  ArrowRight,
  Palette,
  Cpu,
  Trophy,
  BookOpen,
  HeartHandshake
} from 'lucide-react';

import culturalImg from '../assets/clubs/cultural.jpg';
import techImg from '../assets/clubs/tech.jpg';
import sportsImg from '../assets/clubs/sports.jpg';
import literaryImg from '../assets/clubs/literary.jpg';
import outreachImg from '../assets/clubs/outreach.jpg';

gsap.registerPlugin(ScrollTrigger);

const CLUBS = [
  {
    id: 'sanskriti',
    shortName: 'Sanskriti',
    fullName: 'Sanskriti Cultural & Arts Forum',
    category: 'Cultural & Arts',
    icon: Palette,
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
    icon: Cpu,
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
    icon: Trophy,
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
    icon: BookOpen,
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
    icon: HeartHandshake,
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
];

export default function ClubsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const gridRef = useRef(null);
  const detailsRef = useRef(null);

  const selectedClub = CLUBS[activeIndex];

  // ScrollTrigger reveal for section
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from('.clubs-header-reveal', {
        opacity: 0,
        y: 26,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });

      if (gridRef.current) {
        gsap.from(gridRef.current.children, {
          opacity: 0,
          y: 28,
          duration: 0.65,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 82%',
          },
        });
      }
    },
    { scope: containerRef }
  );

  const handleSelectClub = (index) => {
    setActiveIndex(index);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && detailsRef.current) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0.4, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      );
    }
  };

  return (
    <section
      id="clubs"
      ref={containerRef}
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 bg-[#FAF7F8] border-t border-lavender-border/60 relative overflow-hidden"
      aria-label="Student Clubs and Communities Showcase"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 clubs-header-reveal">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-plum" />
              <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold">
                Student Life & Forums
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
              Communities That Shape Campus Life
            </h2>
            <p className="mt-4 text-charcoal-muted font-sans text-base sm:text-lg leading-relaxed">
              Student-governed societies spanning cultural arts, engineering challenges, athletic competition, and civic action.
            </p>
          </div>

          {/* Institutional Clubs Counter */}
          <div className="shrink-0">
            <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold px-4 py-1.5 rounded-full bg-lilac border border-lavender-border">
              {CLUBS.length} Student Societies
            </span>
          </div>
        </div>

        {/* All Clubs Grid — All Visible Simultaneously Without Horizontal Scrolling */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8"
        >
          {CLUBS.map((club, idx) => {
            const isActive = idx === activeIndex;
            const Icon = club.icon;
            return (
              <div
                key={club.id}
                onClick={() => handleSelectClub(idx)}
                className={`group relative rounded-sm transition-all duration-300 cursor-pointer flex flex-col ${
                  isActive
                    ? 'ring-2 ring-plum ring-offset-4 ring-offset-[#FAF7F8] shadow-editorial-lg scale-[1.02]'
                    : 'opacity-85 hover:opacity-100 hover:shadow-editorial hover:-translate-y-1'
                }`}
              >
                {/* Editorial Image Card */}
                <div className="relative aspect-[3/4] sm:aspect-[4/5] rounded-sm overflow-hidden bg-lilac border border-lavender-border shadow-sm flex flex-col justify-between p-5 sm:p-6 text-white">
                  <img
                    src={club.image}
                    alt={club.fullName}
                    className="absolute inset-0 w-full h-full object-cover object-center filter saturate-[0.98] transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/40 pointer-events-none" />

                  {/* Top Bar on Card */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-white/95 text-plum backdrop-blur-xs">
                      {club.category}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-charcoal/60 backdrop-blur-md flex items-center justify-center text-ivory text-xs font-serif font-bold">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Bottom Content on Card */}
                  <div className="relative z-10 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-lavender" />
                      <span className="text-[11px] uppercase tracking-wider font-semibold text-lavender">
                        {club.shortName}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-medium leading-snug text-white">
                      {club.fullName}
                    </h3>
                    <p className="text-xs text-ivory/85 font-sans line-clamp-2 leading-relaxed pt-0.5">
                      {club.tagline}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Club Detailed Content Panel: Expansive Layout */}
        <div
          ref={detailsRef}
          className="mt-10 sm:mt-12 p-8 sm:p-10 lg:p-12 rounded-sm bg-white border border-lavender-border shadow-editorial transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-lilac text-plum">
                  {selectedClub.category}
                </span>
                <span className="text-xs text-charcoal-subtle font-sans">
                  Active Club Focus
                </span>
              </div>
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
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-ivory border border-lavender-border text-xs text-charcoal font-sans"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-plum" />
                    <span>{act}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col sm:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-lavender-border/60 md:pl-6 space-y-3">
              <div className="flex items-center gap-1.5 text-xs text-charcoal-muted font-sans">
                <Calendar className="w-3.5 h-3.5 text-plum" />
                <span>{selectedClub.facultyCoordination}</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-plum text-ivory text-xs font-sans font-medium hover:bg-plum-deep shadow-xs transition-colors group"
              >
                <span>Inquiries & Joining</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
