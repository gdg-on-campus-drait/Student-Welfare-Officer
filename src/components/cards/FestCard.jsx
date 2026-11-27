import { ArrowUpRight } from 'lucide-react';
import SmartLink from '../ui/SmartLink';
import Photo from '../ui/Photo';
import { latestEdition } from '../../content';
import { editionWhen } from '../../lib/format';

/** Image-led fest card. `size="lg"` for the featured slot. */
export default function FestCard({ fest, size = 'md', className = '' }) {
  const latest = latestEdition(fest);
  const lg = size === 'lg';
  return (
    <SmartLink
      to={`/fests/${fest.slug}`}
      className={`group relative flex overflow-hidden rounded-3xl bg-navy-950 text-white shadow-card transition duration-500 hover:shadow-lift ${lg ? 'min-h-[420px] sm:min-h-[520px]' : 'min-h-[320px]'} ${className}`}
    >
      <Photo src={fest.cover} alt="" className="absolute inset-0" imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105" fallbackLabel={fest.name} />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/0" />
      <div className="relative mt-auto w-full p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide backdrop-blur">{fest.type}</span>
          {latest && <span className="text-xs text-white/70">{latest.name}{editionWhen(latest) && ` · ${editionWhen(latest)}`}</span>}
        </div>
        <h3 className={`mt-3 font-display leading-tight ${lg ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}>{fest.name}</h3>
        {fest.tagline && <p className={`mt-2 text-white/80 ${lg ? 'max-w-lg text-base' : 'line-clamp-2 text-sm'}`}>{fest.tagline}</p>}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
          Explore <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </SmartLink>
  );
}
