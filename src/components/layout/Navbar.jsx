import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Search, X, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import { NAV, QUICK_LINKS, INSTITUTE } from '../../data/site';
import { lockScroll } from '../../lib/scroll';
import { openSearch } from '../../lib/searchEvents';
import draitLogo from '../../assets/drait-logo.png';
import draitLogoWhite from '../../assets/drait-logo-white.png';

export default function Navbar() {
  const { pathname } = useLocation();
  const overHero = pathname === '/' || pathname === '/student-welfare';
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openMenu, setOpenMenu] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const navRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, y / h) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menus on route change (derived during render, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpenMenu(null);
    setDrawer(false);
  }

  // Close on outside click / Escape

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setDrawer(false);
      }
    };
    const onDown = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  useEffect(() => {
    lockScroll(drawer);
    return () => lockScroll(false);
  }, [drawer]);

  const solid = scrolled || !overHero || openMenu !== null;

  const hoverOpen = (label) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          solid ? 'bg-white/95 text-navy-900 shadow-nav backdrop-blur-xl' : 'bg-transparent text-white'
        }`}
      >
        {/* Utility bar */}
        <div
          className={`hidden overflow-hidden border-b transition-all duration-300 lg:block ${
            scrolled ? 'max-h-0 border-transparent opacity-0' : 'max-h-10 opacity-100'
          } ${solid ? 'border-line' : 'border-white/15'}`}
        >
          <div className={`container-site flex h-9 items-center justify-between text-[12px] ${solid ? 'text-ink-muted' : 'text-white/80'}`}>
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> Mallathahalli, Bengaluru 560056
              </span>
              <a href="tel:9900113406" className="inline-flex items-center gap-1.5 hover:text-gold-500">
                <Phone className="h-3.5 w-3.5" aria-hidden /> 99001 13406
              </a>
            </div>
            <nav aria-label="Quick links" className="flex items-center gap-5">
              {QUICK_LINKS.map((q) => (
                <SmartLink key={q.label} to={q.to} href={q.href} className="transition-colors hover:text-gold-500">
                  {q.label}
                </SmartLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="container-site flex h-[68px] items-center justify-between gap-6">
          <SmartLink to="/#top" className="shrink-0 rounded-sm" aria-label={`${INSTITUTE.name} — home`}>
            <img
              src={solid ? draitLogo : draitLogoWhite}
              alt={INSTITUTE.name}
              width="577"
              height="94"
              className="h-8 w-auto sm:h-9"
            />
          </SmartLink>

          {/* Desktop menu */}
          <nav aria-label="Main" className="hidden items-center lg:flex">
            {NAV.map((group) => {
              const isOpen = openMenu === group.label;
              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => hoverOpen(group.label)}
                  onMouseLeave={hoverClose}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={() => setOpenMenu(isOpen ? null : group.label)}
                    className={`group inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors xl:px-4 ${
                      solid ? 'hover:bg-navy-50' : 'hover:bg-white/10'
                    } ${isOpen ? (solid ? 'bg-navy-50' : 'bg-white/10') : ''}`}
                  >
                    {group.label}
                    <ChevronDown className={`h-3.5 w-3.5 opacity-60 transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                  </button>

                  <div
                    className={`absolute left-1/2 top-full w-[300px] -translate-x-1/2 pt-3 transition-all duration-200 ${
                      isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 text-navy-900 shadow-lift">
                      <div className="h-0.5 w-full rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-transparent" />
                      <ul className="pt-1.5">
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <SmartLink
                              to={item.to}
                              href={item.href}
                              onClick={() => setOpenMenu(null)}
                              className="group/item flex items-start justify-between gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-navy-50"
                            >
                              <span>
                                <span className="block text-sm font-medium">{item.label}</span>
                                {item.desc && <span className="mt-0.5 block text-xs text-ink-subtle">{item.desc}</span>}
                              </span>
                              {item.href && (
                                <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint transition group-hover/item:text-gold-600" aria-label="(official site)" />
                              )}
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors ${
                solid ? 'border-line text-ink-muted hover:border-navy-300 hover:text-navy-900' : 'border-white/30 text-white/90 hover:bg-white/10'
              }`}
              aria-label="Search the website"
            >
              <Search className="h-4 w-4" aria-hidden />
              <span className="hidden xl:inline">Search</span>
              <kbd className={`hidden rounded border px-1.5 text-[10px] font-medium xl:inline ${solid ? 'border-line' : 'border-white/30'}`}>⌘K</kbd>
            </button>
            <SmartLink
              to="/#contact"
              className={`hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:inline-flex ${
                solid ? 'bg-navy-900 text-white hover:bg-navy-700' : 'bg-gold-500 text-navy-950 hover:bg-gold-300'
              }`}
            >
              Contact
            </SmartLink>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
                solid ? 'border-line' : 'border-white/30'
              }`}
              aria-label="Open menu"
              aria-expanded={drawer}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-[2px] bg-gold-500 transition-[width] duration-150" style={{ width: `${progress * 100}%` }} aria-hidden />
      </header>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
    </>
  );
}

function MobileDrawer({ open, onClose }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <div className={`fixed inset-0 z-[60] overflow-hidden lg:hidden ${open ? '' : 'pointer-events-none invisible'} transition-[visibility] ${open ? '' : 'delay-300'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-lenis-prevent
        className={`absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-lift transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-[68px] items-center justify-between border-b border-line px-5">
          <img src={draitLogo} alt="Dr. Ambedkar Institute of Technology" className="h-7 w-auto" />
          <button type="button" onClick={onClose} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line" aria-label="Close menu">
            <X className="h-5 w-5 text-navy-900" aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="mb-3 flex w-full items-center gap-2 rounded-xl border border-line px-4 py-3 text-sm text-ink-muted"
          >
            <Search className="h-4 w-4" aria-hidden /> Search programmes, people, notices…
          </button>
          {NAV.map((g) => {
            const isOpen = expanded === g.label;
            return (
              <div key={g.label} className="border-b border-line last:border-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : g.label)}
                  className="flex w-full items-center justify-between px-3 py-4 text-left font-display text-lg text-navy-900"
                >
                  {g.label}
                  <ChevronDown className={`h-4 w-4 text-ink-subtle transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] pb-3' : 'grid-rows-[0fr]'}`}>
                  <ul className="overflow-hidden">
                    {g.items.map((item) => (
                      <li key={item.label}>
                        <SmartLink
                          to={item.to}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-ink-muted hover:bg-navy-50 hover:text-navy-900"
                        >
                          {item.label}
                          {item.href && <ArrowUpRight className="h-3.5 w-3.5 text-ink-faint" aria-hidden />}
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-line p-5">
          <SmartLink to="/#contact" onClick={onClose} className="flex w-full items-center justify-center rounded-full bg-navy-900 py-3 text-sm font-semibold text-white">
            Contact Dr. AIT
          </SmartLink>
        </div>
      </aside>
    </div>
  );
}
