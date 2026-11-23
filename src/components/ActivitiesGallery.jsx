import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Calendar,
  MapPin,
  X,
  ArrowUpRight,
  Users
} from 'lucide-react';

import festImg from '../assets/activities/fest.jpg';
import hackathonImg from '../assets/activities/hackathon.jpg';
import sportsImg from '../assets/clubs/sports.jpg';
import seminarImg from '../assets/activities/seminar.jpg';
import communityImg from '../assets/activities/community.jpg';
import inductionImg from '../assets/activities/induction.jpg';

gsap.registerPlugin(ScrollTrigger);

const ACTIVITIES = [
  {
    id: 'sanskriti-fest',
    title: 'Sanskriti Annual Cultural Festival',
    category: 'cultural',
    categoryLabel: 'Cultural & Arts',
    season: 'Annual • Spring Term',
    venue: 'Open Air Theater & Quadrangle',
    organizer: 'Sanskriti Cultural Forum',
    image: festImg,
    summary:
      'The university’s signature celebration featuring inter-collegiate music, theater, classical dance, and fine arts showcases.',
    highlights: [
      'Inter-collegiate western and classical music competitions',
      'Theatrical street plays and stage drama productions',
      'Student artisan stalls and fine arts exhibitions',
    ],
  },
  {
    id: 'technothon-hackathon',
    title: 'Technothon 24-Hour Campus Hackathon',
    category: 'technical',
    categoryLabel: 'Technical & Coding',
    season: 'Autumn Term',
    venue: 'Advanced Computing Labs',
    organizer: 'Technothon Technical Forum',
    image: hackathonImg,
    summary:
      'A 24-hour engineering challenge where student teams develop software solutions, IoT hardware, and algorithmic tools.',
    highlights: [
      'Problem statements spanning AI, IoT, and sustainability',
      'Mentorship hours with engineering alumni and tech specialists',
      'Hardware prototyping bench with sensor kits',
    ],
  },
  {
    id: 'annual-sports-meet',
    title: 'Annual Athletic Championship & VTU Trials',
    category: 'sports',
    categoryLabel: 'Athletics & Sports',
    season: 'Winter Sports Calendar',
    venue: 'Dr. AIT Sports Complex',
    organizer: 'Kreeda Sports Council',
    image: sportsImg,
    summary:
      'Inter-departmental athletic meet and selection tournament for athletes representing Dr. AIT at VTU tournaments.',
    highlights: [
      'Track and field events: 100m, 400m, relays, and long jump',
      'Inter-branch cricket, football, and basketball matches',
      'Selection trials for university-level zonal representations',
    ],
  },
  {
    id: 'innovation-symposium',
    title: 'National Innovation & Technical Symposium',
    category: 'technical',
    categoryLabel: 'Technical & Research',
    season: 'Bi-Annual Series',
    venue: 'Silver Jubilee Auditorium',
    organizer: 'SWO Academic Committee',
    image: seminarImg,
    summary:
      'Academic lectures by distinguished scientists, student paper exhibitions, and panels on emerging engineering frontiers.',
    highlights: [
      'Invited lectures from research organizations and industry',
      'Student technical paper publication and poster sessions',
      'Panel discussions on sustainable engineering',
    ],
  },
  {
    id: 'community-blood-drive',
    title: 'NSS Mega Blood Donation & Social Camp',
    category: 'community',
    categoryLabel: 'Community Service',
    season: 'Civic Outreach Term',
    venue: 'Student Activity Center',
    organizer: 'NSS Wing & Red Cross',
    image: communityImg,
    summary:
      'A collaborative humanitarian initiative with hospital blood banks for voluntary blood donation and rural assistance.',
    highlights: [
      'Collection of voluntary blood donations for public health banks',
      'Rural educational book donation drives organized by volunteers',
      'Eco-sustainability campaigns and campus tree plantation',
    ],
  },
  {
    id: 'freshers-induction',
    title: 'Freshers Campus Life Orientation',
    category: 'cultural',
    categoryLabel: 'Orientation & Life',
    season: 'Academic Commencement',
    venue: 'Main Campus Auditorium',
    organizer: 'SWO & Student Council',
    image: inductionImg,
    summary:
      'Welcoming incoming first-year scholars into campus life, introducing them to clubs, mentors, and welfare support.',
    highlights: [
      'Comprehensive briefing on student welfare support and counseling',
      'Interactive club showcase and open recruitment stalls',
      'Guided campus tour of central library, sports arena, and labs',
    ],
  },
];

export default function ActivitiesGallery() {
  const [filter, setFilter] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const filteredActivities =
    filter === 'all'
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.category === filter);

  // ScrollTrigger cascade for activity cards
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
        const cards = gridRef.current.querySelectorAll('.activity-card');
        gsap.from(cards, {
          opacity: 0,
          y: 30,
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

  return (
    <section
      id="activities"
      ref={containerRef}
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 bg-[#FAF7F8] border-t border-lavender-border/60 relative overflow-hidden"
      aria-label="Campus Life and Activities Gallery"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-plum" />
            <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold">
              Campus Life & Events
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
            Moments That Define the Campus Journey
          </h2>
          <p className="mt-4 text-charcoal-muted font-sans text-base sm:text-lg leading-relaxed">
            From cultural festivals and 24-hour hackathons to VTU athletic championships and community outreach.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 mb-10 scrollbar-none no-scrollbar">
          {[
            { id: 'all', label: 'All Events' },
            { id: 'cultural', label: 'Cultural & Arts' },
            { id: 'technical', label: 'Technical & Coding' },
            { id: 'sports', label: 'Athletics & Sports' },
            { id: 'community', label: 'Community Service' },
          ].map((item) => {
            const isActive = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`shrink-0 px-4 py-2 rounded-sm text-xs sm:text-sm font-sans font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum ${
                  isActive
                    ? 'bg-plum text-ivory shadow-subtle'
                    : 'bg-white hover:bg-lilac text-charcoal border border-lavender-border/80'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Activities Gallery Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredActivities.map((activity) => (
            <div
              key={activity.id}
              onClick={() => setSelectedActivity(activity)}
              className="activity-card group cursor-pointer rounded-sm bg-white border border-lavender-border/80 shadow-subtle hover:shadow-editorial hover:border-plum/40 transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
            >
              {/* Photo with subtle hover zoom */}
              <div className="relative aspect-[16/10] overflow-hidden bg-lilac">
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover object-center filter saturate-[0.98] transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold uppercase tracking-wider bg-white/95 text-plum border border-lavender-border">
                    {activity.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-ivory text-xs font-sans">
                  <span className="text-[10px] font-medium tracking-wide opacity-90 truncate">
                    {activity.season}
                  </span>
                  <span className="w-5 h-5 rounded-full bg-white/90 text-plum flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110">
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Card Body (Concise) */}
              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-serif text-lg text-charcoal font-medium leading-snug group-hover:text-plum transition-colors mb-1.5">
                    {activity.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted font-sans leading-relaxed line-clamp-2 mb-3.5">
                    {activity.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-lavender-border/60 flex items-center justify-between text-[11px] text-charcoal-subtle font-sans">
                  <div className="flex items-center gap-1 truncate pr-2">
                    <MapPin className="w-3 h-3 text-plum shrink-0" />
                    <span className="truncate">{activity.venue}</span>
                  </div>
                  <span className="text-plum font-medium shrink-0 group-hover:underline">
                    Details
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Activity Detail Modal (Smooth transition) */}
      {selectedActivity && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal/60 backdrop-blur-sm transition-all"
        >
          <div
            className="relative w-full max-w-xl bg-white rounded-sm shadow-editorial-lg border border-lavender-border overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-lilac overflow-hidden shrink-0">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent pointer-events-none" />

              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-charcoal/70 hover:bg-charcoal text-white transition-colors focus:outline-none focus:ring-2 focus:ring-plum"
                aria-label="Close modal dialog"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 text-ivory">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-semibold uppercase tracking-wider bg-plum text-ivory">
                  {selectedActivity.categoryLabel}
                </span>
                <h3 id="modal-title" className="font-serif text-xl sm:text-2xl font-medium mt-1 leading-snug">
                  {selectedActivity.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 font-sans">
              <p className="text-xs sm:text-sm text-charcoal leading-relaxed">
                {selectedActivity.summary}
              </p>

              {/* Highlights */}
              <div className="bg-ivory p-3.5 rounded-sm border border-lavender-border">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-plum block mb-2">
                  Event Highlights
                </span>
                <div className="space-y-1.5 text-xs text-charcoal-muted">
                  {selectedActivity.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-plum mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-muted pt-2 border-t border-lavender-border">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-plum" />
                  <span>{selectedActivity.season}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-plum" />
                  <span>{selectedActivity.venue}</span>
                </div>
              </div>

              {/* Close Footer */}
              <div className="pt-3 border-t border-lavender-border flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedActivity(null)}
                  className="px-4 py-2 rounded-sm bg-plum text-ivory text-xs font-medium hover:bg-plum-deep transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
