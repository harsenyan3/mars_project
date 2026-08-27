import { SectionKey } from '../../types';
import './MobileMenu.css';

const NAV_ITEMS: SectionKey[] = ['home', 'shows', 'about', 'contact'];

interface MobileMenuProps {
  activeSection: SectionKey;
  onNavigate: (section: SectionKey) => void;
  onClose: () => void;
}

export function MobileMenu({ activeSection, onNavigate, onClose }: MobileMenuProps) {
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <button className="mobile-menu-close" onClick={onClose}>
          ✕
        </button>
        <div className="mobile-nav-links">
          {NAV_ITEMS.map((page) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`mobile-nav-button ${activeSection === page ? 'active' : ''}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
