/**
 * EVENTS
 * ------------------------------------------------------------------
 * Events sort themselves into Upcoming / Past using today's date — just add an
 * object with the right `start` (and `end` for multi-day events).
 *
 * {
 *   id: 'sanskruthi-2025',                // unique, lowercase
 *   title: 'Sanskruthi 2K25',
 *   type: 'Cultural',                      // one of EVENT_TYPES
 *   start: '2025-06-04',                   // YYYY-MM-DD
 *   end: '2025-06-05',                     // optional
 *   time: '9:30 AM',                       // optional
 *   venue: 'JPN Auditorium',               // optional
 *   summary: 'Short description.',
 *   image: 'fests/sanskruthi-crowd.webp',  // optional, from src/assets/photos/
 *   organiser: 'Student Welfare Office',   // optional
 *   fest: 'sanskruthi',                    // optional fest slug
 *   club: 'ieee-student-branch',           // optional club slug
 *   registration: { url: 'https://forms.gle/...', label: 'Register', deadline: '2026-12-01' },
 *   report: 'https://...pdf',              // optional event report
 * }
 * Registration buttons only appear while an event is upcoming.
 * ------------------------------------------------------------------
 */

export const EVENT_TYPES = ['Cultural', 'Hackathon', 'Competition', 'Workshop', 'Exhibition', 'Awareness', 'Sports', 'Celebration', 'Induction'];

const REPORTS = 'https://drait.edu.in/assets/latest_news';

export const EVENTS = [
  {
    id: 'navonmeshos-2026',
    title: 'Project Exhibition — NAVONMESHOS 2026',
    type: 'Exhibition',
    start: '2026-11-21',
    time: '9:30 AM',
    organiser: 'School of Computer Science & Engineering',
    summary: 'Project exhibition organised by the School of Computer Science & Engineering.',
  },
  {
    id: 'alzheimers-day-2026',
    title: 'Alzheimer’s Day Awareness Programme 2026',
    type: 'Awareness',
    start: '2026-09-21',
    report: `${REPORTS}/ALZHEIMERS%20DAY%20-Sep%202026.pdf`,
  },
  {
    id: 'astrava-2026',
    title: 'ASTRAVA — 24 Hour National Level Hackathon',
    type: 'Hackathon',
    start: '2026-03-06',
    end: '2026-03-07',
    organiser: 'School of Computer Science & Engineering',
    summary: 'Six AI-focused domains and open innovation, with a prize pool of ₹1 lakh+.',
    image: 'fests/astrava-hall.webp',
    fest: 'astrava',
  },
  {
    id: 'founders-day-2025',
    title: 'Founders’ Day & Sri M. H. Jayaprakash Narayan Birth Anniversary',
    type: 'Celebration',
    start: '2025-12-21',
    image: 'fests/founders-day-2025.webp',
    fest: 'founders-day',
  },
  {
    id: 'sip-2025',
    title: 'Student Induction Program (SIP) 2K25',
    type: 'Induction',
    start: '2025-09-15',
    end: '2025-09-19',
    venue: 'JPN Auditorium',
    summary: 'Induction for first-year B.E. students: registration, an induction programme, departmental presentations and a guided campus tour.',
    image: 'events/sip-auditorium.webp',
    report: `${REPORTS}/SIP%202025.pdf`,
  },
  {
    id: 'suicide-prevention-day-2025',
    title: 'International Suicide Prevention Day',
    type: 'Awareness',
    start: '2025-09-10',
    report: `${REPORTS}/Suicide%20Prevention%20Day%202025.pdf`,
  },
  {
    id: 'ieee-inauguration-2025',
    title: 'Inauguration of the IEEE Student Chapter',
    type: 'Workshop',
    start: '2025-07-05',
    time: '10:00 AM',
    venue: 'C326',
    summary: 'Inaugural function of the IEEE Student Branch, with Dr. Parameshachari B. D. (Professor & HOD, ECE, NMIT) as Chief Guest.',
    image: 'events/ieee-inauguration-2025.webp',
    club: 'ieee-student-branch',
    report: `${REPORTS}/IEEE%20Student%20Chapter%202025.pdf`,
  },
  {
    id: 'sanskruthi-2025',
    title: 'Sanskruthi 2K25',
    type: 'Cultural',
    start: '2025-06-04',
    summary: 'Two-day inter-college cultural fest with a fashion walk, concerts and DJ night.',
    image: 'fests/sanskruthi-2025-concert.webp',
    fest: 'sanskruthi',
    report: `${REPORTS}/Sanskruthi%202025.pdf`,
  },
  {
    id: 'colossus-2',
    title: 'COLOSSUS 2.0 — National Level 24 hrs Hackathon',
    type: 'Hackathon',
    start: '2025-04-11',
    end: '2025-04-12',
    summary: '24 hours of coding, mentorship and prototype pitches, with a prize pool of ₹1 lakh+.',
    image: 'fests/colossus-2-hall.webp',
    fest: 'colossus',
    report: `${REPORTS}/COLOSSUS%202.0%20-2025.pdf`,
  },
  {
    id: 'republic-day-2025',
    title: 'Republic Day 2025',
    type: 'Celebration',
    start: '2025-01-26',
    organiser: 'SWO, ASC and NCC',
    summary: 'Republic Day-75, celebrating 75 years of the Indian Constitution.',
    report: `${REPORTS}/Republic%20Day%202025.pdf`,
  },
  {
    id: 'marathon-2025',
    title: 'Marathon 2K25',
    type: 'Sports',
    start: '2025-01-10',
    summary: 'Held for National Youth Day, inspiring a balanced approach to personal growth through fitness and creativity.',
    image: 'events/marathon-2025.webp',
    report: `${REPORTS}/Marathon%202K25.pdf`,
  },
  {
    id: 'maitri-2025',
    title: 'mAITri 2K25',
    type: 'Cultural',
    start: '2024-12-19',
    time: '3:00 – 9:00 PM',
    venue: 'Dr. AIT Open Auditorium',
    summary: 'The annual cultural fest — performances, competitions and celebrity appearances.',
    image: 'fests/maitri-2025-band.webp',
    fest: 'maitri',
    report: `${REPORTS}/Maitri%202K25.pdf`,
  },
  {
    id: 'indoor-sports-complex-2024',
    title: 'Inauguration of the New Indoor Sports Complex & First Year B.E. Classes',
    type: 'Sports',
    start: '2024-10-25',
  },
  {
    id: 'colossus-1',
    title: 'COLOSSUS — National Level 24 Hours Hackathon',
    type: 'Hackathon',
    start: '2024-09-13',
    end: '2024-09-14',
    image: 'fests/colossus-2-coding.webp',
    fest: 'colossus',
  },
  {
    id: 'sanskruthi-2024',
    title: 'Sanskruthi 2K24 — Inter-college Cultural Fest',
    type: 'Cultural',
    start: '2024-05-23',
    end: '2024-05-24',
    image: 'fests/sanskruthi-2024-poster.webp',
    fest: 'sanskruthi',
  },
  {
    id: 'ambedkar-jayanthi-2024',
    title: '133rd Dr. B. R. Ambedkar Birth Anniversary Celebration',
    type: 'Celebration',
    start: '2024-04-14',
    fest: 'ambedkar-jayanthi',
  },
  {
    id: 'techno-exhibition-2024',
    title: '8th National Level Techno Exhibition',
    type: 'Exhibition',
    start: '2024-04-13',
    fest: 'techno-exhibition',
  },
];
