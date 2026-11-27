import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, Phone, Mail, FileText } from 'lucide-react';
import { Section, SectionHeading } from '../ui/Section';
import SmartLink from '../ui/SmartLink';
import { SCHOOLS, PEOPLE, FACULTY_LIST_PDF } from '../../data/site';

const GROUPS = ['All', 'Leadership', 'Heads of School', 'Student Services'];

const initials = (name) =>
  name
    .replace(/^(Dr\.|Ms\.|Mr\.|Sri\.|Lt\.)\s*/i, '')
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

export default function Departments() {
  const [schoolId, setSchoolId] = useState(SCHOOLS[2].id);
  const school = SCHOOLS.find((s) => s.id === schoolId);

  return (
    <Section id="departments">
      <div className="container-site">
        <SectionHeading
          eyebrow="Schools & Departments"
          title="Five schools. One connected campus."
          intro="Departments are organised into five schools, each led by a Head of School."
        />

        {/* School selector */}
        <div data-reveal className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Schools">
          {SCHOOLS.map((s) => (
            <button
              key={s.id}
              role="tab"
              type="button"
              aria-selected={s.id === schoolId}
              onClick={() => setSchoolId(s.id)}
              className={`chip shrink-0 ${s.id === schoolId ? 'chip-on' : 'chip-off'}`}
            >
              {s.short}
            </button>
          ))}
        </div>

        <div data-reveal className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="relative overflow-hidden rounded-3xl bg-navy-900 p-8 text-white lg:col-span-4">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-gold-500/20" aria-hidden />
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full border border-gold-500/30" aria-hidden />
            <p className="text-[11px] uppercase tracking-eyebrow text-gold-300">School</p>
            <h3 key={school.id} className="mt-3 animate-fadeUp font-display text-2xl leading-snug sm:text-3xl">{school.name}</h3>
            <dl className="mt-8 space-y-4 text-sm">
              <div>
                <dt className="text-navy-200/70">Head of School</dt>
                <dd className="mt-1 text-base font-medium text-white">{school.head}</dd>
              </div>
              <div>
                <dt className="text-navy-200/70">Departments & programmes</dt>
                <dd className="mt-1 font-display text-3xl text-gold-300">{school.departments.length}</dd>
              </div>
            </dl>
            <SmartLink href={school.href} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 hover:text-white">
              Visit school page <ArrowUpRight className="h-4 w-4" aria-hidden />
            </SmartLink>
          </div>

          <ul key={school.id} className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {school.departments.map((d, i) => (
              <li
                key={d.name}
                className="card card-hover group flex animate-fadeUp flex-col p-6"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-lg leading-snug text-navy-900">{d.name}</h4>
                  {d.since && <span className="shrink-0 rounded-full bg-gold-50 px-2.5 py-1 text-[11px] font-semibold text-gold-700">Est. {d.since}</span>}
                </div>
                {d.note && <p className="mt-3 text-sm leading-relaxed text-ink-muted">{d.note}</p>}
                <div className="mt-auto h-px w-10 bg-gold-500 pt-0 transition-all duration-300 group-hover:w-20" style={{ marginTop: d.note ? '1.25rem' : '1rem' }} aria-hidden />
              </li>
            ))}
          </ul>
        </div>

        <FacultyDirectory />
      </div>
    </Section>
  );
}

function FacultyDirectory() {
  const [q, setQ] = useState('');
  const [group, setGroup] = useState('All');

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    return PEOPLE.filter(
      (p) =>
        (group === 'All' || p.group === group) &&
        (!t || `${p.name} ${p.role} ${p.dept}`.toLowerCase().includes(t))
    );
  }, [q, group]);

  return (
    <div id="faculty" className="mt-20 scroll-mt-24">
      <div data-reveal className="flex flex-col gap-6 border-t border-line pt-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Directory</p>
          <h3 className="mt-3 font-display text-2xl text-navy-900 sm:text-3xl">Leadership & key contacts</h3>
          <p className="mt-2 max-w-xl text-sm text-ink-muted">
            Principal, deans, heads of school and student-service offices. The complete faculty list is published by IQAC.
          </p>
        </div>
        <SmartLink href={FACULTY_LIST_PDF} className="link-arrow shrink-0">
          <FileText className="h-4 w-4" aria-hidden /> Full list of faculty members (PDF)
        </SmartLink>
      </div>

      <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="relative flex-1 sm:max-w-sm">
          <span className="sr-only">Search the directory</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, role or department" className="field pl-10" />
        </label>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {GROUPS.map((g) => (
            <button key={g} type="button" onClick={() => setGroup(g)} aria-pressed={group === g} className={`chip shrink-0 ${group === g ? 'chip-on' : 'chip-off'}`}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {results.map((p) => (
          <li key={p.name + p.role} className="card flex gap-4 p-5 transition-colors hover:border-navy-200">
            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-50 font-display text-base text-navy-800 ring-1 ring-navy-100">
              {initials(p.name)}
            </span>
            <div className="min-w-0">
              <p className="font-semibold text-navy-900">{p.name}</p>
              <p className="mt-0.5 text-sm text-gold-700">{p.role}</p>
              <p className="mt-1 text-xs text-ink-subtle">{p.dept}</p>
              {(p.phone || p.email) && (
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                  {p.phone && (
                    <a href={`tel:${p.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-1 text-navy-700 hover:text-gold-700">
                      <Phone className="h-3 w-3" aria-hidden /> {p.phone}
                    </a>
                  )}
                  {p.email && (
                    <a href={`mailto:${p.email}`} className="inline-flex items-center gap-1 text-navy-700 hover:text-gold-700">
                      <Mail className="h-3 w-3" aria-hidden /> {p.email}
                    </a>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
        {!results.length && <li className="col-span-full py-10 text-center text-sm text-ink-subtle">No matches. Try another name or department.</li>}
      </ul>
    </div>
  );
}
