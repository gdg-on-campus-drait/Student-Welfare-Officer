import { useMemo, useState } from 'react';
import { Expand, PlayCircle, ArrowUpRight, Video } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import FilterChips from '../components/ui/FilterChips';
import Photo from '../components/ui/Photo';
import Lightbox from '../components/ui/Lightbox';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import { ALBUMS, VIDEOS, YOUTUBE_CHANNEL } from '../content';
import usePageTitle from '../lib/usePageTitle';

const ALL = 'All';

export default function GalleryPage() {
  usePageTitle('Gallery — SWO, Dr. AIT');
  const [tab, setTab] = useState('photos');
  const [cat, setCat] = useState(ALL);
  const [album, setAlbum] = useState(null);
  const [index, setIndex] = useState(null);

  const cats = [ALL, ...new Set(ALBUMS.map((a) => a.category))];
  const albums = ALBUMS.filter((a) => cat === ALL || a.category === cat);
  const items = useMemo(
    () =>
      ALBUMS.filter((a) => (album ? a.id === album : cat === ALL || a.category === cat)).flatMap((a) =>
        a.photos.map((src) => ({ src, caption: a.year ? `${a.title} · ${a.year}` : a.title }))
      ),
    [album, cat]
  );

  return (
    <>
      <PageHeader eyebrow="Gallery" title="Photos & videos" intro="Fests, events and campus activities through the years — from the official Dr. AIT gallery and event reports." image="fests/maitri-crowd.webp" />

      <Section className="!pt-14">
        <div className="container-site">
          <div className="inline-flex rounded-full bg-canvas p-1" role="tablist" aria-label="Media type">
            {[['photos', `Photos · ${ALBUMS.reduce((n, a) => n + a.photos.length, 0)}`], ['videos', `Videos · ${VIDEOS.length}`]].map(([k, l]) => (
              <button key={k} role="tab" type="button" aria-selected={tab === k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === k ? 'bg-navy-900 text-white shadow-card' : 'text-ink-muted hover:text-navy-900'}`}>
                {l}
              </button>
            ))}
          </div>

          {tab === 'photos' ? (
            <>
              <div className="mt-6">
                <FilterChips options={cats} value={cat} onChange={(c) => { setCat(c); setAlbum(null); }} label="Album category" />
              </div>
              {/* Album strip */}
              <div className="no-scrollbar -mx-4 mt-6 flex gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
                {albums.map((a) => {
                  const on = album === a.id;
                  return (
                    <button key={a.id} type="button" aria-pressed={on} onClick={() => setAlbum(on ? null : a.id)} className={`group relative h-24 w-40 shrink-0 overflow-hidden rounded-2xl text-left ring-offset-2 transition ${on ? 'ring-2 ring-navy-900' : 'hover:ring-2 hover:ring-navy-200'}`}>
                      <Photo src={a.photos[0]} alt="" className="absolute inset-0" />
                      <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-navy-950/10" />
                      <span className="absolute inset-x-0 bottom-0 p-2.5 text-white">
                        <span className="block truncate text-xs font-semibold">{a.title}</span>
                        <span className="block text-[10px] text-white/70">{a.photos.length} photo{a.photos.length > 1 ? 's' : ''}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <ul className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4" aria-live="polite">
                {items.map((it, i) => (
                  <li key={`${it.src}-${i}`} className="break-inside-avoid">
                    <button type="button" onClick={() => setIndex(i)} className="group relative block w-full overflow-hidden rounded-2xl bg-navy-50" aria-label={`Open photo: ${it.caption}`}>
                      <Photo src={it.src} alt={it.caption} className={i % 5 === 1 ? 'aspect-[4/5]' : 'aspect-[3/2]'} imgClassName="transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-navy-950/80 via-transparent p-4 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                        <span className="font-display text-lg">{it.caption}</span>
                        <Expand className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : VIDEOS.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {VIDEOS.map((v) => <VideoCard key={v.youtubeId} video={v} />)}
            </div>
          ) : (
            <EmptyState icon={Video} title="Videos coming soon" className="mt-8">
              Fest aftermovies and event videos will be added here. Meanwhile, watch Dr. AIT on the official YouTube channel.
              <div className="mt-5">
                <Button href={YOUTUBE_CHANNEL} variant="primary">Open YouTube channel <ArrowUpRight className="h-4 w-4" aria-hidden /></Button>
              </div>
            </EmptyState>
          )}
        </div>
      </Section>

      {index !== null && <Lightbox items={items} index={index} onChange={setIndex} onClose={() => setIndex(null)} />}
    </>
  );
}

/** Click-to-load YouTube embed (no third-party requests until played). */
function VideoCard({ video }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
      <div className="relative aspect-video bg-navy-950">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlay(true)} className="group absolute inset-0" aria-label={`Play ${video.title}`}>
            <img src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80" />
            <PlayCircle className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-white transition-transform group-hover:scale-110" aria-hidden />
          </button>
        )}
      </div>
      <figcaption className="p-5">
        <p className="font-display text-lg text-navy-900">{video.title}</p>
        {video.year && <p className="text-sm text-ink-subtle">{video.year}</p>}
      </figcaption>
    </figure>
  );
}
