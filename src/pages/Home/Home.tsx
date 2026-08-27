import { forwardRef } from 'react';
import { InstagramIcon, TikTokIcon } from '../../components/common/SocialIcons';
import logo from '../../assets/images/site/logo.png';
import homeHero from '../../assets/images/site/home-hero.jpg';
import './Home.css';

interface HomeProps {
  onSeeShows: () => void;
}

export const Home = forwardRef<HTMLElement, HomeProps>(function Home({ onSeeShows }, ref) {
  return (
    <section ref={ref} className="section home-section">
      <div className="home-background" style={{ backgroundImage: `url(${homeHero})` }}></div>
      <div className="home-overlay"></div>
      <div className="home-content">
        <img src={logo} alt="Mars Project Logo" className="home-logo" />
        <p className="home-subtitle">
          Just some kids making music out of Atlanta, Georgia. Got great things coming! Wanna hear us live?
        </p>
        <button onClick={onSeeShows} className="btn-primary">
          SEE NEXT DATES
        </button>
        <div className="home-socials">
          <a
            href="https://instagram.com/marsprojectatl"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-link"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://tiktok.com/@marsprojectatl"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-link"
            aria-label="TikTok"
          >
            <TikTokIcon />
          </a>
          <a
            href="https://linktr.ee/marsprojectatl"
            target="_blank"
            rel="noopener noreferrer"
            className="home-social-link"
            aria-label="All Links"
          >
            <span>🔗</span>
          </a>
        </div>
      </div>
      <div className="scroll-indicator" onClick={onSeeShows}>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
});
