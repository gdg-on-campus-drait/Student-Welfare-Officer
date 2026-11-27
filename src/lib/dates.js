/** Date helpers. ISO date strings ('YYYY-MM-DD') are treated as local calendar dates. */

export const parseDate = (iso) => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const toISO = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const todayISO = () => toISO(new Date());

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const fmtDM = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short' });

export function formatDate(iso) {
  return fmt.format(parseDate(iso));
}

export function formatRange(start, end) {
  if (!end || end === start) return formatDate(start);
  const a = parseDate(start);
  const b = parseDate(end);
  if (a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth()) {
    return `${a.getDate()}–${fmt.format(b)}`;
  }
  return `${fmtDM.format(a)} – ${fmt.format(b)}`;
}

/** An event/notice is upcoming if its last day is today or later. */
export const isUpcoming = (e) => (e.end || e.endDate || e.start || e.date) >= todayISO();

export const daysUntil = (iso) => Math.round((parseDate(iso) - parseDate(todayISO())) / 86400000);

/** Does an event (start..end) include the given ISO day? */
export const coversDay = (e, iso) => iso >= e.start && iso <= (e.end || e.start);
