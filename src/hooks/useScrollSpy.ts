import { useEffect, useState, RefObject } from 'react';
import { SectionKey } from '../types';

/**
 * Tracks which section is currently in view (for navbar highlighting) and
 * whether the page has scrolled past the top, so the navbar can go opaque.
 */
export function useScrollSpy(sectionRefs: Record<SectionKey, RefObject<HTMLElement | null>>) {
  const [navbarScrolled, setNavbarScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>('home');

  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 120;
      (Object.entries(sectionRefs) as [SectionKey, RefObject<HTMLElement | null>][]).forEach(
        ([key, ref]) => {
          const el = ref.current;
          if (el) {
            const top = el.offsetTop;
            const bottom = top + el.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
              setActiveSection(key);
            }
          }
        }
      );
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { navbarScrolled, activeSection };
}
