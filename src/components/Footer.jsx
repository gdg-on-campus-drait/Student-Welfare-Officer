import React from 'react';
import draitLogo from '../assets/drait-logo.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-lavender/90 border-t border-plum/15 py-12 sm:py-16 text-charcoal font-sans">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-plum/15">
          <div>
            <div className="flex flex-col items-start gap-1">
              <img
                src={draitLogo}
                alt="Dr. Ambedkar Institute of Technology"
                className="h-9 sm:h-11 w-auto object-contain"
              />
              <span className="text-xs font-sans font-bold tracking-[0.18em] uppercase text-plum pl-0.5">
                Student Welfare Officer
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-3 max-w-md leading-relaxed">
              Dr. Ambedkar Institute of Technology, BDA Outer Ring Road, Near Jnana Bharathi Campus,
              Mallathahalli, Bengaluru – 560056, Karnataka, India.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center px-4 py-2 rounded-sm border border-plum/20 hover:border-plum text-xs font-medium text-charcoal hover:text-plum transition-colors bg-white/80 shadow-xs cursor-pointer"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top ↑</span>
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal/70">
          <p>
            © {new Date().getFullYear()} Student Welfare Office, Dr. AIT Bengaluru. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-charcoal cursor-default transition-colors">Autonomous Institution</span>
            <span className="hover:text-charcoal cursor-default transition-colors">Affiliated to VTU</span>
            <span className="hover:text-charcoal cursor-default transition-colors">Managed by PVP Welfare Trust</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
