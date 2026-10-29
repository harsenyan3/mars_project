import { useEffect, useState, RefObject } from 'react';
import { SectionKey } from '../types';

/** Tracks which section is currently in view, for navbar highlighting. */
export function useScrollSpy(sectionRefs: Record<SectionKey, RefObject<HTMLElement | null>>) {
  const [activeSection, setActiveSection] = useState<SectionKey>('home');

  useEffect(() => {
    const handleScroll = () => {
      // Sections are a full screen tall, so whichever one covers the upper
      // ~40% of the viewport is the one being looked at.
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return activeSection;
}
