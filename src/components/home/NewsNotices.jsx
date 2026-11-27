import { useMemo, useState } from 'react';
import { ArrowUpRight, Bell, Pin, Search, Trophy } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { NOTICES, OFFICIAL } from '../../data/site';
import { daysUntil, formatRange, isUpcoming, parseDate } from '../../lib/dates';
import motorsports from '../../assets/campus/motorsports.webp';

const CATEGORIES = ['All', ...Array.from(new Set(NOTICES.map((n) => n.category)))];

/** Status derived from today's date — no manual "new" flags to maintain. */
function status(n) {
  if (!n.date) return null;
  if (!isUpcoming(n)) return { label: 'Concluded', tone: 'bg-canvas text-ink-subtle' };
  const d = daysUntil(n.date);
  if (d <= 0) return { label: 'Happening now', tone: 'bg-emerald-50 text-emerald-800' };
  if (d <= 30) return { label: `In ${d} day${d === 1 ? '' : 's'}`, tone: 'bg-gold-50 text-gold-700' };
  return { label: 'Upcoming', tone: 'bg-navy-50 text-navy-700' };
}

const rank = (n) => (n.pinned ? 0 : n.date && isUpcoming(n) ? 1 : n.date ? 3 : 2);

export default function NewsNotices() {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');

  const notices = useMemo(() => {
    const t = q.trim().toLowerCase();
    return NOTICES.filter((n) => (cat === 'All' || n.category === cat) && (!t || n.title.toLowerCase().includes(t))).sort(
      (a, b) => rank(a) - rank(b) || (a.date || '').localeCompare(b.date || '')
    );
  }, [cat, q]);

  const story = NOTICES.find((n) => n.id === 'dronacharya');
  const secondary = NOTICES.filter((n) => ['navonmeshos-2026', 'ieee-reasoning-ai'].includes(n.id));

  return (
    <Section id="notices" tone="canvas">
      <div className="container-site">
        <SectionHeading
          eyebrow="News & Announcements"
          title="What’s happening at Dr. AIT."
          action={
            <SmartLink href={`${OFFICIAL}/home/index`} className="link-arrow">
              All news on the official site <ArrowUpRight className="h-4 w-4" aria-hidden />
            </SmartLink>
          }
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* News */}
          <div id="news" className="flex scroll-mt-24 flex-col gap-5 lg:col-span-5">
            <SmartLink data-reveal href={story.href} className="group relative block overflow-hidden rounded-3xl bg-navy-950 text-white shadow-lift">
              <img src={motorsports} alt="Dr. AIT Motor Sports Club and Saranyu Racing Team with their Formula Student car" loading="lazy" className="aspect-[16/10] w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy-950">
                  <Trophy className="h-3 w-3" aria-hidden /> Achievement
                </span>
                <h3 className="mt-3 font-display text-xl leading-snug sm:text-2xl">Dronacharya Award for the faculty mentor of the Dr. AIT Motor Sports Club</h3>
                <p className="mt-2 line-clamp-2 text-sm text-white/75">{story.title}</p>
              </div>
            </SmartLink>
            {secondary.map((n) => (
              <SmartLink data-reveal key={n.id} href={n.href} className="card card-hover group flex items-start gap-4 p-5">
                <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-900 text-white">
                  <span className="font-display text-lg leading-none">{n.date.slice(8)}</span>
                  <span className="mt-0.5 text-[10px] uppercase tracking-wide text-gold-300">
                    {parseDate(n.date).toLocaleString('en-IN', { month: 'short' })}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold-700">{n.category}</p>
                  <h3 className="mt-1 text-sm font-semibold leading-snug text-navy-900 group-hover:text-navy-700">{n.title}</h3>
                </div>
              </SmartLink>
            ))}
          </div>

          {/* Notice board */}
          <div data-reveal className="card flex flex-col lg:col-span-7">
            <div className="flex flex-col gap-4 border-b border-line p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="flex items-center gap-2 font-display text-xl text-navy-900">
                  <Bell className="h-5 w-5 text-gold-600" aria-hidden /> Notice board
                </h3>
                <label className="relative w-44 sm:w-56">
                  <span className="sr-only">Filter notices</span>
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" aria-hidden />
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter notices" className="field py-2 pl-8 text-xs" />
                </label>
              </div>
              <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1">
                {CATEGORIES.map((c) => (
                  <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`chip shrink-0 ${cat === c ? 'chip-on' : 'chip-off'}`}>
                    {c}
                    <span className="ml-1.5 opacity-60">{c === 'All' ? NOTICES.length : NOTICES.filter((n) => n.category === c).length}</span>
                  </button>
                ))}
              </div>
            </div>
            <ul data-lenis-prevent className="max-h-[540px] flex-1 divide-y divide-line overflow-y-auto" aria-live="polite">
              {notices.map((n) => {
                const s = status(n);
                return (
                  <li key={n.id}>
                    <SmartLink href={n.href} className="group flex gap-4 px-6 py-4 transition-colors hover:bg-canvas sm:px-7">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[11px]">
                          <span className="font-semibold uppercase tracking-wide text-gold-700">{n.category}</span>
                          {n.pinned && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-navy-50 px-2 py-0.5 font-medium text-navy-700">
                              <Pin className="h-3 w-3" aria-hidden /> Important
                            </span>
                          )}
                          {s && <span className={`rounded-full px-2 py-0.5 font-medium ${s.tone}`}>{s.label}</span>}
                        </div>
                        <p className="mt-1.5 text-sm font-medium leading-snug text-navy-900 group-hover:underline group-hover:decoration-gold-500 group-hover:underline-offset-4">
                          {n.title}
                        </p>
                        {n.date && <p className="mt-1 text-xs text-ink-subtle">{formatRange(n.date, n.endDate)}</p>}
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600" aria-hidden />
                    </SmartLink>
                  </li>
                );
              })}
              {!notices.length && <li className="px-7 py-12 text-center text-sm text-ink-subtle">No notices match your filter.</li>}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
