/**
 * CLUBS
 * ------------------------------------------------------------------
 * To add or edit a club, change an object in the list below. Only `slug`, `name`
 * and `category` are required — every other field is optional, and the club
 * page only shows sections that have content.
 *
 * {
 *   slug: 'music-club',                 // URL: /clubs/music-club (lowercase, hyphens)
 *   name: 'Music Club',
 *   category: 'Arts & Culture',          // one of CLUB_CATEGORIES below
 *   kind: 'SWO club',                    // 'SWO club' | 'Student chapter' | 'National unit' | 'Student team'
 *   tagline: 'One line shown on cards.',
 *   description: ['Paragraph 1', 'Paragraph 2'],
 *   logo: 'clubs/music-logo.png',        // file in src/assets/photos/
 *   cover: 'clubs/music-cover.webp',
 *   coordinators: [{ name, role, dept?, phone?, email?, photo? }],   // faculty & student leads
 *   members: [{ name, role? }],          // optional member list
 *   memberCount: 40,                     // optional, if a list isn't published
 *   activities: ['Weekly jam sessions', ...],
 *   facts: [{ label: 'Established', value: '2025' }],
 *   links: { instagram?, website?, email? },
 *   gallery: ['clubs/music-1.webp', ...],
 *   source: 'Where this information was published',
 * }
 *
 * Achievements, events and fests link back to a club with `club: '<slug>'`.
 * ------------------------------------------------------------------
 */

export const CLUB_CATEGORIES = ['Technical', 'Arts & Culture', 'Service', 'Wellness', 'Learning', 'Community'];

const SWO_DOC = 'SWO document — Clubs of Dean (Student Affairs)';

export const CLUBS = [
  {
    slug: 'motor-sports-club',
    name: 'Motor Sports Club',
    category: 'Technical',
    kind: 'SWO club',
    tagline: 'Home of Team Saranyu Racing — students who design, build and race Formula Student cars.',
    description: [
      'The Motor Sports Club is one of the interdepartmental clubs organised under the Dean (Student Affairs). Its student team, Team Saranyu Racing, represents Dr. AIT at national student automotive engineering competitions.',
      'At SUPRA SAEINDIA 2026 the team competed against 48 teams, demonstrating skills in automotive design, fabrication, cost analysis, teamwork, project management and vehicle performance.',
    ],
    cover: 'clubs/motorsports-car.webp',
    coordinators: [{ name: 'Amith Kumar S N', role: 'Faculty Advisor', dept: 'Asst. Prof., Mechanical Engineering' }],
    activities: [
      'Designing and fabricating Formula Student cars',
      'Competing at SUPRA SAEINDIA and the FFS competition',
      'Design, cost and business presentation events',
    ],
    facts: [
      { label: 'Student team', value: 'Team Saranyu Racing' },
      { label: 'SUPRA SAEINDIA 2026', value: '6th in Karnataka' },
    ],
    gallery: ['clubs/saranyu-team.webp', 'clubs/motorsports-car.webp', 'achievements/supra-2026-award.webp', 'achievements/ffs-2024.webp'],
    source: `${SWO_DOC}; Team Saranyu Racing 2026 report; drait.edu.in news`,
  },
  {
    slug: 'ieee-student-branch',
    name: 'IEEE Student Branch',
    category: 'Technical',
    kind: 'Student chapter',
    tagline: 'Connecting students with peers and IEEE professionals to learn, collaborate and lead.',
    description: [
      'The IEEE Student Branch serves as a dynamic platform for students and graduate members to connect, collaborate, and learn alongside peers and professional IEEE members within the local community.',
      'Comprising dedicated faculty advisors and enthusiastic student volunteers, the branch promotes awareness of technological advancements while fostering essential professional skills. The IEEE Student Branch at Dr. AIT was established in 2025.',
    ],
    cover: 'events/ieee-inauguration-2025.webp',
    activities: ['Special projects', 'Social and technical meetings', 'Outreach programmes', 'Conferences and IEEE Section / Regional opportunities'],
    facts: [
      { label: 'Established', value: '2025' },
      { label: 'Inaugurated', value: '5 July 2025' },
    ],
    source: 'IEEE Student Chapter 2025 report, drait.edu.in Events',
  },
  {
    slug: 'nss',
    name: 'National Service Scheme (NSS)',
    category: 'Service',
    kind: 'National unit',
    tagline: 'Community service and outreach led by student volunteers.',
    description: ['The NSS unit of Dr. AIT runs community service and outreach activities through the year. Activity reports have been published every year since 2013.'],
    cover: 'clubs/nss.webp',
    coordinators: [
      { name: 'Dr. R. Murali', role: 'NSS Programme Officer' },
      { name: 'Dr. G. S. Shivaprasanna', role: 'NSS Coordinator' },
      { name: 'Dr. S. K. Rajendra', role: 'NSS Coordinator' },
      { name: 'Dr. Mohan Kumar B.', role: 'NSS Coordinator' },
    ],
    links: { website: 'https://drait.edu.in/home/NSS' },
    source: 'drait.edu.in/home/NSS',
  },
  {
    slug: 'ncc',
    name: 'National Cadet Corps (NCC)',
    category: 'Service',
    kind: 'National unit',
    tagline: '11/2 Coy, 2 KAR BN NCC (Army Wing) — discipline, leadership and service.',
    description: [
      'Dr. AIT’s NCC cadets belong to 11/2 Coy, 2 KAR BN NCC (Army Wing), Bangalore Group ‘A’, Karnataka and Goa Directorate.',
      'Cadets have represented the institution at the All India Thal Sainik Camp and at the Youth Exchange Programme.',
    ],
    cover: 'clubs/ncc.webp',
    coordinators: [{ name: 'Lt. Praveen K B', role: 'NCC Caretaker', dept: 'Asst. Prof., Electronics & Telecommunication Engineering', phone: '9740744442' }],
    facts: [{ label: 'Unit', value: '11/2 Coy, 2 KAR BN' }],
    links: { website: 'https://drait.edu.in/home/NCC' },
    source: 'drait.edu.in/home/NCC; NCC congratulation banners on drait.edu.in',
  },
  {
    slug: 'technical-club',
    name: 'Technical Club (GDSC)',
    category: 'Technical',
    kind: 'SWO club',
    tagline: 'The technical club listed among the SWO’s interdepartmental clubs.',
    source: SWO_DOC,
  },
  { slug: 'cultural-club', name: 'Cultural Club', category: 'Arts & Culture', kind: 'SWO club', source: SWO_DOC },
  { slug: 'music-club', name: 'Music Club', category: 'Arts & Culture', kind: 'SWO club', source: SWO_DOC },
  { slug: 'fine-arts-photography-club', name: 'Fine Arts & Photography Club', category: 'Arts & Culture', kind: 'SWO club', source: SWO_DOC },
  { slug: 'rotaract-club', name: 'Rotaract Club', category: 'Service', kind: 'SWO club', source: SWO_DOC },
  { slug: 'yoga-club', name: 'Yoga Club', category: 'Wellness', kind: 'SWO club', source: SWO_DOC },
  { slug: 'peer-learning-club', name: 'Peer Learning Club', category: 'Learning', kind: 'SWO club', source: SWO_DOC },
  { slug: 'under-25-club', name: 'Under 25 Club', category: 'Community', kind: 'SWO club', source: SWO_DOC },
];

export const getClub = (slug) => CLUBS.find((c) => c.slug === slug);

/** A club has a published profile once it has a description or activities. */
export const hasProfile = (club) => Boolean(club.description?.length || club.activities?.length);
