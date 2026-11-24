import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import draitLogo from '../assets/drait-logo.png';
import draitLogoWhite from '../assets/drait-logo-white.png';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', number: '01', subtitle: 'Welcome & Campus Vision' },
  { label: 'About', href: '#about', number: '02', subtitle: 'Welfare Charter & Mission' },
  { label: 'Clubs', href: '#clubs', number: '03', subtitle: 'Student Societies & Forums' },
  { label: 'Contact', href: '#contact', number: '04', subtitle: 'Helpdesk & Inquiries' },
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
    const sectionIds = ['home', 'about', 'clubs', 'contact'];
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

  // Full-screen overlay menu animation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';

      if (!prefersReducedMotion && overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0, y: -15 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power3.out' }
        );

        if (linksContainerRef.current) {
          const links = linksContainerRef.current.querySelectorAll('.overlay-link');
          gsap.fromTo(
            links,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
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

  const closeMenu = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          setMenuOpen(false);
          document.body.style.overflow = '';
        },
      });
    } else {
      setMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  const handleNavClick = (e, item) => {
    setActiveItem(item.label);
    if (menuOpen) {
      closeMenu();
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
      {/* Main Navbar matching Reference */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
          isScrolled
            ? 'bg-lavender/95 backdrop-blur-md py-2.5 sm:py-3 border-b border-plum/15 shadow-[0_4px_24px_-4px_rgba(81,38,79,0.12)]'
            : 'bg-white py-2.5 sm:py-3 border-b border-lavender-border/80 shadow-xs'
        }`}
      >
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 flex items-center justify-between">
          {/* Brand Institutional Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, { label: 'Home', href: '#home' })}
            className="group flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-plum rounded-sm py-0.5"
            aria-label="Dr. Ambedkar Institute of Technology"
          >
            <img
              src={draitLogo}
              alt="Dr. Ambedkar Institute of Technology"
              className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300"
            />
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
                    className={`relative px-3.5 py-1.5 text-xs lg:text-sm tracking-wide transition-colors duration-200 rounded-sm font-sans focus:outline-none focus-visible:ring-2 focus-visible:ring-plum group ${
                      isActive
                        ? 'text-plum font-semibold'
                        : 'text-charcoal/80 hover:text-plum font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-plum transition-transform duration-300 origin-left ease-out ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* Mobile Menu Toggle Button (Visible only on mobile) */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-plum flex items-center justify-center border text-charcoal hover:text-plum hover:bg-lavender/40 border-lavender-border/70"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close navigation overlay' : 'Open navigation overlay'}
            >
              {menuOpen ? <X className="w-5 h-5 text-plum" /> : <Menu className="w-5 h-5 text-current" />}
            </button>
          </div>
        </div>
      </header>

      {/* 5. Full-Screen Editorial Navigation Overlay (Mobile & Expanded) */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-50 bg-[#FAF7F8] flex flex-col justify-between ${
          menuOpen ? 'flex' : 'hidden'
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Overlay Top Bar */}
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 w-full pt-5 flex items-center justify-between border-b border-lavender-border/70 pb-4">
          <div className="flex items-center">
            <img
              src={draitLogo}
              alt="Dr. Ambedkar Institute of Technology"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </div>

          <button
            type="button"
            onClick={closeMenu}
            className="p-2 rounded-md border border-lavender-border bg-white text-charcoal hover:text-plum hover:border-plum transition-colors focus:outline-none focus:ring-2 focus:ring-plum cursor-pointer"
            aria-label="Close navigation overlay"
          >
            <X className="w-5 h-5 text-plum" />
          </button>
        </div>

        {/* Overlay Main Menu Content: Clean Centered Editorial Links */}
        <div className="max-w-3xl mx-auto px-6 w-full py-12 flex-grow flex items-center justify-center">
          <nav
            ref={linksContainerRef}
            className="w-full flex flex-col space-y-4 sm:space-y-6"
            aria-label="Full-screen navigation links"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="overlay-link group flex items-baseline justify-between py-3 border-b border-lavender-border/60 hover:border-plum transition-colors cursor-pointer"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-serif text-sm sm:text-base text-charcoal-subtle tracking-widest font-normal">
                      {item.number}
                    </span>
                    <span
                      className={`font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight transition-transform duration-300 group-hover:translate-x-2 ${
                        isActive
                          ? 'text-plum font-semibold italic'
                          : 'text-charcoal group-hover:text-plum'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Overlay Bottom Footer */}
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 w-full pb-6 text-xs text-charcoal-subtle flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-lavender-border/60 pt-4">
          <span>Dr. Ambedkar Institute of Technology • Student Welfare Office</span>
          <span className="font-serif italic text-plum">"More Than Academics. A Community to Grow."</span>
        </div>
      </div>
    </>
  );
}
