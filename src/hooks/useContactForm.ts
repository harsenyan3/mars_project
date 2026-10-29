import { useState } from 'react';
import { CONTACT_EMAIL } from '../data/contact';
import { sendContactEmail } from '../services/sendContactEmail';
import { ContactFormData } from '../types';
import { formatPhone, phoneDigits } from '../utils/formatPhone';

const EMPTY_FORM: ContactFormData = { name: '', email: '', phone: '', message: '' };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUCCESS_FLASH_MS = 2000;

/** Owns the contact form's state, validation, and EmailJS submission. */
export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessFlash, setShowSuccessFlash] = useState(false);

  const onFieldChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: field === 'phone' ? formatPhone(value) : value }));
  };

  const onSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      alert('Please fill out all fields!');
      return;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      alert('Please enter a valid email address!');
      return;
    }
    if (phoneDigits(formData.phone).length !== 10) {
      alert('Please enter a valid 10-digit phone number!');
      return;
    }
    setIsSubmitting(true);
    try {
      await sendContactEmail(formData);
      setShowSuccessFlash(true);
      setFormData(EMPTY_FORM);
      setTimeout(() => setShowSuccessFlash(false), SUCCESS_FLASH_MS);
    } catch {
      alert(`Failed to send message. Please try again or email us directly at ${CONTACT_EMAIL}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, onFieldChange, onSubmit, isSubmitting, showSuccessFlash };
}
