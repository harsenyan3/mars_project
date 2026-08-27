import { forwardRef } from 'react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { BandMember } from '../../types';
import aboutBg from '../../assets/images/site/band-members.jpg';
import './About.css';

interface AboutProps {
  bandMembers: BandMember[];
  hoveredMember: string | null;
  onHoverMember: (image: string | null) => void;
}

export const About = forwardRef<HTMLElement, AboutProps>(function About(
  { bandMembers, hoveredMember, onHoverMember },
  ref
) {
  return (
    <section ref={ref} className="section about-section">
      <div className="about-page-background">
        <div className="about-img-crop">
          <img src={aboutBg} alt="Mars Project Band" className="about-page-bg-img" />
        </div>
        <div className="about-page-overlay"></div>
      </div>

      {hoveredMember && (
        <div className="member-hover-background">
          <img src={hoveredMember} alt="Band Member" className="member-hover-img" />
          <div className="member-hover-overlay"></div>
        </div>
      )}

      <div className="page-container">
        <AnimatedSection delay={0.1} direction="fade">
          <div className="about-body-block">
            <h2 className="about-header">Who We Are</h2>
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
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h3 className="section-title">The Boys</h3>
        </AnimatedSection>

        <div className="band-members">
          {bandMembers.map((member, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.08} direction="up" className="member-grid-item">
              <div
                className="member-card card"
                onMouseEnter={() => onHoverMember(member.image)}
                onMouseLeave={() => onHoverMember(null)}
              >
                <div className="member-photo">
                  <img src={member.image} alt={member.name} className="member-img" />
                </div>
                <h4 className="member-name">{member.name}</h4>
                <p className="member-role">{member.role}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
});
