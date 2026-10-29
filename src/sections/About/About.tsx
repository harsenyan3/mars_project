import type { Ref } from 'react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Section } from '../../components/ui/Section';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { BandMember } from '../../types';
import aboutBg from '../../assets/images/site/band-members.jpg';
import { MemberTile } from './MemberTile';
import './About.css';

interface AboutProps {
  ref?: Ref<HTMLElement>;
  bandMembers: BandMember[];
}

export function About({ ref, bandMembers }: AboutProps) {
  return (
    <Section
      ref={ref}
      id="about"
      variant="image"
      backgroundImage={aboutBg}
      backgroundPosition="center 65%"
      className="about-section"
    >
      <div className="about-layout">
        <AnimatedSection direction="fade">
          <GlassPanel className="about-story">
            <SectionTitle align="left">
              Who We Are
            </SectionTitle>
            <div className="about-story-body">
              <p>
                Just a bunch of kids grooving, watching this movement get bigger every time we hit the stage.
                Pushing our message. Stretching our sound. Finding new colors in the music.
              </p>
              <p>
                Established in 2025. Resident band at Barsouth Buckhead, Atlanta, GA. We've played the
                Mercedes-Benz Stadium lot, rocked stages in Athens and Auburn — alongside The Gringos,
                Flatline Drive, and more.
              </p>
              <p>Every performance is a journey. An expedition to the red planet and beyond.</p>
            </div>
          </GlassPanel>
        </AnimatedSection>

        <div className="about-members">
          <AnimatedSection>
            <SectionTitle as="h3" align="left" className="about-members-heading">
              The Boys
            </SectionTitle>
          </AnimatedSection>
          <ul className="member-grid">
            {bandMembers.map((member, idx) => (
              <li key={member.name} className="member-grid-item">
                <AnimatedSection delay={idx * 0.06}>
                  <MemberTile member={member} />
                </AnimatedSection>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
