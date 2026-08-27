import { InstagramIcon, TikTokIcon } from '../common/SocialIcons';
import './Footer.css';

export function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-inner">
        <div className="footer-socials">
          <a
            href="https://instagram.com/marsprojectatl"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Instagram"
          >
            <InstagramIcon className="footer-social-icon" />
            <span>@marsprojectatl</span>
          </a>

          <a
            href="https://tiktok.com/@marsprojectatl"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="TikTok"
          >
            <TikTokIcon className="footer-social-icon" />
            <span>@marsprojectatl</span>
          </a>

          <a
            href="https://linktr.ee/marsprojectatl"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link footer-linktree"
            aria-label="All Links"
          >
            <span className="footer-link-emoji">🔗</span>
            <span>All Links</span>
          </a>
        </div>

        <p className="footer-copy">© 2026 Mars Project. All rights reserved.</p>
      </div>
    </footer>
  );
}
