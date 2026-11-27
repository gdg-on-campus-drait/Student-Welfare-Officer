import { ArrowUpRight } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import Photo from '../ui/Photo';
import { photo } from '../../content/images';
import { hasProfile } from '../../content';
import { monogram } from '../../lib/format';


/** Club logo, or an elegant monogram when no logo is published. */
export function ClubMark({ club, size = 'md' }) {
  const dims = size === 'lg' ? 'h-20 w-20 text-2xl' : 'h-12 w-12 text-base';
  const logo = photo(club.logo);
  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white font-display text-navy-900 shadow-card ring-1 ring-navy-100 ${dims}`}>
      {logo ? <img src={logo} alt={`${club.name} logo`} className="h-full w-full object-contain p-1.5" /> : monogram(club.name)}
    </span>
  );
}

export default function ClubCard({ club }) {
  const published = hasProfile(club);
  return (
    <SmartLink to={`/clubs/${club.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:border-navy-200 hover:shadow-lift">
      <div className="relative">
        {club.cover ? (
          <Photo src={club.cover} alt="" className="aspect-[16/10]" imgClassName="transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br from-navy-50 via-white to-accent-50" aria-hidden>
            <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#C9D5E8_1px,transparent_0)] [background-size:18px_18px]" />
            <span className="relative font-display text-7xl tracking-tight text-navy-100 transition-transform duration-700 group-hover:scale-110">{monogram(club.name)}</span>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-900 backdrop-blur">{club.category}</span>
        <div className="absolute -bottom-6 left-5">
          <ClubMark club={club} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5 pt-9">
        <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-600">{club.kind}</p>
        <h3 className="mt-1.5 font-display text-xl leading-snug text-navy-900">{club.name}</h3>
        <p className={`mt-2 flex-1 text-sm leading-relaxed ${published || club.tagline ? 'text-ink-muted' : 'italic text-ink-subtle'}`}>
          {club.tagline || 'Club profile coming soon.'}
        </p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy-800 transition-colors group-hover:text-accent-600">
          {published ? 'View profile' : 'View club'} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </SmartLink>
  );
}
