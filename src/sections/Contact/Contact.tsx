import type { Ref } from 'react';
import { AnimatedSection } from '../../components/common/AnimatedSection';
import { SuccessFlash } from '../../components/common/SuccessFlash';
import { Section } from '../../components/ui/Section';
import { SectionTitle } from '../../components/ui/SectionTitle';
import { useContactForm } from '../../hooks/useContactForm';
import { ContactForm } from './ContactForm';
import { ContactMethods } from './ContactMethods';
import './Contact.css';

interface ContactProps {
  ref?: Ref<HTMLElement>;
}

export function Contact({ ref }: ContactProps) {
  const { formData, onFieldChange, onSubmit, isSubmitting, showSuccessFlash } = useContactForm();

  return (
    <>
      <Section ref={ref} id="contact" variant="plain" className="contact-section">
        <AnimatedSection>
          <SectionTitle subtitle="Wanna know something else?">
            Interested in Bookings?
          </SectionTitle>
        </AnimatedSection>
        <div className="contact-grid">
          <AnimatedSection delay={0.1} direction="left" className="contact-grid-cell">
            <ContactMethods />
          </AnimatedSection>
          <AnimatedSection delay={0.2} direction="right" className="contact-grid-cell">
            <ContactForm
              formData={formData}
              onFieldChange={onFieldChange}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          </AnimatedSection>
        </div>
      </Section>
      {/* Outside the Section so its fixed overlay isn't trapped in the section's stacking context */}
      <SuccessFlash show={showSuccessFlash} />
    </>
  );
}
