import type { Ref } from 'react';
import { SocialLinks } from '../../components/common/SocialLinks';
import { Button } from '../../components/ui/Button';
import { Section } from '../../components/ui/Section';
import logo from '../../assets/images/site/logo.png';
import homeHero from '../../assets/images/site/home-hero.jpg';
import './Home.css';

interface HomeProps {
  ref?: Ref<HTMLElement>;
  onSeeShows: () => void;
}

export function Home({ ref, onSeeShows }: HomeProps) {
  return (
    <Section
      ref={ref}
      id="home"
      variant="image"
      backgroundImage={homeHero}
      backgroundPosition="center 45%"
      className="home-section"
    >
      <div className="home-content">
        <img src={logo} alt="Mars Project" className="home-logo" />
        <p className="home-subtitle">
          Just some kids making music out of Atlanta, Georgia. Got great things coming! Wanna hear us live?
        </p>
        <Button onClick={onSeeShows} className="home-cta">
          See next dates
        </Button>
        <SocialLinks variant="icons" className="home-socials" />
      </div>
      <button className="scroll-indicator" onClick={onSeeShows} aria-label="Scroll to shows">
        <span className="scroll-arrow"></span>
      </button>
    </Section>
  );
}
