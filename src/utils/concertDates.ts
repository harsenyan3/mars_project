const MONTH = new Intl.DateTimeFormat('en-US', { month: 'short' });

/** Concert dates are human-written strings like "Nov 13, 2026" or "April 4, 2026". */
export function parseConcertDate(date: string): Date {
  return new Date(date);
}

/** True for shows today or later (a show stays listed through its own day). */
export function isUpcoming(date: string, now: Date = new Date()): boolean {
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return parseConcertDate(date).getTime() >= startOfToday.getTime();
}

/** "Nov 13, 2026" → { monthDay: "NOV 13", year: "2026" } */
export function formatConcertDate(date: string): { monthDay: string; year: string } {
  const parsed = parseConcertDate(date);
  if (Number.isNaN(parsed.getTime())) {
    return { monthDay: date, year: '' };
  }
  const day = String(parsed.getDate()).padStart(2, '0');
  return { monthDay: `${MONTH.format(parsed).toUpperCase()} ${day}`, year: String(parsed.getFullYear()) };
}
