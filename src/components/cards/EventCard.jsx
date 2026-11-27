import { Clock, MapPin, Users, FileText, ArrowRight, ArrowUpRight, CalendarClock } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import Photo from '../ui/Photo';
import { daysUntil, formatDate, formatRange, isUpcoming, parseDate } from '../../lib/dates';

function DateBlock({ start, dark }) {
  const d = parseDate(start);
  return (
    <div className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl ${dark ? 'bg-navy-900 text-white' : 'border border-line bg-canvas text-navy-900'}`}>
      <span className="font-display text-2xl leading-none">{d.getDate()}</span>
      <span className={`mt-1 text-[10px] font-semibold uppercase tracking-wide ${dark ? 'text-accent-300' : 'text-ink-subtle'}`}>
        {d.toLocaleString('en-IN', { month: 'short' })} {String(d.getFullYear()).slice(2)}
      </span>
    </div>
  );
}

function Countdown({ event }) {
  const d = daysUntil(event.start);
  const label = d <= 0 ? 'Happening now' : d === 1 ? 'Tomorrow' : `In ${d} days`;
  return <span className="rounded-full bg-accent-50 px-2.5 py-0.5 text-[11px] font-semibold text-accent-700">{label}</span>;
}

/** Event row/card. `layout="feature"` shows the photo prominently. */
export default function EventCard({ event, layout = 'row' }) {
  const upcoming = isUpcoming(event);
  const reg = upcoming && event.registration;
  const meta = [
    event.time && [Clock, event.time],
    event.venue && [MapPin, event.venue],
    event.organiser && [Users, event.organiser],
  ].filter(Boolean);

  const actions = (
    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
      {reg && (
        <SmartLink href={reg.url} className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-700">
          {reg.label || 'Register'} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </SmartLink>
      )}
      {reg?.deadline && (
        <span className="inline-flex items-center gap-1 text-xs text-ink-subtle">
          <CalendarClock className="h-3.5 w-3.5" aria-hidden /> Register by {formatDate(reg.deadline)}
        </span>
      )}
      {event.fest && (
        <SmartLink to={`/fests/${event.fest}`} className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-accent-600">
          About the fest <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </SmartLink>
      )}
      {event.club && (
        <SmartLink to={`/clubs/${event.club}`} className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-accent-600">
          Club profile <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </SmartLink>
      )}
      {event.report && (
        <SmartLink href={event.report} className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-accent-600">
          <FileText className="h-3.5 w-3.5" aria-hidden /> Event report
        </SmartLink>
      )}
    </div>
  );

  if (layout === 'feature') {
    return (
      <article id={event.id} className="group flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:shadow-lift">
        <div className="relative">
          <Photo src={event.image} alt="" className="aspect-[16/9]" imgClassName="transition-transform duration-700 group-hover:scale-105" fallbackLabel={event.type} />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-900">{event.type}</span>
        </div>
        <div className="flex flex-1 gap-4 p-5">
          <DateBlock start={event.start} dark={upcoming} />
          <div className="min-w-0 flex-1">
            {upcoming && <Countdown event={event} />}
            <h3 className="mt-1 font-display text-lg leading-snug text-navy-900">{event.title}</h3>
            <p className="mt-1 text-xs text-ink-subtle">{formatRange(event.start, event.end)}</p>
            {event.summary && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{event.summary}</p>}
            {actions}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article id={event.id} className="flex scroll-mt-28 gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-navy-200 sm:gap-5">
      <DateBlock start={event.start} dark={upcoming} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent-600">{event.type}</span>
          {upcoming && <Countdown event={event} />}
        </div>
        <h3 className="mt-1 font-display text-lg leading-snug text-navy-900">{event.title}</h3>
        <p className="mt-1 text-xs text-ink-subtle">{formatRange(event.start, event.end)}</p>
        {meta.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
            {meta.map(([Icon, text]) => (
              <li key={text} className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-ink-faint" aria-hidden /> {text}
              </li>
            ))}
          </ul>
        )}
        {event.summary && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{event.summary}</p>}
        {actions}
      </div>
      {event.image && (
        <Photo src={event.image} alt="" className="hidden h-28 w-40 shrink-0 rounded-xl md:block" />
      )}
    </article>
  );
}
