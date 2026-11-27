import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '../../lib/scroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Page section with consistent spacing and a scroll reveal for any child marked
 * `data-reveal`. Content is visible by default; the animation only runs when motion is allowed.
 */
export function Section({ id, className = '', children, tone = 'white', ...rest }) {
  const ref = useRef(null);
  const tones = {
    white: 'bg-white',
    canvas: 'bg-canvas',
    navy: 'bg-navy-950 text-white',
  };

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const items = gsap.utils.toArray(ref.current.querySelectorAll('[data-reveal]'));
      items.forEach((el) => {
        gsap.from(el, {
          y: 24,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id={id} ref={ref} className={`relative py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`} {...rest}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light = false, action }) {
  const center = align === 'center';
  return (
    <div
      data-reveal
      className={`mb-12 flex flex-col gap-6 lg:mb-14 ${center ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'}`}
    >
      <div className={center ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow && <p className={`eyebrow ${light ? 'eyebrow-light' : ''}`}>{eyebrow}</p>}
        <h2
          className={`mt-4 font-display text-3xl font-medium leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] ${
            light ? 'text-white' : 'text-navy-900'
          }`}
        >
          {title}
        </h2>
        {intro && (
          <p className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${light ? 'text-navy-100/80' : 'text-ink-muted'}`}>
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
