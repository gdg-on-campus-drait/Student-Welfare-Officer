/**
 * Single entry point for site content + derived helpers.
 * Edit the individual files (clubs.js, fests.js, events.js, …); pages import from here.
 */
import { CLUBS, CLUB_CATEGORIES, getClub, hasProfile } from './clubs';
import { FESTS, FEST_TYPES, getFest } from './fests';
import { EVENTS, EVENT_TYPES } from './events';
import { ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES } from './achievements';
import { SWO_TEAM, LEADERSHIP, STUDENT_COUNCIL } from './team';
import { ALBUMS, VIDEOS, YOUTUBE_CHANNEL } from './gallery';
import { SWO, CONTACT, SOCIAL } from './swo';
import { isUpcoming } from '../lib/dates';

export {
  CLUBS, CLUB_CATEGORIES, getClub, hasProfile,
  FESTS, FEST_TYPES, getFest,
  EVENTS, EVENT_TYPES,
  ACHIEVEMENTS, ACHIEVEMENT_CATEGORIES,
  SWO_TEAM, LEADERSHIP, STUDENT_COUNCIL,
  ALBUMS, VIDEOS, YOUTUBE_CHANNEL,
  SWO, CONTACT, SOCIAL,
};

/** Upcoming events, soonest first. */
export const upcomingEvents = () => EVENTS.filter(isUpcoming).sort((a, b) => a.start.localeCompare(b.start));

/** Past events, most recent first. */
export const pastEvents = () => EVENTS.filter((e) => !isUpcoming(e)).sort((a, b) => b.start.localeCompare(a.start));

/** Achievements: newest year first, list order within a year, unknown years last. */
export const sortedAchievements = () =>
  ACHIEVEMENTS.map((a, i) => ({ ...a, _i: i })).sort((a, b) => (b.year || '0').localeCompare(a.year || '0') || a._i - b._i);

export const eventsForFest = (slug) => EVENTS.filter((e) => e.fest === slug);
export const eventsForClub = (slug) => EVENTS.filter((e) => e.club === slug);
export const achievementsForClub = (slug) => ACHIEVEMENTS.filter((a) => a.club === slug);

/** Every faculty/student coordinator listed on a club, with the club attached. */
export const clubCoordinators = () =>
  CLUBS.flatMap((c) => (c.coordinators || []).map((p) => ({ ...p, club: c })));

/** Latest dated edition of a fest (for cards). */
export const latestEdition = (fest) => fest.editions?.find((e) => e.start || e.year) || fest.editions?.[0];

export const ALL_PHOTOS = () => ALBUMS.flatMap((a) => a.photos.map((p) => ({ src: p, album: a })));
