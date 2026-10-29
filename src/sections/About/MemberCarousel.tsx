import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { BandMember } from '../../types';
import { MemberTile } from './MemberTile';
import './MemberCarousel.css';

interface MemberCarouselProps {
  members: BandMember[];
}

/**
 * Desktop: a 3×2 grid. Mobile (≤768px, see MemberCarousel.css): a centered
 * carousel where the member in the middle is "selected" (full size, glow,
 * caption) and arrows step one member at a time. The list only scrolls on
 * mobile, so the scroll tracking below is inert on desktop.
 */
export function MemberCarousel({ members }: MemberCarouselProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Whichever tile's center is closest to the list's center is the selected one.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = list.scrollLeft + list.clientWidth / 2;
        let closest = 0;
        let closestDistance = Infinity;
        Array.from(list.children).forEach((child, idx) => {
          const item = child as HTMLElement;
          const distance = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
          if (distance < closestDistance) {
            closestDistance = distance;
            closest = idx;
          }
        });
        setActive(closest);
      });
    };
    list.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      list.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = (index: number) => {
    const list = listRef.current;
    const item = list?.children[index] as HTMLElement | undefined;
    if (!list || !item) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    list.scrollTo({
      left: item.offsetLeft - (list.clientWidth - item.offsetWidth) / 2,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <div className="member-carousel" role="group" aria-roledescription="carousel" aria-label="Band members">
      <ul ref={listRef} className="member-grid">
        {members.map((member, idx) => (
          <li
            key={member.name}
            className={`member-grid-item ${idx === active ? 'is-active' : ''}`}
            onClick={() => goTo(idx)}
          >
            <AnimatedSection delay={idx * 0.06} className="member-grid-anim">
              <MemberTile member={member} />
            </AnimatedSection>
          </li>
        ))}
      </ul>
      {/* Arrows wrap around: next on the last member returns to the first, and vice versa */}
      <button
        className="member-carousel-arrow member-carousel-arrow--prev"
        onClick={() => goTo((active - 1 + members.length) % members.length)}
        aria-label="Previous member"
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <button
        className="member-carousel-arrow member-carousel-arrow--next"
        onClick={() => goTo((active + 1) % members.length)}
        aria-label="Next member"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}
