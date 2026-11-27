/**
 * FESTS
 * ------------------------------------------------------------------
 * A fest is a recurring celebration. Add a new year by appending to `editions`
 * (newest first). Only `slug`, `name` and `type` are required.
 *
 * {
 *   slug: 'sanskruthi',                  // URL: /fests/sanskruthi
 *   name: 'Sanskruthi',
 *   type: 'Cultural',                    // one of FEST_TYPES
 *   tagline: 'One line for cards.',
 *   description: ['Paragraph', ...],
 *   cover: 'fests/sanskruthi-crowd.webp',
 *   organiser: 'School of CSE',          // optional
 *   club: 'cultural-club',               // optional link to a club slug
 *   links: { instagram?, website?, email? },
 *   editions: [{
 *     name: 'Sanskruthi 2K25', start: '2025-06-04', end?: '2025-06-05',
 *     summary: '...', highlights: ['...'], poster?: 'fests/x.webp',
 *     registration?: { url, label?, deadline? },   // shows a Register button while upcoming
 *     report?: 'https://...pdf',
 *   }],
 *   gallery: ['fests/...webp'],
 *   source: '...',
 * }
 * ------------------------------------------------------------------
 */

export const FEST_TYPES = ['Cultural', 'Technical', 'Celebration'];

export const FESTS = [
  {
    slug: 'sanskruthi',
    name: 'Sanskruthi',
    type: 'Cultural',
    featured: true,
    tagline: 'The grand annual inter-college cultural fest of Dr. AIT.',
    description: [
      'Sanskruthi brings together students from various disciplines to celebrate art, music, dance and creativity. The fest is a platform for students to showcase their talents, promote cultural diversity, and foster teamwork and spirit.',
      'Each edition is a multi-day celebration of cultural events, competitions and performances — one of the most anticipated celebrations of the year on campus.',
    ],
    cover: 'fests/sanskruthi-performer.webp',
    links: { instagram: 'https://www.instagram.com/sanskruthi_drait/', email: 'sanskruthidrait1@gmail.com' },
    editions: [
      {
        name: 'Sanskruthi 2K25',
        start: '2025-06-04',
        summary: 'A two-day extravaganza of cultural events, competitions and performances, with Nandini Milk as Title Sponsor.',
        highlights: [
          'Inter-college Fashion Walk competition with 13 participating teams',
          'Dance and music performances',
          'Live concert by artist Suraj K M',
          'DJ performance by DJ Arun and DJ Kamra',
          'A floating crowd of approximately 4,000–5,000 attendees',
        ],
        report: 'https://drait.edu.in/assets/latest_news/Sanskruthi%202025.pdf',
      },
      {
        name: 'Sanskruthi 2K24',
        start: '2024-05-23',
        end: '2024-05-24',
        summary: 'Inter-college cultural fest with culturals, dance and fashion on day one, followed by a DJ night and live concert.',
        highlights: ['Culturals, dance and fashion — 23 May 2024', 'Concert Night with MC Bijju & Aura Bijju', 'DJ Night with Vinay Music — 24 May 2024'],
        poster: 'fests/sanskruthi-2024-poster.webp',
      },
    ],
    gallery: ['fests/sanskruthi-crowd.webp', 'fests/sanskruthi-performer.webp', 'fests/sanskruthi-stage.webp', 'fests/sanskruthi-inauguration.webp', 'fests/sanskruthi-2025-concert.webp'],
    source: 'Sanskruthi 2025 & 2024 reports and posters, drait.edu.in Events',
  },
  {
    slug: 'colossus',
    name: 'COLOSSUS',
    type: 'Technical',
    featured: true,
    tagline: 'A national-level 24-hour hackathon hosted at Dr. AIT.',
    description: [
      'COLOSSUS is a national-level 24-hour hackathon. Teams take on problem statements through intense coding sessions, brainstorming and prototyping, guided by industry mentors.',
      'Each edition opens with an inauguration and orientation, includes mentorship hours and break-time activities, and ends with teams pitching prototypes to a panel of judges, followed by the prize distribution.',
    ],
    cover: 'fests/colossus-2-hall.webp',
    links: { website: 'https://hackcolossus.tech/' },
    editions: [
      { name: 'COLOSSUS 3.0', summary: 'The third edition of the national-level hackathon.' },
      {
        name: 'COLOSSUS 2.0',
        start: '2025-04-11',
        end: '2025-04-12',
        summary: 'National-level 24-hour hackathon with a prize pool of ₹1 lakh+.',
        highlights: ['Industry mentorship hours', 'Prototype pitches to a judging panel', 'Prize distribution ceremony'],
        report: 'https://drait.edu.in/assets/latest_news/COLOSSUS%202.0%20-2025.pdf',
      },
      { name: 'COLOSSUS', start: '2024-09-13', end: '2024-09-14', summary: 'The first national-level 24-hour hackathon.' },
    ],
    gallery: ['fests/colossus-3-cover.webp', 'fests/colossus-3-teams.webp', 'fests/colossus-3-ceremony.webp', 'fests/colossus-2-hall.webp', 'fests/colossus-2-coding.webp', 'fests/colossus-2-winners.webp', 'fests/colossus-2-wall.webp'],
    source: 'COLOSSUS 2.0 report, drait.edu.in Events & Gallery',
  },
  {
    slug: 'maitri',
    name: 'mAITri',
    type: 'Cultural',
    featured: true,
    tagline: 'The annual cultural fest celebrating art, music, dance and literature.',
    description: [
      'mAITri is Dr. AIT’s annual cultural fest, celebrating art, music, dance, literature and cultural diversity, and bringing together students from various disciplines to showcase their talents.',
      'It is a vibrant platform for creativity, entertainment and unity, featuring cultural performances, competitions, celebrity appearances and interactive sessions.',
    ],
    cover: 'fests/maitri-crowd.webp',
    editions: [
      {
        name: 'mAITri 2K25',
        start: '2024-12-19',
        summary: 'A two-day celebration that opened on 19 December 2024 (3:00–9:00 PM) at the Dr. AIT Open Auditorium.',
        highlights: ['Cultural performances and competitions', 'Celebrity appearances', 'Interactive sessions'],
        report: 'https://drait.edu.in/assets/latest_news/Maitri%202K25.pdf',
      },
      { name: 'mAITri 2019', year: '2019' },
      { name: 'mAITri 2018', year: '2018' },
    ],
    gallery: ['fests/maitri-crowd.webp', 'fests/maitri-dance.webp', 'fests/maitri-performance.webp', 'fests/maitri-2025-band.webp'],
    source: 'Maitri 2K25 report, drait.edu.in Events & Gallery',
  },
  {
    slug: 'kannada-kalarava',
    name: 'Kannada Kalarava',
    type: 'Cultural',
    tagline: 'A celebration of Kannada language, culture and performance.',
    cover: 'fests/kalarava-2025-stage.webp',
    editions: [
      { name: 'Kannada Kalarava 2025', year: '2025' },
      { name: 'Kalarava 2022', year: '2022' },
      { name: 'Kalarava 2019', year: '2019' },
    ],
    gallery: ['fests/kalarava-2025-stage.webp', 'fests/kalarava-2025-inauguration.webp', 'fests/kalarava-2025-felicitation.webp', 'fests/kalarava-2022-dance.webp', 'fests/kalarava-2022-exhibit.webp'],
    source: 'drait.edu.in Gallery',
  },
  {
    slug: 'astrava',
    name: 'ASTRAVA',
    type: 'Technical',
    tagline: 'A 24-hour national-level hackathon by the School of Computer Science & Engineering.',
    description: ['ASTRAVA is a 24-hour national-level hackathon presented by the School of Computer Science and Engineering, with a prize pool of ₹1 lakh+.'],
    organiser: 'School of Computer Science & Engineering',
    cover: 'fests/astrava-hall.webp',
    links: { website: 'https://astrava.tech' },
    editions: [
      {
        name: 'ASTRAVA 2026',
        start: '2026-03-06',
        end: '2026-03-07',
        summary: 'Domains: AI for Smart Agriculture, AI for Healthcare, AI for Sustainability & Smart City, AI for SpaceTech, AI for Cybersecurity & FinTech, and Open Innovation.',
      },
    ],
    gallery: ['fests/astrava-hall.webp', 'fests/astrava-floor.webp', 'fests/astrava-prizes.webp'],
    source: 'ASTRAVA poster and Gallery, drait.edu.in',
  },
  {
    slug: 'techno-exhibition',
    name: 'National Level Techno Exhibition',
    type: 'Technical',
    tagline: 'Students exhibit their products and projects at a national-level exhibition.',
    cover: 'fests/techno-exhibition-2019.webp',
    editions: [
      { name: '8th National Level Techno Exhibition', start: '2024-04-13' },
      { name: 'Techno Exhibition 2023', year: '2023' },
      { name: '6th National Level Techno Exhibition', start: '2022-04-13' },
      { name: 'Techno Exhibition 2019', year: '2019' },
    ],
    gallery: ['fests/techno-exhibition-2019.webp'],
    source: 'drait.edu.in Events & Gallery',
  },
  {
    slug: 'ambedkar-jayanthi',
    name: 'Dr. B. R. Ambedkar Jayanthi',
    type: 'Celebration',
    tagline: 'The annual celebration of the birth anniversary of Dr. B. R. Ambedkar.',
    cover: 'fests/ambedkar-jayanthi-2019.webp',
    editions: [
      { name: '134th Dr. B. R. Ambedkar Jayanthi', year: '2025' },
      { name: '133rd Birth Anniversary Celebration', start: '2024-04-14' },
    ],
    gallery: ['fests/ambedkar-jayanthi-2019.webp'],
    source: 'drait.edu.in Events & Gallery',
  },
  {
    slug: 'founders-day',
    name: 'Founders’ Day',
    type: 'Celebration',
    tagline: 'Honouring founder Sri M. H. Jayaprakash Narayan on his birth anniversary.',
    cover: 'fests/founders-day-2025.webp',
    editions: [{ name: 'Founders’ Day 2025', start: '2025-12-21' }],
    gallery: ['fests/founders-day-2025.webp'],
    source: 'drait.edu.in Gallery',
  },
];

export const getFest = (slug) => FESTS.find((f) => f.slug === slug);
