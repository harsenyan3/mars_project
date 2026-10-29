import type { ReactNode, Ref } from 'react';
import './Section.css';

interface SectionProps {
  ref?: Ref<HTMLElement>;
  id: string;
  /** 'image' sections get a full-bleed photo that fades into its neighbors;
   *  'plain' sections get a slow ambient glow instead. Alternate them. */
  variant: 'image' | 'plain';
  backgroundImage?: string;
  /** Optional photo used instead on phones (≤768px), e.g. a portrait crop.
   *  Served via <picture>, so each device downloads only its own photo. */
  mobileBackgroundImage?: string;
  /** CSS object-position for the background photo, e.g. "center 30%" */
  backgroundPosition?: string;
  /** Optional layer painted *beneath* the photo (image variant only), e.g. a logo
   *  showing through a semi-transparent photo. Covered by the edge fades too. */
  backdrop?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** One full-screen page section: fills the viewport, clears the fixed nav, snaps into place. */
export function Section({
  ref,
  id,
  variant,
  backgroundImage,
  mobileBackgroundImage,
  backgroundPosition,
  backdrop,
  className = '',
  children,
}: SectionProps) {
  return (
    <section ref={ref} id={id} className={`section section--${variant} ${className}`}>
      {variant === 'image' && backgroundImage && (
        <div className="section-bg" aria-hidden="true">
          {backdrop}
          <picture>
            {mobileBackgroundImage && <source media="(max-width: 768px)" srcSet={mobileBackgroundImage} />}
            <img src={backgroundImage} alt="" className="section-bg-img" style={{ objectPosition: backgroundPosition }} />
          </picture>
        </div>
      )}
      {variant === 'plain' && <div className="section-ambient" aria-hidden="true" />}
      <div className="section-inner">{children}</div>
    </section>
  );
}
