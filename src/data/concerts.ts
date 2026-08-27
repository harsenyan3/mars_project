import { Concert } from '../types';

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
];

// Auto-sort by date, soonest first
export const concerts: Concert[] = [...concertsRaw].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);
