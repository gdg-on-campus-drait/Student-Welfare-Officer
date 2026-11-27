import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, CornerDownLeft, ArrowUpRight, X } from 'lucide-react';
import { searchSite } from '../../data/searchIndex';
import { lockScroll } from '../../lib/scroll';
import { useGo } from '../../lib/useGo';
import { SEARCH_EVENT as EVENT } from '../../lib/searchEvents';


const SUGGESTIONS = ['Computer Science', 'Placements', 'Hostel', 'Scholarship', 'Principal', 'Hackathon', 'MBA', 'Library'];

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const go = useGo();

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener(EVENT, show);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener(EVENT, show);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    lockScroll(true);
    const t = setTimeout(() => inputRef.current?.focus(), 20);
    return () => {
      clearTimeout(t);
      lockScroll(false);
    };
  }, [open]);

  const results = useMemo(() => searchSite(q, 14), [q]);

  const close = () => {
    setOpen(false);
    setQ('');
  };
  const choose = (r) => {
    close();
    setTimeout(() => go(r), 30);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') close();
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[active]);
    }
  };

  useEffect(() => {
    listRef.current?.querySelector(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-navy-950/60 px-4 pt-[10vh] backdrop-blur-sm" onMouseDown={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the website"
        className="w-full max-w-2xl animate-fadeUp overflow-hidden rounded-2xl bg-white shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="h-5 w-5 shrink-0 text-navy-500" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search programmes, departments, people, notices…"
            className="h-16 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={results.length ? `sr-${active}` : undefined}
          />
          <button type="button" onClick={close} className="rounded-md border border-line px-2 py-1 text-[11px] text-ink-subtle hover:text-navy-900" aria-label="Close search">
            <span className="hidden sm:inline">Esc</span>
            <X className="h-4 w-4 sm:hidden" aria-hidden />
          </button>
        </div>

        <div ref={listRef} data-lenis-prevent className="max-h-[60vh] overflow-y-auto p-2">
          {!q.trim() && (
            <div className="p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-subtle">Try searching for</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button key={s} type="button" onClick={() => {
                    setQ(s);
                    setActive(0);
                  }} className="chip chip-off">{s}</button>
                ))}
              </div>
            </div>
          )}
          {q.trim() && !results.length && (
            <p className="px-4 py-10 text-center text-sm text-ink-subtle">No results for “{q}”. Try a department, programme or person.</p>
          )}
          <ul id="search-results" role="listbox">
            {results.map((r, i) => (
              <li key={`${r.category}-${r.title}`} id={`sr-${i}`} role="option" aria-selected={i === active} data-i={i}>
                <button
                  type="button"
                  onMouseMove={() => setActive(i)}
                  onClick={() => choose(r)}
                  className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left ${i === active ? 'bg-navy-50' : ''}`}
                >
                  <span className="w-20 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-gold-700">{r.category}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-navy-900">{r.title}</span>
                    {r.text && <span className="block truncate text-xs text-ink-subtle">{r.text}</span>}
                  </span>
                  {r.href ? (
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint" aria-label="opens official site" />
                  ) : (
                    i === active && <CornerDownLeft className="h-4 w-4 shrink-0 text-ink-faint" aria-hidden />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden items-center gap-4 border-t border-line bg-canvas px-5 py-2.5 text-[11px] text-ink-subtle sm:flex">
          <span><kbd className="rounded border border-line bg-white px-1">↑</kbd> <kbd className="rounded border border-line bg-white px-1">↓</kbd> navigate</span>
          <span><kbd className="rounded border border-line bg-white px-1">Enter</kbd> open</span>
          <span><kbd className="rounded border border-line bg-white px-1">/</kbd> or <kbd className="rounded border border-line bg-white px-1">⌘K</kbd> search anywhere</span>
        </div>
      </div>
    </div>
  );
}
