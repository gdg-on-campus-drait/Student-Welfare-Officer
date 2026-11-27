import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, CalendarDays, ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { EVENTS, officialPage } from '../../data/site';
import { coversDay, formatRange, isUpcoming, parseDate, toISO, todayISO } from '../../lib/dates';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthFmt = new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' });

const TYPE_TONE = {
  Conference: 'bg-navy-900',
  Hackathon: 'bg-gold-500',
  Exhibition: 'bg-navy-500',
  Cultural: 'bg-gold-600',
  Ceremony: 'bg-navy-700',
  default: 'bg-navy-300',
};
const tone = (t) => TYPE_TONE[t] || TYPE_TONE.default;

function buildMonth(year, month) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday-first
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= days; d++) cells.push(toISO(new Date(year, month, d)));
  while (cells.length % 7) cells.push(null);
  return cells;
}

export default function EventsCalendar() {
  const today = todayISO();
  const now = parseDate(today);
  const [cursor, setCursor] = useState({ y: now.getFullYear(), m: now.getMonth() });
  const [selected, setSelected] = useState(null);
  const [tab, setTab] = useState('upcoming');

  const cells = useMemo(() => buildMonth(cursor.y, cursor.m), [cursor]);
  const upcoming = useMemo(() => EVENTS.filter(isUpcoming).sort((a, b) => a.start.localeCompare(b.start)), []);
  const past = useMemo(() => EVENTS.filter((e) => !isUpcoming(e)).sort((a, b) => b.start.localeCompare(a.start)), []);

  const move = (delta) => {
    setSelected(null);
    setCursor(({ y, m }) => {
      const d = new Date(y, m + delta, 1);
      return { y: d.getFullYear(), m: d.getMonth() };
    });
  };
  const jumpTo = (iso) => {
    const d = parseDate(iso);
    setCursor({ y: d.getFullYear(), m: d.getMonth() });
    setSelected(iso);
  };

  const list = selected ? EVENTS.filter((e) => coversDay(e, selected)) : tab === 'upcoming' ? upcoming : past.slice(0, 8);

  return (
    <Section id="events">
      <div className="container-site">
        <SectionHeading
          eyebrow="Events calendar"
          title="Conferences, hackathons, fests and ceremonies."
          intro="Browse the campus calendar month by month, or jump straight to what’s coming up next."
          action={
            <SmartLink href={officialPage('Calendar-of-Events')} className="link-arrow">
              Academic calendar of events <ArrowUpRight className="h-4 w-4" aria-hidden />
            </SmartLink>
          }
        />

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Month grid */}
          <div data-reveal className="card p-5 sm:p-7 lg:col-span-7">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl text-navy-900" aria-live="polite">
                {monthFmt.format(new Date(cursor.y, cursor.m, 1))}
              </h3>
              <div className="flex items-center gap-1.5">
                <button type="button" onClick={() => jumpTo(today)} className="chip chip-off mr-1">Today</button>
                <button type="button" onClick={() => move(-1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-navy-300" aria-label="Previous month">
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                </button>
                <button type="button" onClick={() => move(1)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line hover:border-navy-300" aria-label="Next month">
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-wide text-ink-subtle">
              {WEEKDAYS.map((d) => (
                <div key={d} className="pb-3">{d.slice(0, 1)}<span className="hidden sm:inline">{d.slice(1)}</span></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((iso, i) => {
                if (!iso) return <div key={i} />;
                const dayEvents = EVENTS.filter((e) => coversDay(e, iso));
                const isToday = iso === today;
                const isSel = iso === selected;
                return (
                  <button
                    key={iso}
                    type="button"
                    onClick={() => setSelected(isSel ? null : iso)}
                    aria-pressed={isSel}
                    aria-label={`${formatRange(iso)}${dayEvents.length ? `, ${dayEvents.length} event${dayEvents.length > 1 ? 's' : ''}` : ''}`}
                    className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition-all sm:aspect-[1.15] ${
                      isSel
                        ? 'bg-navy-900 text-white shadow-lift'
                        : dayEvents.length
                          ? 'bg-navy-50 font-semibold text-navy-900 hover:bg-navy-100'
                          : 'text-ink-muted hover:bg-canvas'
                    } ${isToday && !isSel ? 'ring-2 ring-gold-500' : ''}`}
                  >
                    {Number(iso.slice(8))}
                    {dayEvents.length > 0 && (
                      <span className="absolute bottom-1.5 flex gap-0.5">
                        {dayEvents.slice(0, 3).map((e) => (
                          <span key={e.title} className={`h-1.5 w-1.5 rounded-full ${isSel ? 'bg-gold-300' : tone(e.type)}`} />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-ink-subtle">
              {['Conference', 'Hackathon', 'Exhibition', 'Cultural', 'Ceremony'].map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${tone(t)}`} /> {t}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-navy-300" /> Other</span>
            </div>
          </div>

          {/* Agenda */}
          <div data-reveal className="flex flex-col lg:col-span-5">
            <div className="flex items-center justify-between gap-3">
              {selected ? (
                <>
                  <p className="font-display text-lg text-navy-900">{formatRange(selected)}</p>
                  <button type="button" onClick={() => setSelected(null)} className="text-xs font-semibold text-navy-700 hover:text-gold-700">Clear date</button>
                </>
              ) : (
                <div className="flex gap-2">
                  {[['upcoming', `Upcoming (${upcoming.length})`], ['past', 'Recent']].map(([k, l]) => (
                    <button key={k} type="button" aria-pressed={tab === k} onClick={() => setTab(k)} className={`chip ${tab === k ? 'chip-on' : 'chip-off'}`}>{l}</button>
                  ))}
                </div>
              )}
            </div>
            <ul className="mt-5 space-y-3">
              {list.map((e) => (
                <li key={e.title}>
                  <button
                    type="button"
                    onClick={() => jumpTo(e.start)}
                    className="card group flex w-full items-start gap-4 p-4 text-left transition-colors hover:border-navy-200"
                  >
                    <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-line bg-canvas">
                      <span className="font-display text-xl leading-none text-navy-900">{Number(e.start.slice(8))}</span>
                      <span className="mt-0.5 text-[10px] uppercase tracking-wide text-ink-subtle">
                        {parseDate(e.start).toLocaleString('en-IN', { month: 'short' })} {e.start.slice(2, 4)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-gold-700">
                        <span className={`h-1.5 w-1.5 rounded-full ${tone(e.type)}`} /> {e.type}
                      </span>
                      <p className="mt-1 text-sm font-medium leading-snug text-navy-900">{e.title}</p>
                      <p className="mt-1 text-xs text-ink-subtle">{formatRange(e.start, e.end)}</p>
                    </div>
                  </button>
                </li>
              ))}
              {!list.length && (
                <li className="flex flex-col items-center rounded-2xl border border-dashed border-line py-12 text-center text-sm text-ink-subtle">
                  <CalendarDays className="mb-2 h-6 w-6 text-ink-faint" aria-hidden />
                  No events listed for this day.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
