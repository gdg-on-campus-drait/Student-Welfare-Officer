import { useMemo, useState } from 'react';
import { Star } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section, SectionHeading } from '../components/ui/Section';
import FilterChips from '../components/ui/FilterChips';
import AchievementCard from '../components/cards/AchievementCard';
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES, sortedAchievements } from '../content';
import usePageTitle from '../lib/usePageTitle';

const ALL = 'All';

export default function AchievementsPage() {
  usePageTitle('Achievements — SWO, Dr. AIT');
  const [cat, setCat] = useState(ALL);
  const all = useMemo(() => sortedAchievements(), []);
  const cats = [ALL, ...ACHIEVEMENT_CATEGORIES.filter((c) => all.some((a) => a.category === c))];
  const counts = Object.fromEntries(cats.map((c) => [c, c === ALL ? all.length : all.filter((a) => a.category === c).length]));
  const list = all.filter((a) => cat === ALL || a.category === cat);
  const stories = all.filter((a) => a.story);
  const years = [...new Set(all.map((a) => a.year).filter(Boolean))];

  return (
    <>
      <PageHeader
        eyebrow="Achievements"
        title="Achievements & success stories"
        intro="The SWO tracks student achievements across all departments in technical, cultural and co-curricular activities."
        image="achievements/supra-2026-award.webp"
      />

      <Section className="!pt-14">
        <div className="container-site">
          <dl data-reveal className="mb-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
            {[
              ['Recognitions', ACHIEVEMENTS.length],
              ['Competition wins & ranks', ACHIEVEMENTS.filter((a) => a.category === 'Competitions').length],
              ['NCC honours', ACHIEVEMENTS.filter((a) => a.category === 'NCC').length],
              ['Years covered', years.length ? `${years.at(-1)}–${years[0]}` : '—'],
            ].map(([l, v]) => (
              <div key={l} className="bg-white p-6">
                <dt className="text-[11px] uppercase tracking-eyebrow text-ink-subtle">{l}</dt>
                <dd className="mt-2 font-display text-3xl text-navy-900">{v}</dd>
              </div>
            ))}
          </dl>

          <FilterChips options={cats} value={cat} onChange={setCat} counts={counts} label="Achievement category" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {list.map((a) => <div key={a.id} className="animate-fadeUp"><AchievementCard item={a} /></div>)}
          </div>
        </div>
      </Section>

      {stories.length > 0 && (
        <Section tone="navy">
          <div className="container-site">
            <SectionHeading light eyebrow="Student success stories" title="Individual journeys that inspire." />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {stories.map((s) => (
                <figure key={s.id} data-reveal className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                  <Star className="h-5 w-5 text-accent-300" aria-hidden />
                  <figcaption className="mt-4 font-display text-xl text-white">{s.title}</figcaption>
                  <p className="mt-2 text-sm font-medium text-accent-200">{s.who}</p>
                  <p className="mt-3 text-sm leading-relaxed text-navy-100/80">{s.summary}</p>
                </figure>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
