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
        y: 24,
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      });

      gsap.from([leftColRef.current, rightColRef.current], {
        opacity: 0,
        y: 26,
        duration: 0.7,
        stagger: 0.1,
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
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 bg-slate-50/70 border-t border-slate-200/80 relative overflow-hidden"
      aria-label="Student Welfare Officer Helpdesk and Contact"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs uppercase font-sans tracking-widest text-plum font-bold block mb-2">
            Student Helpdesk
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-charcoal font-normal leading-[1.12]">
            Connect with the Welfare Office
          </h2>
          <p className="mt-4 text-charcoal-muted font-sans text-base sm:text-lg leading-relaxed">
            Confidential student guidance, club permissions, scholarship facilitation, or grievance redressal.
          </p>
        </div>

        {/* 2-Column Institutional Form Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Official Desks & Campus Location (5 cols) */}
          <div ref={leftColRef} className="lg:col-span-5 flex flex-col space-y-5">
            {/* Office Location Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Campus Office Location
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted font-sans mt-2.5 leading-relaxed">
                Room 104, Student Welfare Block,<br />
                Dr. Ambedkar Institute of Technology,<br />
                BDA Outer Ring Road, Mallathahalli, Bengaluru – 560056.
              </p>
            </div>

            {/* Working Hours Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-charcoal">
                Desk Hours
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted font-sans mt-2.5 leading-relaxed">
                <strong>Monday – Friday:</strong> 9:00 AM – 5:00 PM<br />
                <strong>Saturday:</strong> 9:00 AM – 1:30 PM
              </p>
            </div>

            {/* Anti-Ragging Helpline Card */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white border-2 border-plum/20 shadow-xs space-y-2">
              <span className="text-plum font-bold uppercase tracking-wider text-xs block font-sans">
                Statutory Anti-Ragging Helpdesk
              </span>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed font-sans">
                Zero-tolerance campus policy. 24x7 Toll-Free National Helpline: <strong className="text-plum font-bold">1800-180-5522</strong>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Student Inquiry Form (7 cols) - Lavender Card Background */}
          <div
            ref={rightColRef}
            className="lg:col-span-7 bg-gradient-to-br from-[#F6EEF8] via-[#F0E4F3] to-[#E9DAEE] p-7 sm:p-10 lg:p-12 rounded-2xl border border-[#D5BFDA] shadow-md"
          >
            <div className="mb-6 pb-4 border-b border-[#D5BFDA]">
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal font-semibold">
                Submit an Inquiry or Welfare Note
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1 font-sans">
                Logged notes are reviewed during official desk hours.
              </p>
            </div>

            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <h4 className="font-serif text-2xl text-charcoal font-semibold">
                  Note Logged Successfully
                </h4>
                <p className="text-sm text-charcoal-muted max-w-sm mx-auto font-sans leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Your note regarding "{formData.category}" has been received by the office.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', usn: '', category: 'General Inquiry', message: '' });
                  }}
                  className="mt-3 px-5 py-2.5 rounded-md text-xs font-sans font-semibold text-plum bg-white border border-[#D5BFDA] hover:bg-white/80 transition-colors cursor-pointer"
                >
                  Submit Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="student-name" className="block text-xs font-semibold text-charcoal mb-1.5">
                      Full Name <span className="text-plum">*</span>
                    </label>
                    <input
                      id="student-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya Rao"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-[#D5BFDA] text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-plum/30 focus:border-plum transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label htmlFor="student-usn" className="block text-xs font-semibold text-charcoal mb-1.5">
                      USN / Department
                    </label>
                    <input
                      id="student-usn"
                      type="text"
                      value={formData.usn}
                      onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                      placeholder="e.g. 1DA22CS045"
                      className="w-full px-3.5 py-2.5 rounded-md bg-white border border-[#D5BFDA] text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-plum/30 focus:border-plum transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-category" className="block text-xs font-semibold text-charcoal mb-1.5">
                    Nature of Inquiry
                  </label>
                  <select
                    id="inquiry-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-[#D5BFDA] text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-plum/30 focus:border-plum transition-all shadow-2xs"
                  >
                    <option value="General Inquiry">General Welfare Inquiry</option>
                    <option value="Clubs & Societies">Student Clubs & Societies Coordination</option>
                    <option value="Counseling & Mentorship">Confidential Guidance Desk</option>
                    <option value="Scholarships & Aid">Scholarship & Concession Desk</option>
                    <option value="Campus Safety & Grievance">Anti-Ragging / Campus Safety Desk</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="student-message" className="block text-xs font-semibold text-charcoal mb-1.5">
                    Details / Narrative <span className="text-plum">*</span>
                  </label>
                  <textarea
                    id="student-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details regarding your inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-md bg-white border border-[#D5BFDA] text-charcoal text-sm focus:outline-none focus:ring-2 focus:ring-plum/30 focus:border-plum resize-none transition-all shadow-2xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-charcoal-muted font-medium">
                    Confidential & Secure Desk
                  </span>
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-md bg-plum hover:bg-plum-deep text-white text-xs font-sans font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer"
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