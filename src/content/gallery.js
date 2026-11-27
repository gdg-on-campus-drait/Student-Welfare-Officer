import { FESTS } from './fests';

/**
 * GALLERY
 * ------------------------------------------------------------------
 * Albums are built automatically from each fest's `gallery` list (fests.js).
 * Add extra albums for events or clubs in EXTRA_ALBUMS:
 *   { id, title, year?, category: 'Events' | 'Clubs' | ..., photos: ['events/x.webp', ...] }
 *
 * VIDEOS — add official videos (YouTube) here:
 *   { title: 'Sanskruthi 2K25 aftermovie', youtubeId: 'xxxxxxxxxxx', year: '2025' }
 * ------------------------------------------------------------------
 */

const EXTRA_ALBUMS = [
  {
    id: 'student-induction-2025',
    title: 'Student Induction Program 2025',
    year: '2025',
    category: 'Events',
    photos: ['events/sip-auditorium.webp', 'events/sip-students.webp'],
  },
  { id: 'marathon-2025', title: 'Marathon 2K25', year: '2025', category: 'Events', photos: ['events/marathon-2025.webp'] },
  { id: 'ieee-2025', title: 'IEEE Student Chapter Inauguration', year: '2025', category: 'Clubs', photos: ['events/ieee-inauguration-2025.webp'] },
  {
    id: 'motor-sports',
    title: 'Team Saranyu Racing',
    category: 'Clubs',
    photos: ['clubs/saranyu-team.webp', 'clubs/motorsports-car.webp', 'achievements/supra-2026-award.webp'],
  },
  { id: 'nss-ncc', title: 'NSS & NCC', category: 'Clubs', photos: ['clubs/nss.webp', 'clubs/ncc.webp'] },
  { id: 'independence-2022', title: 'Independence Day', year: '2022', category: 'Events', photos: ['events/independence-day-2022.webp'] },
];

export const ALBUMS = [
  ...FESTS.filter((f) => f.gallery?.length).map((f) => ({
    id: f.slug,
    title: f.name,
    category: f.type === 'Celebration' ? 'Celebrations' : 'Fests',
    photos: f.gallery,
    fest: f.slug,
  })),
  ...EXTRA_ALBUMS,
];

export const VIDEOS = [];

export const YOUTUBE_CHANNEL = 'https://www.youtube.com/channel/UCQokRfIgagp6EpRdagVX_AA/';
