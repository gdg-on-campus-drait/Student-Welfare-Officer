import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import FilterChips from '../components/ui/FilterChips';
import EmptyState from '../components/ui/EmptyState';
import ClubCard from '../components/cards/ClubCard';
import { CLUBS, CLUB_CATEGORIES, hasProfile } from '../content';
import usePageTitle from '../lib/usePageTitle';

const ALL = 'All';

export default function ClubsPage() {
  usePageTitle('Clubs — SWO, Dr. AIT');
  const [cat, setCat] = useState(ALL);
  const [q, setQ] = useState('');

  const categories = [ALL, ...CLUB_CATEGORIES.filter((c) => CLUBS.some((k) => k.category === c))];
  const counts = Object.fromEntries(categories.map((c) => [c, c === ALL ? CLUBS.length : CLUBS.filter((k) => k.category === c).length]));

  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return CLUBS.filter((c) => (cat === ALL || c.category === cat) && (!t || `${c.name} ${c.tagline || ''} ${c.category}`.toLowerCase().includes(t))).sort(
      (a, b) => Number(hasProfile(b)) - Number(hasProfile(a))
    );
  }, [cat, q]);

  return (
    <>
      <PageHeader
        eyebrow="Clubs"
        title="Clubs & student bodies"
        intro="The SWO establishes interdepartmental clubs so students across departments can collaborate on technical and cultural events."
        image="fests/kalarava-2025-stage.webp"
      />
      <Section className="!pt-14">
        <div className="container-site">
          <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <FilterChips options={categories} value={cat} onChange={setCat} counts={counts} label="Club category" />
            <label className="relative w-full lg:w-72">
              <span className="sr-only">Search clubs</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" aria-hidden />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clubs" className="field rounded-full pl-10" />
            </label>
          </div>
          {list.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
              {list.map((c) => (
                <div key={c.slug} className="animate-fadeUp"><ClubCard club={c} /></div>
              ))}
            </div>
          ) : (
            <EmptyState title="No clubs match your search">Try another name or category.</EmptyState>
          )}
        </div>
      </Section>
    </>
  );
}
