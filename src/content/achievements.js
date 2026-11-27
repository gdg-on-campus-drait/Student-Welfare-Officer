/**
 * ACHIEVEMENTS
 * ------------------------------------------------------------------
 * {
 *   id: 'sih-2024',
 *   title: 'First Prize — Smart India Hackathon 2024',
 *   category: 'Competitions',            // one of ACHIEVEMENT_CATEGORIES
 *   year: '2024',                         // null if not published
 *   date: '2024-10-24',                   // optional exact date, only if published
 *   who: 'Team Saranyu Racing',           // team or student name(s)
 *   summary: 'One or two sentences.',
 *   image: 'achievements/sih-2024.webp',  // optional
 *   club: 'motor-sports-club',            // optional club slug
 *   story: true,                          // mark individual success stories
 *   source: 'Where this was published',
 * }
 * Items sort newest year first; within a year, list order is kept.
 * ------------------------------------------------------------------
 */

export const ACHIEVEMENT_CATEGORIES = ['Competitions', 'NCC', 'Awards', 'Success stories'];

export const ACHIEVEMENTS = [
  {
    id: 'ideathon-7',
    title: 'Second Runner-up — Ideathon 7.0',
    category: 'Competitions',
    year: '2026',
    date: '2026-02-28',
    who: 'Team NeptuneX',
    summary: 'Second Runner-up at Ideathon 7.0, organised by Nitte Meenakshi Institute of Technology, Bengaluru, on 28 February 2026.',
    image: 'achievements/ideathon-7.webp',
    source: 'drait.edu.in homepage banner',
  },
  {
    id: 'supra-2026',
    title: 'SUPRA SAEINDIA 2026 — 6th in Karnataka',
    category: 'Competitions',
    year: '2026',
    who: 'Team Saranyu Racing',
    summary: 'Competing among 48 teams, the team secured 9th rank in BPP, 25th in the Cost Event, 31st in the Design Event and 29th overall — and 6th among teams from Karnataka.',
    image: 'clubs/saranyu-team.webp',
    club: 'motor-sports-club',
    source: 'Team Saranyu Racing — 2026 report',
  },
  {
    id: 'dronacharya-2026',
    title: 'Dronacharya Award 2026',
    category: 'Awards',
    year: '2026',
    who: 'Amith Kumar S N, Faculty Advisor',
    summary: 'The faculty advisor of Team Saranyu Racing received the Dronacharya Award at BIC Greater Noida for Formula Student Car 2026 — chosen among 61 teams.',
    image: 'achievements/supra-2026-award.webp',
    club: 'motor-sports-club',
    source: 'Team Saranyu Racing — 2026 report; drait.edu.in news',
  },
  {
    id: 'ncc-thal-sainik-gold',
    title: 'Gold Medal — All India Thal Sainik Camp 2026',
    category: 'NCC',
    year: '2026',
    who: 'SGT Manoj H B, 5th Sem EEE',
    summary: 'Selected for the All India Thal Sainik Camp 2026 in New Delhi, where he secured a gold medal.',
    image: 'achievements/ncc-thal-sainik-gold.webp',
    club: 'ncc',
    story: true,
    source: 'NCC banners, drait.edu.in',
  },
  {
    id: 'ncc-youth-exchange-2025',
    title: 'Represented India — Youth Exchange Programme, Nepal 2025',
    category: 'NCC',
    year: '2025',
    who: 'SUO Shruthi K M, 7th Sem CSE',
    summary: 'The sole representative from the Karnataka and Goa Directorate selected to represent India at the Youth Exchange Programme, Nepal 2025.',
    club: 'ncc',
    story: true,
    source: 'NCC banner, drait.edu.in',
  },
  {
    id: 'sih-2024',
    title: 'First Prize — Smart India Hackathon 2024',
    category: 'Competitions',
    year: '2024',
    who: 'Dr. AIT student team',
    summary: 'First prize winners at the Smart India Hackathon (SIH 2024) under the Agriculture theme.',
    image: 'achievements/sih-2024.webp',
    source: 'drait.edu.in homepage banner',
  },
  {
    id: 'ffs-2024',
    title: '1st Prize, Sales & Cost Evaluation — FFS Competition 2024',
    category: 'Competitions',
    year: '2024',
    date: '2024-10-24',
    who: 'Motor Sports Club & Saranyu Racing Team',
    summary: 'Won 1st prize in Sales and Cost Evaluation and 2nd prize for Design at the FFS Competition, Coimbatore (18–24 October 2024).',
    image: 'achievements/ffs-2024.webp',
    club: 'motor-sports-club',
    source: 'drait.edu.in homepage banner',
  },
  {
    id: 'team-vajra-etwdc-2023',
    title: 'First Prize — SAE ETWDC 2023',
    category: 'Competitions',
    year: '2023',
    who: 'Team Vajra',
    summary: 'Won first prize at SAE ETWDC 2023 at Rajalakshmi Engineering College, Chennai.',
    image: 'achievements/team-vajra-etwdc-2023.webp',
    source: 'drait.edu.in homepage banner',
  },
  {
    id: 'team-vajra-cepheus-2023',
    title: '2nd Place — CEPHEUS 2023',
    category: 'Competitions',
    year: '2023',
    who: 'Team Vajra',
    summary: 'Participated with their indigenously developed electric vehicle and won 2nd place in CEPHEUS-2023 at BIT Goa. Funded by the PVP Welfare Trust.',
    source: 'drait.edu.in homepage banner',
  },
  {
    id: 'upsc',
    title: 'UPSC Civil Services — AIR 82 & AIR 641',
    category: 'Success stories',
    year: null,
    who: 'Sandeep Badad (ECE, 1DA13EC137) · Sagar A (EIE, 1DA15EI035)',
    summary: 'Alumni recognised as the pride of the institution for their success in the UPSC examination.',
    story: true,
    source: 'drait.edu.in homepage banner',
  },
  {
    id: 'gate-vaibhav',
    title: '4th Rank — GATE Engineering Sciences',
    category: 'Success stories',
    year: null,
    who: 'Vaibhav V B, Mechanical Engineering (2023 batch)',
    summary: 'Secured 4th rank in GATE Engineering Sciences with a GATE score of 903.',
    story: true,
    source: 'drait.edu.in homepage banner',
  },
];
