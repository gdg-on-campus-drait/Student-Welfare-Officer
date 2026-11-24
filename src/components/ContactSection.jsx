import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    category: 'General Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

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

      gsap.from([leftColRef.current, rightColRef.current], {
        opacity: 0,
        y: 28,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 82%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 bg-white border-t border-lavender-border/60 relative overflow-hidden"
      aria-label="Student Welfare Officer Helpdesk and Contact"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold block mb-2">
            Student Helpdesk
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
            Connect with the Welfare Office
          </h2>
          <p className="mt-4 text-charcoal-muted font-sans text-base sm:text-lg leading-relaxed">
            Confidential student counseling, club permissions, scholarship guidance, or grievance redressal.
          </p>
        </div>

        {/* 2-Column Hybrid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Official Desks & Campus Location (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col space-y-5">
            {/* Office Location */}
            <div className="p-5 rounded-sm bg-[#FAF7F8] border border-lavender-border/80">
              <h3 className="font-serif text-base font-semibold text-charcoal">
                Campus Office Location
              </h3>
              <p className="text-xs text-charcoal-muted font-sans mt-2 leading-relaxed">
                Room 104, Student Welfare Block,<br />
                Dr. Ambedkar Institute of Technology,<br />
                BDA Outer Ring Road, Mallathahalli, Bengaluru – 560056.
              </p>
            </div>

            {/* Working Hours */}
            <div className="p-5 rounded-sm bg-[#FAF7F8] border border-lavender-border/80">
              <h3 className="font-serif text-base font-semibold text-charcoal">
                Desk Hours
              </h3>
              <p className="text-xs text-charcoal-muted font-sans mt-2 leading-relaxed">
                <strong>Mon – Fri:</strong> 9:00 AM – 5:00 PM<br />
                <strong>Saturday:</strong> 9:00 AM – 1:30 PM
              </p>
            </div>

            {/* Anti-Ragging Helpline */}
            <div className="p-5 rounded-sm bg-lilac/50 border border-lavender-border text-xs text-charcoal-muted space-y-1.5">
              <span className="text-plum font-semibold uppercase tracking-wider text-[11px] block">
                Statutory Anti-Ragging Helpdesk
              </span>
              <p className="text-xs leading-relaxed">
                Zero-tolerance campus. 24x7 Toll-Free National Helpline: <strong>1800-180-5522</strong>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Student Inquiry Form (7 cols) */}
          <div ref={rightColRef} className="lg:col-span-7 bg-[#FAF7F8] p-6 sm:p-8 rounded-sm border border-lavender-border/80 shadow-editorial">
            <div className="mb-5 pb-3 border-b border-lavender-border/60">
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal font-medium">
                Submit an Inquiry or Welfare Note
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5 font-sans">
                Logged notes are reviewed during official desk hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <h4 className="font-serif text-xl text-charcoal font-medium">
                  Note Logged
                </h4>
                <p className="text-xs text-charcoal-muted max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your note regarding "{formData.category}" has been recorded.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', usn: '', category: 'General Inquiry', message: '' });
                  }}
                  className="mt-2 px-4 py-2 rounded-sm text-xs font-sans font-medium text-plum border border-lavender-border hover:bg-lilac transition-colors"
                >
                  Submit Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label htmlFor="student-name" className="block text-xs font-medium text-charcoal mb-1">
                      Full Name <span className="text-plum">*</span>
                    </label>
                    <input
                      id="student-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Rao"
                      className="w-full px-3 py-2 rounded-sm bg-white border border-lavender-border text-charcoal text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-plum"
                    />
                  </div>

                  <div>
                    <label htmlFor="student-usn" className="block text-xs font-medium text-charcoal mb-1">
                      USN / Department
                    </label>
                    <input
                      id="student-usn"
                      type="text"
                      value={formData.usn}
                      onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                      placeholder="e.g. 1DA22CS045"
                      className="w-full px-3 py-2 rounded-sm bg-white border border-lavender-border text-charcoal text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-plum"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-category" className="block text-xs font-medium text-charcoal mb-1">
                    Nature of Inquiry
                  </label>
                  <select
                    id="inquiry-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm bg-white border border-lavender-border text-charcoal text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-plum"
                  >
                    <option value="General Inquiry">General Welfare Inquiry</option>
                    <option value="Clubs & Societies">Student Clubs & Societies Coordination</option>
                    <option value="Counseling & Mentorship">Confidential Guidance Desk</option>
                    <option value="Scholarships & Aid">Scholarship & Concession Desk</option>
                    <option value="Campus Safety & Grievance">Anti-Ragging / Campus Safety Desk</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="student-message" className="block text-xs font-medium text-charcoal mb-1">
                    Details / Narrative <span className="text-plum">*</span>
                  </label>
                  <textarea
                    id="student-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your inquiry..."
                    className="w-full px-3 py-2 rounded-sm bg-white border border-lavender-border text-charcoal text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-plum resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal-muted">
                    Confidential & Secure Desk
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-sm bg-plum text-ivory text-xs font-sans font-medium hover:bg-plum-deep shadow-xs transition-colors cursor-pointer"
                  >
                    Submit Note
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}