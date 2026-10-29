import type { Ref } from 'react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { Section } from '../../components/ui/Section';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { Concert } from '../../types';
import showsBg from '../../assets/images/site/shows-bg.jpg';
import { ConcertRow } from './ConcertRow';
import { ShowsEmptyState } from './ShowsEmptyState';
import './Shows.css';

interface ShowsProps {
  ref?: Ref<HTMLElement>;
  concerts: Concert[];
}

export function Shows({ ref, concerts }: ShowsProps) {
  return (
    <Section
      ref={ref}
      id="shows"
      variant="image"
      backgroundImage={showsBg}
      backgroundPosition="center 55%"
      className="shows-section"
    >
      <AnimatedSection>
        <SectionTitle>Upcoming Shows</SectionTitle>
      </AnimatedSection>
      {concerts.length === 0 ? (
        <ShowsEmptyState />
      ) : (
        <ol className="concert-list">
          {concerts.map((concert, idx) => (
            <li key={`${concert.date}-${concert.venue}`} className="concert-list-item">
              <AnimatedSection delay={idx * 0.08}>
                <ConcertRow concert={concert} />
              </AnimatedSection>
            </li>
          ))}
        </ol>
      )}
    </Section>
  );
}
