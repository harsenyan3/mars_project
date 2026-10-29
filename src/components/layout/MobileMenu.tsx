import { SectionKey } from '../../types';
import { SocialLinks } from '../common/SocialLinks';
import { NavLinks } from './NavLinks';
import './MobileMenu.css';

interface MobileMenuProps {
  activeSection: SectionKey;
  onNavigate: (section: SectionKey) => void;
  onClose: () => void;
}

export function MobileMenu({ activeSection, onNavigate, onClose }: MobileMenuProps) {
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Menu">
        <button className="mobile-menu-close" onClick={onClose} aria-label="Close menu">
          ✕
        </button>
        <NavLinks
          className="mobile-menu-links"
          orientation="column"
          activeSection={activeSection}
          onNavigate={onNavigate}
        />
        <SocialLinks variant="icons" className="mobile-menu-socials" />
      </div>
    </div>
  );
}
