import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Mail, Users } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section } from '../components/ui/Section';
import Photo from '../components/ui/Photo';
import SmartLink from '../components/ui/SmartLink';
import SocialIcon from '../components/ui/SocialIcon';
import Lightbox from '../components/ui/Lightbox';
import EmptyState from '../components/ui/EmptyState';
import { ClubMark } from '../components/cards/ClubCard';
import ClubCard from '../components/cards/ClubCard';
import PersonCard from '../components/cards/PersonCard';
import EventCard from '../components/cards/EventCard';
import AchievementCard from '../components/cards/AchievementCard';
import { CLUBS, SWO, getClub, hasProfile, eventsForClub, achievementsForClub } from '../content';
import usePageTitle from '../lib/usePageTitle';
import NotFoundPage from './NotFoundPage';

export default function ClubDetailPage() {
  const { slug } = useParams();
  const club = getClub(slug);
  usePageTitle(club ? `${club.name} — SWO, Dr. AIT` : 'Club not found');
  const [lightbox, setLightbox] = useState(null);
  if (!club) return <NotFoundPage />;

  const published = hasProfile(club);
  const events = eventsForClub(club.slug);
  const achievements = achievementsForClub(club.slug);
  const links = Object.entries(club.links || {});
  const others = CLUBS.filter((c) => c.slug !== club.slug && c.category === club.category).slice(0, 3);
  const gallery = (club.gallery || []).map((src) => ({ src, caption: club.name }));

  return (
    <>
      <PageHeader
        eyebrow={`${club.category} · ${club.kind}`}
        title={club.name}
        intro={club.tagline}
        image={club.cover || 'fests/kalarava-2025-stage.webp'}
        crumbs={[{ label: 'Clubs', to: '/clubs' }]}
      >
        <ClubMark club={club} size="lg" />
      </PageHeader>

      <Section className="!pt-14">
        <div className="container-site grid gap-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            {published ? (
              <>
                {club.description?.length > 0 && (
                  <div data-reveal>
                    <h2 className="font-display text-3xl text-navy-900">About the club</h2>
                    <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted sm:text-lg">
                      {club.description.map((p) => <p key={p}>{p}</p>)}
                    </div>
                  </div>
                )}
                {club.activities?.length > 0 && (
                  <div data-reveal>
                    <h2 className="font-display text-2xl text-navy-900">Activities</h2>
                    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                      {club.activities.map((a) => (
                        <li key={a} className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm text-ink">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden /> {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <EmptyState title="Club profile coming soon">
                The {club.name} is one of the interdepartmental clubs under the Student Welfare Office. Its description, coordinators and activities will be
                published here. To get involved now, write to <a className="font-semibold text-navy-800 underline underline-offset-4" href={`mailto:${SWO.email}`}>{SWO.email}</a>.
              </EmptyState>
            )}

            {gallery.length > 0 && (
              <div data-reveal>
                <h2 className="font-display text-2xl text-navy-900">Gallery</h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {gallery.map((g, i) => (
                    <button key={g.src} type="button" onClick={() => setLightbox(i)} className="group overflow-hidden rounded-2xl" aria-label={`Open photo ${i + 1}`}>
                      <Photo src={g.src} alt="" className="aspect-[4/3]" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {achievements.length > 0 && (
              <div data-reveal>
                <h2 className="font-display text-2xl text-navy-900">Achievements</h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {achievements.map((a) => <AchievementCard key={a.id} item={a} />)}
                </div>
              </div>
            )}

            {events.length > 0 && (
              <div data-reveal>
                <h2 className="font-display text-2xl text-navy-900">Events</h2>
                <div className="mt-5 space-y-4">{events.map((e) => <EventCard key={e.id} event={e} />)}</div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            {club.facts?.length > 0 && (
              <dl data-reveal className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
                {club.facts.map((f) => (
                  <div key={f.label} className="bg-white p-5">
                    <dt className="text-[11px] uppercase tracking-eyebrow text-ink-subtle">{f.label}</dt>
                    <dd className="mt-1 font-display text-lg text-navy-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            <div data-reveal>
              <h2 className="text-[11px] font-semibold uppercase tracking-eyebrow text-accent-600">Coordinators</h2>
              <div className="mt-3 space-y-3">
                {club.coordinators?.length ? (
                  club.coordinators.map((p) => <PersonCard key={p.name} person={p} />)
                ) : (
                  <p className="rounded-2xl border border-dashed border-line p-5 text-sm text-ink-subtle">Coordinators will be listed once announced.</p>
                )}
              </div>
            </div>

            {(club.members?.length > 0 || club.memberCount) && (
              <div data-reveal className="rounded-3xl border border-line bg-white p-6">
                <h2 className="flex items-center gap-2 font-display text-xl text-navy-900"><Users className="h-5 w-5 text-accent-500" aria-hidden /> Members</h2>
                {club.memberCount && <p className="mt-2 text-sm text-ink-muted">{club.memberCount} members</p>}
                {club.members?.length > 0 && (
                  <ul className="mt-4 divide-y divide-line text-sm">
                    {club.members.map((m) => (
                      <li key={m.name} className="flex justify-between gap-3 py-2"><span className="text-navy-900">{m.name}</span><span className="text-ink-subtle">{m.role}</span></li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <div data-reveal className="rounded-3xl bg-navy-900 p-6 text-white">
              <h2 className="font-display text-xl">Join or connect</h2>
              <p className="mt-2 text-sm text-navy-100/80">Interested in this club? Reach out and the SWO will connect you with the coordinators.</p>
              <div className="mt-5 flex flex-col gap-2">
                {links.map(([k, v]) => (
                  <SmartLink key={k} href={k === 'email' ? `mailto:${v}` : v} className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
                    <SocialIcon id={k === 'website' ? 'web' : k} /> {k === 'email' ? v : k[0].toUpperCase() + k.slice(1)} <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
                  </SmartLink>
                ))}
                <a href={`mailto:${SWO.email}?subject=${encodeURIComponent(`Joining ${club.name}`)}`} className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-navy-900 hover:bg-accent-50">
                  <Mail className="h-4 w-4" aria-hidden /> Email the SWO
                </a>
              </div>
            </div>
            {club.source && <p className="text-xs text-ink-faint">Source: {club.source}</p>}
          </aside>
        </div>

        {others.length > 0 && (
          <div className="container-site mt-20 border-t border-line pt-14">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-navy-900">More {club.category.toLowerCase()} clubs</h2>
              <SmartLink to="/clubs" className="link-arrow"><ArrowLeft className="h-4 w-4" aria-hidden /> All clubs</SmartLink>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{others.map((c) => <ClubCard key={c.slug} club={c} />)}</div>
          </div>
        )}
      </Section>

      {lightbox !== null && <Lightbox items={gallery} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}
