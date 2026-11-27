import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight, Check } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { SWO_ACTIVITIES } from '../../data/site';
import { prefersReducedMotion } from '../../lib/scroll';
import sanskruthi from '../../assets/gallery/sanskruthi-2025.webp';
import kalarava from '../../assets/gallery/kannada-kalarava-2025.webp';
import colossus from '../../assets/gallery/colossus-3.webp';
import motorsports from '../../assets/campus/motorsports.webp';
import nss from '../../assets/gallery/nss-collage.webp';
import ncc from '../../assets/gallery/ncc-2024.webp';

const IMAGES = { sanskruthi, kalarava, colossus, motorsports, nss, ncc };

export default function ActivitiesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const detailsRef = useRef(null);
  const selected = SWO_ACTIVITIES[activeIndex];

  const select = (i) => {
    setActiveIndex(i);
    if (!prefersReducedMotion() && detailsRef.current) {
      gsap.fromTo(detailsRef.current, { opacity: 0.4, y: 8 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
    }
  };

  return (
    <Section id="clubs" tone="canvas" aria-label="Student clubs and activities">
      <div className="container-site">
        <SectionHeading
          eyebrow="Student life & forums"
          title="Communities that shape campus life."
          intro="Cultural fests, national-level hackathons, engineering teams and service units that students lead and take part in."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {SWO_ACTIVITIES.map((a, i) => {
            const on = i === activeIndex;
            return (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  aria-pressed={on}
                  className={`group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl text-left transition-all duration-300 ${
                    on ? 'ring-2 ring-gold-500 ring-offset-4 ring-offset-canvas' : 'hover:-translate-y-1 hover:shadow-lift'
                  }`}
                >
                  <img src={IMAGES[a.image]} alt={a.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="block text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">{a.category}</span>
                    <span className="mt-1 block font-display text-xl leading-snug">{a.name}</span>
                    <span className="mt-1 line-clamp-2 block text-xs text-white/80">{a.tagline}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <div ref={detailsRef} className="mt-8 rounded-3xl border border-line bg-white p-7 shadow-card sm:p-10" aria-live="polite">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700">{selected.category}</p>
              <h3 className="mt-2 font-display text-2xl text-navy-900 sm:text-3xl">{selected.name}</h3>
              <p className="mt-2 text-sm text-ink-muted">{selected.tagline}</p>
              <ul className="mt-5 space-y-2.5">
                {selected.facts.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 border-t border-line pt-6 md:col-span-4 md:items-end md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <SmartLink to="/student-welfare#helpdesk" className="inline-flex items-center justify-center rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-navy-700">
                Inquiries & joining
              </SmartLink>
              {selected.href && (
                <SmartLink href={selected.href} className="link-arrow">
                  Official page <ArrowUpRight className="h-4 w-4" aria-hidden />
                </SmartLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
