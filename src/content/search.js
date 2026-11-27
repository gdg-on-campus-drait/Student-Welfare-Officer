import { CLUBS, FESTS, EVENTS, ACHIEVEMENTS, SWO_TEAM, clubCoordinators } from './index';

const PAGES = [
  { title: 'About SWO', text: 'Vision, mission, objectives and initiatives', category: 'Page', to: '/about' },
  { title: 'Clubs', text: 'All student clubs and units', category: 'Page', to: '/clubs' },
  { title: 'Fests', text: 'Cultural, technical fests and celebrations', category: 'Page', to: '/fests' },
  { title: 'Events', text: 'Upcoming and past events', category: 'Page', to: '/events' },
  { title: 'Core Team', text: 'SWO officials, coordinators and student council', category: 'Page', to: '/team' },
  { title: 'Achievements', text: 'Awards, competitions and success stories', category: 'Page', to: '/achievements' },
  { title: 'Gallery', text: 'Photos and videos', category: 'Page', to: '/gallery' },
  { title: 'Contact', text: 'SWO email, phone, address and social links', category: 'Page', to: '/contact', keywords: 'helpdesk grievance anti-ragging' },
];

function build() {
  return [
    ...PAGES,
    ...CLUBS.map((c) => ({ title: c.name, text: c.tagline || `${c.category} · ${c.kind}`, category: 'Club', to: `/clubs/${c.slug}`, keywords: c.category })),
    ...FESTS.map((f) => ({ title: f.name, text: f.tagline, category: 'Fest', to: `/fests/${f.slug}`, keywords: `${f.type} ${(f.editions || []).map((e) => e.name).join(' ')}` })),
    ...EVENTS.map((e) => ({ title: e.title, text: `${e.type} · ${e.start}`, category: 'Event', to: `/events#${e.id}` })),
    ...ACHIEVEMENTS.map((a) => ({ title: a.title, text: a.who, category: 'Achievement', to: `/achievements#${a.id}` })),
    ...SWO_TEAM.map((p) => ({ title: p.name, text: p.role, category: 'People', to: '/team' })),
    ...clubCoordinators().map((p) => ({ title: p.name, text: `${p.role} · ${p.club.name}`, category: 'People', to: '/team' })),
  ];
}

let INDEX;
const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^\w\s&.]/g, ' ');

export function searchContent(query, limit = 12) {
  INDEX ||= build();
  const tokens = norm(query).split(/\s+/).filter((t) => t.length > 1);
  if (!tokens.length) return [];
  const scored = [];
  for (const e of INDEX) {
    const title = norm(e.title);
    const body = norm(`${e.text || ''} ${e.keywords || ''} ${e.category}`);
    let score = 0;
    let ok = true;
    for (const t of tokens) {
      if (title.startsWith(t)) score += 6;
      else if (title.includes(` ${t}`)) score += 4;
      else if (title.includes(t)) score += 3;
      else if (body.includes(t)) score += 1;
      else {
        ok = false;
        break;
      }
    }
    if (ok) scored.push({ ...e, score });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}
