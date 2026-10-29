import { ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '../../components/ui/Button';
import { Concert } from '../../types';
import { formatConcertDate } from '../../utils/concertDates';
import './ConcertRow.css';

interface ConcertRowProps {
  concert: Concert;
}

/** One tour-list row: date · city/venue · tickets. */
export function ConcertRow({ concert }: ConcertRowProps) {
  const { monthDay, year } = formatConcertDate(concert.date);

  return (
    <article className="concert-row">
      <div className="concert-row-date">
        <span className="concert-row-monthday">{monthDay}</span>
        <span className="concert-row-meta">
          {year} · {concert.time}
        </span>
      </div>
      <div className="concert-row-place">
        <h3 className="concert-row-city">{concert.location}</h3>
        <p className="concert-row-venue">{concert.venue}</p>
      </div>
      <div className="concert-row-action">
        {concert.ticketed && concert.tickets ? (
          <ButtonLink variant="outline" size="sm" href={concert.tickets} target="_blank" rel="noopener noreferrer">
            Tickets <ArrowUpRight className="concert-row-arrow" aria-hidden="true" />
          </ButtonLink>
        ) : (
          <span className="concert-row-pill">{concert.label || 'Free entry'}</span>
        )}
      </div>
    </article>
  );
}
