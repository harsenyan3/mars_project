import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_USER_ID } from '../config/emailjs';
import { ContactFormData } from '../types';

const EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

/** Sends the contact form through EmailJS. Throws if the request fails. */
export async function sendContactEmail(form: ContactFormData): Promise<void> {
  const response = await fetch(EMAILJS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_USER_ID,
      template_params: {
        from_name: form.name,
        from_email: form.email,
        from_phone: `+1 ${form.phone}`,
        message: form.message,
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`EmailJS responded with ${response.status}`);
  }
}
