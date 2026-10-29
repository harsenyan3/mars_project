import type { Ref } from 'react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { Section } from '../../components/ui/Section';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { BandMember } from '../../types';
import aboutBg from '../../assets/images/site/band-members.jpg';
import { MemberCarousel } from './MemberCarousel';
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
        <AnimatedSection direction="fade" className="about-story-cell">
          <GlassPanel className="about-story">
            <SectionTitle align="left" className="about-story-heading">
              Who Are We?
            </SectionTitle>
            <div className="about-story-body">
              <p>
                Started in Atlanta as a college pastime, turned into a lifestyle. We are just some guys jamming
                and watching this movement get bigger every time we hit the stage. Every f***ing time we are up
                on that stage, man that energy is contagious!
              </p>
              <p>
                Established in 2025.
                <br />
                Resident band at BarSouth Buckhead in Atlanta, GA.
                <br />
                We've played the Mercedes-Benz Stadium lot, rocked stages in Atlanta, Athens, Tuscaloosa,
                Auburn... playing alongside The Stews, The Gringos, Twin Suns, Seven Two, Flatline Drive, and
                more.
              </p>
              <p>Every performance is a journey. An expedition to the red planet and beyond.</p>
            </div>
          </GlassPanel>
        </AnimatedSection>

        <MemberCarousel members={bandMembers} />
      </div>
    </Section>
  );
}
