import { SocialLinks } from '../../components/common/SocialLinks';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { contactMethods } from '../../data/contact';
import './ContactMethods.css';

/** Email / phone / Instagram — a list on desktop, a row of icon buttons on mobile. */
export function ContactMethods() {
  return (
    <GlassPanel className="contact-methods">
      <h3 className="glass-title">Reach out :)</h3>
      <ul className="contact-methods-list">
        {contactMethods.map(({ key, label, value, href, external, Icon }) => (
          <li key={key}>
            <a
              href={href}
              className="contact-method"
              aria-label={`${label}: ${value}`}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <span className="contact-method-icon">
                <Icon className="contact-method-svg" />
              </span>
              <span className="contact-method-text">
                <span className="contact-method-label">{label}</span>
                <span className="contact-method-value">{value}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="contact-methods-follow">
        <p className="glass-title">Follow along</p>
        <SocialLinks variant="icons" />
      </div>
    </GlassPanel>
  );
}
