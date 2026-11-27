import { UserRound } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import { Section, SectionHeading } from '../components/ui/Section';
import SmartLink from '../components/ui/SmartLink';
import PersonCard from '../components/cards/PersonCard';
import { SWO, SWO_TEAM, LEADERSHIP, STUDENT_COUNCIL, clubCoordinators } from '../content';
import usePageTitle from '../lib/usePageTitle';

export default function TeamPage() {
  usePageTitle('Core Team — SWO, Dr. AIT');
  const coordinators = clubCoordinators();
  const byClub = coordinators.reduce((acc, p) => ((acc[p.club.slug] ||= { club: p.club, people: [] }).people.push(p), acc), {});

  return (
    <>
      <PageHeader eyebrow="Core Team" title="The people behind student life" intro="SWO officials, institute leadership, club coordinators and the Student Council." image="campus/students-steps.webp" />

      <Section className="!pt-14">
        <div className="container-site">
          <SectionHeading eyebrow="Student Welfare Office" title="SWO officials" />
          <div className="grid gap-6 sm:grid-cols-2 lg:max-w-4xl">
            {SWO_TEAM.map((p) => <div key={p.name} data-reveal><PersonCard person={p} variant="feature" /></div>)}
          </div>
        </div>
      </Section>

      <Section tone="canvas">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Leadership" title="Institute leadership" />
            <div className="space-y-3">{LEADERSHIP.map((p) => <div key={p.name} data-reveal><PersonCard person={p} /></div>)}</div>
          </div>
          <div className="lg:col-span-8">
            <SectionHeading eyebrow="Club leadership" title="Club & unit coordinators" />
            <div className="space-y-8">
              {Object.values(byClub).map(({ club, people }) => (
                <div key={club.slug} data-reveal>
                  <SmartLink to={`/clubs/${club.slug}`} className="font-display text-lg text-navy-900 hover:text-accent-600">{club.name}</SmartLink>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">{people.map((p) => <PersonCard key={p.name + p.role} person={p} />)}</div>
                </div>
              ))}
              <p className="text-sm text-ink-subtle">Coordinators for other clubs will appear here as soon as their profiles are published.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="container-site">
          <SectionHeading eyebrow="Student Council" title="Student Council" intro={`${SWO.studentCouncil.note} Office-bearers are listed once announced.`} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SWO.studentCouncil.members.map((m) => {
              const holders = STUDENT_COUNCIL.members.filter((s) => s.role === m.role);
              return (
                <div key={m.role} data-reveal className="rounded-3xl border border-line bg-white p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-700"><UserRound className="h-5 w-5" aria-hidden /></span>
                  <p className="mt-4 font-display text-xl text-navy-900">{m.role}</p>
                  <p className="mt-1 text-sm text-ink-muted">{m.who}</p>
                  {holders.length > 0 && (
                    <ul className="mt-3 space-y-1 border-t border-line pt-3 text-sm font-medium text-navy-900">
                      {holders.map((h) => <li key={h.name}>{h.name}{h.dept && <span className="font-normal text-ink-subtle"> · {h.dept}</span>}</li>)}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
