import { Trophy, Medal, Award, Star, ArrowRight } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import Photo from '../ui/Photo';
import { getClub } from '../../content';

const ICONS = { Competitions: Trophy, NCC: Medal, Awards: Award, 'Success stories': Star };

export default function AchievementCard({ item, compact = false }) {
  const Icon = ICONS[item.category] || Trophy;
  const club = item.club && getClub(item.club);
  return (
    <article id={item.id} className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      {item.image && !compact && (
        <Photo src={item.image} alt={item.title} className="aspect-[16/9]" imgClassName="transition-transform duration-700 group-hover:scale-105" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-eyebrow text-accent-600">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent-50 text-accent-600">
              <Icon className="h-3.5 w-3.5" aria-hidden />
            </span>
            {item.category}
          </span>
          {item.year && <span className="font-display text-lg text-navy-300">{item.year}</span>}
        </div>
        <h3 className="mt-4 font-display text-xl leading-snug text-navy-900">{item.title}</h3>
        <p className="mt-1 text-sm font-medium text-navy-700">{item.who}</p>
        {!compact && <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">{item.summary}</p>}
        {club && !compact && (
          <SmartLink to={`/clubs/${club.slug}`} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-accent-600">
            {club.name} <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </SmartLink>
        )}
      </div>
    </article>
  );
}
