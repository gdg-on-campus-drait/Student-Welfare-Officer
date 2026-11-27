import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import MagneticButton from '../MagneticButton';
import SmartLink from '../ui/SmartLink';
import { INSTITUTE } from '../../data/site';
import { prefersReducedMotion } from '../../lib/scroll';
import heroLg from '../../assets/campus/hero-aerial.webp';
import heroSm from '../../assets/campus/hero-aerial-sm.webp';

const FACTS = [
  { value: '1980', label: 'Established' },
  { value: `NAAC ${INSTITUTE.naac}`, label: 'Accredited' },
  { value: `#${INSTITUTE.nirfRank}`, label: 'NIRF rank' },
  { value: `${INSTITUTE.campusAcres} acres`, label: 'Campus' },
  { value: 'Autonomous', label: `Since ${INSTITUTE.autonomySince} · VTU` },
];

export default function Hero() {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('[data-hero="eyebrow"]', { y: 16, opacity: 0, duration: 0.7, delay: 0.15 })
        .from('[data-hero="word"]', { yPercent: 110, duration: 1, stagger: 0.06 }, '-=0.4')
        .from('[data-hero="sub"]', { y: 16, opacity: 0, duration: 0.7 }, '-=0.6')
        .from('[data-hero="cta"] > *', { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.45')
        .from('[data-hero="facts"]', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4');

      // subtle parallax on the photograph
      gsap.to('[data-hero="img"]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    },
    { scope: ref }
  );

  const line = (text) =>
    text.split(' ').map((w, i) => (
      <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom last:mr-0">
        <span data-hero="word" className="inline-block">
          {w}
        </span>
      </span>
    ));

  return (
    <section id="top" ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 text-white lg:h-[100svh] lg:max-h-[1000px] lg:min-h-[680px]">
      {/* Real Dr. AIT campus photograph (aerial view of the main block) — source: drait.edu.in */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          data-hero="img"
          src={heroLg}
          srcSet={`${heroSm} 768w, ${heroLg} 1200w`}
          sizes="100vw"
          alt="Aerial view of the Dr. Ambedkar Institute of Technology main block and gardens, Bengaluru"
          fetchPriority="high"
          decoding="async"
          className="h-[115%] w-full animate-kenburns object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/45 to-navy-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/35 to-transparent" />
      </div>

      <div className="container-site flex flex-1 flex-col justify-center pb-10 pt-28 sm:pb-14 lg:pt-36">
        <div className="max-w-3xl">
          <p data-hero="eyebrow" className="eyebrow eyebrow-light">
            <span className="hidden sm:inline">Dr. Ambedkar Institute of Technology · </span>Bengaluru · Est. 1980
          </p>
          <h1 className="mt-6 font-display lg:w-[60rem] lg:max-w-[calc(100vw-4rem)] text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            <span className="block">{line('Engineering Tomorrow.')}</span>
            <span className="block text-gold-300">{line('Inspiring Innovation.')}</span>
          </h1>
          <p data-hero="sub" className="mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            An autonomous institution affiliated to VTU and accredited by NAAC with ‘A+’ grade, educating engineers,
            technologists and managers in Bengaluru since 1980.
          </p>
          <div data-hero="cta" className="mt-9 flex flex-wrap items-center gap-3">
            <MagneticButton>
              <Button to="/#academics" variant="gold" size="lg">
                Explore Programs
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button to="/#about" variant="glass" size="lg">
                About Us
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Fact bar */}
      <div data-hero="facts" className="relative">
        <div className="container-site">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-t-2xl border border-b-0 border-white/15 bg-white/10 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-5">
            {FACTS.map((f, i) => (
              <div
                key={f.label}
                className={`bg-navy-950/40 px-5 py-4 sm:py-5 ${i === 2 ? 'hidden sm:block' : ''} ${i >= 3 ? 'hidden lg:block' : ''}`}
              >
                <dt className="text-[11px] uppercase tracking-eyebrow text-white/60">{f.label}</dt>
                <dd className="mt-1 font-display text-xl text-white sm:text-2xl">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <SmartLink
        to="/#about"
        className="absolute bottom-28 right-6 hidden flex-col items-center gap-2 text-[10px] uppercase tracking-eyebrow text-white/60 hover:text-white lg:flex"
        aria-label="Scroll to About"
      >
        Scroll
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
      </SmartLink>
    </section>
  );
}
