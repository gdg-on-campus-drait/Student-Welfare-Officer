import {
  INSTITUTE, PROGRAMS, SCHOOLS, PEOPLE, PLACEMENT_STATS, CONTACTS, EVENTS, NOTICES, SWO, CAMPUS_FACTS,
  ALUMNI_URL, FACULTY_LIST_PDF, officialPage,
} from '../data/site';
import { searchSite } from '../data/searchIndex';
import { formatRange, isUpcoming } from './dates';

/**
 * Grounded campus assistant.
 *
 * Answers come only from the verified content in src/data — it never invents facts.
 * If VITE_ASSISTANT_ENDPOINT is set, questions are first sent to that backend
 * (e.g. a server that calls an LLM with this site's content as context), and the
 * local engine is used as the fallback.
 */

const contact = (label) => CONTACTS.find((c) => c.label.startsWith(label));
const person = (role) => PEOPLE.find((p) => p.role.startsWith(role));

const INTENTS = [
  {
    test: /^(hi|hello|hey|namaskara|good (morning|afternoon|evening))\b/i,
    answer: () => ({
      text: 'Hello! I can help with programmes, admissions, placements, hostels, events and contacts at Dr. AIT. What would you like to know?',
    }),
  },
  {
    test: /admission|apply|eligib|fee|seat|cet|comed|management quota|brochure|prospectus/i,
    answer: () => {
      const a = contact('Admissions');
      return {
        text: `For UG & PG admissions, contact the admissions office at ${a.phone.join(' / ')} or ${a.email[0]}. Eligibility criteria, fee structure and application forms are published on the official website.`,
        links: [
          { label: 'Eligibility Criteria', href: officialPage('Eligibility-Criteria') },
          { label: 'Fee Structure', href: officialPage('Fee-Structure') },
          { label: 'Application Forms', href: officialPage('Application-Forms') },
        ],
      };
    },
  },
  {
    test: /placement|package|salary|lpa|recruit|compan|job|career|cdc/i,
    answer: () => {
      const s = Object.fromEntries(PLACEMENT_STATS.items.map((i) => [i.label, `${i.value}${i.suffix}`]));
      return {
        text: `Placement statistics ${PLACEMENT_STATS.year}: ${s.Companies} companies, ${s['Students offered']} students offered, an average package of ${s['Average package']} and a highest package of ${s['Highest package']}, with ${s['Core companies']} core companies.`,
        links: [
          { label: 'Placement dashboard', to: '/#placements' },
          { label: 'Placement highlights', href: officialPage('Placement-Highlights') },
        ],
      };
    },
  },
  {
    test: /program|course|branch|degree|b\.?e\b|btech|m\.?tech|mba|mca|bba|bca|ph\.?d|doctoral|ug\b|pg\b/i,
    answer: () => ({
      text: `Dr. AIT offers ${PROGRAMS.ug.length} undergraduate programmes (including CSE, AI & ML, Data Science, Aeronautical, VLSI, BBA and BCA), ${PROGRAMS.pg.length} postgraduate programmes (M.Tech., MCA and MBA) and doctoral programmes in ${PROGRAMS.phd.length} disciplines.`,
      links: [
        { label: 'All programmes', to: '/#academics' },
        { label: 'Programs Offered (official)', href: officialPage('Programs-Offered') },
      ],
    }),
  },
  {
    test: /school|department|hod|head of school/i,
    answer: () => ({
      text: `Departments are organised into five schools: ${SCHOOLS.map((s) => `${s.name} (Head: ${s.head})`).join('; ')}.`,
      links: [{ label: 'Schools & departments', to: '/#departments' }],
    }),
  },
  {
    test: /principal|dean|director|leadership|administration/i,
    answer: () => ({
      text: `The Principal of Dr. AIT is ${person('Principal').name}. The deans include ${PEOPLE.filter((p) => p.role.startsWith('Dean')).map((p) => `${p.name} (${p.role.split(' ·')[0]})`).join(', ')}.`,
      links: [
        { label: 'Leadership directory', to: '/#faculty' },
        { label: 'Administration (official)', href: officialPage('Administration') },
      ],
    }),
  },
  {
    test: /faculty|professor|teacher|staff/i,
    answer: () => ({
      text: `Dr. AIT has ${INSTITUTE.staff.total} staff members: ${INSTITUTE.staff.faculty} faculty, ${INSTITUTE.staff.technical} technical and ${INSTITUTE.staff.administrative} administrative staff. The complete faculty list is published by IQAC.`,
      links: [
        { label: 'Directory', to: '/#faculty' },
        { label: 'Faculty list (PDF)', href: FACULTY_LIST_PDF },
      ],
    }),
  },
  {
    test: /hostel|accommodation|stay|room|warden/i,
    answer: () => ({
      text: 'Men’s hostels Ananda Bhavan, Siddartha and Ashoka can accommodate 789 students (warden: Dr. Vasudevamurthy, 94488 42580). The Chethana Ladies Hostel on campus has 108 rooms with a dining hall, gym, 24-hour CCTV security and Wi-Fi in every room (warden: Sangeetha N).',
      links: [{ label: 'Hostel details', href: officialPage('Hostel') }],
    }),
  },
  {
    test: /librar|book|journal|delnet/i,
    answer: () => ({
      text: `The Central Library (Dr. Ambedkar Centenary Bhavan) holds ${CAMPUS_FACTS[1].value} books across 21,152 titles, with e-resources and DELNET access.`,
      links: [{ label: 'Library', href: officialPage('About-Library') }],
    }),
  },
  {
    test: /where|address|locat|reach|direction|map|campus size|acre/i,
    answer: () => ({
      text: `Dr. AIT is at ${INSTITUTE.address.lines.join(', ')}. The campus spreads over ${INSTITUTE.campusAcres} acres. Office hours: ${INSTITUTE.hours}.`,
      links: [
        { label: 'Directions', href: INSTITUTE.address.mapUrl },
        { label: 'Contact section', to: '/#contact' },
      ],
    }),
  },
  {
    test: /contact|phone|call|email|mail|number|enquir/i,
    answer: () => ({
      text: CONTACTS.map((c) => `${c.label}: ${[...(c.phone || []), ...(c.email || [])].join(', ')}`).join('\n'),
      links: [{ label: 'Contact section', to: '/#contact' }],
    }),
  },
  {
    test: /naac|nirf|nba|aicte|accredit|rank|autonom|vtu|ugc/i,
    answer: () => ({
      text: `Dr. AIT is affiliated to ${INSTITUTE.affiliation}, accredited by NAAC with ‘${INSTITUTE.naac}’ grade, recognised by AICTE with NBA-accredited programmes, autonomous since ${INSTITUTE.autonomySince}, and ranked ${INSTITUTE.nirfRank} in NIRF.`,
      links: [{ label: 'Accreditations', href: officialPage('Accreditations-Approvals') }],
    }),
  },
  {
    test: /found|history|establish|started|ambedkar|trust|pvp/i,
    answer: () => ({
      text: `${INSTITUTE.summary} ${INSTITUTE.governance}`,
      links: [{ label: 'About Dr. AIT', to: '/#about' }, { label: 'Founder', href: officialPage('Founder') }],
    }),
  },
  {
    test: /event|fest|hackathon|conference|exhibition|upcoming|happening|calendar/i,
    answer: () => {
      const next = EVENTS.filter(isUpcoming).sort((a, b) => a.start.localeCompare(b.start)).slice(0, 3);
      return {
        text: next.length
          ? `Coming up: ${next.map((e) => `${e.title} (${formatRange(e.start, e.end)})`).join('; ')}.`
          : 'There are no upcoming events listed right now — check the notice board for new announcements.',
        links: [{ label: 'Events calendar', to: '/#events' }],
      };
    },
  },
  {
    test: /scholar|nsp|financial aid|concession/i,
    answer: () => {
      const n = NOTICES.find((x) => x.category === 'Scholarship');
      return {
        text: `Scholarships are offered to UG, PG and Ph.D. students from various sources. Latest notice: ${n.title}.`,
        links: [{ label: 'NSP notice', href: n.href }, { label: 'Scholarship details', href: officialPage('Scholarship-Details') }],
      };
    },
  },
  {
    test: /swo|welfare|club|student activit|cultural|nss|ncc|grievance/i,
    answer: () => ({
      text: `${SWO.overview} The Student Welfare Officer is ${SWO.officers[0].name} (${SWO.officers[0].phone}, ${SWO.email}).`,
      links: [{ label: 'Student Welfare Office', to: '/student-welfare' }],
    }),
  },
  {
    test: /ragging|harass|safety|helpline/i,
    answer: () => ({
      text: 'Ragging is prohibited. The 24×7 toll-free national Anti-Ragging Helpline is 1800-180-5522. You can also reach the Student Welfare Office at swo@drait.edu.in.',
      links: [{ label: 'Student Welfare Office', to: '/student-welfare#helpdesk' }],
    }),
  },
  {
    test: /exam|result|timetable|hall ?ticket|circular/i,
    answer: () => ({
      text: 'Exam timetables and circulars are published on the official website.',
      links: [
        { label: 'Exam Timetables', href: officialPage('Exam-Timetables') },
        { label: 'Exam Circulars', href: officialPage('Exam-Circulars') },
      ],
    }),
  },
  {
    test: /alumni|alumnus|graduate network/i,
    answer: () => ({ text: 'Alumni can connect through the official Dr. AIT alumni portal.', links: [{ label: 'Alumni portal', href: ALUMNI_URL }] }),
  },
];

export function localAnswer(question) {
  const q = question.trim();
  for (const intent of INTENTS) {
    if (intent.test.test(q)) return intent.answer();
  }
  const hits = searchSite(q, 4);
  if (hits.length) {
    return {
      text: 'Here’s what I found on the website:',
      links: hits.map((h) => ({ label: h.title, to: h.to, href: h.href })),
    };
  }
  const g = contact('General');
  return {
    text: `I couldn’t find that in the official information I have. For anything else, please call ${g.phone[0]} or email ${g.email[0]}.`,
    links: [{ label: 'Contact', to: '/#contact' }],
  };
}

const ENDPOINT = import.meta.env.VITE_ASSISTANT_ENDPOINT;
export const isAIConnected = Boolean(ENDPOINT);

export async function ask(question, history) {
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, history: history.map(({ role, text }) => ({ role, text })) }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data?.reply) return { text: data.reply, links: data.links || [] };
      }
    } catch {
      /* fall through to the grounded local answer */
    }
  }
  return localAnswer(question);
}
