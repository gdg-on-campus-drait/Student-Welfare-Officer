import { Quote, ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import Button from '../ui/Button';
import { TESTIMONIALS, ALUMNI_URL } from '../../data/site';
import graduation from '../../assets/gallery/graduation-11th.webp';

export default function Alumni() {
  return (
    <Section id="alumni" tone="canvas">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Alumni"
              title="A community that stays connected."
              intro="Alumni of the institution return on many occasions to share their journeys and support the institution that shaped them."
            />
            <div data-reveal className="relative overflow-hidden rounded-3xl">
              <img src={graduation} alt="Graduates at the 11th Graduation Day of Dr. AIT" loading="lazy" className="aspect-[16/10] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
              <p className="absolute bottom-5 left-5 font-display text-xl text-white">11th Graduation Day</p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-7">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} data-reveal className="card relative p-8 sm:p-10">
                <Quote className="absolute right-8 top-8 h-10 w-10 text-gold-200" aria-hidden />
                <blockquote className="pr-10 font-display text-xl leading-relaxed text-navy-900 sm:text-2xl">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold-500" aria-hidden />
                  <span>
                    <span className="block font-semibold text-navy-900">{t.name}</span>
                    <span className="block text-sm text-ink-subtle">{t.role} · Batch {t.batch}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
            <div data-reveal>
              <Button href={ALUMNI_URL} variant="navy" size="lg">
                Visit the alumni portal <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
