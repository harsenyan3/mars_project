import type { ComponentType } from 'react';
import { Mail, Phone } from 'lucide-react';
import { InstagramIcon } from '../components/common/SocialIcons';

export const CONTACT_EMAIL = 'marsprojectatl@gmail.com';

export interface ContactMethod {
  key: string;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  Icon: ComponentType<{ className?: string }>;
}

export const contactMethods: ContactMethod[] = [
  { key: 'email', label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, Icon: Mail },
  { key: 'phone', label: 'Phone', value: '+1 (706) 581-5701', href: 'tel:+17065815701', Icon: Phone },
  {
    key: 'instagram',
    label: 'Instagram',
    value: '@marsprojectatl',
    href: 'https://instagram.com/marsprojectatl',
    external: true,
    Icon: InstagramIcon,
  },
];
