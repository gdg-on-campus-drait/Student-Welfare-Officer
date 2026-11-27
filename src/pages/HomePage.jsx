import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Sparkles, Trophy, ShieldCheck, Megaphone, CalendarDays } from 'lucide-react';
import { Section, SectionHeading } from '../components/ui/Section';
import Button from '../components/ui/Button';
import SmartLink from '../components/ui/SmartLink';
import Photo from '../components/ui/Photo';
import MagneticButton from '../components/MagneticButton';
import ClubCard from '../components/cards/ClubCard';
import FestCard from '../components/cards/FestCard';
import EventCard from '../components/cards/EventCard';
import AchievementCard from '../components/cards/AchievementCard';
import {
  SWO, CLUBS, FESTS, EVENTS, ACHIEVEMENTS, SWO_TEAM, SOCIAL, hasProfile, upcomingEvents, pastEvents, sortedAchievements, ALL_PHOTOS,
} from '../content';
import { photo } from '../content/images';
import { prefersReducedMotion } from '../lib/scroll';
import usePageTitle from '../lib/usePageTitle';

const ICONS = { sparkles: Sparkles, trophy: Trophy, shield: ShieldCheck, megaphone: Megaphone };

export default function HomePage() {
  usePageTitle('Student Welfare Office — Dr. Ambedkar Institute of Technology');
  return (
    <>
      <Hero />
      <Intro />
      <ClubsPreview />
      <FestsPreview />
      <EventsPreview />
      <AchievementsPreview />
      <GalleryPreview />
      <ConnectBand />
    </>
  );
}

function Hero() {
  const ref = useRef(null);
  const festCards = ['sanskruthi', 'colossus', 'maitri'].map((s) => FESTS.find((f) => f.slug === s)).filter(Boolean);
  const stats = [
    { value: CLUBS.length, label: 'Clubs & units' },
    { value: FESTS.length, label: 'Fests & celebrations' },
    { value: EVENTS.length, label: 'Events listed' },
    { value: ACHIEVEMENTS.length, label: 'Achievements' },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-h="eyebrow"]', { y: 14, opacity: 0, duration: 0.6, delay: 0.1 })
        .from('[data-h="word"]', { yPercent: 110, duration: 0.95, stagger: 0.07 }, '-=0.35')
        .from('[data-h="sub"]', { y: 16, opacity: 0, duration: 0.6 }, '-=0.55')
        .from('[data-h="cta"] > *', { y: 14, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')
        .from('[data-h="card"]', { y: 40, opacity: 0, rotate: 0, duration: 0.9, stagger: 0.12 }, '-=0.6')
        .from('[data-h="stats"]', { y: 24, opacity: 0, duration: 0.7 }, '-=0.6');
      gsap.to('[data-h="img"]', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
    },
    { scope: ref }
  );

  const words = (t) =>
    t.split(' ').map((w, i) => (
      <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0">
        <span data-h="word" className="inline-block">{w}</span>
      </span>
    ));

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white">
      {/* Real photograph: aerial view of the Dr. AIT campus (drait.edu.in) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          data-h="img"
          src={photo('campus/hero-aerial.webp')}
          srcSet={`${photo('campus/hero-aerial-sm.webp')} 768w, ${photo('campus/hero-aerial.webp')} 1200w`}
          sizes="100vw"
          alt="Aerial view of the Dr. Ambedkar Institute of Technology campus, Bengaluru"
          fetchPriority="high"
          className="h-[112%] w-full animate-kenburns object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/55 to-navy-950/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/40 to-transparent" />
      </div>

      <div className="container-site grid flex-1 items-center gap-12 pb-12 pt-32 lg:grid-cols-12 lg:pt-36">
        <div className="lg:col-span-7">
          <p data-h="eyebrow" className="eyebrow eyebrow-light">Dr. Ambedkar Institute of Technology · Bengaluru</p>
          <h1 className="mt-6 font-display text-[2.7rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block">{words('Student Welfare')}</span>
            <span className="block text-accent-300">{words('Office')}</span>
          </h1>
          <p data-h="sub" className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Clubs, fests and events that bring the Dr. AIT community together — a platform for every student to showcase their talents and grow.
          </p>
          <div data-h="cta" className="mt-9 flex flex-wrap gap-3">
            <MagneticButton>
              <Button to="/clubs" variant="light" size="lg">
                Explore clubs <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button to="/fests" variant="glass" size="lg">Discover fests</Button>
            </MagneticButton>
          </div>
        </div>

        {/* Fest photo stack */}
        <div className="relative hidden h-[460px] lg:col-span-5 lg:block" aria-label="Featured fests">
          {festCards.map((f, i) => (
            <SmartLink
              key={f.slug}
              to={`/fests/${f.slug}`}
              data-h="card"
              style={{ left: `${i * 19}%`, top: `${i * 118}px`, zIndex: 10 + i }}
              className="group absolute w-[62%] overflow-hidden rounded-3xl border border-white/20 shadow-2xl transition-transform duration-500 hover:!z-40 hover:-translate-y-2"
            >
              <Photo src={f.cover} alt="" className="aspect-[4/3]" />
              <span className="absolute inset-x-0 top-0 bg-gradient-to-b from-navy-950/90 via-navy-950/50 to-transparent p-4 pb-10">
                <span className="block text-[10px] font-semibold uppercase tracking-eyebrow text-accent-300">{f.type} fest</span>
                <span className="block font-display text-xl">{f.name}</span>
              </span>
            </SmartLink>
          ))}
        </div>
      </div>

      <div data-h="stats" className="container-site pb-8">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-navy-950/40 px-5 py-4 sm:py-5">
              <dt className="text-[11px] uppercase tracking-eyebrow text-white/60">{s.label}</dt>
              <dd className="mt-1 font-display text-2xl text-white sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Intro() {
  return (
    <Section id="about-swo">
      <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow">About the SWO</p>
          <h2 data-reveal className="mt-4 font-display text-3xl font-medium leading-[1.1] tracking-tight text-navy-900 text-balance sm:text-4xl lg:text-[2.75rem]">
            A single platform for student life at Dr. AIT.
          </h2>
          <p data-reveal className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">{SWO.intro}</p>
          <blockquote data-reveal className="mt-8 border-l-2 border-accent-500 pl-5">
            <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-600">Our vision</p>
            <p className="mt-2 font-display text-lg leading-relaxed text-navy-900">{SWO.vision}</p>
          </blockquote>
          <div data-reveal className="mt-8">
            <Button to="/about" variant="outline">
              More about the SWO <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {SWO.initiatives.map((it, i) => {
            const Icon = ICONS[it.icon] || Sparkles;
            return (
              <div key={it.title} data-reveal className={`rounded-3xl border border-line p-7 transition-colors hover:border-navy-200 ${i === 0 ? 'bg-navy-900 text-white sm:row-span-1' : 'bg-white'}`}>
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${i === 0 ? 'bg-white/10 text-accent-300' : 'bg-navy-50 text-navy-800'}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className={`mt-5 font-display text-xl ${i === 0 ? 'text-white' : 'text-navy-900'}`}>{it.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${i === 0 ? 'text-navy-100/80' : 'text-ink-muted'}`}>{it.points[0]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function ClubsPreview() {
  const featured = [...CLUBS].sort((a, b) => Number(hasProfile(b)) - Number(hasProfile(a))).slice(0, 6);
  return (
    <Section id="clubs" tone="canvas">
      <div className="container-site">
        <SectionHeading
          eyebrow="Clubs"
          title="Find your people."
          intro="Interdepartmental clubs, student chapters and national units — technical, cultural, service and wellness."
          action={<Button to="/clubs" variant="outline">All {CLUBS.length} clubs <ArrowRight className="h-4 w-4" aria-hidden /></Button>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => (
            <div key={c.slug} data-reveal><ClubCard club={c} /></div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function FestsPreview() {
  const [main, ...rest] = FESTS.filter((f) => f.featured);
  return (
    <Section id="fests">
      <div className="container-site">
        <SectionHeading
          eyebrow="Fests"
          title="Celebrations that light up the campus."
          intro="From the inter-college cultural fest Sanskruthi to national-level 24-hour hackathons."
          action={<Button to="/fests" variant="outline">All fests <ArrowRight className="h-4 w-4" aria-hidden /></Button>}
        />
        <div className="grid gap-5 lg:grid-cols-12">
          <div data-reveal className="lg:col-span-7"><FestCard fest={main} size="lg" className="h-full" /></div>
          <div className="grid gap-5 lg:col-span-5">
            {rest.map((f) => (
              <div key={f.slug} data-reveal><FestCard fest={f} className="h-full" /></div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function EventsPreview() {
  const upcoming = upcomingEvents().slice(0, 3);
  const recent = pastEvents().filter((e) => e.image).slice(0, 3);
  const instagram = SOCIAL.find((s) => s.id === 'instagram');
  return (
    <Section id="events" tone="canvas">
      <div className="container-site">
        <SectionHeading
          eyebrow="Events"
          title={upcoming.length ? 'Coming up on campus.' : 'Recently on campus.'}
          action={<Button to="/events" variant="outline">All events <ArrowRight className="h-4 w-4" aria-hidden /></Button>}
        />
        {upcoming.length > 0 ? (
          <div className="space-y-4">
            {upcoming.map((e) => <div key={e.id} data-reveal><EventCard event={e} /></div>)}
          </div>
        ) : (
          <div data-reveal className="mb-8 flex flex-col items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 text-sm text-ink-muted">
              <CalendarDays className="h-5 w-5 shrink-0 text-accent-500" aria-hidden />
              No upcoming events have been announced yet. New events appear here as soon as they’re published.
            </p>
            <SmartLink href={instagram.href} className="link-arrow shrink-0">Follow {instagram.handle} <ArrowUpRight className="h-4 w-4" aria-hidden /></SmartLink>
          </div>
        )}
        {!upcoming.length && (
          <div className="grid gap-5 md:grid-cols-3">
            {recent.map((e) => <div key={e.id} data-reveal><EventCard event={e} layout="feature" /></div>)}
          </div>
        )}
      </div>
    </Section>
  );
}

function AchievementsPreview() {
  const items = sortedAchievements().filter((a) => a.image).slice(0, 3);
  return (
    <Section id="achievements" tone="navy" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          light
          eyebrow="Achievements"
          title="Students who raise the bar."
          intro="Hackathon wins, motorsport podiums, NCC honours and national success stories."
          action={<Button to="/achievements" variant="light">All achievements <ArrowRight className="h-4 w-4" aria-hidden /></Button>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((a) => <div key={a.id} data-reveal><AchievementCard item={a} /></div>)}
        </div>
      </div>
    </Section>
  );
}

function GalleryPreview() {
  const picks = ['fests/sanskruthi-performer.webp', 'fests/kalarava-2025-stage.webp', 'fests/colossus-3-ceremony.webp', 'fests/maitri-dance.webp', 'events/marathon-2025.webp'];
  const all = ALL_PHOTOS();
  return (
    <Section id="gallery">
      <div className="container-site">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments worth remembering."
          action={<Button to="/gallery" variant="outline">Open gallery · {all.length} photos <ArrowRight className="h-4 w-4" aria-hidden /></Button>}
        />
        <div data-reveal className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:gap-4 lg:grid-cols-4">
          {picks.map((p, i) => (
            <SmartLink key={p} to="/gallery" className={`group relative overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <Photo src={p} alt="" className="h-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-navy-950/0 transition-colors group-hover:bg-navy-950/20" />
            </SmartLink>
          ))}
        </div>
      </div>
    </Section>
  );
}

function ConnectBand() {
  return (
    <Section id="connect" tone="canvas">
      <div className="container-site">
        <div data-reveal className="grid items-center gap-10 overflow-hidden rounded-[2rem] bg-navy-900 p-8 text-white sm:p-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow eyebrow-light">Get involved</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">Have an idea for an event or want to join a club?</h2>
            <p className="mt-4 max-w-xl text-navy-100/80">The SWO takes forward proposals submitted by students and represents them with the management and principal.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" variant="light" size="lg">Contact the SWO</Button>
              <Button to="/team" variant="glass" size="lg">Meet the team</Button>
            </div>
          </div>
          <div className="flex gap-4 lg:col-span-5 lg:justify-end">
            {SWO_TEAM.map((p) => (
              <figure key={p.name} className="w-1/2 max-w-[180px] text-center">
                <Photo src={p.photo} alt={p.name} className="aspect-[4/5] rounded-2xl" imgClassName="object-top" />
                <figcaption className="mt-3">
                  <span className="block text-sm font-semibold">{p.name}</span>
                  <span className="block text-xs text-navy-200/80">{p.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
