import { socialLinks } from '../../data/socials';
import './SocialLinks.css';

interface SocialLinksProps {
  /** 'icons': round glass icon buttons. 'pills': icon + handle. */
  variant: 'icons' | 'pills';
  className?: string;
}

export function SocialLinks({ variant, className = '' }: SocialLinksProps) {
  return (
    <ul className={`social-links social-links--${variant} ${className}`}>
      {socialLinks.map(({ key, label, handle, href, Icon }) => (
        <li key={key}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={label}>
            <Icon className="social-link-icon" />
            {variant === 'pills' && <span>{handle}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
