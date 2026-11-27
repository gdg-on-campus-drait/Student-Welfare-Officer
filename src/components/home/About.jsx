import { Check, ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { INSTITUTE, officialPage } from '../../data/site';
import mainBlock from '../../assets/campus/main-block.webp';
import studentsSteps from '../../assets/campus/students-steps.webp';

export default function About() {
  return (
    <Section id="about">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Imagery */}
        <div data-reveal className="relative lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
            <img
              src={mainBlock}
              alt="Students at the entrance steps of the Dr. Ambedkar Institute of Technology main block"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-10 right-4 hidden w-48 overflow-hidden rounded-2xl border-4 border-white shadow-lift sm:block lg:-right-8 lg:w-56">
            <img src={studentsSteps} alt="Dr. AIT students on campus" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </div>
          <div className="absolute -left-3 top-8 rounded-2xl bg-navy-900 px-5 py-4 text-white shadow-lift sm:-left-6">
            <p className="font-display text-4xl text-gold-300">1980</p>
            <p className="mt-1 text-xs uppercase tracking-eyebrow text-navy-100/80">Year founded</p>
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6">
          <p data-reveal className="eyebrow">About Dr. AIT</p>
          <h2 data-reveal className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-tight text-navy-900 text-balance sm:text-4xl lg:text-[2.75rem]">
            Over four decades of engineering education in Bengaluru.
          </h2>
          <p data-reveal className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
            {INSTITUTE.summary}
          </p>
          <p data-reveal className="mt-4 text-base leading-relaxed text-ink-muted">
            {INSTITUTE.autonomy} {INSTITUTE.governance}
          </p>

          <ul data-reveal className="mt-8 grid gap-3 sm:grid-cols-2">
            {INSTITUTE.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm text-ink">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-50 text-gold-700">
                  <Check className="h-3 w-3" aria-hidden />
                </span>
                {h}
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
            <SmartLink href={officialPage('Institute')} className="link-arrow">
              Read the full profile <ArrowRight className="h-4 w-4" aria-hidden />
            </SmartLink>
            <SmartLink href={officialPage('Founder')} className="link-arrow">
              Our founder <ArrowRight className="h-4 w-4" aria-hidden />
            </SmartLink>
          </div>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="container-site mt-24 lg:mt-28">
        <div data-reveal className="grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
          <div className="relative bg-navy-900 p-8 text-white sm:p-12">
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-gold-500/60 to-transparent" aria-hidden />
            <p className="eyebrow eyebrow-light">Vision</p>
            <p className="mt-6 font-display text-2xl leading-snug sm:text-3xl">
              {INSTITUTE.vision.lead}{' '}
              {INSTITUTE.vision.acronym.map(([l, rest]) => (
                <span key={l}>
                  <span className="text-gold-300">{l}</span>
                  {rest}{' '}
                </span>
              ))}
              {INSTITUTE.vision.tail}
            </p>
            <p className="mt-8 flex gap-1.5 font-display text-5xl tracking-[0.2em] text-gold-400/30" aria-hidden>
              {INSTITUTE.vision.acronym.map(([l]) => l).join('')}
            </p>
          </div>
          <div className="bg-canvas p-8 sm:p-12">
            <p className="eyebrow">Mission</p>
            <ol className="mt-6 space-y-5">
              {INSTITUTE.mission.map((m, i) => (
                <li key={m} className="flex gap-4">
                  <span className="font-display text-lg text-gold-700">0{i + 1}</span>
                  <p className="text-sm leading-relaxed text-ink-muted sm:text-[15px]">{m}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Section>
  );
}
