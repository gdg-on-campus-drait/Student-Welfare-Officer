import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, ArrowUpRight, GraduationCap, MapPin, Mail, Phone } from 'lucide-react';
import MagneticButton from './MagneticButton';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', number: '01', subtitle: 'Welcome & Campus Vision' },
  { label: 'About', href: '#about', number: '02', subtitle: 'Mission & Welfare Charter' },
  { label: 'Clubs', href: '#clubs', number: '03', subtitle: 'Student Societies & Forums' },
  { label: 'Team', href: '#team', number: '04', subtitle: 'Governance & Leadership' },
  { label: 'Activities', href: '#activities', number: '05', subtitle: 'Events & Campus Life' },
  { label: 'Contact', href: '#contact', number: '06', subtitle: 'Helpdesk & Inquiries' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const overlayRef = useRef(null);
  const linksContainerRef = useRef(null);

  // Scroll tracking and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollY / totalHeight)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section Observer for active navigation indicator
  useEffect(() => {
    const sectionIds = ['home', 'about', 'clubs', 'team', 'activities', 'contact'];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matchingItem = NAV_ITEMS.find((item) => item.href === `#${entry.target.id}`);
            if (matchingItem) {
              setActiveItem(matchingItem.label);
            }
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Full-screen overlay menu animation (Gravelle du Parc style)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';

      if (!prefersReducedMotion && overlayRef.current) {
        const tl = gsap.timeline();
        tl.fromTo(
          overlayRef.current,
          { opacity: 0, yPercent: -4 },
          { opacity: 1, yPercent: 0, duration: 0.45, ease: 'power3.out' }
        );

        if (linksContainerRef.current) {
          const links = linksContainerRef.current.querySelectorAll('.overlay-link');
          tl.fromTo(
            links,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
            '-=0.25'
          );
        }
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e, item) => {
    setActiveItem(item.label);
    if (menuOpen) {
      setMenuOpen(false);
    }
    if (item.href.startsWith('#')) {
      const target = document.querySelector(item.href);
      if (target) {
        e.preventDefault();
        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: -70 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* 5. Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-plum via-lavender to-plum origin-left z-50 pointer-events-none transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: 'left' }}
        aria-hidden="true"
      />

      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${isScrolled
          ? 'bg-ivory/92 backdrop-blur-md py-3.5 border-b border-lavender-border/70 shadow-[0_4px_24px_-4px_rgba(81,38,79,0.08)]'
          : 'bg-transparent py-5 sm:py-6'
          }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between">
          {/* Brand Wordmark & Institutional Identity */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, { label: 'Home', href: '#home' })}
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum rounded-sm"
            aria-label="Student Welfare Office homepage"
          >
            <span className="font-serif font-bold text-2xl tracking-wider text-charcoal group-hover:text-plum transition-colors duration-200">
              SWO
            </span>
            <span className="hidden sm:inline-block w-[1px] h-7 bg-lavender-border" />

            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-charcoal font-semibold leading-tight group-hover:text-plum transition-colors duration-200">
                Student Welfare Office
              </span>
              <span className="text-[11px] sm:text-xs text-charcoal-muted tracking-wide font-sans font-normal">
                Dr. Ambedkar Institute of Technology, Bengaluru
              </span>
            </div>
          </a>

          {/* Desktop Links + Fullscreen Menu Trigger */}
          <div className="flex items-center gap-2 lg:gap-4">
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeItem === item.label;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`relative px-3 py-1.5 text-xs lg:text-sm tracking-wide transition-colors duration-200 rounded-sm font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-plum group ${isActive
                      ? 'text-plum font-semibold'
                      : 'text-charcoal/80 hover:text-plum font-medium'
                      }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-[1.5px] bg-plum transition-transform duration-300 origin-left ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Quick Portal Action */}
            <MagneticButton strength={0.25} className="hidden lg:block ml-2">
              <a
                href="#clubs"
                onClick={(e) => handleNavClick(e, { label: 'Clubs', href: '#clubs' })}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide bg-lilac hover:bg-lavender text-plum border border-lavender-border transition-all duration-200 hover:shadow-xs group"
              >
                <span>Campus Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </MagneticButton>

            {/* Menu Toggle Button (Triggers Gravelle du Parc Full-screen Overlay) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-sm text-charcoal hover:text-plum hover:bg-lavender/40 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-plum flex items-center gap-2 text-xs font-sans font-medium border border-lavender-border/70"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation overlay' : 'Open navigation overlay'}
            >
              <span className="hidden sm:inline-block uppercase tracking-wider text-[11px]">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
              {menuOpen ? <X className="w-5 h-5 text-plum" /> : <Menu className="w-5 h-5 text-plum" />}
            </button>
          </div>
        </div>
      </header>

      {/* 5. Full-Screen Editorial Navigation Overlay (Gravelle du Parc Style) */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 bg-[#FAF7F8] flex flex-col justify-between transition-all duration-400 ease-in-out ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!menuOpen}
      >
        {/* Overlay Top Bar */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-6 flex items-center justify-between border-b border-lavender-border/70 pb-5">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-xl tracking-wider text-charcoal">
              SWO
            </span>
            <span className="w-[1px] h-5 bg-lavender-border" />
            <span className="font-serif text-base font-semibold text-charcoal">
              Student Welfare Office • Dr. AIT
            </span>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full border border-lavender-border bg-white text-charcoal hover:text-plum hover:border-plum transition-colors focus:outline-none focus:ring-2 focus:ring-plum"
            aria-label="Close navigation overlay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overlay Main Menu Content */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full py-8 sm:py-12 flex-grow flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full items-center">
            {/* Left: Staggered Large Editorial Links */}
            <nav
              ref={linksContainerRef}
              className="lg:col-span-8 flex flex-col space-y-2 sm:space-y-4"
              aria-label="Full-screen navigation links"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeItem === item.label;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className="overlay-link group flex items-baseline justify-between py-2 border-b border-lavender-border/50 hover:border-plum transition-colors"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-serif text-xs sm:text-sm text-charcoal-subtle tracking-widest font-normal">
                        {item.number}
                      </span>
                      <span
                        className={`font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight transition-transform duration-300 group-hover:translate-x-2 ${isActive ? 'text-plum font-semibold italic' : 'text-charcoal group-hover:text-plum'
                          }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <span className="hidden sm:inline-block text-xs font-sans text-charcoal-subtle uppercase tracking-widest">
                      {item.subtitle}
                    </span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Institutional Coordinates Panel */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-sm border border-lavender-border/80 shadow-editorial space-y-5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-plum" />
                <span className="text-xs uppercase font-sans tracking-widest text-plum font-semibold">
                  Campus Coordinates
                </span>
              </div>
              <div>
                <h4 className="font-serif text-lg text-charcoal font-medium">
                  Dr. Ambedkar Institute of Technology
                </h4>
                <p className="text-xs text-charcoal-muted font-sans mt-1 leading-relaxed">
                  Autonomous Institution Affiliated to VTU, Belagavi.<br />
                  BDA Outer Ring Road, Near Jnana Bharathi Campus, Mallathahalli, Bengaluru – 560056.
                </p>
              </div>

              <div className="pt-3 border-t border-lavender-border/60 text-xs text-charcoal-muted space-y-1 font-sans">
                <p>Office Hours: Mon – Fri: 9:00 AM – 5:00 PM</p>
                <p>National Anti-Ragging Helpline: 1800-180-5522</p>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Bottom Footer */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pb-6 text-xs text-charcoal-subtle flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-lavender-border/60 pt-4">
          <span>Dr. Ambedkar Institute of Technology • Student Welfare Office</span>
          <span className="font-serif italic text-plum">"More Than Academics. A Community to Grow."</span>
        </div>
      </div>
    </>
  );
}
