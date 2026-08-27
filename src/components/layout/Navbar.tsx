import logoInverted from '../../assets/images/site/logo-inverted.png';
import { SectionKey } from '../../types';
import './Navbar.css';

const NAV_ITEMS: SectionKey[] = ['home', 'shows', 'about', 'contact'];

interface NavbarProps {
  scrolled: boolean;
  activeSection: SectionKey;
  onNavigate: (section: SectionKey) => void;
  onToggleMobileMenu: () => void;
}

export function Navbar({ scrolled, activeSection, onNavigate, onToggleMobileMenu }: NavbarProps) {
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <img
          src={logoInverted}
          alt="Mars Project Logo"
          className="logo-img"
          onClick={() => onNavigate('home')}
        />
        <div className="nav-links desktop-nav">
          {NAV_ITEMS.map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`nav-button ${activeSection === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="mobile-menu-btn" onClick={onToggleMobileMenu}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </div>
    </nav>
  );
}
