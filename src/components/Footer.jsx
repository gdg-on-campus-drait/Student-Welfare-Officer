import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-lavender/90 border-t border-plum/15 py-12 sm:py-16 text-charcoal font-sans">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-plum/15">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-xl tracking-wider text-charcoal">
                SWO
              </span>
              <span className="w-[1px] h-5 bg-plum/20" />
              <span className="font-serif text-lg font-semibold text-charcoal">
                Student Welfare Office
              </span>
            </div>
            <p className="text-xs text-charcoal-muted mt-2 max-w-md leading-relaxed">
              Dr. Ambedkar Institute of Technology, BDA Outer Ring Road, Near Jnana Bharathi Campus,
              Mallathahalli, Bengaluru – 560056, Karnataka, India.
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-plum/20 hover:border-plum text-xs font-medium text-charcoal hover:text-plum transition-colors bg-white/80 shadow-xs cursor-pointer"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
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
