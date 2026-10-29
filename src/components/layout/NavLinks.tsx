import { NAV_ITEMS } from '../../data/navigation';
import { SectionKey } from '../../types';
import './NavLinks.css';

interface NavLinksProps {
  activeSection: SectionKey;
  onNavigate: (section: SectionKey) => void;
  orientation?: 'row' | 'column';
  className?: string;
}

/** Section links shared by the desktop navbar and the mobile menu. */
export function NavLinks({ activeSection, onNavigate, orientation = 'row', className = '' }: NavLinksProps) {
  return (
    <div className={`nav-links nav-links--${orientation} ${className}`}>
      {NAV_ITEMS.map((section) => {
        const active = activeSection === section;
        return (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            className={`nav-link ${active ? 'is-active' : ''}`}
            aria-current={active ? 'true' : undefined}
          >
            {section}
          </button>
        );
      })}
    </div>
  );
}
