import { ArrowUpRight, FlaskConical, Rocket, Lightbulb, Wrench, ShieldCheck, Handshake, CalendarDays } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { RESEARCH_UNITS, RESEARCH_FUNDERS, EVENTS, PROGRAMS } from '../../data/site';
import { formatRange, isUpcoming } from '../../lib/dates';
import computerLab from '../../assets/campus/computer-lab.webp';

const ICONS = [FlaskConical, Rocket, Lightbulb, Wrench, ShieldCheck, Handshake];

export default function Research() {
  const conferences = EVENTS.filter((e) => e.type === 'Conference' && isUpcoming(e)).sort((a, b) => a.start.localeCompare(b.start));

  return (
    <Section id="research">
      <div className="container-site">
        <SectionHeading
          eyebrow="Research & Innovation"
          title="From laboratory ideas to funded research and startups."
          intro={`Research projects at Dr. AIT are funded by ${RESEARCH_FUNDERS.slice(0, -1).join(', ')} and ${RESEARCH_FUNDERS.at(-1)}, among other recognised agencies, with doctoral programmes in ${PROGRAMS.phd.length} disciplines.`}
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {RESEARCH_UNITS.map((u, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <li key={u.title} data-reveal>
                  <SmartLink href={u.href} className="card card-hover group flex h-full flex-col p-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 transition-colors group-hover:bg-navy-900 group-hover:text-gold-300">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-lg text-navy-900">{u.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">{u.text}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-navy-700 group-hover:text-gold-700">
                      Learn more <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </span>
                  </SmartLink>
                </li>
              );
            })}
          </ul>

          <aside data-reveal className="flex flex-col overflow-hidden rounded-3xl bg-navy-900 text-white lg:col-span-4">
            <img src={computerLab} alt="Students in a computer laboratory at Dr. AIT" loading="lazy" className="aspect-[16/10] w-full object-cover opacity-90" />
            <div className="flex flex-1 flex-col p-7">
              <p className="eyebrow eyebrow-light">Upcoming conferences</p>
              <ul className="mt-5 space-y-5">
                {conferences.map((c) => (
                  <li key={c.title} className="flex gap-4">
                    <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" aria-hidden />
                    <div>
                      <p className="text-sm font-medium leading-snug">{c.title}</p>
                      <p className="mt-1 text-xs text-navy-200/80">{formatRange(c.start, c.end)}</p>
                    </div>
                  </li>
                ))}
                {!conferences.length && <li className="text-sm text-navy-200/80">New conferences will be announced on the notice board.</li>}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-8">
                {RESEARCH_FUNDERS.map((f) => (
                  <span key={f} className="rounded-full border border-white/15 px-3 py-1 text-xs text-navy-100">{f}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
