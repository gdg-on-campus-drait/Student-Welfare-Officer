import { useMemo, useState } from 'react';
import { CalendarDays, Search, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import FilterChips from '../components/ui/FilterChips';
import EmptyState from '../components/ui/EmptyState';
import SmartLink from '../components/ui/SmartLink';
import EventCard from '../components/cards/EventCard';
import { EVENT_TYPES, SOCIAL, SWO, upcomingEvents, pastEvents } from '../content';
import usePageTitle from '../lib/usePageTitle';

const ALL = 'All types';

export default function EventsPage() {
  usePageTitle('Events — SWO, Dr. AIT');
  const upcoming = useMemo(() => upcomingEvents(), []);
  const past = useMemo(() => pastEvents(), []);
  const [tab, setTab] = useState(upcoming.length ? 'upcoming' : 'past');
  const [type, setType] = useState(ALL);
  const [q, setQ] = useState('');

  const source = tab === 'upcoming' ? upcoming : past;
  const types = [ALL, ...EVENT_TYPES.filter((t) => source.some((e) => e.type === t))];
  const activeType = types.includes(type) ? type : ALL;
  const list = source.filter(
    (e) => (activeType === ALL || e.type === activeType) && (!q.trim() || `${e.title} ${e.summary || ''} ${e.organiser || ''}`.toLowerCase().includes(q.trim().toLowerCase()))
  );
  const byYear = tab === 'past' ? Object.entries(list.reduce((acc, e) => ((acc[e.start.slice(0, 4)] ||= []).push(e), acc), {})).sort((a, b) => b[0].localeCompare(a[0])) : null;
  const instagram = SOCIAL.find((s) => s.id === 'instagram');

  return (
    <>
      <PageHeader
        eyebrow="Events"
        title="Events, workshops & competitions"
        intro="Upcoming programmes with registration links, and a record of past events with their official reports."
        image="fests/colossus-2-hall.webp"
      />
      <Section className="!pt-14">
        <div className="container-site">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex rounded-full bg-canvas p-1" role="tablist" aria-label="Event timeline">
              {[['upcoming', `Upcoming · ${upcoming.length}`], ['past', `Past · ${past.length}`]].map(([k, l]) => (
                <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === k ? 'bg-navy-900 text-white shadow-card' : 'text-ink-muted hover:text-navy-900'}`}>
                  {l}
                </button>
              ))}
            </div>
            <label className="relative w-full lg:w-72">
              <span className="sr-only">Search events</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" aria-hidden />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events" className="field rounded-full pl-10" />
            </label>
          </div>
          {source.length > 0 && (
            <div className="mt-5">
              <FilterChips options={types} value={activeType} onChange={setType} label="Event type" />
            </div>
          )}

          <div className="mt-10" aria-live="polite">
            {tab === 'upcoming' && !upcoming.length ? (
              <EmptyState icon={CalendarDays} title="No upcoming events announced yet">
                New events, with registration links, appear here as soon as they are published. Follow{' '}
                <SmartLink href={instagram.href} className="font-semibold text-navy-800 underline underline-offset-4">{instagram.handle}</SmartLink> or write to{' '}
                <a href={`mailto:${SWO.email}`} className="font-semibold text-navy-800 underline underline-offset-4">{SWO.email}</a>.
                <div className="mt-5">
                  <button type="button" onClick={() => setTab('past')} className="chip chip-off">Browse past events</button>
                </div>
              </EmptyState>
            ) : !list.length ? (
              <EmptyState title="No events match your filters" />
            ) : byYear ? (
              <div className="space-y-12">
                {byYear.map(([year, events]) => (
                  <div key={year} className="grid gap-6 lg:grid-cols-12">
                    <h2 className="font-display text-4xl text-navy-200 lg:sticky lg:top-28 lg:col-span-2 lg:self-start">{year}</h2>
                    <div className="space-y-4 lg:col-span-10">{events.map((e) => <EventCard key={e.id} event={e} />)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{list.map((e) => <EventCard key={e.id} event={e} layout="feature" />)}</div>
            )}
          </div>

          <p className="mt-12 text-xs text-ink-faint">
            Event dates and reports from the official events page of{' '}
            <SmartLink href="https://drait.edu.in/home/Event" className="underline underline-offset-2">drait.edu.in <ArrowUpRight className="inline h-3 w-3" aria-hidden /></SmartLink>
          </p>
        </div>
      </Section>
    </>
  );
}
