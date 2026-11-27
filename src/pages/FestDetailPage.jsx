import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowUpRight, Check, FileText, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import Photo from '../components/ui/Photo';
import SmartLink from '../components/ui/SmartLink';
import SocialIcon from '../components/ui/SocialIcon';
import Lightbox from '../components/ui/Lightbox';
import Button from '../components/ui/Button';
import FestCard from '../components/cards/FestCard';
import { editionWhen } from '../lib/format';
import { FESTS, getFest, getClub } from '../content';
import { isUpcoming } from '../lib/dates';
import usePageTitle from '../lib/usePageTitle';
import NotFoundPage from './NotFoundPage';

export default function FestDetailPage() {
  const { slug } = useParams();
  const fest = getFest(slug);
  usePageTitle(fest ? `${fest.name} — SWO, Dr. AIT` : 'Fest not found');
  const [lightbox, setLightbox] = useState(null);
  if (!fest) return <NotFoundPage />;

  const gallery = (fest.gallery || []).map((src) => ({ src, caption: fest.name }));
  const links = Object.entries(fest.links || {});
  const club = fest.club && getClub(fest.club);
  const more = FESTS.filter((f) => f.slug !== fest.slug && f.type === fest.type).slice(0, 3);
  const live = fest.editions?.find((e) => e.registration && e.start && isUpcoming(e));

  return (
    <>
      <PageHeader eyebrow={`${fest.type} fest`} title={fest.name} intro={fest.tagline} image={fest.cover} crumbs={[{ label: 'Fests', to: '/fests' }]}>
        <div className="flex flex-wrap gap-3">
          {live && <Button href={live.registration.url} variant="light" size="lg">{live.registration.label || `Register for ${live.name}`}</Button>}
          {links.map(([k, v]) => (
            <Button key={k} href={k === 'email' ? `mailto:${v}` : v} variant="glass">
              <SocialIcon id={k === 'website' ? 'web' : k} /> {k === 'email' ? v : k === 'website' ? 'Website' : k[0].toUpperCase() + k.slice(1)}
            </Button>
          ))}
        </div>
      </PageHeader>

      <Section className="!pt-14">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {fest.description?.length > 0 && (
              <div data-reveal className="space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                <h2 className="font-display text-3xl text-navy-900">About {fest.name}</h2>
                {fest.description.map((p) => <p key={p}>{p}</p>)}
              </div>
            )}
            {(fest.organiser || club) && (
              <p data-reveal className="mt-6 text-sm text-ink-muted">
                Organised by <span className="font-semibold text-navy-900">{fest.organiser || ''}</span>
                {club && <SmartLink to={`/clubs/${club.slug}`} className="font-semibold text-navy-900 underline underline-offset-4">{club.name}</SmartLink>}
              </p>
            )}

            {/* Editions timeline */}
            {fest.editions?.length > 0 && (
              <div data-reveal className={fest.description?.length ? 'mt-14' : ''}>
                <h2 className="font-display text-2xl text-navy-900">Editions</h2>
                <ol className="relative mt-6 space-y-6 border-l border-navy-100 pl-8">
                  {fest.editions.map((e) => (
                    <li key={e.name} className="relative">
                      <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-navy-900 ring-2 ring-navy-100" aria-hidden />
                      <div className="rounded-3xl border border-line bg-white p-6 shadow-card">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-xl text-navy-900">{e.name}</h3>
                          {editionWhen(e) && <span className="text-sm font-medium text-accent-600">{editionWhen(e)}</span>}
                        </div>
                        {e.summary && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{e.summary}</p>}
                        {e.highlights?.length > 0 && (
                          <ul className="mt-4 space-y-2">
                            {e.highlights.map((h) => (
                              <li key={h} className="flex gap-3 text-sm text-ink"><Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden /> {h}</li>
                            ))}
                          </ul>
                        )}
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                          {e.registration && e.start && isUpcoming(e) && (
                            <SmartLink href={e.registration.url} className="inline-flex items-center gap-1 rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-white">Register <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></SmartLink>
                          )}
                          {e.report && (
                            <SmartLink href={e.report} className="inline-flex items-center gap-1 text-xs font-semibold text-navy-700 hover:text-accent-600"><FileText className="h-3.5 w-3.5" aria-hidden /> Event report</SmartLink>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5">
            {gallery.length > 0 && (
              <div data-reveal className="lg:sticky lg:top-28">
                <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-600">Photos</h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {gallery.map((g, i) => (
                    <button key={g.src} type="button" onClick={() => setLightbox(i)} className={`group overflow-hidden rounded-2xl ${i === 0 ? 'col-span-2' : ''}`} aria-label={`Open photo ${i + 1} of ${fest.name}`}>
                      <Photo src={g.src} alt="" className={i === 0 ? 'aspect-[16/10]' : 'aspect-square'} imgClassName="transition-transform duration-700 group-hover:scale-105" />
                    </button>
                  ))}
                </div>
                {fest.editions?.find((e) => e.poster) && (
                  <Photo src={fest.editions.find((e) => e.poster).poster} alt={`${fest.name} poster`} className="mt-3 aspect-[9/16] max-h-[520px] rounded-2xl" imgClassName="object-contain bg-navy-950" />
                )}
              </div>
            )}
            {fest.source && <p className="mt-4 text-xs text-ink-faint">Source: {fest.source}</p>}
          </aside>
        </div>

        {more.length > 0 && (
          <div className="container-site mt-20 border-t border-line pt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-navy-900">More {fest.type.toLowerCase()} fests</h2>
              <SmartLink to="/fests" className="link-arrow"><ArrowLeft className="h-4 w-4" aria-hidden /> All fests</SmartLink>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-3">{more.map((f) => <FestCard key={f.slug} fest={f} />)}</div>
          </div>
        )}
      </Section>

      {lightbox !== null && <Lightbox items={gallery} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
