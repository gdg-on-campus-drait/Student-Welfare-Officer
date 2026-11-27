import { useRef, useState } from 'react';
import gsap from 'gsap';
import { Phone, Mail } from 'lucide-react';
import { Section } from '../ui/Section';
import { SWO } from '../../data/site';
import { prefersReducedMotion } from '../../lib/scroll';
import chetanPhoto from '../../assets/people/n-chetan.webp';
import sangeethaPhoto from '../../assets/people/sangeetha-n.webp';

const PHOTOS = { chetan: chetanPhoto, sangeetha: sangeethaPhoto };

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'executive-body', label: 'SWO Executive Body' },
  { id: 'vision-mission', label: 'Vision & Mission' },
  { id: 'objectives', label: 'Objectives' },
];

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('overview');
  const paneRef = useRef(null);

  const handleTabChange = (id) => {
    setActiveTab(id);
    if (prefersReducedMotion() || !paneRef.current) return;
    gsap.fromTo(paneRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
  };

  return (
    <Section id="about" aria-label="About the Student Welfare Office">
      <div className="container-site">
        <div data-reveal className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          <div className="grid lg:grid-cols-12">
            <div className="border-b border-line bg-canvas p-6 sm:p-8 lg:col-span-4 lg:border-b-0 lg:border-r">
              <p className="eyebrow">Student Welfare Office</p>
              <h2 className="mt-3 font-display text-2xl text-navy-900">About the office</h2>
              <nav className="no-scrollbar mt-6 flex gap-2 overflow-x-auto lg:flex-col" aria-label="About sections" role="tablist">
                {TABS.map((tab) => {
                  const on = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => handleTabChange(tab.id)}
                      className={`shrink-0 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all lg:text-base ${
                        on ? 'bg-navy-900 text-white shadow-card' : 'text-ink-muted hover:bg-white hover:text-navy-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div ref={paneRef} className="p-6 sm:p-10 lg:col-span-8 lg:p-12" role="tabpanel">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-display text-3xl text-navy-900 sm:text-4xl">Overview</h3>
                    <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">{SWO.overview}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700">Vision</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink">{SWO.vision}</p>
                    </div>
                    <div className="rounded-2xl border border-line p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700">Mission</p>
                      <p className="mt-3 text-sm leading-relaxed text-ink">{SWO.mission}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'executive-body' && (
                <div>
                  <h3 className="font-display text-3xl text-navy-900 sm:text-4xl">SWO Executive Body</h3>
                  <ul className="mt-8 grid gap-6 sm:grid-cols-2">
                    {SWO.officers.map((o) => (
                      <li key={o.name} className="overflow-hidden rounded-2xl border border-line bg-canvas">
                        <img src={PHOTOS[o.photo]} alt={`${o.name}, ${o.title}`} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
                        <div className="p-6">
                          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700">{o.title}</p>
                          <p className="mt-2 font-display text-2xl text-navy-900">{o.name}</p>
                          <p className="mt-1 text-sm text-ink-muted">{o.dept}</p>
                          <div className="mt-4 flex flex-col gap-1.5 text-sm">
                            <a href={`tel:${o.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-navy-700 hover:text-gold-700">
                              <Phone className="h-3.5 w-3.5" aria-hidden /> {o.phone}
                            </a>
                            <a href={`mailto:${SWO.email}`} className="inline-flex items-center gap-2 text-navy-700 hover:text-gold-700">
                              <Mail className="h-3.5 w-3.5" aria-hidden /> {SWO.email}
                            </a>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'vision-mission' && (
                <div className="space-y-6">
                  <h3 className="font-display text-3xl text-navy-900 sm:text-4xl">Vision & Mission</h3>
                  <div className="rounded-2xl bg-navy-900 p-7 text-white sm:p-9">
                    <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-300">Vision</p>
                    <p className="mt-3 font-display text-xl leading-relaxed sm:text-2xl">{SWO.vision}</p>
                  </div>
                  <div className="rounded-2xl border border-line bg-canvas p-7 sm:p-9">
                    <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-gold-700">Mission</p>
                    <p className="mt-3 font-display text-xl leading-relaxed text-navy-900 sm:text-2xl">{SWO.mission}</p>
                  </div>
                </div>
              )}

              {activeTab === 'objectives' && (
                <div>
                  <h3 className="font-display text-3xl text-navy-900 sm:text-4xl">Objectives</h3>
                  <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                    {SWO.objectives.map((o, i) => (
                      <li key={o} className="rounded-2xl border border-line p-6">
                        <span className="font-display text-2xl text-gold-600">0{i + 1}</span>
                        <p className="mt-3 text-sm leading-relaxed text-ink">{o}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
