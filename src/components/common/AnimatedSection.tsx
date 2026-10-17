import { useEffect, useState, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
}

// Tracks scroll direction globally so sections can exit toward wherever the
// user is scrolling (down when scrolling down, up when scrolling up).
let lastScrollY = window.scrollY;
let scrollDirection: 'up' | 'down' = 'down';
window.addEventListener(
  'scroll',
  () => {
    scrollDirection = window.scrollY > lastScrollY ? 'down' : 'up';
    lastScrollY = window.scrollY;
  },
  { passive: true }
);

const transforms: Record<Direction, string> = {
  up: 'translateY(45px)',
  down: 'translateY(-45px)',
  left: 'translateX(-45px)',
  right: 'translateX(45px)',
  fade: 'scale(0.94)',
};

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedSectionProps) {
  const [ref, inView] = useInView();
  const [exitDir, setExitDir] = useState<Direction>(direction);

  useEffect(() => {
    if (!inView) {
      if (direction === 'left' || direction === 'right') {
        setExitDir(direction);
      } else {
        setExitDir(scrollDirection === 'down' ? 'down' : 'up');
      }
    }
  }, [inView, direction]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[inView ? direction : exitDir],
        transition: inView
          ? `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
          : `opacity 0.4s cubic-bezier(0.4, 0, 1, 1) 0s, transform 0.4s cubic-bezier(0.4, 0, 1, 1) 0s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}
