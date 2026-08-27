import { forwardRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { Concert } from '../../types';
import showsBg from '../../assets/images/site/shows-bg.png';
import './Shows.css';

interface ShowsProps {
  concerts: Concert[];
}

export const Shows = forwardRef<HTMLElement, ShowsProps>(function Shows({ concerts }, ref) {
  return (
    <section ref={ref} className="section shows-section">
      <div className="shows-page-background">
        <img src={showsBg} alt="Mars Project Shows" className="shows-page-bg-img" />
        <div className="shows-page-overlay"></div>
      </div>

      <div className="page-container">
        <AnimatedSection>
          <h2 className="page-title">Upcoming Shows</h2>
        </AnimatedSection>
        <div className="concerts-list">
          {concerts.map((concert, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.12} direction="left">
              <div className="concert-card">
                <div className="concert-info">
                  <div className="concert-date">
                    <Calendar className="icon" />
                    <span className="date-text">{concert.date}</span>
                    <span className="separator">•</span>
                    <span className="time-text">{concert.time}</span>
                  </div>
                  <h3 className="concert-venue">{concert.venue}</h3>
                  <div className="concert-location">
                    <MapPin className="icon-small" />
                    <span>{concert.location}</span>
                  </div>
                </div>
                {concert.ticketed ? (
                  <a href={concert.tickets} target="_blank" rel="noopener noreferrer" className="btn-tickets">
                    GET TICKETS
                  </a>
                ) : (
                  <span className="btn-tickets-free">{concert.label || 'FREE ENTRY'}</span>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
});
