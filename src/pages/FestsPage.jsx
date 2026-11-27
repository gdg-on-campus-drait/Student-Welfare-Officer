import { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import FilterChips from '../components/ui/FilterChips';
import FestCard from '../components/cards/FestCard';
import { FESTS, FEST_TYPES } from '../content';
import usePageTitle from '../lib/usePageTitle';

const ALL = 'All';
const LABEL = { Cultural: 'Cultural fests', Technical: 'Technical fests', Celebration: 'Annual celebrations' };

export default function FestsPage() {
  usePageTitle('Fests — SWO, Dr. AIT');
  const [type, setType] = useState(ALL);
  const types = [ALL, ...FEST_TYPES];
  const counts = Object.fromEntries(types.map((t) => [t, t === ALL ? FESTS.length : FESTS.filter((f) => f.type === t).length]));
  const groups = FEST_TYPES.filter((t) => type === ALL || t === type).map((t) => [t, FESTS.filter((f) => f.type === t)]);

  return (
    <>
      <PageHeader
        eyebrow="Fests"
        title="Fests & celebrations"
        intro="Cultural fests, national-level hackathons and annual celebrations that bring the whole campus together."
        image="fests/sanskruthi-crowd.webp"
      />
      <Section className="!pt-14">
        <div className="container-site">
          <div className="mb-12">
            <FilterChips options={types} value={type} onChange={setType} counts={counts} label="Fest type" />
          </div>
          <div className="space-y-16">
            {groups.map(([t, fests]) =>
              fests.length ? (
                <div key={t}>
                  <h2 data-reveal className="font-display text-2xl text-navy-900 sm:text-3xl">{LABEL[t]}</h2>
                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {fests.map((f, i) => (
                      <div key={f.slug} data-reveal className={i === 0 && fests.length > 2 ? 'md:col-span-2' : ''}>
                        <FestCard fest={f} size={i === 0 && fests.length > 2 ? 'lg' : 'md'} className="h-full" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
