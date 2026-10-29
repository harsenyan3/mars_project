import { Concert } from '../types';
import { isUpcoming, parseConcertDate } from '../utils/concertDates';

// Add new shows anywhere in this list — it's sorted by date and past shows are
// hidden automatically, so old entries can stay as a record.
const concertsRaw: Concert[] = [
  {
    date: 'Mar 12, 2026',
    venue: 'Buckhead Barcrawl',
    location: 'Atlanta, GA',
    time: '11:00 PM',
    ticketed: false,
  },
  {
    date: 'Mar 14, 2026',
    venue: 'Georgia Tech SAE',
    location: 'Atlanta, GA',
    time: '10:00 PM',
    ticketed: false,
    label: "St. Patrick's Day Party 🍀",
  },
  {
    date: 'April 4, 2026',
    venue: 'Georgia Tech Porchfest',
    location: 'Atlanta, GA',
    time: '4:00 PM',
    ticketed: false,
  },
  {
    date: 'April 10, 2026',
    venue: 'Georgia Tech Porchfest',
    location: 'Atlanta, GA',
    time: '4:00 PM',
    ticketed: false,
  },
  {
    date: 'Nov 13, 2026',
    venue: 'SouthFest @ BarSouth Buckhead',
    location: 'Atlanta, GA',
    time: 'TBA',
    ticketed: false,
  },
];

// Soonest first, today onward (evaluated on page load)
export const upcomingConcerts: Concert[] = concertsRaw
  .filter((concert) => isUpcoming(concert.date))
  .sort((a, b) => parseConcertDate(a.date).getTime() - parseConcertDate(b.date).getTime());
