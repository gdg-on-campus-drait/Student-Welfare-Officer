/**
 * Student Welfare Office — core information.
 * Sources:
 *  - https://drait.edu.in/home/SWO  (current officers, vision, mission, objectives)
 *  - "Dean Student Affairs – SWO" document (drait.edu.in/assets/files/Library/Dean Student Affairs-SWO.pdf):
 *    roles & responsibilities, Student Council constitution, list of clubs
 *  - https://drait.edu.in/home/contact_us and the site footer (address, hours, social links)
 */

export const SWO = {
  name: 'Student Welfare Office',
  short: 'SWO',
  institute: 'Dr. Ambedkar Institute of Technology',
  instituteShort: 'Dr. AIT',
  email: 'swo@drait.edu.in',

  intro:
    'The Student Welfare Office serves as a platform for students to showcase their talents and skills while fostering personal growth and development. It creates opportunities for like-minded individuals to connect, share ideas, and engage in cultural activities that promote collaboration and creativity.',
  introMore:
    'In addition to organizing various events within the institution, the office also partners with external organizations to host dynamic and enriching programs.',

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

  /** "Roles and Responsibilities" from the SWO document, grouped into initiatives. */
  initiatives: [
    {
      title: 'Student activities & clubs',
      icon: 'sparkles',
      points: [
        'Coordinating technical, cultural and co-curricular activities, including sports and games.',
        'Handling interdepartmental student clubs and motivating students to hold regular events.',
        'Procuring materials for technical clubs, cultural clubs and sports through the central purchase committee.',
      ],
    },
    {
      title: 'Recognising achievement',
      icon: 'trophy',
      points: [
        'A centralised facility for tracking student achievements across all departments in technical, cultural and co-curricular activities.',
        'Identifying and encouraging students to participate in state, national and international level events.',
      ],
    },
    {
      title: 'Safe & respectful campus',
      icon: 'shield',
      points: [
        'Fostering an anti-ragging environment in the college premises.',
        'Student discipline and counselling on different issues, with the support of the institute’s Medical Counsellor.',
        'Advising departments on cultural differences so students are dealt with more sensitively.',
      ],
    },
    {
      title: 'A voice for students',
      icon: 'megaphone',
      points: [
        'Taking forward proposals submitted by students for approval, representing them with the management and principal.',
        'Preparing the budget required for, and allocating it to, the development and operation of student activities.',
      ],
    },
  ],

  /** Constitution of the Student Council, from the SWO document. */
  studentCouncil: {
    note: 'The Student Council is constituted by the Principal and meets as and when required.',
    members: [
      { role: 'Chairman', who: 'Principal' },
      { role: 'Convenor', who: 'Student Welfare Officer' },
      { role: 'Co-Convenors', who: 'SWO Coordinators' },
      { role: 'President', who: 'Final-year student' },
      { role: 'Secretary', who: 'Third-year student' },
      { role: 'Joint Secretaries', who: 'Second-year students (4 members)' },
      { role: 'Members', who: 'Club leads and event-wise coordinators' },
    ],
    responsibilities: [
      'Plan the execution of college-level events for each academic year, with a budget proposal.',
      'Recommend additional infrastructure and facilities for students to the College Trust.',
      'Review and advise on organising and participating in co-curricular and extracurricular activities.',
      'Prepare guidelines for selecting students to represent the college in technical events, cultural programmes, hackathons, youth festivals, seminars, quizzes and sports competitions.',
    ],
  },

  /** How student-run events are approved and funded (SWO document). */
  eventProcess: [
    'Student Council prepares the event list and budget, approved by every member of the core team (including sponsorship).',
    'The plan is cross-checked by the College Purchase Committee.',
    'Sponsorship money is deposited in the college account.',
    'The final budget is approved by the Principal, then by the management.',
    'Funds are released by the SWO as required; bills are settled before the next advance.',
  ],

  document: {
    label: 'SWO — Roles & Responsibilities (PDF)',
    href: 'https://drait.edu.in/assets/files/Library/Dean%20Student%20Affairs-SWO.pdf',
  },
  officialPage: 'https://drait.edu.in/home/SWO',
};

export const CONTACT = {
  address: ['Dr. Ambedkar Institute of Technology', 'Outer Ring Road, Near Jnana Bharathi Campus', 'Mallathahalli, Bengaluru, Karnataka 560056'],
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+Ambedkar+Institute+of+Technology+Bengaluru',
  mapEmbed: 'https://www.google.com/maps?q=Dr.+Ambedkar+Institute+of+Technology,+Mallathahalli,+Bengaluru&output=embed',
  hours: 'Monday to Saturday, 9:00 AM – 4:30 PM',
  instituteEmail: 'info@drait.edu.in',
  instituteWebsite: 'https://drait.edu.in',
  antiRaggingHelpline: '1800-180-5522',
};

/** Official Dr. AIT social channels (site footer of drait.edu.in). */
export const SOCIAL = [
  { id: 'instagram', label: 'Instagram', handle: '@draitofficial', href: 'https://www.instagram.com/draitofficial/' },
  { id: 'facebook', label: 'Facebook', handle: 'DrAITOfficial', href: 'https://www.facebook.com/DrAITOfficial/' },
  { id: 'youtube', label: 'YouTube', handle: 'Dr. AIT', href: 'https://www.youtube.com/channel/UCQokRfIgagp6EpRdagVX_AA/' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'company/drait', href: 'https://www.linkedin.com/company/drait' },
  { id: 'x', label: 'X (Twitter)', handle: '@DrAITOfficial', href: 'https://twitter.com/DrAITOfficial/' },
];
