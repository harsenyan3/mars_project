import { useEffect, useRef, useState, RefObject } from 'react';

export function useInView(
  options: IntersectionObserverInit = {}
): [RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    );

    const node = ref.current;
    if (node) observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, inView];
}
