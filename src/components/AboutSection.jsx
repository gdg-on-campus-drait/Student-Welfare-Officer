import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'vision-mission', label: 'Vision & Mission' },
  { id: 'scope-functions', label: 'Scope and Functions' },
  { id: 'support-charter', label: 'Support Desks & Charter' },
];

const CHARTER_PILLARS = [
  {
    id: 'mentorship',
    title: 'Mentorship & Counseling',
    summary: 'Confidential personal guidance, mental wellness desks, and peer support circles.',
    details: [
      'Accessible faculty mentorship and confidential student counseling.',
      'Wellness workshops, stress relief seminars, and first-year orientation.',
    ],
  },
  {
    id: 'safety',
    title: 'Campus Safety & Anti-Ragging',
    summary: 'Zero-tolerance compliance guaranteeing a welcoming, secure campus for all.',
    details: [
      'Statutory compliance monitoring and 24x7 anti-ragging squad.',
      'Confidential reporting channels with prompt administrative support.',
    ],
  },
  {
    id: 'representation',
    title: 'Student Voice & Clubs',
    summary: 'Bridging student perspectives with administration to power campus life.',
    details: [
      'Liaison for student council convenors and student club leads.',
      'Transparent grievance redressal and leadership development forums.',
    ],
  },
  {
    id: 'inclusion',
    title: 'Scholarships & Welfare',
    summary: 'Assisting scholars with merit scholarships, equal access, and resources.',
    details: [
      'Guidance on state, central, and trust-sponsored fee concessions.',
      'Equal Opportunity Cell ensuring barrier-free campus accessibility.',
    ],
  },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const [activePillarId, setActivePillarId] = useState('mentorship');
  const containerRef = useRef(null);
  const credoRef = useRef(null);
  const mainPanelRef = useRef(null);
  const contentPaneRef = useRef(null);

  const activePillar = CHARTER_PILLARS.find((p) => p.id === activePillarId) || CHARTER_PILLARS[0];

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

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

      gsap.from(mainPanelRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: mainPanelRef.current,
          start: 'top 82%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !contentPaneRef.current) return;

    gsap.fromTo(
      contentPaneRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
    );
  };

  return (
    <section
      id="about"
      ref={containerRef}
      className="scroll-mt-24 py-16 sm:py-24 lg:py-28 bg-[#FAF7F8] border-t border-lavender-border/60 relative overflow-hidden"
      aria-label="About the Student Welfare Officer"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Centered Institutional Credo */}
        <div
          ref={credoRef}
          className="mb-14 sm:mb-20 py-8 sm:py-12 border-b border-lavender-border/80 text-center flex justify-center"
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="text-xs font-sans uppercase tracking-widest text-plum font-semibold block mb-3">
              Institutional Credo
            </span>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-charcoal font-normal italic leading-relaxed text-balance">
              "Ensuring every learner at Dr. AIT discovers not only an engineering degree, 
              but an environment fostering empathy, leadership, and resilient character."
            </blockquote>
          </div>
        </div>

        {/* Institutional Section Matching University Layout Reference */}
        <div
          ref={mainPanelRef}
          className="bg-white rounded-xl sm:rounded-2xl border border-lavender-border shadow-editorial overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            {/* Left Sidebar Navigation (4 cols desktop) */}
            <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-lavender-border/80 p-6 sm:p-8 bg-[#FAF7F8]/60 flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-plum font-semibold block mb-1">
                    Student Welfare Officer
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-semibold">
                    Institutional Framework
                  </h3>
                </div>

                <nav className="flex flex-col gap-2" aria-label="About sections">
                  {TABS.map((tab) => {
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id)}
                        className={`text-left px-4 py-3.5 rounded-lg font-sans text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-between cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-plum ${
                          isSelected
                            ? 'bg-[#EADBE6] text-plum font-semibold shadow-xs border-l-4 border-plum'
                            : 'text-charcoal/80 hover:bg-lavender/30 hover:text-charcoal'
                        }`}
                      >
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Institutional Details Footer in Sidebar */}
              <div className="pt-6 mt-8 border-t border-lavender-border/80 text-xs font-sans text-charcoal-muted space-y-1">
                <p className="font-semibold text-charcoal">Dr. Ambedkar Institute of Technology</p>
                <p>Autonomous Institution • VTU Affiliated</p>
                <p>Bengaluru, Karnataka</p>
              </div>
            </div>

            {/* Right Main Content Pane (8 cols desktop) */}
            <div
              ref={contentPaneRef}
              className="lg:col-span-8 p-6 sm:p-10 lg:p-14 flex flex-col justify-between"
            >
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold mb-5 tracking-tight">
                      Overview
                    </h2>
                    <p className="text-base sm:text-lg text-charcoal/85 font-sans leading-relaxed">
                      The <strong className="text-plum font-semibold">Student Welfare Officer (SWO)</strong> of Dr. Ambedkar Institute of Technology functions as a student-centric representative body committed to enhancing the overall student experience. Serving as a vital link between students and the institution, the SWO promotes leadership, collaboration, and active participation while supporting the holistic development of the student community. Guided by the values and educational philosophy of Dr. AIT, the SWO strives to create an inclusive and engaging campus environment.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-lavender-border/80">
                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold mb-3">
                      Vision
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed">
                      To be a dynamic, inclusive, and forward-looking student representative body at Dr. AIT that champions student interests, nurtures leadership, and promotes excellence in extracurricular engagement, in alignment with the college motto <strong className="text-plum font-semibold">"Learn, Lead and Innovate."</strong>
                    </p>
                  </div>

                  <div className="pt-6 border-t border-lavender-border/80">
                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold mb-3">
                      Mission
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed">
                      To represent the student community with integrity, inclusivity, and responsibility by coordinating and supporting extracurricular initiatives that nurture individual talents, strengthen leadership capabilities, and foster holistic development. Guided by our institutional commitment, the Student Welfare Officer seeks to inspire students to excel academically, serve society, and contribute to a vibrant and value-driven campus culture.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'vision-mission' && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-plum font-semibold block mb-2 font-sans">
                      Institutional Charter
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold mb-4 tracking-tight">
                      Vision & Mission
                    </h2>
                  </div>

                  <div className="p-6 sm:p-8 rounded-xl bg-lavender/30 border border-lavender-border">
                    <h3 className="font-serif text-2xl text-charcoal font-semibold mb-3">Our Vision</h3>
                    <p className="text-base text-charcoal/90 font-sans leading-relaxed">
                      To be a dynamic, inclusive, and forward-looking student representative body at Dr. Ambedkar Institute of Technology that champions student interests, nurtures leadership, and promotes excellence in extracurricular engagement.
                    </p>
                  </div>

                  <div className="p-6 sm:p-8 rounded-xl bg-lilac/30 border border-lavender-border">
                    <h3 className="font-serif text-2xl text-charcoal font-semibold mb-3">Our Mission</h3>
                    <ul className="space-y-3 text-sm sm:text-base text-charcoal/90 font-sans leading-relaxed">
                      <li className="flex items-start gap-2.5">
                        <span className="text-plum font-bold select-none">•</span>
                        <span>Represent the student body with transparent communication and administrative integrity.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-plum font-bold select-none">•</span>
                        <span>Coordinate student societies spanning cultural, technical, sports, and civic outreach.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="text-plum font-bold select-none">•</span>
                        <span>Champion student welfare, mental well-being, equal opportunity, and campus safety.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'scope-functions' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-plum font-semibold block mb-2 font-sans">
                      Mandate & Governance
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold mb-4 tracking-tight">
                      Scope and Functions
                    </h2>
                    <p className="text-base text-charcoal/85 font-sans leading-relaxed mb-6">
                      The Student Welfare Officer serves as the focal operational hub connecting academic administration, faculty mentors, and student bodies across four primary spheres:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-lg border border-lavender-border bg-white shadow-xs">
                      <h4 className="font-serif text-lg font-semibold text-charcoal mb-2">Policy & Conduct Oversight</h4>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                        Implementation of campus student welfare policies, code of conduct enforcement, and statutory anti-ragging compliance.
                      </p>
                    </div>

                    <div className="p-5 rounded-lg border border-lavender-border bg-white shadow-xs">
                      <h4 className="font-serif text-lg font-semibold text-charcoal mb-2">Student Forum Administration</h4>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                        Resource allocation, event venue facilitation, and scheduling approval for cultural, technical, and sports societies.
                      </p>
                    </div>

                    <div className="p-5 rounded-lg border border-lavender-border bg-white shadow-xs">
                      <h4 className="font-serif text-lg font-semibold text-charcoal mb-2">Grievance & Redressal Liaison</h4>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                        Structured, confidential mechanism for addressing individual and cohort student grievances with institutional leadership.
                      </p>
                    </div>

                    <div className="p-5 rounded-lg border border-lavender-border bg-white shadow-xs">
                      <h4 className="font-serif text-lg font-semibold text-charcoal mb-2">Welfare & Scholarship Desks</h4>
                      <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                        Facilitating merit concessions, financial welfare support, hostel welfare amenities, and disability accessibility.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'support-charter' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-plum font-semibold block mb-2 font-sans">
                      Support Desks
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold mb-4 tracking-tight">
                      Student Welfare Charter
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {CHARTER_PILLARS.map((p) => {
                      const isPillarSelected = p.id === activePillarId;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setActivePillarId(p.id)}
                          className={`p-4 rounded-lg border text-left transition-all duration-200 cursor-pointer ${
                            isPillarSelected
                              ? 'bg-lavender/60 border-plum shadow-xs'
                              : 'bg-white border-lavender-border hover:bg-lavender/20'
                          }`}
                        >
                          <h4 className="font-serif text-sm font-semibold text-charcoal">{p.title}</h4>
                          <span className="text-[11px] text-charcoal-muted block font-sans mt-0.5">View support desk</span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-6 rounded-xl bg-[#FAF7F8] border border-lavender-border">
                    <h4 className="font-serif text-xl font-semibold text-charcoal mb-2">{activePillar.title}</h4>
                    <p className="text-sm text-charcoal-muted mb-4 font-sans">{activePillar.summary}</p>
                    <div className="space-y-2">
                      {activePillar.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-charcoal/90 font-sans">
                          <span className="text-plum font-bold select-none">•</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Card Footer with Action */}
              <div className="pt-8 mt-8 border-t border-lavender-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-charcoal-subtle font-sans">
                  Official Administrative Desk • Dean of Student Welfare
                </span>
                <a
                  href="#contact"
                  className="text-xs font-semibold text-plum hover:text-plum-deep uppercase tracking-wider font-sans"
                >
                  Connect with Welfare Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}