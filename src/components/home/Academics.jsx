import { useState } from 'react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { PROGRAMS, ACADEMIC_LINKS, officialPage } from '../../data/site';
import labImg from '../../assets/campus/electrical-lab.webp';

const TABS = [
  { id: 'ug', label: 'Undergraduate', short: 'UG', blurb: 'B.E. programmes plus BBA and BCA.' },
  { id: 'pg', label: 'Postgraduate', short: 'PG', blurb: 'M.Tech., MCA and MBA programmes.' },
  { id: 'phd', label: 'Doctoral', short: 'Ph.D.', blurb: 'Research programmes across engineering, sciences and management.' },
];

export default function Academics() {
  const [tab, setTab] = useState('ug');
  const active = TABS.find((t) => t.id === tab);
  const list = PROGRAMS[tab];

  return (
    <Section id="academics" tone="canvas">
      <div className="container-site">
        <SectionHeading
          eyebrow="Academics"
          title="Programmes built on outcome-based, practical learning."
          intro="Dr. AIT follows Outcome Based Education with interdisciplinary electives and industry-based laboratories, across undergraduate, postgraduate and doctoral levels."
          action={
            <SmartLink href={officialPage('Programs-Offered')} className="link-arrow">
              Admissions information <ArrowUpRight className="h-4 w-4" aria-hidden />
            </SmartLink>
          }
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Summary column */}
          <div data-reveal className="flex flex-col gap-4 lg:col-span-4">
            {TABS.map((t) => {
              const on = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-pressed={on}
                  className={`group flex items-center justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                    on ? 'border-navy-900 bg-navy-900 text-white shadow-lift' : 'border-line bg-white hover:border-navy-300'
                  }`}
                >
                  <span>
                    <span className={`block text-[11px] font-semibold uppercase tracking-eyebrow ${on ? 'text-gold-300' : 'text-gold-700'}`}>{t.short}</span>
                    <span className={`mt-1 block font-display text-xl ${on ? 'text-white' : 'text-navy-900'}`}>{t.label}</span>
                    <span className={`mt-1 block text-xs ${on ? 'text-navy-100/80' : 'text-ink-subtle'}`}>{t.blurb}</span>
                  </span>
                  <span className={`font-display text-4xl ${on ? 'text-gold-300' : 'text-navy-200'}`}>{PROGRAMS[t.id].length}</span>
                </button>
              );
            })}
            <div className="relative mt-2 hidden overflow-hidden rounded-2xl lg:block">
              <img src={labImg} alt="Students working in an electrical laboratory at Dr. AIT" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>

          {/* Programme list */}
          <div data-reveal className="card p-6 sm:p-8 lg:col-span-8">
            <div className="flex items-center justify-between border-b border-line pb-5">
              <h3 className="font-display text-2xl text-navy-900">{active.label} programmes</h3>
              <span className="text-sm text-ink-subtle">{list.length} offered</span>
            </div>
            <ul key={tab} className="mt-2 grid sm:grid-cols-2">
              {list.map((p, i) => (
                <li
                  key={p}
                  className="flex animate-fadeUp items-start gap-3 border-b border-line/70 py-3.5 text-[15px] text-ink sm:odd:pr-6"
                  style={{ animationDelay: `${i * 25}ms` }}
                >
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {ACADEMIC_LINKS.map((l) => (
                <SmartLink key={l.label} href={l.href} className="chip chip-off gap-1">
                  {l.label} <ArrowUpRight className="h-3 w-3" aria-hidden />
                </SmartLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
