import React from 'react';
import { HeartHandshake, Compass, Users, Sparkles, BookOpen, Trophy } from 'lucide-react';

const PILLARS = [
  {
    icon: Users,
    title: 'Student Communities',
    desc: 'Empowering student-led technical, cultural, and social clubs to organize campus-wide activities.',
  },
  {
    icon: HeartHandshake,
    title: 'Welfare & Guidance',
    desc: 'Providing dedicated counsel, wellness programs, and a compassionate student support ecosystem.',
  },
  {
    icon: Sparkles,
    title: 'Campus Culture',
    desc: 'Fostering inclusive traditions, annual fests, leadership summits, and vibrant campus life.',
  },
];

export default function OverviewPreview() {
  return (
    <section
      id="overview"
      className="scroll-mt-24 py-20 sm:py-28 bg-white border-t border-lavender-border/50 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold block mb-3">
            Core Mandate • Dr. AIT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal font-normal leading-tight">
            Nurturing student potential beyond the classroom.
          </h2>
          <p className="mt-4 text-charcoal-muted font-sans text-base sm:text-lg leading-relaxed">
            The Student Welfare Office serves as the institutional bridge connecting learners with 
            creative clubs, welfare initiatives, sports forums, and community outreach.
          </p>
        </div>

        {/* Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 rounded-sm bg-ivory/60 border border-lavender-border/60 hover:border-plum/30 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-sm bg-lilac flex items-center justify-center text-plum mb-6 group-hover:bg-lavender transition-colors">
                  <Icon className="w-6 h-6 text-plum" />
                </div>
                <span className="text-xs font-sans tracking-widest uppercase text-charcoal-subtle block mb-1">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium mb-3 group-hover:text-plum transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-charcoal-muted text-sm sm:text-base leading-relaxed font-sans">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Milestone Note */}
        <div className="mt-16 pt-8 border-t border-lavender-border/60 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-subtle gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-plum" />
            <span>Milestone 1 • Editorial Foundation & Hybrid Clubs Showcase</span>
          </div>
          <span>Dr. Ambedkar Institute of Technology • Student Welfare Office</span>
        </div>
      </div>
    </section>
  );
}
