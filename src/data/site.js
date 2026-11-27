/**
 * Verified institutional content for Dr. Ambedkar Institute of Technology.
 *
 * Every fact in this file was taken from the official website (https://drait.edu.in)
 * and the page it came from is noted alongside. Do not add statistics or details here
 * without an official source — update the `source` notes when content changes.
 */

export const OFFICIAL = 'https://drait.edu.in';
export const officialPage = (slug) => `${OFFICIAL}/home/${slug}`;

/* ------------------------------------------------------------------ */
/* Institute — source: /home/Institute, /home/index, /home/Founder     */
/* ------------------------------------------------------------------ */
export const INSTITUTE = {
  name: 'Dr. Ambedkar Institute of Technology',
  shortName: 'Dr. AIT',
  city: 'Bengaluru',
  established: 1980,
  founder: 'Late Sri M.H. Jayaprakash Narayan',
  trust: 'Panchajanya Vidya Peetha Welfare Trust (PVPWT)',
  affiliation: 'Visvesvaraya Technological University (VTU), Belagavi',
  autonomySince: 2010,
  naac: "A+",
  nirfRank: 163,
  campusAcres: 23,
  builtUpArea: '39,619 sq.m',
  staff: { total: 532, faculty: 256, technical: 137, administrative: 140 },
  summary:
    'Dr. Ambedkar Institute of Technology (Dr. AIT) was founded by M.H. Jayaprakash Narayan in 1980. Named after Dr. B.R. Ambedkar, the institute is affiliated to Visvesvaraya Technological University (VTU), Belagavi and is recognized and accredited by AICTE and NBA respectively. The institution is accredited by NAAC with ‘A+’ Grade and has achieved 163 Rank in the National Institutional Ranking Framework (NIRF).',
  autonomy:
    'In 2010, academic autonomy was conferred by the University Grants Commission, New Delhi, enabling the institution to frame its own curriculum, examinations and awarding of degrees.',
  governance:
    'Dr. AIT is governed by the Panchajanya Vidya Peetha Welfare Trust (PVPWT), and is one of the 22 educational institutions managed by the Trust.',
  highlights: [
    'Sprawling over 23 acres in Bengaluru city',
    'One of the oldest engineering colleges in the city',
    'Fully aided by the Government of Karnataka',
    'World Bank TEQIP funded institution',
    'Wi-Fi enabled campus with a dedicated data center',
    'Separate hostels for men and women',
  ],
  vision: {
    lead: 'To create',
    acronym: [
      ['D', 'ynamic'],
      ['R', 'esourceful'],
      ['A', 'dept and'],
      ['I', 'nnovative'],
      ['T', 'echnical professionals'],
    ],
    tail: 'to meet global challenges.',
  },
  mission: [
    'To offer state-of-the-art undergraduate, postgraduate and doctoral programs in the fields of Engineering, Technology and Management.',
    'To generate new knowledge by engaging faculty and students in research, development and innovation.',
    'To provide strong theoretical foundation to the students, supported by extensive practical training to meet the industrial requirements.',
    'To instil moral and ethical values with social and professional commitment.',
  ],
  address: {
    lines: ['Outer Ring Road, Near Jnana Bharathi Campus', 'Mallathahalli, Bengaluru, Karnataka 560056'],
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+Ambedkar+Institute+of+Technology+Bengaluru',
  },
  hours: 'Monday to Saturday, 9:00 AM – 4:30 PM',
};

export const ACCREDITATIONS = [
  { label: 'NAAC', detail: "Accredited with 'A+' Grade" },
  { label: 'NBA', detail: 'Programme accreditation' },
  { label: 'AICTE', detail: 'Approved' },
  { label: 'UGC', detail: 'Autonomous since 2010' },
  { label: 'VTU', detail: 'Affiliated, Belagavi' },
  { label: 'NIRF', detail: 'Rank 163' },
];

/* Contacts — source: /home/contact_us, homepage "Quick Contact" */
export const CONTACTS = [
  { label: 'General Enquiry', phone: ['9900113406'], email: ['prm@drait.edu.in', 'info@drait.edu.in'] },
  { label: 'Admissions (UG & PG)', phone: ['9741940511', '9448920704'], email: ['admissions@drait.edu.in'] },
  { label: 'Placement & Training Office', phone: ['8546826254', '9964058586', '9844259313'] },
  { label: 'PVP Welfare Trust Office', phone: ['9900472975'] },
];

/* ------------------------------------------------------------------ */
/* Programmes — source: /home/Programs-Offered                          */
/* ------------------------------------------------------------------ */
export const PROGRAMS = {
  ug: [
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Industrial Engineering and Management',
    'Electronics and Instrumentation Engineering',
    'Computer Science and Engineering',
    'Electronics and Telecommunication Engineering',
    'Information Science and Engineering',
    'Aeronautical Engineering',
    'Computer Science and Business Systems',
    'Artificial Intelligence and Machine Learning',
    'Computer Science and Engineering (Data Science)',
    'Electronics and Communication Engineering (VLSI Design & Technology)',
    'Bachelor of Business Administration (BBA)',
    'Bachelor of Computer Applications (BCA)',
  ],
  pg: [
    'M.Tech. in Computer Science & Engineering',
    'M.Tech. in VLSI Design & Embedded Systems',
    'M.Tech. in Power Electronics',
    'M.Tech. in Structural Engineering',
    'M.Tech. in Machine Design',
    'Master of Computer Applications (MCA)',
    'Master of Business Administration (MBA)',
  ],
  phd: [
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Industrial Engineering & Management',
    'Electronics and Instrumentation Engineering',
    'Computer Science and Engineering',
    'Electronics and Telecommunication',
    'Information Science and Engineering',
    'Medical Electronics and Engineering',
    'Physics',
    'Mathematics',
    'Chemistry',
    'Computer Applications (MCA)',
    'Business Administration (MBA)',
  ],
};

export const ACADEMIC_LINKS = [
  { label: 'Academic Regulations', href: officialPage('Academic-Regulations') },
  { label: 'Calendar of Events', href: officialPage('Calendar-of-Events') },
  { label: 'I Year B.E. Curriculum', href: officialPage('I-Year-BE-Curriculum') },
  { label: 'Eligibility Criteria', href: officialPage('Eligibility-Criteria') },
  { label: 'Fee Structure', href: officialPage('Fee-Structure') },
  { label: 'International Admissions', href: officialPage('International-Admissions') },
];

/* ------------------------------------------------------------------ */
/* Schools & departments — source: /home/School-of-* pages             */
/* ------------------------------------------------------------------ */
export const SCHOOLS = [
  {
    id: 'core',
    name: 'School of Core Engineering & Technology',
    short: 'Core Engineering',
    head: 'Dr. S Kavitha',
    href: officialPage('School-of-Core-Engineering--Technology'),
    departments: [
      { name: 'Civil Engineering', note: 'One of the oldest departments at Dr. AIT. Offers B.E. and M.Tech. in Structural Engineering.' },
      { name: 'Mechanical Engineering', note: 'One of the oldest and broadest engineering disciplines; offers M.Tech. in Machine Design.' },
      { name: 'Aeronautical Engineering', since: 2020, note: 'UG programme started in 2020 with an approved intake of 60.' },
      { name: 'Industrial Engineering & Management', since: 1984, note: 'Started in 1984; titled Industrial Engineering and Management in 1992.' },
    ],
  },
  {
    id: 'electrical',
    name: 'School of Electrical, Electronics Sciences & Engineering',
    short: 'Electrical & Electronics',
    head: 'Dr. H. V. Govindaraju',
    href: officialPage('School-of-Electrical-Electronics-Sciences--Engineering'),
    departments: [
      { name: 'Electrical & Electronics Engineering', since: 1980, note: 'Established 1980-81; M.Tech. in Power Electronics since 2010-11.' },
      { name: 'Electronics & Communication Engineering', since: 1982, note: 'Instituted in 1982.' },
      { name: 'Electronics & Telecommunication Engineering', since: 1991, note: 'Established 1991; offers B.E., M.Sc. (Engg.) and Ph.D. by research.' },
      { name: 'Electronics & Instrumentation Engineering', since: 1985, note: 'Established 1985-86; NBA accredited in 2004, 2012 and 2023.' },
      { name: 'ECE (VLSI Design & Technology)', since: 2025, note: 'Established in 2025 with an intake of 60.' },
    ],
  },
  {
    id: 'cse',
    name: 'School of Computer Science & Engineering',
    short: 'Computer Science',
    head: 'Dr. GowriShankar S',
    href: officialPage('School-of-Computer-Science--Engineering'),
    departments: [
      { name: 'Computer Science & Engineering', since: 1987, note: 'Established 1987; offers B.E., M.Tech. and Ph.D.' },
      { name: 'Information Science & Engineering', since: 1992, note: 'Established 1992.' },
      { name: 'Artificial Intelligence & Machine Learning', since: 2022, note: 'Established 2022.' },
      { name: 'Computer Science & Business Systems', since: 2022, note: 'Established 2022; blends cutting-edge technology with business skills.' },
      { name: 'Computer Science & Engineering (Data Science)', since: 2025, note: 'Established 2025.' },
      { name: 'Master of Computer Applications', since: 1999, note: 'NBA accredited; the first PG programme at Dr. AIT (1999).' },
    ],
  },
  {
    id: 'science',
    name: 'School of Applied Science & Humanities',
    short: 'Applied Science',
    head: 'Dr. Jambunath S Baligar',
    href: officialPage('School-of-Applied-Science--Humanities'),
    departments: [
      { name: 'Physics' },
      { name: 'Chemistry' },
      { name: 'Mathematics' },
      { name: 'Humanities & Social Sciences' },
      { name: 'Kannada' },
      { name: 'English' },
    ],
  },
  {
    id: 'management',
    name: 'School of Commerce & Management',
    short: 'Commerce & Management',
    head: 'Dr. Baskaran',
    href: officialPage('School-of-Commerce--Management'),
    departments: [{ name: 'Master of Business Administration (MBA)' }],
  },
];

/* Leadership & key offices — source: /home/Administration, /home/SWO, /home/NSS,
   /home/NCC, /home/Hostel, /home/About-Library, /home/Placement-Highlights */
export const PEOPLE = [
  { name: 'Dr. Mahalinga V Mandi', role: 'Principal', group: 'Leadership', dept: 'Administration' },
  { name: 'Dr. T. N. Raju', role: 'Dean (Academics)', group: 'Leadership', dept: 'Mechanical Engineering' },
  { name: 'Dr. Gowrishankar S', role: 'Dean (Examinations) · Head of School, CSE', group: 'Leadership', dept: 'School of Computer Science & Engineering' },
  { name: 'Dr. Shylaja K R', role: 'Dean (Research & Development)', group: 'Leadership', dept: 'Computer Science & Engineering' },
  { name: 'Dr. L. Manjunatha Rao', role: 'Dean (Planning & Development)', group: 'Leadership', dept: 'Master of Computer Applications' },
  { name: 'Dr. Prerana Chaithra', role: 'Dean (Industry Connect & Foreign Affairs)', group: 'Leadership', dept: 'Information Science & Engineering' },
  { name: 'Dr. R. Murali', role: 'Dean (First Year) · NSS Programme Officer', group: 'Leadership', dept: 'Mathematics' },
  { name: 'Dr. S Kavitha', role: 'Head of School', group: 'Heads of School', dept: 'School of Core Engineering & Technology' },
  { name: 'Dr. H. V. Govindaraju', role: 'Head of School', group: 'Heads of School', dept: 'School of Electrical, Electronics Sciences & Engineering' },
  { name: 'Dr. Jambunath S Baligar', role: 'Head of School', group: 'Heads of School', dept: 'School of Applied Science & Humanities' },
  { name: 'Dr. Baskaran', role: 'Head of School', group: 'Heads of School', dept: 'School of Commerce & Management' },
  { name: 'N. Chetan', role: 'Student Welfare Officer', group: 'Student Services', dept: 'Industrial Engineering & Management', phone: '9845242205', email: 'swo@drait.edu.in' },
  { name: 'Sangeetha N', role: 'Student Welfare Coordinator · Warden, Women’s Hostel', group: 'Student Services', dept: 'Electronics & Communication Engineering', phone: '+91 99454 44117', email: 'swo@drait.edu.in' },
  { name: 'Ms. Mary Cindrella J', role: 'Placement Officer', group: 'Student Services', dept: 'Career Development Cell', phone: '+91 9900016269' },
  { name: 'Lt. Praveen K B', role: 'NCC Caretaker', group: 'Student Services', dept: 'Electronics & Telecommunication Engineering', phone: '9740744442' },
  { name: 'Dr. Vasudevamurthy', role: 'Warden, Men’s Hostels', group: 'Student Services', dept: 'Hostels', phone: '94488 42580' },
  { name: 'Sri. Shivanna K', role: 'Librarian (I/c)', group: 'Student Services', dept: 'Central Library' },
];

export const FACULTY_LIST_PDF = `${OFFICIAL}/assets/files/IQAC/LIST OF FACULTY MEMBERS.pdf`;

/* ------------------------------------------------------------------ */
/* Placements — source: homepage "Placement Statistics 2025-26",        */
/* "Our Proud Placements — Batch of 2026", /home/Placement-Highlights  */
/* ------------------------------------------------------------------ */
export const PLACEMENT_STATS = {
  year: '2025-26',
  items: [
    { value: 70, suffix: '+', label: 'Companies' },
    { value: 800, suffix: '+', label: 'Students offered' },
    { value: 7, suffix: ' LPA', label: 'Average package' },
    { value: 30, suffix: ' LPA', label: 'Highest package' },
    { value: 30, suffix: '+', label: 'Core companies' },
  ],
};

/** Featured offers published on the homepage for the Batch of 2026 (one row per company). */
export const FEATURED_OFFERS_2026 = [
  { company: 'NETGEAR', offers: 2, maxLpa: 14.6 },
  { company: 'IBM', offers: 4, maxLpa: 12.25 },
  { company: 'Wakefit', offers: 3, maxLpa: 6 },
  { company: 'Evertz India', offers: 2, maxLpa: 5.5 },
  { company: 'Mu Sigma', offers: 2, maxLpa: 5 },
  { company: 'Johnson Controls', offers: 3, maxLpa: 5 },
  { company: 'IONX Air Products', offers: 3, maxLpa: 4.25 },
  { company: 'Infosys', offers: 7, maxLpa: 3.6 },
  { company: 'Escon Gensets', offers: 1, maxLpa: 3.5 },
  { company: 'Microland', offers: 5, maxLpa: 3.25 },
  { company: 'SRF Limited', offers: 1, maxLpa: 3 },
];

/* "Our Recruiters" logos on the official homepage */
export const RECRUITERS = ['TCS', 'Infosys', 'IBM', 'Accenture', 'Amazon', 'HP', 'CGI', 'Wistron', 'Xoriant'];

export const PLACEMENT_PROCESS = [
  'Student registration',
  'Pre-placement talk',
  'Aptitude / technical test, group discussion, technical & HR interviews',
  'On-boarding',
];

export const PLACEMENT_INFRA = [
  'Auditorium seating 700+ with projector and sound system',
  'Seminar halls seating 100',
  'Interview cubicles, discussion room and student lounge',
  '500+ computer systems with high-speed internet',
];

/* ------------------------------------------------------------------ */
/* Research & innovation — source: /home/R-and-D-Cell, /home/ACTS,      */
/* /home/Institute, homepage notifications                              */
/* ------------------------------------------------------------------ */
export const RESEARCH_UNITS = [
  {
    title: 'R & D Cell',
    text: 'Promotes a culture of high-quality research that is ethical, competent, accountable and safe, in collaboration with industry, institutes and R&D organisations.',
    href: officialPage('R-and-D-Cell'),
  },
  {
    title: 'Ambedkar Centre for Tech Startup (ACTS)',
    text: 'The startup cell supporting student entrepreneurs with incubation, mentoring, business planning, IP advice and early seed funding.',
    href: officialPage('ACTS'),
  },
  {
    title: 'Institution’s Innovation Council (IIC)',
    text: 'Fosters a culture of innovation and entrepreneurship on campus.',
    href: officialPage('IIC'),
  },
  {
    title: 'AICTE IDEA Lab',
    text: 'Hands-on facility for ideation, design and prototyping.',
    href: officialPage('AICTE-IDEA-Lab'),
  },
  {
    title: 'IPR Cell',
    text: 'Intellectual Property Rights cell supporting patents and protection of innovations.',
    href: officialPage('IPR'),
  },
  {
    title: 'Industrial Consultancy Services',
    text: 'Consultancy and industry–institute interaction across departments.',
    href: officialPage('Industrial-Consultancy-Services'),
  },
];

export const RESEARCH_FUNDERS = ['AICTE', 'DST', 'DRDO', 'VTU', 'VGST'];

/* ------------------------------------------------------------------ */
/* Notices & news — source: homepage "News & Updates" (Nov 2026)        */
/* date = the event/announcement date stated in the notice, if any.     */
/* ------------------------------------------------------------------ */
const NEWS = `${OFFICIAL}/home/news`;
export const NOTICES = [
  {
    id: 'navonmeshos-2026',
    category: 'Notification',
    title: 'Project Exhibition NAVONMESHOS – 2026, organised by the School of Computer Science & Engineering',
    date: '2026-11-21',
    href: `${NEWS}/project-exhibition-navonmeshos-2026-on-21st-november-2026-saturday-at-930-am-organised-by-school-of-computer-science-and-engineering`,
  },
  {
    id: 'ieee-reasoning-ai',
    category: 'Notification',
    title: 'IEEE International Conference on Reasoning AI in Future Communication Systems',
    date: '2027-02-04',
    endDate: '2027-02-06',
    href: `${NEWS}/ieee-international-conference-on-reasoning-ai-in-future-communication-systems-will-be-organised-on-4-6-february-2027`,
  },
  {
    id: 'icamdsm-27',
    category: 'Notification',
    title: 'First International Conference on Advanced Materials, Design & Smart Manufacturing (ICAMDSM-27)',
    date: '2027-06-02',
    endDate: '2027-06-03',
    href: `${NEWS}/first-international-conference-on-advanced-materials-design-smart-manufacturing-icamdsm-27-on-june-2nd-3rd-1`,
  },
  {
    id: 'nsp-2026',
    category: 'Scholarship',
    title: 'NSP Scholarship notification for the academic year 2026-27',
    pinned: true,
    href: `${NEWS}/nsp-scholarship-notification-for-the-academic-year-2026-27`,
  },
  {
    id: 'ug-coe',
    category: 'Calendar of Events',
    title: 'UG – Calendar of Events for I, III and V Semester, academic year 2026-27',
    pinned: true,
    href: `${NEWS}/ug-calendar-of-events-for-i-iii-and-v-semester-for-the-academic-year-2026-1`,
  },
  {
    id: 'pg-coe-1',
    category: 'Calendar of Events',
    title: 'PG (MBA, MCA & M.Tech) – Calendar of Events of I Semester, academic year 2026-27',
    href: `${NEWS}/pgmba-mca-mtech-calendar-of-events-of-i-semester-for-the-academic-year-2026-27`,
  },
  {
    id: 'pg-coe-3',
    category: 'Calendar of Events',
    title: 'PG (MBA, MCA & M.Tech) – Calendar of Events of III Semester, academic year 2026-27',
    href: `${NEWS}/pgmba-mca-mtech-calendar-of-events-of-iii-semester-for-the-academic-year-2026-27`,
  },
  {
    id: 'library-tender',
    category: 'Tender',
    title: 'Tender notification to supply engineering books to the Central Library',
    href: `${NEWS}/tender-notification-to-supply-engineering-books-to-central-library-1`,
  },
  {
    id: 'dronacharya',
    category: 'Achievement',
    title: 'Amith Kumar S N, Asst. Prof., ME Programme and faculty mentor of the Dr. AIT Motor Sports Club, receives the Dronacharya Award at BIC Greater Noida for Formula Student Car 2026',
    href: `${NEWS}/amith-kumar-s-n-asst-prof-me-programme-and-faculty-mentor-of-drait-motor-sports-club-has-recieved-prestigious-dronacharya-award-bic-greater-noida-for-formula-student-car-2026`,
  },
];

/* ------------------------------------------------------------------ */
/* Events — source: /home/Event, /home/Gallery, homepage notifications  */
/* ------------------------------------------------------------------ */
export const EVENTS = [
  { title: 'IEEE International Conference on Reasoning AI in Future Communication Systems', start: '2027-02-04', end: '2027-02-06', type: 'Conference' },
  { title: 'ICAMDSM-27 · International Conference on Advanced Materials, Design & Smart Manufacturing', start: '2027-06-02', end: '2027-06-03', type: 'Conference' },
  { title: 'Project Exhibition NAVONMESHOS – 2026 (School of CSE)', start: '2026-11-21', type: 'Exhibition' },
  { title: 'Alzheimer’s Day Awareness Programme 2026', start: '2026-09-21', type: 'Outreach' },
  { title: 'Felicitation and Book Release Ceremony', start: '2026-06-06', type: 'Ceremony' },
  { title: 'ASTRAVA – 24 Hour National Level Hackathon', start: '2026-03-06', end: '2026-03-07', type: 'Hackathon' },
  { title: 'Founders’ Day · Sri M.H. Jayaprakash Narayan Birth Anniversary', start: '2025-12-21', type: 'Ceremony' },
  { title: 'Student Induction Program (SIP)', start: '2025-09-16', end: '2025-09-19', type: 'Academic' },
  { title: 'International Suicide Prevention Day', start: '2025-09-10', type: 'Outreach' },
  { title: 'IEEE Student Chapter event', start: '2025-07-05', type: 'Technical' },
  { title: 'Sanskruthi 2025', start: '2025-06-04', type: 'Cultural' },
  { title: 'COLOSSUS 2.0 · National Level 24 hrs Hackathon', start: '2025-04-11', type: 'Hackathon' },
  { title: 'Republic Day 2025', start: '2025-01-26', type: 'Ceremony' },
  { title: 'Marathon 2025', start: '2025-01-10', type: 'Sports' },
  { title: '11th UG and PG Graduation Day', start: '2025-01-06', type: 'Ceremony' },
];

/* ------------------------------------------------------------------ */
/* Campus life — source: /home/Institute, /home/Hostel, /home/About-Library */
/* ------------------------------------------------------------------ */
export const CAMPUS_FACTS = [
  { value: '23', unit: 'acres', label: 'Green campus in Bengaluru city' },
  { value: '84,221', unit: 'books', label: 'Central Library · 21,152 titles' },
  { value: '789', unit: 'residents', label: 'Capacity across three men’s hostels' },
  { value: '108', unit: 'rooms', label: 'Chethana Ladies Hostel, on campus' },
];

export const FACILITIES = [
  { title: 'Central Library', text: 'Dr. Ambedkar Centenary Bhavan with print collections, e-resources and DELNET access.', href: officialPage('About-Library') },
  { title: 'Hostels', text: 'Ananda Bhavan, Siddartha and Ashoka for men; Chethana Ladies Hostel with Wi-Fi in every room.', href: officialPage('Hostel') },
  { title: 'Indoor Sports Complex', text: 'Inaugurated on 25 October 2024, alongside outdoor playgrounds and a gymnasium.', href: officialPage('Sports') },
  { title: 'NSS & NCC', text: 'Community service and cadet training units with active yearly programmes.', href: officialPage('NSS') },
  { title: 'Student Welfare Office', text: 'A platform for students to showcase their talents, connect and grow.', to: '/student-welfare' },
  { title: 'Medical Counsellor', text: 'On-campus health and counselling support for students.', href: officialPage('Medical-Counsellor') },
];

/* ------------------------------------------------------------------ */
/* Alumni — source: homepage "Our Students Say"                         */
/* ------------------------------------------------------------------ */
export const ALUMNI_URL = 'https://alumni.drait.edu.in/';
export const TESTIMONIALS = [
  {
    quote:
      'It was a memorable learning journey at Dr. AIT. Our MCA department equipped us with the required technical knowledge and the confidence to face the industry.',
    name: 'Vijay Kumar',
    role: 'SAP Concur, US',
    batch: '2001–2004',
  },
  {
    quote:
      'The Department of MCA, Dr. AIT has a wonderful track record of organising engagement programs such as workshops, seminars and project work, which gave students great industry exposure and a practical sense of what is required in shaping their career.',
    name: 'Jaideep',
    role: 'Practice Head, Avaali Solutions Pvt. Ltd',
    batch: '2004–2007',
  },
];

/* ------------------------------------------------------------------ */
/* Student Welfare Office — source: /home/SWO                          */
/* ------------------------------------------------------------------ */
export const SWO = {
  email: 'swo@drait.edu.in',
  overview:
    'The Student Welfare Office serves as a platform for students to showcase their talents and skills while fostering personal growth and development. It creates opportunities for like-minded individuals to connect, share ideas, and engage in cultural activities that promote collaboration and creativity. In addition to organizing various events within the institution, the office also partners with external organizations to host dynamic and enriching programs.',
  vision:
    'Student Welfare Office is envisioned to nurture the students with social and professional skills, with the essence of local culture and ethical values to empower the society.',
  mission:
    'Student Welfare Office empowers the student fraternity by providing a platform to build their professional and life skills to perform their roles with societal values.',
  objectives: [
    'To establish a single platform to facilitate collaborations among departments for technical and cultural events in college by establishing various clubs.',
    'To establish platform and process to enhance social, leadership, and cultural values.',
    'To establish platform and process to enhance interpersonal skills in professional roles and ethical values.',
    'To encourage participative development in curricular and co-curricular aspects.',
  ],
  officers: [
    {
      name: 'N. Chetan',
      title: 'Student Welfare Officer',
      dept: 'Assistant Professor, Department of Industrial Engineering & Management',
      phone: '9845242205',
      photo: 'chetan',
    },
    {
      name: 'Sangeetha N',
      title: 'Student Welfare Coordinator',
      dept: 'Assistant Professor, Department of Electronics & Communication Engineering',
      phone: '+91 99454 44117',
      photo: 'sangeetha',
    },
  ],
};

/* Navigation — internal anchors on the homepage, otherwise official pages. */
export const NAV = [
  {
    label: 'About',
    items: [
      { label: 'About Dr. AIT', to: '/#about', desc: 'History, vision & mission' },
      { label: 'Founder', href: officialPage('Founder') },
      { label: 'Administration', href: officialPage('Administration') },
      { label: 'Governing Body', href: officialPage('Governing-Body') },
      { label: 'Accreditations & Approvals', href: officialPage('Accreditations-Approvals') },
      { label: 'Mandatory Disclosure', href: officialPage('Mandatory-Disclosure') },
    ],
  },
  {
    label: 'Academics',
    items: [
      { label: 'Programmes', to: '/#academics', desc: 'UG, PG and doctoral' },
      { label: 'Schools & Departments', to: '/#departments', desc: 'Five schools, faculty directory' },
      { label: 'Calendar of Events', href: officialPage('Calendar-of-Events') },
      { label: 'Academic Regulations', href: officialPage('Academic-Regulations') },
      { label: 'Exam Timetables', href: officialPage('Exam-Timetables') },
      { label: 'Exam Circulars', href: officialPage('Exam-Circulars') },
    ],
  },
  {
    label: 'Admissions',
    items: [
      { label: 'Programmes Offered', href: officialPage('Programs-Offered') },
      { label: 'Eligibility Criteria', href: officialPage('Eligibility-Criteria') },
      { label: 'Fee Structure', href: officialPage('Fee-Structure') },
      { label: 'Application Forms', href: officialPage('Application-Forms') },
      { label: 'International Admissions', href: officialPage('International-Admissions') },
      { label: 'Scholarships', href: officialPage('Scholarship-Details') },
    ],
  },
  {
    label: 'Research',
    items: [
      { label: 'Research & Innovation', to: '/#research', desc: 'Centres, cells & conferences' },
      { label: 'R & D Cell', href: officialPage('R-and-D-Cell') },
      { label: 'ACTS Startup Cell', href: officialPage('ACTS') },
      { label: 'Innovation Council (IIC)', href: officialPage('IIC') },
      { label: 'Funded Research Projects', href: officialPage('Funded-Research-Projects') },
      { label: 'Research Guides', href: officialPage('Research-Guides') },
    ],
  },
  {
    label: 'Placements',
    items: [
      { label: 'Placement Dashboard', to: '/#placements', desc: 'Statistics 2025-26' },
      { label: 'Overview of CDC', href: officialPage('Overview-of-CDC') },
      { label: 'Training & Development', href: officialPage('Training--Development') },
      { label: 'Career Pathways', href: officialPage('Career-Pathways') },
    ],
  },
  {
    label: 'Campus Life',
    items: [
      { label: 'Campus Life', to: '/#campus-life', desc: 'Facilities & student life' },
      { label: 'Student Welfare Office', to: '/student-welfare', desc: 'Clubs, activities, helpdesk' },
      { label: 'Events Calendar', to: '/#events' },
      { label: 'Gallery', to: '/#gallery' },
      { label: 'Hostel', href: officialPage('Hostel') },
      { label: 'NSS', href: officialPage('NSS') },
      { label: 'NCC', href: officialPage('NCC') },
    ],
  },
];

export const QUICK_LINKS = [
  { label: 'Exam Timetables', href: officialPage('Exam-Timetables') },
  { label: 'Alumni', href: ALUMNI_URL },
  { label: 'Grievance Redressal', href: officialPage('Online-Grievance-Redressal-System') },
  { label: 'Contact', to: '/#contact' },
];

/* Student activities — source: /home/Event, /home/Gallery, /home/NSS, /home/NCC,
   homepage slider & notifications. `image` keys map to photos in SWO components. */
export const SWO_ACTIVITIES = [
  {
    id: 'sanskruthi',
    name: 'Sanskruthi',
    category: 'Cultural fest',
    tagline: 'The inter-college cultural fest of Dr. AIT.',
    facts: ['Sanskruthi – Inter-college Cultural Fest, 24 May 2024', 'Sanskruthi 2025, 4 June 2025'],
    image: 'sanskruthi',
  },
  {
    id: 'kalarava',
    name: 'Kannada Kalarava',
    category: 'Language & culture',
    tagline: 'A celebration of Kannada language, music and performance on campus.',
    facts: ['Kalarava 2019', 'Kalarava 2022', 'Kannada Kalarava 2025'],
    image: 'kalarava',
  },
  {
    id: 'colossus',
    name: 'COLOSSUS',
    category: 'National-level hackathon',
    tagline: 'A national-level 24-hour hackathon hosted at Dr. AIT.',
    facts: ['COLOSSUS, 13–14 September 2024', 'COLOSSUS 2.0, 11 April 2025', 'COLOSSUS 3.0'],
    image: 'colossus',
  },
  {
    id: 'motorsports',
    name: 'Motor Sports Club · Team Saranyu Racing',
    category: 'Engineering team',
    tagline: 'Students who design, build and race Formula Student cars.',
    facts: [
      '1st prize in Sales and Cost Evaluation and 2nd prize for Design at the FFS Competition, Coimbatore (18–24 October 2024)',
      'Team Saranyu Racing at SUPRA SAEINDIA 2026',
      'Faculty mentor Amith Kumar S N received the Dronacharya Award at BIC Greater Noida for Formula Student Car 2026',
    ],
    image: 'motorsports',
  },
  {
    id: 'nss',
    name: 'National Service Scheme (NSS)',
    category: 'Community service',
    tagline: 'Community service and outreach led by student volunteers.',
    facts: ['Programme Officer: Dr. R. Murali', 'Coordinators: Dr. G.S. Shivaprasanna, Dr. S.K. Rajendra, Dr. Mohan Kumar B.', 'Annual activity reports published since 2013'],
    image: 'nss',
    href: officialPage('NSS'),
  },
  {
    id: 'ncc',
    name: 'National Cadet Corps (NCC)',
    category: 'Cadet training',
    tagline: 'Discipline, leadership and service through cadet training.',
    facts: ['Caretaker: Lt. Praveen K B, Electronics & Telecommunication Engineering', 'NCC events held through 2024'],
    image: 'ncc',
    href: officialPage('NCC'),
  },
];
