import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Table2, BarChart3 } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import {
  PLACEMENT_STATS, FEATURED_OFFERS_2026, RECRUITERS, PLACEMENT_PROCESS, PLACEMENT_INFRA, CONTACTS, officialPage,
} from '../../data/site';
import { prefersReducedMotion } from '../../lib/scroll';

function useInView(ref, threshold = 0.3) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, threshold]);
  return seen;
}

function CountUp({ to, run }) {
  const [n, setN] = useState(prefersReducedMotion() ? to : 0);
  useEffect(() => {
    if (!run || prefersReducedMotion()) return;
    let raf;
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

const METRICS = {
  maxLpa: { label: 'Highest featured package', unit: ' LPA', fmt: (v) => `${v} LPA` },
  offers: { label: 'Featured offers', unit: '', fmt: (v) => `${v} offer${v === 1 ? '' : 's'}` },
};

export default function Placements() {
  const statsRef = useRef(null);
  const inView = useInView(statsRef);
  const placementOffice = CONTACTS.find((c) => c.label.startsWith('Placement'));

  return (
    <Section id="placements" tone="navy" className="overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:28px_28px]" aria-hidden />
      <div className="container-site relative">
        <SectionHeading
          light
          eyebrow={`Placement statistics ${PLACEMENT_STATS.year}`}
          title="Careers that begin on campus."
          intro="The Career Development Cell offers placement assistance, guidance for higher education and entrepreneurship, and awareness on civil services and public-sector careers."
          action={
            <SmartLink href={officialPage('Placement-Highlights')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-white">
              Placement highlights <ArrowUpRight className="h-4 w-4" aria-hidden />
            </SmartLink>
          }
        />

        <dl ref={statsRef} data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
          {PLACEMENT_STATS.items.map((s, i) => (
            <div key={s.label} className={`bg-navy-950/60 p-6 sm:p-8 ${i === 4 ? 'col-span-2 sm:col-span-1' : ''}`}>
              <dt className="text-xs uppercase tracking-eyebrow text-navy-200/70">{s.label}</dt>
              <dd className="mt-3 font-display text-4xl text-white sm:text-5xl">
                <CountUp to={s.value} run={inView} />
                <span className="text-gold-300">{s.suffix}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          <OffersChart />

          <div data-reveal className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <h3 className="font-display text-xl text-white">Placement process</h3>
              <ol className="mt-5 space-y-4">
                {PLACEMENT_PROCESS.map((p, i) => (
                  <li key={p} className="flex gap-4 text-sm text-navy-100/85">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-400/50 text-xs text-gold-300">{i + 1}</span>
                    <span className="pt-1">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <h3 className="font-display text-xl text-white">Placement infrastructure</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-navy-100/85">
                {PLACEMENT_INFRA.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-400" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-white/10 pt-5 text-sm text-navy-200/80">
                Placement & Training Office:{' '}
                {placementOffice.phone.map((p, i) => (
                  <span key={p}>
                    {i > 0 && ' / '}
                    <a href={`tel:${p}`} className="text-white hover:text-gold-300">{p}</a>
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* Recruiters */}
        <div data-reveal className="mt-14">
          <p className="text-center text-xs uppercase tracking-eyebrow text-navy-200/60">Among our recruiters</p>
          <div className="mask-fade-x mt-6 overflow-hidden">
            <ul className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
              {[...RECRUITERS, ...RECRUITERS].map((r, i) => (
                <li
                  key={r + i}
                  aria-hidden={i >= RECRUITERS.length}
                  className="flex h-16 min-w-[160px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-8 font-display text-xl text-white/80"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

function OffersChart() {
  const [metric, setMetric] = useState('maxLpa');
  const [view, setView] = useState('chart');
  const [hover, setHover] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, 0.2);

  const rows = useMemo(() => [...FEATURED_OFFERS_2026].sort((a, b) => b[metric] - a[metric]), [metric]);
  const max = Math.max(...rows.map((r) => r[metric]));
  const m = METRICS[metric];

  return (
    <div ref={ref} data-reveal className="rounded-3xl bg-white p-6 text-ink sm:p-8 lg:col-span-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-navy-900 sm:text-2xl">Featured offers · Batch of 2026</h3>
          <p className="mt-1 max-w-md text-xs leading-relaxed text-ink-subtle">
            Offers highlighted on the official website, grouped by company. A selection — not the complete placement record.
          </p>
        </div>
        <div className="flex gap-1 rounded-full bg-canvas p-1" role="group" aria-label="Chart or table">
          <button type="button" aria-pressed={view === 'chart'} onClick={() => setView('chart')} className={`rounded-full p-2 ${view === 'chart' ? 'bg-white text-navy-900 shadow-card' : 'text-ink-subtle'}`} aria-label="Chart view">
            <BarChart3 className="h-4 w-4" aria-hidden />
          </button>
          <button type="button" aria-pressed={view === 'table'} onClick={() => setView('table')} className={`rounded-full p-2 ${view === 'table' ? 'bg-white text-navy-900 shadow-card' : 'text-ink-subtle'}`} aria-label="Table view">
            <Table2 className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>

      <div className="mt-5 flex gap-2" role="group" aria-label="Metric">
        {Object.entries(METRICS).map(([k, v]) => (
          <button key={k} type="button" aria-pressed={metric === k} onClick={() => setMetric(k)} className={`chip ${metric === k ? 'chip-on' : 'chip-off'}`}>
            {v.label}
          </button>
        ))}
      </div>

      {view === 'chart' ? (
        <ul className="mt-6 space-y-[2px]" aria-label={`${m.label} by company`}>
          {rows.map((r, i) => {
            const pct = (r[metric] / max) * 100;
            const active = hover === r.company;
            return (
              <li
                key={r.company}
                className="group relative grid grid-cols-[112px_1fr_auto] items-center gap-3 rounded-lg px-1 py-1.5 sm:grid-cols-[150px_1fr_auto]"
                onMouseEnter={() => setHover(r.company)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.company)}
                onBlur={() => setHover(null)}
                tabIndex={0}
                aria-label={`${r.company}: ${m.fmt(r[metric])}`}
              >
                <span className={`truncate text-xs sm:text-[13px] ${active ? 'font-semibold text-navy-900' : 'text-ink-muted'}`}>{r.company}</span>
                <span className="relative h-3.5 rounded-r bg-navy-50">
                  <span
                    className={`absolute inset-y-0 left-0 rounded-r transition-[width,background-color] duration-700 ease-out ${active ? 'bg-gold-500' : 'bg-navy-800'}`}
                    style={{ width: inView ? `${pct}%` : '0%', transitionDelay: `${i * 35}ms` }}
                  />
                </span>
                <span className={`w-16 text-right text-xs tabular-nums ${active || i < 3 ? 'font-semibold text-navy-900' : 'text-transparent group-hover:text-navy-900'}`}>
                  {r[metric]}
                  {m.unit}
                </span>
                {active && (
                  <span role="tooltip" className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-lg bg-navy-950 px-3 py-1.5 text-xs text-white shadow-lift">
                    <strong>{r.company}</strong> · {r.maxLpa} LPA highest · {r.offers} featured offer{r.offers === 1 ? '' : 's'}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-subtle">
                <th className="py-2 font-medium">Company</th>
                <th className="py-2 text-right font-medium">Featured offers</th>
                <th className="py-2 text-right font-medium">Highest package (LPA)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.company} className="border-b border-line/70">
                  <td className="py-2.5 text-navy-900">{r.company}</td>
                  <td className="py-2.5 text-right tabular-nums">{r.offers}</td>
                  <td className="py-2.5 text-right tabular-nums">{r.maxLpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="mt-5 text-[11px] text-ink-faint">Source: drait.edu.in — “Our Proud Placements, Congratulations to the Batch of 2026”.</p>
    </div>
  );
}
