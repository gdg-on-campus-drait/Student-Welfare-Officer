import { Phone, Mail } from 'lucide-react';
import { photo } from '../../content/images';

const initials = (name) =>
  name
    .replace(/^(Dr\.|Ms\.|Mr\.|Mrs\.|Sri\.|Lt\.|Prof\.)\s*/i, '')
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

/** Person card. `variant="feature"` shows a large portrait (SWO officials). */
export default function PersonCard({ person, variant = 'compact', note }) {
  const img = photo(person.photo);
  const contacts = (person.phone || person.email) && (
    <div className="mt-3 flex flex-col gap-1 text-sm">
      {person.phone && (
        <a href={`tel:${person.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-navy-700 hover:text-accent-600">
          <Phone className="h-3.5 w-3.5" aria-hidden /> {person.phone}
        </a>
      )}
      {person.email && (
        <a href={`mailto:${person.email}`} className="inline-flex items-center gap-2 text-navy-700 hover:text-accent-600">
          <Mail className="h-3.5 w-3.5" aria-hidden /> {person.email}
        </a>
      )}
    </div>
  );

  if (variant === 'feature') {
    return (
      <article className="group overflow-hidden rounded-3xl border border-line bg-white shadow-card">
        <div className="relative aspect-[4/4] overflow-hidden bg-navy-50">
          {img ? (
            <img src={img} alt={`${person.name}, ${person.role}`} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          ) : (
            <span className="flex h-full items-center justify-center font-display text-5xl text-navy-300">{initials(person.name)}</span>
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-5 pt-16">
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-300">{person.role}</p>
            <p className="mt-1 font-display text-2xl text-white">{person.name}</p>
          </div>
        </div>
        <div className="p-6">
          {person.dept && <p className="text-sm leading-relaxed text-ink-muted">{person.dept}</p>}
          {contacts}
        </div>
      </article>
    );
  }

  return (
    <article className="flex gap-4 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-navy-200">
      {img ? (
        <img src={img} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover object-top ring-1 ring-navy-100" />
      ) : (
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-50 font-display text-base text-navy-800 ring-1 ring-navy-100">{initials(person.name)}</span>
      )}
      <div className="min-w-0">
        <p className="font-semibold text-navy-900">{person.name}</p>
        <p className="mt-0.5 text-sm text-accent-600">{person.role}</p>
        {person.dept && <p className="mt-1 text-xs text-ink-subtle">{person.dept}</p>}
        {note}
        {contacts}
      </div>
    </article>
  );
}
