# Editing site content

All website content lives in this folder as plain JavaScript data. Edit a file, save it, and the
site updates — no component code needs to change. Each file starts with a comment showing every
supported field. Only the first few fields are required; pages hide any section that has no data.

| What you want to change | File |
| --- | --- |
| SWO intro, vision, mission, objectives, initiatives, contact, social links | `swo.js` |
| Clubs (profile, logo, coordinators, members, activities) | `clubs.js` |
| Fests and their yearly editions | `fests.js` |
| Events (upcoming/past are worked out from the date) | `events.js` |
| Achievements and success stories | `achievements.js` |
| SWO officials, leadership, student council | `team.js` |
| Extra photo albums and videos | `gallery.js` |

## Adding photos and logos

1. Put the image in `src/assets/photos/<folder>/`, e.g. `src/assets/photos/clubs/music-logo.png`.
   Prefer `.webp`, at most about 1600px wide.
2. Reference it by its path inside `photos/`: `logo: 'clubs/music-logo.png'`.

A missing file shows a neutral placeholder and logs a warning in the dev console.

## Common tasks

- **Add an upcoming event with registration.** Add an object to `EVENTS` with a future `start`
  date and `registration: { url: 'https://…', deadline: 'YYYY-MM-DD' }`. The Register button
  appears automatically and disappears after the event.
- **Publish a club profile.** Add `tagline`, `description`, `coordinators` and `activities` to
  the club in `clubs.js`. Clubs without a description show as "profile coming soon".
- **Add a new fest edition.** Add it to the top of that fest's `editions` list in `fests.js`.
- **Add a video.** Add `{ title, youtubeId, year }` to `VIDEOS` in `gallery.js`.

## Authenticity

Only publish information that is officially confirmed, and record where it came from in the
`source` field. Current content was taken from https://drait.edu.in (SWO page, event reports,
gallery and announcements) and the official SWO roles & responsibilities document.
