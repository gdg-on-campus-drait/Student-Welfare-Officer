/**
 * CORE TEAM
 * ------------------------------------------------------------------
 * Person: { name, role, dept?, phone?, email?, photo? }   (photo from src/assets/photos/)
 *
 * Club & unit coordinators are NOT listed here — they come from `coordinators`
 * in clubs.js, so each person is maintained in one place.
 *
 * Add student council office-bearers to STUDENT_COUNCIL.members as they are
 * announced: { name, role: 'President', dept: 'CSE, 4th year' }.
 * ------------------------------------------------------------------
 */

/** Source: drait.edu.in/home/SWO */
export const SWO_TEAM = [
  {
    name: 'N. Chetan',
    role: 'Student Welfare Officer',
    dept: 'Assistant Professor, Department of Industrial Engineering & Management',
    phone: '9845242205',
    email: 'swo@drait.edu.in',
    photo: 'team/n-chetan.webp',
  },
  {
    name: 'Sangeetha N',
    role: 'Student Welfare Coordinator',
    dept: 'Assistant Professor, Department of Electronics & Communication Engineering',
    phone: '+91 99454 44117',
    email: 'swo@drait.edu.in',
    photo: 'team/sangeetha-n.webp',
  },
];

/** Source: drait.edu.in/home/Administration */
export const LEADERSHIP = [
  { name: 'Dr. Mahalinga V Mandi', role: 'Principal', dept: 'Chairman, Student Council' },
  { name: 'Ms. Pavithra A', role: 'Manager — HR & Student Affairs', dept: 'Administration' },
];

/** Positions from the SWO document; names are added once announced. */
export const STUDENT_COUNCIL = {
  members: [],
};
