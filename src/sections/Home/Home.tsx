import type { Ref } from 'react';
import { SocialLinks } from '../../components/common/SocialLinks';
import { Button } from '../../components/ui/Button';
import { Section } from '../../components/ui/Section';
import logo from '../../assets/images/site/logo-light.png';
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
      backdrop={<img src={logo} alt="" className="home-backdrop-logo" />}
      className="home-section"
    >
      {/* The logo is decorative background now, so the page title lives here */}
      <h1 className="sr-only">MARS Project</h1>
      <div className="home-content">
        <Button variant="glass" onClick={onSeeShows} className="home-cta">
          Next Shows
        </Button>
        <SocialLinks variant="icons" className="home-socials" />
      </div>
      <button className="scroll-indicator" onClick={onSeeShows} aria-label="Scroll to shows">
        <span className="scroll-arrow"></span>
      </button>
    </Section>
  );
}
