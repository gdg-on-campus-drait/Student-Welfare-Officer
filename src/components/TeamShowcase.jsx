import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const GOVERNANCE_ROLES = [
  {
    category: 'executive',
    code: 'DSW',
    designation: 'Dean of Student Welfare',
    body: 'Executive Leadership',
    appointeeStatus: '[Official Appointee • PVPWT / Dr. AIT Administration]',
    scope: 'Chief administrative custodian of campus student welfare policies and club allocations.',
    responsibilities: [
      'Executive oversight of all student-led clubs, cultural forums, and technical societies.',
      'Chairman of the Campus Student Welfare Advisory and Anti-Ragging Monitoring Cell.',
    ],
  },
  {
    category: 'executive',
    code: 'ADSW',
    designation: 'Associate Dean — Student Affairs',
    body: 'Faculty Governance',
    appointeeStatus: '[Official Faculty Nominee • PVPWT Administration]',
    scope: 'Directs administrative coordination with departmental welfare coordinators and hostel councils.',
    responsibilities: [
      'Supervision of hostel welfare councils and residential amenities.',
      'Operational coordination for campus extracurricular calendars.',
    ],
  },
  {
    category: 'coordinator',
    code: 'FCC',
    designation: 'Faculty Coordinator — Cultural Affairs',
    body: 'Cultural Advisory Council',
    appointeeStatus: '[Faculty Advisory Nominee • Cultural Affairs]',
    scope: 'Mentorship for Sanskriti cultural forum, theatrical productions, and annual fests.',
    responsibilities: [
      'Guiding student organizers for the Annual Cultural Festival.',
      'Mentorship for inter-collegiate dance, music, and theater contingents.',
    ],
  },
  {
    category: 'coordinator',
    code: 'FCT',
    designation: 'Faculty Coordinator — Technical Forums',
    body: 'Technical Steering Panel',
    appointeeStatus: '[Faculty Advisory Nominee • Technical Forums]',
    scope: 'Supports Technothon engineering society, hackathons, robotics, and coding circles.',
    responsibilities: [
      'Advisory oversight for 24-hour hackathons and technical summits.',
      'Facilitating laboratory and hardware prototyping resources.',
    ],
  },
  {
    category: 'coordinator',
    code: 'FCS',
    designation: 'Faculty Coordinator — Sports & Athletics',
    body: 'Sports Advisory Council',
    appointeeStatus: '[Department of Physical Education, Dr. AIT]',
    scope: 'Oversees athletic training, VTU tournament selections, and campus sports tournaments.',
    responsibilities: [
      'Fielding Dr. AIT athletic teams for VTU tournaments.',
      'Organizing the Annual Inter-Departmental Sports Championships.',
    ],
  },
  {
    category: 'student',
    code: 'SCR',
    designation: 'Student Council General Convenors',
    body: 'Elected Student Body',
    appointeeStatus: '[Elected Student Representatives • Current Academic Term]',
    scope: 'Democratic student voice articulating class feedback and club initiatives to the Welfare Office.',
    responsibilities: [
      'Representing student feedback during regular SWO consultative meetings.',
      'Coordination between individual club leads and the Welfare Office desk.',
    ],
  },
];

export default function TeamShowcase() {
  const [filter, setFilter] = useState('all');
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const filteredRoles =
    filter === 'all'
      ? GOVERNANCE_ROLES
      : GOVERNANCE_ROLES.filter((r) => r.category === filter);

  // ScrollTrigger entrance on viewport scroll
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      gsap.from(headerRef.current, {
        opacity: 0,
        y: 26,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.governance-card');
        gsap.from(cards, {
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

  // 4. Officer Profile Reveal: Smooth filter switch transition
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !gridRef.current) return;

    setTimeout(() => {
      const cards = gridRef.current.querySelectorAll('.governance-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 14, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, stagger: 0.06, ease: 'power2.out' }
      );
    }, 10);
  };

  return (
    <section
      id="team"
      ref={containerRef}
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 bg-white border-t border-lavender-border/60 relative overflow-hidden"
      aria-label="Student Welfare Governance and Leadership"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-plum" />
            <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold">
              Governance Framework
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
            The Office of Student Welfare Governance
          </h2>
          <p className="mt-4 text-charcoal-muted font-sans text-base sm:text-lg leading-relaxed">
            Faculty leadership, specialized forum advisors, and elected student convenors.
          </p>
        </div>

        {/* Filter Controls with interactive active pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-10 scrollbar-none no-scrollbar">
          {[
            { id: 'all', label: 'All Roles' },
            { id: 'executive', label: 'Executive Deans' },
            { id: 'coordinator', label: 'Forum Mentors' },
            { id: 'student', label: 'Student Council' },
          ].map((item) => {
            const isActive = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleFilterChange(item.id)}
                className={`shrink-0 px-4 py-2 rounded-sm text-xs sm:text-sm font-sans font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum ${
                  isActive
                    ? 'bg-plum text-ivory shadow-subtle'
                    : 'bg-ivory hover:bg-lilac text-charcoal border border-lavender-border/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Governance Roles Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {filteredRoles.map((role) => (
            <div key={role.code} className="relative group">
              <div
                className="governance-card p-7 sm:p-8 rounded-sm bg-[#FAF7F8] border border-lavender-border/80 group-hover:border-plum/40 transition-all duration-300 flex flex-col justify-between group-hover:-translate-y-1 group-hover:shadow-editorial h-full"
              >
                <div>
                  {/* Header: Monogram Emblem with subtle hover glow */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="w-10 h-10 rounded-sm bg-plum flex items-center justify-center text-ivory font-serif font-bold text-sm tracking-wider shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:bg-plum-deep">
                      {role.code}
                    </div>
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider px-2 py-0.5 rounded bg-lilac text-plum">
                      {role.body}
                    </span>
                  </div>

                  {/* Designation */}
                  <h3 className="font-serif text-lg font-medium text-charcoal leading-snug mb-1 group-hover:text-plum transition-colors">
                    {role.designation}
                  </h3>

                  {/* Official Placeholder Badge */}
                  <div className="mb-3">
                    <span className="text-[10px] font-sans text-charcoal-subtle bg-white px-1.5 py-0.5 rounded border border-lavender-border/70 inline-block">
                      {role.appointeeStatus}
                    </span>
                  </div>

                  {/* Scope Description (Concise) */}
                  <p className="text-xs text-charcoal-muted font-sans leading-relaxed mb-4">
                    {role.scope}
                  </p>

                  {/* Key Responsibilities Checklist (2 items only) */}
                  <div className="space-y-1.5 pt-3 border-t border-lavender-border/60">
                    {role.responsibilities.map((item, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-charcoal/80 font-sans">
                        <div className="w-1.5 h-1.5 rounded-full bg-plum/60 mt-1.5 shrink-0" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3 border-t border-lavender-border/50 text-[11px] font-sans text-charcoal-subtle flex items-center justify-between">
                  <span>Dr. AIT Campus</span>
                  <span className="text-plum font-medium">Official Desk</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice */}
        <div className="mt-8 p-3.5 rounded-sm bg-lilac/40 border border-lavender-border text-xs text-charcoal-muted flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-plum shrink-0" />
          <span>
            Official appointments are notified on the administrative bulletin board as per Dr. AIT regulations.
          </span>
        </div>
      </div>
    </section>
  );
}
