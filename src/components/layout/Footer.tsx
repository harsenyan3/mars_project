import { SocialLinks } from '../common/SocialLinks';
import './Footer.css';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <SocialLinks variant="pills" />
        <p className="site-footer-copy">© {new Date().getFullYear()} Mars Project. All rights reserved.</p>
      </div>
    </footer>
  );
}
