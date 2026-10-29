import { Button } from '../../components/ui/Button';
import { GlassPanel } from '../../components/ui/GlassPanel';
import { ContactFormData } from '../../types';
import './ContactForm.css';

interface ContactFormProps {
  formData: ContactFormData;
  onFieldChange: (field: keyof ContactFormData, value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export function ContactForm({ formData, onFieldChange, onSubmit, isSubmitting }: ContactFormProps) {
  return (
    <GlassPanel className="contact-form-panel">
      <h3 className="glass-title">Send us a message</h3>
      <form
        className="contact-form"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="contact-form-row">
          <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Your Name"
            aria-label="Your name"
            value={formData.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            className="form-field"
          />
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Your Email"
            aria-label="Your email"
            value={formData.email}
            onChange={(e) => onFieldChange('email', e.target.value)}
            className="form-field"
          />
        </div>
        <input
          type="tel"
          name="phone"
          autoComplete="tel-national"
          placeholder="Your Phone Number"
          aria-label="Your phone number"
          value={formData.phone}
          onChange={(e) => onFieldChange('phone', e.target.value)}
          className="form-field"
          maxLength={14}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          aria-label="Your message"
          rows={4}
          value={formData.message}
          onChange={(e) => onFieldChange('message', e.target.value)}
          className="form-field form-field--textarea"
        ></textarea>
        <Button type="submit" disabled={isSubmitting} className="contact-form-submit">
          {isSubmitting ? 'Sending...' : 'Send message'}
        </Button>
      </form>
    </GlassPanel>
  );
}
