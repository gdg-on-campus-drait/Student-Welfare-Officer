import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import Button from '../ui/Button';
import { CAMPUS_FACTS, FACILITIES } from '../../data/site';
import library from '../../assets/campus/library.webp';
import studentsCampus from '../../assets/campus/students-campus.webp';
import studentsLaptop from '../../assets/campus/students-laptop.webp';
import kalarava from '../../assets/gallery/kannada-kalarava-2025.webp';

export default function CampusLife() {
  return (
    <Section id="campus-life" tone="canvas">
      <div className="container-site">
        <SectionHeading
          eyebrow="Campus life"
          title="A green, 23-acre campus in the heart of Bengaluru."
          intro="Hostels, a central library, an indoor sports complex and an active calendar of cultural, technical and service activities."
        />

        {/* Mosaic */}
        <div data-reveal className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          <figure className="group relative col-span-2 row-span-2 overflow-hidden rounded-3xl">
            <img src={kalarava} alt="Kannada Kalarava 2025 cultural performance at Dr. AIT" loading="lazy" className="h-full min-h-[280px] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-6 text-white">
              <p className="text-[11px] uppercase tracking-eyebrow text-gold-300">Culture</p>
              <p className="mt-1 font-display text-2xl">Kannada Kalarava 2025</p>
            </figcaption>
          </figure>
          {[
            [library, 'Central Library', 'A student reading in the Dr. AIT library'],
            [studentsLaptop, 'Collaborative learning', 'Students working together on a laptop on campus'],
            [studentsCampus, 'Life on campus', 'Students studying under the trees on campus'],
          ].map(([src, label, alt], i) => (
            <figure key={label} className={`group relative overflow-hidden rounded-3xl ${i === 2 ? 'col-span-2' : ''}`}>
              <img src={src} alt={alt} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:aspect-auto" />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy-900 backdrop-blur">{label}</figcaption>
            </figure>
          ))}
        </div>

        {/* Facts */}
        <dl data-reveal className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {CAMPUS_FACTS.map((f) => (
            <div key={f.label} className="card p-6">
              <dd className="font-display text-3xl text-navy-900 sm:text-4xl">
                {f.value} <span className="text-base text-gold-700">{f.unit}</span>
              </dd>
              <dt className="mt-2 text-sm text-ink-muted">{f.label}</dt>
            </div>
          ))}
        </dl>

        {/* Facilities */}
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f) => (
            <li key={f.title} data-reveal>
              <SmartLink to={f.to} href={f.href} className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-white p-6 transition-all hover:border-navy-900 hover:bg-navy-900">
                <div>
                  <h3 className="font-display text-lg text-navy-900 transition-colors group-hover:text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted transition-colors group-hover:text-navy-100/80">{f.text}</p>
                </div>
                {f.to ? (
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-navy-400 transition group-hover:translate-x-1 group-hover:text-gold-300" aria-hidden />
                ) : (
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-navy-400 transition group-hover:text-gold-300" aria-hidden />
                )}
              </SmartLink>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-10 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br from-navy-900 to-navy-700 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="eyebrow eyebrow-light">Student Welfare Office</p>
            <p className="mt-3 max-w-xl font-display text-2xl leading-snug sm:text-3xl">Clubs, fests and a helpdesk for every student.</p>
          </div>
          <Button to="/student-welfare" variant="gold" size="lg">
            Visit the SWO <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Button>
        </div>
      </div>
    </Section>
  );
}
