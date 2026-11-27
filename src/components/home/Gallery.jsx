import { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ArrowUpRight, Expand } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { officialPage } from '../../data/site';
import { lockScroll } from '../../lib/scroll';

import graduation9 from '../../assets/gallery/graduation-9th.webp';
import graduation11 from '../../assets/gallery/graduation-11th.webp';
import ambedkarMemorial from '../../assets/gallery/ambedkar-memorial.webp';
import kalarava2019 from '../../assets/gallery/kalarava-2019.webp';
import independence from '../../assets/gallery/independence-day-2022.webp';
import techno2019 from '../../assets/gallery/techno-exhibition-2019.webp';
import sanskruthi from '../../assets/gallery/sanskruthi-2025.webp';
import campusGate from '../../assets/gallery/campus-gate.webp';
import maitri2018 from '../../assets/gallery/maitri-2018.webp';
import colossus3 from '../../assets/gallery/colossus-3.webp';
import buddha from '../../assets/gallery/buddha-jayanthi-2025.webp';
import firstYear from '../../assets/gallery/first-year-inauguration-2021.webp';
import maitri2019 from '../../assets/gallery/maitri-2019.webp';
import nss from '../../assets/gallery/nss-collage.webp';

/* Photographs from the official Dr. AIT gallery (drait.edu.in/home/Gallery). */
const PHOTOS = [
  { src: graduation9, title: '9th Graduation Day', year: '2022', cat: 'Ceremonies', tall: false },
  { src: campusGate, title: 'Founders’ Day at the campus gate', year: '2025', cat: 'Campus', tall: true },
  { src: sanskruthi, title: 'Sanskruthi 2025', year: '2025', cat: 'Culture' },
  { src: colossus3, title: 'COLOSSUS 3.0 Hackathon', year: '', cat: 'Technical' },
  { src: ambedkarMemorial, title: 'Dr. B.R. Ambedkar Jayanthi', year: '2019', cat: 'Campus', tall: true },
  { src: kalarava2019, title: 'Kalarava', year: '2019', cat: 'Culture' },
  { src: techno2019, title: 'National Level Techno Exhibition', year: '2019', cat: 'Technical' },
  { src: graduation11, title: '11th Graduation Day', year: '2025', cat: 'Ceremonies' },
  { src: independence, title: 'Independence Day', year: '2022', cat: 'Campus' },
  { src: maitri2018, title: 'mAITri', year: '2018', cat: 'Culture' },
  { src: nss, title: 'NSS activities', year: '', cat: 'Service' },
  { src: buddha, title: '2569th Buddha Jayanthi', year: '2025', cat: 'Ceremonies' },
  { src: firstYear, title: 'First Year B.E. inauguration', year: '2021', cat: 'Ceremonies' },
  { src: maitri2019, title: 'mAITri', year: '2019', cat: 'Culture' },
];

const label = (p) => (p.year ? `${p.title}, ${p.year}` : p.title);

const CATS = ['All', 'Ceremonies', 'Culture', 'Technical', 'Campus', 'Service'];

export default function Gallery() {
  const [cat, setCat] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [index, setIndex] = useState(null);

  const photos = useMemo(() => PHOTOS.filter((p) => cat === 'All' || p.cat === cat), [cat]);
  const visible = showAll || cat !== 'All' ? photos : photos.slice(0, 9);

  return (
    <Section id="gallery">
      <div className="container-site">
        <SectionHeading
          eyebrow="Gallery"
          title="Moments from campus."
          action={
            <SmartLink href={officialPage('Gallery')} className="link-arrow">
              Full official gallery <ArrowUpRight className="h-4 w-4" aria-hidden />
            </SmartLink>
          }
        />
        <div data-reveal className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          {CATS.map((c) => (
            <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)} className={`chip shrink-0 ${cat === c ? 'chip-on' : 'chip-off'}`}>
              {c}
            </button>
          ))}
        </div>

        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {visible.map((p, i) => (
            <li key={p.title + p.year} className="break-inside-avoid">
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block w-full overflow-hidden rounded-2xl bg-navy-50"
                aria-label={`Open photo: ${label(p)}`}
              >
                <img
                  src={p.src}
                  alt={label(p)}
                  loading="lazy"
                  decoding="async"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${p.tall ? 'aspect-[4/5]' : 'aspect-[3/2]'}`}
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-navy-950/80 via-navy-950/0 to-transparent p-4 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span>
                    <span className="block text-[11px] uppercase tracking-eyebrow text-gold-300">{p.cat}{p.year && ` · ${p.year}`}</span>
                    <span className="mt-0.5 block font-display text-lg">{p.title}</span>
                  </span>
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
              </button>
            </li>
          ))}
        </ul>

        {cat === 'All' && !showAll && photos.length > 9 && (
          <div className="mt-6 flex justify-center">
            <button type="button" onClick={() => setShowAll(true)} className="chip chip-off px-6 py-2.5 text-sm">
              Show {photos.length - 9} more photos
            </button>
          </div>
        )}
      </div>

      {index !== null && <Lightbox photos={visible} index={index} setIndex={setIndex} />}
    </Section>
  );
}

function Lightbox({ photos, index, setIndex }) {
  const close = useCallback(() => setIndex(null), [setIndex]);
  const go = useCallback((d) => setIndex((i) => (i + d + photos.length) % photos.length), [photos.length, setIndex]);

  useEffect(() => {
    lockScroll(true);
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lockScroll(false);
    };
  }, [close, go]);

  const p = photos[index];
  return (
    <div role="dialog" aria-modal="true" aria-label={p.title} className="fixed inset-0 z-[70] flex flex-col bg-navy-950/95 backdrop-blur-sm" onClick={close}>
      <div className="flex items-center justify-between p-4 text-white sm:p-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm">
          <span className="font-display text-lg">{p.title}</span>
          <span className="ml-3 text-white/60">{p.year && `${p.year} · `}{index + 1} / {photos.length}</span>
        </p>
        <button type="button" onClick={close} autoFocus className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 hover:bg-white/10" aria-label="Close">
          <X className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="relative flex flex-1 items-center justify-center px-4 pb-8 sm:px-20">
        <img key={p.src} src={p.src} alt={label(p)} className="max-h-full max-w-full animate-fadeUp rounded-xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        {[[-1, ChevronLeft, 'left-2 sm:left-6', 'Previous'], [1, ChevronRight, 'right-2 sm:right-6', 'Next']].map(([d, Icon, pos, label]) => (
          <button
            key={label}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(d);
            }}
            className={`absolute top-1/2 ${pos} inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-navy-950`}
            aria-label={`${label} photo`}
          >
            <Icon className="h-5 w-5" aria-hidden />
          </button>
        ))}
      </div>
    </div>
  );
}
