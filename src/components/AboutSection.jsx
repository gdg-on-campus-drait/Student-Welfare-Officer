import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'executive-body', label: 'SWO Executive Body' },
  { id: 'vision-mission', label: 'Vision & Mission' },
  { id: 'scope-functions', label: 'Scope and Functions' },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const containerRef = useRef(null);
  const credoRef = useRef(null);
  const mainPanelRef = useRef(null);
  const contentPaneRef = useRef(null);

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
            </div>

            {/* Right Main Content Pane (8 cols desktop) */}
            <div
              ref={contentPaneRef}
              className="lg:col-span-8 p-6 sm:p-10 lg:p-14 flex flex-col justify-between"
            >
              {/* Tab 1: Overview */}
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

                  <div className="pt-2">
                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold mb-3">
                      Vision
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed">
                      To be a dynamic, inclusive, and forward-looking student representative body at Dr. AIT that champions student interests, nurtures leadership, and promotes excellence in extracurricular engagement, in alignment with the college motto <strong className="text-plum font-semibold">"Learn, Lead and Innovate."</strong>
                    </p>
                  </div>

                  <div className="pt-2">
                    <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold mb-3">
                      Mission
                    </h3>
                    <p className="text-sm sm:text-base text-charcoal/85 font-sans leading-relaxed">
                      To represent the student community with integrity, inclusivity, and responsibility by coordinating and supporting extracurricular initiatives that nurture individual talents, strengthen leadership capabilities, and foster holistic development. Guided by our institutional commitment, the Student Welfare Officer seeks to inspire students to excel academically, serve society, and contribute to a vibrant and value-driven campus culture.
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: SWO Executive Body (With Officer Photo Card Placeholder) */}
              {activeTab === 'executive-body' && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-plum font-semibold block mb-2 font-sans">
                      Executive Leadership
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl text-charcoal font-bold mb-4 tracking-tight">
                      SWO Executive Body
                    </h2>
                    <p className="text-base text-charcoal/85 font-sans leading-relaxed">
                      The Office of Student Welfare operates under the leadership of the Student Welfare Officer, directing campus extracurricular governance, student council liaison, and student well-being.
                    </p>
                  </div>

                  {/* Officer Profile Card with Photo Placeholder */}
                  <div className="p-6 sm:p-8 rounded-xl bg-[#FAF7F8] border border-lavender-border shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
                      {/* Photo Placeholder Frame */}
                      <div className="w-full sm:w-48 md:w-56 aspect-[3/4] rounded-lg border-2 border-dashed border-plum/30 bg-lavender/35 flex flex-col items-center justify-center p-4 text-center shrink-0">
                        <div className="w-14 h-14 rounded-full bg-plum/10 text-plum flex items-center justify-center font-serif text-xl font-bold mb-3 border border-plum/20">
                          SWO
                        </div>
                        <span className="text-xs font-sans font-semibold text-charcoal uppercase tracking-wider">
                          Officer Photo
                        </span>
                        <span className="text-[11px] text-charcoal-muted font-sans mt-1">
                          Placeholder Frame
                        </span>
                      </div>

                      {/* Officer Details & Executive Mandate */}
                      <div className="flex-grow space-y-4">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-plum font-semibold block font-sans">
                            Executive Head
                          </span>
                          <h3 className="font-serif text-2xl text-charcoal font-semibold mt-1">
                            Dean of Student Welfare
                          </h3>
                          <p className="text-xs sm:text-sm text-charcoal-muted font-sans mt-0.5">
                            Office of Student Affairs & Welfare • Dr. AIT Bengaluru
                          </p>
                        </div>

                        <div className="space-y-2 pt-1">
                          <h4 className="text-xs font-sans font-semibold text-charcoal uppercase tracking-wider">
                            Key Administrative Responsibilities
                          </h4>
                          <ul className="space-y-2 text-xs sm:text-sm text-charcoal/85 font-sans leading-relaxed">
                            <li className="flex items-start gap-2">
                              <span className="text-plum font-bold select-none">•</span>
                              <span>Administrative oversight of all student-led clubs, cultural forums, and technical societies.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-plum font-bold select-none">•</span>
                              <span>Chairman of the Campus Student Welfare Advisory and Anti-Ragging Monitoring Cell.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-plum font-bold select-none">•</span>
                              <span>Liaison between student body representatives, department heads, and institutional governance.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Vision & Mission */}
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

              {/* Tab 4: Scope and Functions */}
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

              {/* Bottom Card Footer with Action */}
              <div className="pt-6 flex justify-end">
                <a
                  href="#contact"
                  className="text-xs font-semibold text-plum hover:text-plum-deep uppercase tracking-wider font-sans"
                >
                  Connect with Welfare Office
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}