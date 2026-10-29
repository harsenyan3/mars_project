import { formatConcertDate, isUpcoming } from './concertDates';

describe('isUpcoming', () => {
  const now = new Date(2026, 10, 13, 21, 30); // Nov 13 2026, 9:30 PM local

  test('future dates are upcoming', () => {
    expect(isUpcoming('Dec 1, 2026', now)).toBe(true);
  });

  test("today's show stays listed all day", () => {
    expect(isUpcoming('Nov 13, 2026', now)).toBe(true);
  });

  test('past dates are not upcoming', () => {
    expect(isUpcoming('Nov 12, 2026', now)).toBe(false);
    expect(isUpcoming('April 4, 2026', now)).toBe(false);
  });

  test('unparseable dates are never upcoming', () => {
    expect(isUpcoming('sometime soon', now)).toBe(false);
  });
});

describe('formatConcertDate', () => {
  test('splits into an uppercase month/day and a year', () => {
    expect(formatConcertDate('Nov 13, 2026')).toEqual({ monthDay: 'NOV 13', year: '2026' });
  });

  test('pads single-digit days and accepts full month names', () => {
    expect(formatConcertDate('April 4, 2026')).toEqual({ monthDay: 'APR 04', year: '2026' });
  });

  test('falls back to the raw string when unparseable', () => {
    expect(formatConcertDate('TBA')).toEqual({ monthDay: 'TBA', year: '' });
  });
});
