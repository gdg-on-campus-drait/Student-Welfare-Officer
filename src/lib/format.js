import { formatRange } from './dates';

/** "4–5 Jun 2025", or the edition's year when no exact date is published. */
export const editionWhen = (e) => (e?.start ? formatRange(e.start, e.end) : e?.year || '');

/** Two-letter monogram used when a club has no logo. */
export const monogram = (name) =>
  name
    .replace(/\(.*?\)/g, '')
    .split(/[\s&]+/)
    .filter((w) => w && /[A-Za-z0-9]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
