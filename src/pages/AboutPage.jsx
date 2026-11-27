import { Sparkles, Trophy, ShieldCheck, Megaphone, Check, FileText, ArrowUpRight } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section, SectionHeading } from '../components/ui/Section';
import Photo from '../components/ui/Photo';
import SmartLink from '../components/ui/SmartLink';
import { SWO } from '../content';
import usePageTitle from '../lib/usePageTitle';

const ICONS = { sparkles: Sparkles, trophy: Trophy, shield: ShieldCheck, megaphone: Megaphone };

export default function AboutPage() {
  usePageTitle('About the SWO — Dr. AIT');
  return (
    <>
      <PageHeader eyebrow="About SWO" title="About the Student Welfare Office" intro={SWO.intro} image="campus/main-block.webp" />

      <Section>
        <div className="container-site grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p data-reveal className="eyebrow">Who we are</p>
            <h2 data-reveal className="mt-4 font-display text-3xl leading-tight text-navy-900 sm:text-4xl">A bridge between students, clubs and the institution.</h2>
            <p data-reveal className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">{SWO.intro}</p>
            <p data-reveal className="mt-4 text-base leading-relaxed text-ink-muted">{SWO.introMore}</p>
            <div data-reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <SmartLink href={SWO.document.href} className="link-arrow"><FileText className="h-4 w-4" aria-hidden /> {SWO.document.label}</SmartLink>
              <SmartLink href={SWO.officialPage} className="link-arrow">Official SWO page <ArrowUpRight className="h-4 w-4" aria-hidden /></SmartLink>
            </div>
          </div>
          <div data-reveal className="grid grid-cols-2 gap-4 lg:col-span-6">
            <Photo src="campus/students-steps.webp" alt="Dr. AIT students on campus" className="aspect-[3/4] rounded-3xl" />
            <div className="grid gap-4">
              <Photo src="fests/sanskruthi-performer.webp" alt="Performance at Sanskruthi" className="aspect-square rounded-3xl" />
              <Photo src="fests/colossus-2-coding.webp" alt="Students coding at COLOSSUS" className="aspect-square rounded-3xl" />
            </div>
          </div>
        </div>
      </Section>

      {/* Vision & mission */}
      <Section tone="canvas">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <div data-reveal className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 text-white sm:p-12">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" aria-hidden />
            <p className="eyebrow eyebrow-light">Vision</p>
            <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">{SWO.vision}</p>
          </div>
          <div data-reveal className="rounded-3xl border border-line bg-white p-8 sm:p-12">
            <p className="eyebrow">Mission</p>
            <p className="mt-6 font-display text-2xl leading-snug text-navy-900 sm:text-3xl">{SWO.mission}</p>
          </div>
        </div>
      </Section>

      {/* Objectives */}
      <Section>
        <div className="container-site">
          <SectionHeading eyebrow="Objectives" title="What the SWO sets out to do." />
          <ol className="grid gap-4 sm:grid-cols-2">
            {SWO.objectives.map((o, i) => (
              <li key={o} data-reveal className="group flex gap-5 rounded-3xl border border-line bg-white p-7 transition-colors hover:border-navy-900">
                <span className="font-display text-4xl leading-none text-navy-200 transition-colors group-hover:text-accent-500">0{i + 1}</span>
                <p className="pt-1 text-[15px] leading-relaxed text-ink">{o}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Initiatives */}
      <Section tone="canvas">
        <div className="container-site">
          <SectionHeading eyebrow="Student welfare initiatives" title="Roles & responsibilities of the office." intro="From the SWO’s official roles and responsibilities." />
          <div className="grid gap-5 md:grid-cols-2">
            {SWO.initiatives.map((it) => {
              const Icon = ICONS[it.icon] || Sparkles;
              return (
                <article key={it.title} data-reveal className="rounded-3xl border border-line bg-white p-7 sm:p-8">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-accent-300"><Icon className="h-5 w-5" aria-hidden /></span>
                    <h3 className="font-display text-2xl text-navy-900">{it.title}</h3>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {it.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden /> {p}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Student council + process */}
      <Section>
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow="Student Council" title="How students are represented." intro={SWO.studentCouncil.note} />
            <ul data-reveal className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
              {SWO.studentCouncil.members.map((m) => (
                <li key={m.role} className="flex items-center justify-between gap-4 bg-white px-6 py-4">
                  <span className="font-medium text-navy-900">{m.role}</span>
                  <span className="text-right text-sm text-ink-muted">{m.who}</span>
                </li>
              ))}
            </ul>
            <ul data-reveal className="mt-8 space-y-3">
              {SWO.studentCouncil.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed text-ink-muted"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden /> {r}</li>
              ))}
            </ul>
          </div>
          <aside data-reveal className="self-start rounded-3xl bg-navy-900 p-8 text-white lg:col-span-5 lg:sticky lg:top-28">
            <p className="eyebrow eyebrow-light">Organising an event?</p>
            <h3 className="mt-3 font-display text-2xl">The approval process</h3>
            <ol className="mt-6 space-y-5">
              {SWO.eventProcess.map((step, i) => (
                <li key={step} className="flex gap-4 text-sm text-navy-100/85">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-300/50 text-xs text-accent-300">{i + 1}</span>
                  <span className="pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Section>
    </>
  );
}
