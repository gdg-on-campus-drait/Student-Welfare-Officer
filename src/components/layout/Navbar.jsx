import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Search, X, Mail } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import { SWO } from '../../content';
import { NAV } from '../../content/navigation';
import { lockScroll } from '../../lib/scroll';
import { openSearch } from '../../lib/searchEvents';
import crest from '../../assets/drait-crest.png';


function Brand({ light }) {
  return (
    <SmartLink to="/" className="flex shrink-0 items-center gap-3 rounded-sm" aria-label="Student Welfare Office, Dr. AIT — home">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white p-1 shadow-sm ring-1 ring-black/5">
        <img src={crest} alt="" width="82" height="74" className="h-full w-full object-contain" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[17px] font-semibold ${light ? 'text-white' : 'text-navy-900'}`}>Student Welfare Office</span>
        <span className={`block text-[11px] tracking-wide ${light ? 'text-white/70' : 'text-ink-subtle'}`}>Dr. Ambedkar Institute of Technology</span>
      </span>
    </SmartLink>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [drawer, setDrawer] = useState(false);

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setDrawer(false);
  }

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

  useEffect(() => {
    lockScroll(drawer);
    const onKey = (e) => e.key === 'Escape' && setDrawer(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [drawer]);

  // Every page opens on a dark hero, so the bar is transparent until scrolled.
  const solid = scrolled;

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${solid ? 'bg-white/95 shadow-nav backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="container-site flex h-[72px] items-center justify-between gap-6">
          <Brand light={!solid} />

          <nav aria-label="Main" className="hidden items-center xl:flex">
            {NAV.slice(1).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                    solid ? 'text-navy-900 hover:bg-navy-50' : 'text-white/90 hover:bg-white/10 hover:text-white'
                  } ${isActive ? (solid ? 'bg-navy-50 !text-navy-900' : 'bg-white/15 !text-white') : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              className={`inline-flex h-10 items-center gap-2 rounded-full border px-3 text-sm transition-colors ${
                solid ? 'border-line text-ink-muted hover:border-navy-300 hover:text-navy-900' : 'border-white/30 text-white/90 hover:bg-white/10'
              }`}
              aria-label="Search clubs, fests and events"
            >
              <Search className="h-4 w-4" aria-hidden />
              <kbd className={`hidden rounded border px-1.5 text-[10px] font-medium 2xl:inline ${solid ? 'border-line' : 'border-white/30'}`}>⌘K</kbd>
            </button>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border xl:hidden ${solid ? 'border-line text-navy-900' : 'border-white/30 text-white'}`}
              aria-label="Open menu"
              aria-expanded={drawer}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 h-[2px] bg-accent-500 transition-[width] duration-150" style={{ width: `${progress * 100}%` }} aria-hidden />
      </header>

      {/* Mobile / tablet drawer */}
      <div className={`fixed inset-0 z-[60] overflow-hidden xl:hidden ${drawer ? '' : 'pointer-events-none invisible delay-300'} transition-[visibility]`} aria-hidden={!drawer}>
        <div className={`absolute inset-0 bg-navy-950/50 backdrop-blur-sm transition-opacity duration-300 ${drawer ? 'opacity-100' : 'opacity-0'}`} onClick={() => setDrawer(false)} />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-lift transition-transform duration-300 ease-out ${drawer ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-line px-5">
            <p className="font-display text-lg text-navy-900">Menu</p>
            <button type="button" onClick={() => setDrawer(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line" aria-label="Close menu">
              <X className="h-5 w-5 text-navy-900" aria-hidden />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
            {NAV.map((item, i) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-baseline gap-4 rounded-xl px-4 py-3 font-display text-xl transition-colors ${isActive ? 'bg-navy-900 text-white' : 'text-navy-900 hover:bg-navy-50'}`
                }
              >
                <span className="text-xs text-ink-faint">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="border-t border-line p-5">
            <a href={`mailto:${SWO.email}`} className="flex w-full items-center justify-center gap-2 rounded-full bg-navy-900 py-3 text-sm font-semibold text-white">
              <Mail className="h-4 w-4" aria-hidden /> {SWO.email}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
