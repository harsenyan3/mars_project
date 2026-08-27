import { forwardRef } from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { ContactFormData } from '../../types';
import logo from '../../assets/images/site/logo.png';
import './Contact.css';

interface ContactProps {
  formData: ContactFormData;
  onFieldChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const Contact = forwardRef<HTMLElement, ContactProps>(function Contact(
  { formData, onFieldChange, onSubmit, isSubmitting },
  ref
) {
  return (
    <section ref={ref} className="section contact-section">
      <div className="contact-page-background">
        <img src={logo} alt="Mars Project Logo" className="contact-page-bg-img" />
      </div>

      <div className="page-container-small">
        <AnimatedSection>
          <h2 className="page-title">Interested in Bookings?</h2>
          <p className="page-subtitle">Wanna know something else?</p>
        </AnimatedSection>

        <div className="contact-section-grid">
          <AnimatedSection delay={0.1} direction="left">
            <div className="contact-info card">
              <h3 className="card-title">Reach out :)</h3>
              <div className="contact-items">
                <a href="mailto:marsprojectatl@gmail.com" className="contact-item-link">
                  <div className="contact-item">
                    <Mail className="contact-icon" />
                    <div className="contact-details">
                      <p className="contact-label">Email</p>
                      <span className="contact-link">marsprojectatl@gmail.com</span>
                    </div>
                  </div>
                </a>
                <a href="tel:+17065815701" className="contact-item-link">
                  <div className="contact-item">
                    <Phone className="contact-icon" />
                    <div className="contact-details">
                      <p className="contact-label">Phone</p>
                      <span className="contact-link">+1 (706) 581-5701</span>
                    </div>
                  </div>
                </a>
                <a
                  href="https://instagram.com/marsprojectatl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item-link"
                >
                  <div className="contact-item">
                    <Instagram className="contact-icon" />
                    <div className="contact-details">
                      <p className="contact-label">Instagram</p>
                      <span className="contact-link">@marsprojectatl</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} direction="right">
            <div className="message-form card">
              <h3 className="card-title">Send us a message</h3>
              <div className="form-fields">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => onFieldChange('name', e.target.value)}
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => onFieldChange('email', e.target.value)}
                  className="form-input"
                />
                <input
                  type="tel"
                  placeholder="Your Phone Number"
                  value={formData.phone}
                  onChange={(e) => onFieldChange('phone', e.target.value)}
                  className="form-input"
                  maxLength={14}
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => onFieldChange('message', e.target.value)}
                  className="form-textarea"
                ></textarea>
                <button type="button" onClick={onSubmit} className="btn-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
});
