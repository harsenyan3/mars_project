import logoInverted from '../../assets/images/site/logo-inverted.png';
import { SectionKey } from '../../types';
import { NavLinks } from './NavLinks';
import './Navbar.css';

interface NavbarProps {
  activeSection: SectionKey;
  onNavigate: (section: SectionKey) => void;
  onToggleMobileMenu: () => void;
}

export function Navbar({ activeSection, onNavigate, onToggleMobileMenu }: NavbarProps) {
  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-content">
        <button className="navbar-logo" onClick={() => onNavigate('home')} aria-label="Back to top">
          <img src={logoInverted} alt="Mars Project" className="navbar-logo-img" />
        </button>
        <NavLinks className="navbar-links" activeSection={activeSection} onNavigate={onNavigate} />
        <button className="mobile-menu-btn" onClick={onToggleMobileMenu} aria-label="Open menu">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
}
