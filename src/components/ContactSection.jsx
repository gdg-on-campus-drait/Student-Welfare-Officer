import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  MapPin,
  Clock,
  ShieldAlert,
  Send,
  CheckCircle
} from 'lucide-react';
import MagneticButton from './MagneticButton';

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

  // ScrollTrigger reveal
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
      aria-label="Student Welfare Office Helpdesk and Contact"
    >
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-plum" />
            <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold">
              Student Helpdesk
            </span>
          </div>
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
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-lilac text-plum flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-medium text-charcoal">
                    Campus Office Location
                  </h3>
                  <p className="text-xs text-charcoal-muted font-sans mt-1 leading-relaxed">
                    Room 104, Student Welfare Block,<br />
                    Dr. Ambedkar Institute of Technology,<br />
                    BDA Outer Ring Road, Mallathahalli, Bengaluru – 560056.
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-5 rounded-sm bg-[#FAF7F8] border border-lavender-border/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-lilac text-plum flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-medium text-charcoal">
                    Desk Hours
                  </h3>
                  <p className="text-xs text-charcoal-muted font-sans mt-1 leading-relaxed">
                    <strong>Mon – Fri:</strong> 9:00 AM – 5:00 PM<br />
                    <strong>Saturday:</strong> 9:00 AM – 1:30 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Anti-Ragging Helpline */}
            <div className="p-5 rounded-sm bg-lilac/50 border border-lavender-border text-xs text-charcoal-muted space-y-1.5">
              <div className="flex items-center gap-1.5 text-plum font-semibold uppercase tracking-wider text-[10px]">
                <ShieldAlert className="w-3.5 h-3.5 text-plum" />
                <span>Statutory Anti-Ragging Helpdesk</span>
              </div>
              <p className="text-xs">
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
                <div className="w-12 h-12 rounded-full bg-lilac text-plum flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6 text-plum" />
                </div>
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
                      placeholder="e.g. 1DA21CS001"
                      className="w-full px-3 py-2 rounded-sm bg-white border border-lavender-border text-charcoal text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-plum"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="inquiry-category" className="block text-xs font-medium text-charcoal mb-1">
                    Inquiry Category
                  </label>
                  <select
                    id="inquiry-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-sm bg-white border border-lavender-border text-charcoal text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-plum"
                  >
                    <option value="General Inquiry">General Welfare Inquiry</option>
                    <option value="Student Clubs Support">Student Clubs & Societies</option>
                    <option value="Scholarship Guidance">Scholarships & Fee Concessions</option>
                    <option value="Counseling Appointment">Counseling Appointment</option>
                    <option value="Anti-Ragging Consultation">Anti-Ragging Consultation</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry-message" className="block text-xs font-medium text-charcoal mb-1">
                    Message / Concern <span className="text-plum">*</span>
                  </label>
                  <textarea
                    id="inquiry-message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly state your concern..."
                    className="w-full px-3 py-2 rounded-sm bg-white border border-lavender-border text-charcoal text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-plum resize-none"
                  />
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-charcoal-subtle">
                    * Required fields
                  </span>
                  <MagneticButton strength={0.25}>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-sm bg-plum text-ivory text-xs font-medium hover:bg-plum-deep shadow-subtle transition-all"
                    >
                      <span>Submit</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
