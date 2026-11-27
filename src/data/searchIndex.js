import {
  INSTITUTE, PROGRAMS, SCHOOLS, PEOPLE, NOTICES, EVENTS, FACILITIES, RESEARCH_UNITS,
  NAV, PLACEMENT_STATS, CONTACTS, SWO, ALUMNI_URL, FACULTY_LIST_PDF, officialPage,
} from './site';

/**
 * Flat search index used by the global search dialog and the campus assistant.
 * Each entry: { title, text, category, to? | href?, keywords? }
 */
function build() {
  const out = [];
  const push = (e) => out.push(e);

  push({ title: 'About Dr. AIT', text: INSTITUTE.summary, category: 'Page', to: '/#about', keywords: 'history founded 1980 naac nirf vtu autonomous' });
  push({ title: 'Vision & Mission', text: INSTITUTE.mission.join(' '), category: 'Page', to: '/#about', keywords: 'vision mission dynamic resourceful adept innovative' });
  push({ title: 'Programmes Offered', text: `${PROGRAMS.ug.length} UG, ${PROGRAMS.pg.length} PG and ${PROGRAMS.phd.length} doctoral programmes.`, category: 'Page', to: '/#academics', keywords: 'courses programs be btech mtech mba mca phd admission' });
  push({ title: 'Placement Statistics', text: PLACEMENT_STATS.items.map((i) => `${i.value}${i.suffix} ${i.label}`).join(' · '), category: 'Page', to: '/#placements', keywords: 'placement salary package companies recruiters cdc career' });
  push({ title: 'Research & Innovation', text: 'R&D Cell, ACTS startup cell, IIC, IDEA Lab, IPR cell, consultancy.', category: 'Page', to: '/#research', keywords: 'research innovation startup incubation patent' });
  push({ title: 'Events Calendar', text: 'Upcoming conferences, hackathons, fests and ceremonies.', category: 'Page', to: '/#events', keywords: 'events calendar schedule fest' });
  push({ title: 'Notice Board', text: 'Notifications, calendars of events, scholarships and tenders.', category: 'Page', to: '/#notices', keywords: 'announcements notices circulars news' });
  push({ title: 'Campus Gallery', text: 'Photographs from graduation days, fests and campus life.', category: 'Page', to: '/#gallery', keywords: 'photos gallery images' });
  push({ title: 'Student Welfare Office', text: SWO.overview, category: 'Page', to: '/student-welfare', keywords: 'swo clubs student welfare activities helpdesk grievance' });
  push({ title: 'Contact & Location', text: `${INSTITUTE.address.lines.join(', ')}. ${INSTITUTE.hours}.`, category: 'Page', to: '/#contact', keywords: 'address phone email location map reach' });
  push({ title: 'Alumni Portal', text: 'Connect with the Dr. AIT alumni network.', category: 'Page', href: ALUMNI_URL, keywords: 'alumni network' });
  push({ title: 'List of Faculty Members (PDF)', text: 'Complete official faculty list.', category: 'Directory', href: FACULTY_LIST_PDF, keywords: 'faculty staff professors list' });

  PROGRAMS.ug.forEach((p) => push({ title: p, text: 'Undergraduate programme', category: 'Programme', to: '/#academics', keywords: 'ug be bachelor' }));
  PROGRAMS.pg.forEach((p) => push({ title: p, text: 'Postgraduate programme', category: 'Programme', to: '/#academics', keywords: 'pg masters' }));

  SCHOOLS.forEach((s) => {
    push({ title: s.name, text: `Head of School: ${s.head}`, category: 'School', href: s.href, keywords: s.departments.map((d) => d.name).join(' ') });
    s.departments.forEach((d) =>
      push({ title: d.name, text: d.note || s.name, category: 'Department', to: '/#departments', keywords: s.short })
    );
  });

  PEOPLE.forEach((p) => push({ title: p.name, text: `${p.role} · ${p.dept}`, category: 'People', to: '/#departments', keywords: p.group }));
  NOTICES.forEach((n) => push({ title: n.title, text: n.category, category: 'Notice', href: n.href }));
  EVENTS.forEach((e) => push({ title: e.title, text: `${e.type} · ${e.start}`, category: 'Event', to: '/#events' }));
  FACILITIES.forEach((f) => push({ title: f.title, text: f.text, category: 'Campus', to: f.to, href: f.href }));
  RESEARCH_UNITS.forEach((r) => push({ title: r.title, text: r.text, category: 'Research', href: r.href }));
  CONTACTS.forEach((c) => push({ title: c.label, text: [...(c.phone || []), ...(c.email || [])].join(' · '), category: 'Contact', to: '/#contact' }));

  NAV.forEach((group) =>
    group.items
      .filter((i) => i.href)
      .forEach((i) => push({ title: i.label, text: `${group.label} · official page`, category: 'Link', href: i.href }))
  );
  push({ title: 'Hostel', text: 'Men’s hostels and Chethana Ladies Hostel', category: 'Link', href: officialPage('Hostel'), keywords: 'accommodation stay' });

  // de-duplicate by title+category
  const seen = new Set();
  return out.filter((e) => {
    const k = `${e.category}|${e.title}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export const SEARCH_INDEX = build();

const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s&]/g, ' ');

/** Simple ranked search: all query tokens must match; title hits score higher. */
export function searchSite(query, limit = 12) {
  const tokens = norm(query).split(/\s+/).filter((t) => t.length > 1);
  if (!tokens.length) return [];
  const scored = [];
  for (const e of SEARCH_INDEX) {
    const title = norm(e.title);
    const body = norm(`${e.text} ${e.keywords || ''} ${e.category}`);
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (title.startsWith(t)) score += 6;
      else if (title.includes(` ${t}`)) score += 4;
      else if (title.includes(t)) score += 3;
      else if (body.includes(t)) score += 1;
      else { ok = false; break; }
    }
    if (ok) scored.push({ ...e, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
